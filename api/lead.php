<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function respond(array $body, int $status = 200): never
{
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function clean(mixed $value, int $max): string
{
    $text = trim((string) $value);
    return function_exists('mb_substr') ? mb_substr($text, 0, $max, 'UTF-8') : substr($text, 0, $max);
}

function escapeTelegram(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(['ok' => false, 'error' => 'method_not_allowed'], 405);
}

$contentLength = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
if ($contentLength > 12000) {
    respond(['ok' => false, 'error' => 'payload_too_large'], 413);
}

$configPath = __DIR__ . '/config.php';
if (!is_file($configPath)) {
    respond(['ok' => false, 'error' => 'service_not_configured'], 503);
}
$config = require $configPath;
$token = trim((string) ($config['telegram_bot_token'] ?? ''));
$chatIds = array_values(array_filter(array_map('strval', $config['telegram_chat_ids'] ?? [])));
$allowedHosts = array_map('strtolower', $config['allowed_hosts'] ?? ['rovnosteny.by']);
$requestHost = strtolower((string) preg_replace('/:\d+$/', '', $_SERVER['HTTP_HOST'] ?? ''));
if (!in_array($requestHost, $allowedHosts, true)) {
    respond(['ok' => false, 'error' => 'host_denied'], 403);
}
if ($token === '' || $token === 'PASTE_BOT_TOKEN_HERE' || $chatIds === []) {
    respond(['ok' => false, 'error' => 'service_not_configured'], 503);
}

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '') {
    $originHost = strtolower((string) parse_url($origin, PHP_URL_HOST));
    if (!in_array($originHost, $allowedHosts, true)) {
        respond(['ok' => false, 'error' => 'origin_denied'], 403);
    }
}

$raw = file_get_contents('php://input');
$body = json_decode($raw ?: '', true);
if (!is_array($body)) {
    respond(['ok' => false, 'error' => 'invalid_json'], 400);
}
if (trim((string) ($body['website'] ?? '')) !== '') {
    respond(['ok' => true]);
}

$name = clean($body['name'] ?? '', 60);
$phone = clean($body['phone'] ?? '', 30);
$service = clean($body['service'] ?? 'Не указано', 100);
$message = clean($body['message'] ?? 'Без комментария', 500);
$page = clean($body['page'] ?? '', 300);
$nameLength = function_exists('mb_strlen') ? mb_strlen($name, 'UTF-8') : strlen($name);
if ($nameLength < 2 || strlen((string) preg_replace('/\D+/', '', $phone)) < 12) {
    respond(['ok' => false, 'error' => 'validation_failed'], 422);
}

$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rateFile = sys_get_temp_dir() . '/rovno_lead_' . hash('sha256', $ip);
$now = time();
$attempts = [];
if (is_file($rateFile)) {
    $attempts = array_filter(array_map('intval', explode(',', (string) file_get_contents($rateFile))), static fn (int $t): bool => $t > $now - 600);
}
if (count($attempts) >= 4) {
    respond(['ok' => false, 'error' => 'too_many_requests'], 429);
}
$attempts[] = $now;
@file_put_contents($rateFile, implode(',', $attempts), LOCK_EX);

$attr = is_array($body['attribution'] ?? null) ? $body['attribution'] : [];
$source = clean($attr['utm_source'] ?? '', 100);
$medium = clean($attr['utm_medium'] ?? '', 100);
$campaign = clean($attr['utm_campaign'] ?? '', 160);
$content = clean($attr['utm_content'] ?? '', 160);
$term = clean($attr['utm_term'] ?? '', 160);
$yclid = clean($attr['yclid'] ?? '', 200);
$landing = clean($attr['landing_page'] ?? '', 300);
$referrer = clean($attr['referrer'] ?? '', 300);

$lines = [
    '<b>Новая заявка с сайта РОВНО</b>',
    '',
    '<b>Имя:</b> ' . escapeTelegram($name),
    '<b>Телефон:</b> ' . escapeTelegram($phone),
    '<b>Услуга:</b> ' . escapeTelegram($service),
    '<b>Комментарий:</b> ' . escapeTelegram($message ?: 'Без комментария'),
];
if ($page !== '') $lines[] = '<b>Страница:</b> ' . escapeTelegram($page);
if ($source !== '') {
    $lines[] = '';
    $lines[] = '<b>Источник рекламы</b>';
    $lines[] = '<b>Источник:</b> ' . escapeTelegram($source . ($medium !== '' ? ' / ' . $medium : ''));
}
if ($campaign !== '') $lines[] = '<b>Кампания:</b> ' . escapeTelegram($campaign);
if ($content !== '') $lines[] = '<b>Объявление:</b> ' . escapeTelegram($content);
if ($term !== '') $lines[] = '<b>Запрос:</b> ' . escapeTelegram($term);
if ($yclid !== '') $lines[] = '<b>Yandex Click ID:</b> ' . escapeTelegram($yclid);
if ($landing !== '') $lines[] = '<b>Первая страница:</b> ' . escapeTelegram($landing);
if ($referrer !== '') $lines[] = '<b>Переход:</b> ' . escapeTelegram($referrer);
$telegramText = implode("\n", $lines);

$delivered = 0;
foreach ($chatIds as $chatId) {
    $payload = json_encode([
        'chat_id' => $chatId,
        'text' => $telegramText,
        'parse_mode' => 'HTML',
        'disable_web_page_preview' => true,
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    $ch = curl_init('https://api.telegram.org/bot' . $token . '/sendMessage');
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $payload,
        CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CONNECTTIMEOUT => 5,
        CURLOPT_TIMEOUT => 10,
    ]);
    curl_exec($ch);
    $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    if ($status >= 200 && $status < 300) $delivered++;
}

if ($delivered === 0) {
    respond(['ok' => false, 'error' => 'delivery_failed'], 502);
}
respond(['ok' => true]);
