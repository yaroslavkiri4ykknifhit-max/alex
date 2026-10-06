from pathlib import Path
from html import escape
import json

ROOT = Path(__file__).parent
BASE = "https://rovnosteny.by"

PAGES = [
    {
        "path": "services/mehanizirovannaya-shtukaturka",
        "title": "Механизированная штукатурка стен в Минске — цена от 18 BYN/м² | РОВНО",
        "description": "Механизированная штукатурка стен в Минске и области. Цена работ от 18 BYN/м², бесплатный замер, материалы с доставкой, фиксированная смета и гарантия.",
        "h1": "Механизированная штукатурка стен в Минске",
        "lead": "Ровная геометрия стен в квартире, доме или коммерческом помещении. Бесплатно замерим объект, рассчитаем материалы и зафиксируем стоимость до начала работ.",
        "price": "от 18 BYN/м²",
        "service": "Механизированная штукатурка",
        "image": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1800&q=86",
        "intro_title": "Быстрее ручного способа и с контролируемым результатом",
        "intro": "Штукатурная станция смешивает сухую смесь с водой в стабильной пропорции и равномерно подаёт раствор на стену. Мастер выставляет маяки, наносит состав, выравнивает плоскость и подрезает поверхность. Такой подход особенно выгоден на объектах средней и большой площади: работа идёт быстрее, а состав получается однородным на всём участке.",
        "fits": ["квартир и новостроек", "частных домов и коттеджей", "офисов и коммерческих помещений", "стен из кирпича, бетона и газоблока"],
        "includes": ["осмотр основания и замер площади", "защита окон, пола и коммуникаций", "грунтование и установка маяков", "механизированное нанесение смеси", "выравнивание плоскости и формирование углов", "уборка рабочей зоны после завершения"],
        "factors": "На итоговую смету влияют площадь, перепады стен, требуемая толщина слоя, материал основания, количество откосов и сложных примыканий. Поэтому цену за весь объект фиксируем после замера, а не меняем в процессе.",
        "faqs": [
            ("Можно ли штукатурить стены в новостройке?", "Да. Перед работами проверяем основание, очищаем его, подбираем грунт и оцениваем необходимость армирования проблемных участков."),
            ("Нужно ли потом шпатлевать стены?", "Под обои объём подготовки зависит от смеси и требований к финишу. Под покраску шпатлёвка обычно нужна. Точный состав работ согласуем до начала."),
            ("Сколько сохнет механизированная штукатурка?", "Срок зависит от толщины слоя, температуры, влажности и вентиляции. Мастер даст рекомендации по режиму сушки после нанесения."),
            ("Вы привозите материалы?", "Да, можем организовать закупку и доставку рассчитанного количества материалов на объект в Минске или Минской области.")
        ]
    },
    {
        "path": "services/shpaklevka-sten",
        "title": "Шпатлёвка стен в Минске под обои и покраску — от 12 BYN/м² | РОВНО",
        "description": "Профессиональная шпатлёвка стен в Минске: под обои и покраску, цена от 12 BYN/м². Бесплатный замер, ровная поверхность, контроль лампой и гарантия.",
        "h1": "Шпатлёвка стен под обои и покраску",
        "lead": "Подготовим стены под выбранный финиш: устраним мелкие дефекты, выведем гладкую поверхность и проверим результат направленным светом.",
        "price": "от 12 BYN/м²",
        "service": "Шпатлёвка стен",
        "image": "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=86",
        "intro_title": "Подготовка под конкретный отделочный материал",
        "intro": "Требования к стене под плотные обои и под матовую краску различаются. Мы заранее уточняем финишное покрытие, оцениваем основание и подбираем количество слоёв. После высыхания поверхность шлифуется и проверяется боковым светом — так видны риски, наплывы и неровности, которые невозможно заметить при обычном освещении.",
        "fits": ["стен под обои", "поверхностей под покраску", "гипсокартона и оштукатуренных оснований", "локального исправления дефектов"],
        "includes": ["оценка основания и согласование уровня подготовки", "грунтование поверхности", "армирование стыков и трещин при необходимости", "нанесение стартового и финишного состава", "шлифовка с пылеудалением", "проверка поверхности направленным светом"],
        "factors": "Цена зависит от состояния основания, требований к финишу, количества слоёв, необходимости армирования и сложности примыканий. Под покраску подготовка обычно требует больше операций, чем под обои.",
        "faqs": [
            ("Чем отличается шпатлёвка под обои от подготовки под покраску?", "Под покраску нужна более гладкая поверхность и строгий контроль дефектов, поэтому обычно выполняется больше этапов нанесения и шлифовки."),
            ("Можно ли шпатлевать старые стены?", "Да, если основание прочное. Отслаивающиеся покрытия удаляем, трещины раскрываем и ремонтируем, после чего грунтуем поверхность."),
            ("Будет ли много пыли?", "При шлифовке используем пылеудаление и защищаем соседние поверхности. Полностью исключить пыль невозможно, но её распространение существенно уменьшается."),
            ("Когда можно клеить обои?", "После полного высыхания слоя и грунтования. Срок зависит от состава, толщины нанесения и условий на объекте.")
        ]
    },
    {
        "path": "services/shtukaturka-potolkov",
        "title": "Штукатурка потолков в Минске — цена от 30 BYN/м² | РОВНО",
        "description": "Штукатурка потолков в Минске и области. Работы от 30 BYN/м², проверка основания, ровная плоскость, бесплатный замер и фиксированная смета.",
        "h1": "Штукатурка потолков в Минске",
        "lead": "Выведем ровную плоскость потолка и аккуратные примыкания. Технологию подбираем после проверки основания, перепадов и допустимой толщины слоя.",
        "price": "от 30 BYN/м²",
        "service": "Штукатурка потолков",
        "image": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=86",
        "intro_title": "Сложные поверхности требуют точной подготовки",
        "intro": "Потолок постоянно находится в зоне бокового света, поэтому перепады становятся заметны после покраски. Перед нанесением проверяем прочность основания, подбираем грунт, оцениваем допустимую толщину слоя и необходимость армирования. Плоскость и примыкания формируем с контролем правилом и уровнем.",
        "fits": ["монолитных и сборных потолков", "потолков в квартирах и новостройках", "примыканий стен к потолку", "локального выравнивания поверхности"],
        "includes": ["проверка основания и перепадов", "защита окон, стен и пола", "грунтование и армирование при необходимости", "установка направляющих и уголков", "нанесение и выравнивание раствора", "контроль геометрии и уборка"],
        "factors": "Стоимость определяется площадью потолка, высотой помещения, перепадами, толщиной слоя и состоянием основания. Точная цена указывается в смете после осмотра.",
        "faqs": [
            ("Всегда ли можно штукатурить потолок?", "Нет. Сначала нужно проверить основание и допустимую толщину слоя. При больших перепадах иногда рациональнее выбрать другую технологию."),
            ("Используете ли армирующую сетку?", "Применяем её там, где она действительно нужна: на стыках материалов, трещинах и проблемных участках. Решение принимается после осмотра."),
            ("Можно заказать только потолок?", "Да, штукатурку потолка можно заказать отдельно от работ по стенам."),
            ("Что влияет на стоимость потолка?", "Площадь, высота помещения, перепады, толщина слоя и подготовка основания. После осмотра подготовим точную смету.")
        ]
    },
    {
        "path": "services/podgotovka-pod-otdelku",
        "title": "Подготовка стен под покраску и обои в Минске | РОВНО",
        "description": "Комплексная подготовка стен под чистовую отделку в Минске: штукатурка, шпатлёвка, шлифовка и грунтование. Бесплатный замер и смета.",
        "h1": "Подготовка стен под чистовую отделку",
        "lead": "Один подрядчик на весь черновой этап: от проверки основания и штукатурки до поверхности, готовой под обои или покраску.",
        "price": "по смете",
        "service": "Подготовка стен под чистовую отделку",
        "image": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=86",
        "intro_title": "Согласованный результат без разрывов между этапами",
        "intro": "Когда штукатурку, шпатлёвку и шлифовку выполняет одна команда, легче контролировать совместимость материалов и качество основания. Мы заранее уточняем, какое покрытие будет финишным, и формируем состав работ под него. Заказчик получает одну смету, понятную последовательность и ответственность за весь черновой цикл.",
        "fits": ["новостроек без отделки", "капитального ремонта квартир", "частных домов", "подготовки под обои или покраску"],
        "includes": ["диагностика и подготовка основания", "штукатурное выравнивание стен", "формирование откосов и углов", "шпатлевание до нужного класса качества", "шлифовка и контроль боковым светом", "финишное грунтование перед отделкой"],
        "factors": "Общая стоимость зависит от исходного состояния стен, площади, перепадов, количества этапов и требований к финишному покрытию. После замера составляем поэтапную смету, где отдельно видны работы и материалы.",
        "faqs": [
            ("Что значит поверхность готова под обои?", "Стена выровнена, высушена, зашпатлёвана до согласованного качества, отшлифована и загрунтована под выбранный клей."),
            ("Что входит в подготовку под покраску?", "Как правило, более тщательное шпатлевание, шлифовка и контроль боковым светом. Точный состав зависит от типа краски и освещения."),
            ("Можно ли заказать материалы вместе с работой?", "Да, рассчитаем необходимое количество и организуем доставку согласованных материалов."),
            ("Фиксируется ли стоимость всего комплекса?", "Да, после замера формируем смету по этапам. Новые работы добавляются только после согласования с заказчиком.")
        ]
    },
    {
        "path": "services/remont-pod-klyuch",
        "title": "Ремонт квартир под ключ в Минске — смета и этапы | РОВНО",
        "description": "Ремонт квартир под ключ в Минске и области: черновые и чистовые работы одной командой, понятная смета, поэтапная приёмка и гарантия по договору.",
        "h1": "Ремонт квартиры под ключ в Минске",
        "lead": "Если нужен не отдельный этап, а готовое помещение, организуем ремонт одной командой: составим смету, согласуем последовательность работ и доведём объект до чистовой отделки.",
        "price": "по смете",
        "service": "Ремонт квартиры под ключ",
        "image": "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1800&q=86",
        "intro_title": "Полный ремонт как дополнительная услуга",
        "intro": "Наша основная специализация — механизированная штукатурка и подготовка ровных поверхностей. Для клиентов, которым удобнее получить весь результат у одного подрядчика, можем взять ремонт квартиры под ключ. До начала работ делим проект на понятные этапы, согласовываем материалы и фиксируем стоимость каждого этапа в смете.",
        "fits": ["новостроек без отделки", "квартир после демонтажа", "капитального ремонта вторичного жилья", "объектов, где нужен один ответственный подрядчик"],
        "includes": ["осмотр объекта и подробная смета", "черновые штукатурные и подготовительные работы", "электромонтажные и сантехнические работы по проекту", "подготовка стен, потолков и полов", "чистовая отделка согласованными материалами", "поэтапная приёмка и финальная уборка"],
        "factors": "Стоимость рассчитывается индивидуально и зависит от площади, исходного состояния квартиры, состава инженерных работ, выбранных материалов и уровня чистовой отделки. Смету разбиваем по этапам, чтобы заказчик видел стоимость до начала каждого вида работ.",
        "faqs": [
            ("Ремонт под ключ — ваше основное направление?", "Основное направление команды — механизированная штукатурка и подготовка поверхностей. Полный ремонт выполняем как дополнительную услугу для объектов, где можем обеспечить качество всех согласованных этапов."),
            ("Можно заказать только часть ремонта?", "Да. Можно заказать штукатурку, шпатлёвку или подготовку под чистовую отделку отдельно, а можно согласовать комплекс работ под ключ."),
            ("Как контролируется стоимость?", "До старта составляем поэтапную смету. Дополнительные работы и изменения материалов выполняются только после согласования с заказчиком."),
            ("Кто закупает материалы?", "Можем подготовить ведомость для самостоятельной закупки или организовать закупку и доставку согласованных материалов на объект.")
        ]
    },
]

def logo():
    return '''<span class="logo__mark logo__mark--css" aria-hidden="true"><i></i><b></b></span><span class="logo__text"><strong>РОВНО</strong><small>штукатурка и отделка</small></span>'''

def faq_schema(faqs):
    return [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in faqs]

def page_html(p):
    url = f"{BASE}/{p['path']}/"
    ld = {
        "@context": "https://schema.org",
        "@graph": [
            {"@type": "BreadcrumbList", "itemListElement": [
                {"@type": "ListItem", "position": 1, "name": "Главная", "item": f"{BASE}/"},
                {"@type": "ListItem", "position": 2, "name": "Услуги", "item": f"{BASE}/#services"},
                {"@type": "ListItem", "position": 3, "name": p["service"], "item": url}
            ]},
            {"@type": "Service", "name": p["service"], "description": p["description"], "url": url,
             "provider": {"@type": "HomeAndConstructionBusiness", "name": "РОВНО", "url": f"{BASE}/"},
             "areaServed": ["Минск", "Минская область"], "offers": {"@type": "Offer", "priceCurrency": "BYN", "description": p["price"]}},
            {"@type": "FAQPage", "mainEntity": faq_schema(p["faqs"])}
        ]
    }
    fits = "".join(f"<li>{escape(x)}</li>" for x in p["fits"])
    includes = "".join(f"<li><span>{i:02}</span>{escape(x)}</li>" for i, x in enumerate(p["includes"], 1))
    faqs = "".join(f"<details class='reveal'><summary>{escape(q)}<span>+</span></summary><p>{escape(a)}</p></details>" for q, a in p["faqs"])
    return f'''<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{escape(p['title'])}</title>
  <meta name="description" content="{escape(p['description'])}">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
  <meta name="geo.region" content="BY-HM"><meta name="geo.placename" content="Минск"><meta name="theme-color" content="#f4f0e8">
  <link rel="canonical" href="{url}"><link rel="alternate" hreflang="ru-BY" href="{url}">
  <link rel="icon" href="../../favicon.svg" type="image/svg+xml"><link rel="manifest" href="../../site.webmanifest">
  <meta property="og:type" content="website"><meta property="og:locale" content="ru_BY"><meta property="og:site_name" content="РОВНО">
  <meta property="og:title" content="{escape(p['title'])}"><meta property="og:description" content="{escape(p['description'])}"><meta property="og:url" content="{url}"><meta property="og:image" content="{p['image']}">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Onest:wght@500;600;700&display=swap" rel="stylesheet">
  <link rel="preload" as="image" href="{p['image']}" fetchpriority="high">
  <link rel="stylesheet" href="../../style.css?v=20261005-2">
  <script type="application/ld+json">{json.dumps(ld, ensure_ascii=False, separators=(',', ':'))}</script>
</head>
<body class="inner-page">
  <div class="noise" aria-hidden="true"></div>
  <header class="header header--solid" data-header><div class="container header__inner">
    <a class="logo" href="../../" aria-label="РОВНО — на главную">{logo()}</a>
    <nav class="nav" aria-label="Основная навигация"><a href="../../#services">Услуги</a><a href="../../ceny/">Цены</a><a href="../../#benefits">Преимущества</a><a href="../../#process">Этапы</a><a href="#faq">Вопросы</a></nav>
    <a class="button button--small" href="#contact">Бесплатный замер <span class="icon" aria-hidden="true"></span></a>
    <button class="menu" type="button" aria-label="Открыть меню" aria-expanded="false" data-menu><span></span><span></span></button>
  </div><div class="mobile-nav" data-mobile-nav><a href="../../#services">Услуги</a><a href="../../ceny/">Цены</a><a href="../../#benefits">Преимущества</a><a href="#faq">Вопросы</a><a class="button" href="#contact">Получить расчёт <span class="icon" aria-hidden="true"></span></a></div></header>
  <main>
    <section class="service-hero"><div class="service-hero__media"><img src="{p['image']}" alt="{escape(p['h1'])}" width="1800" height="1100" fetchpriority="high"></div><div class="service-hero__shade"></div>
      <div class="container service-hero__content"><nav class="breadcrumbs" aria-label="Хлебные крошки"><a href="../../">Главная</a><span>›</span><a href="../../#services">Услуги</a><span>›</span><span>{escape(p['service'])}</span></nav>
        <div class="service-hero__grid"><div><div class="eyebrow"><span></span> Минск и Минская область</div><h1>{escape(p['h1'])}</h1><p>{escape(p['lead'])}</p><div class="hero__actions"><a class="button button--accent" href="#contact" data-cta="hero">Получить точную смету <span class="icon" aria-hidden="true"></span></a><a class="link" href="#details">Что входит <span class="icon icon--down" aria-hidden="true"></span></a></div></div>
        <aside class="service-price"><small>СТОИМОСТЬ РАБОТ</small><strong>{escape(p['price'])}</strong><span>Точная цена фиксируется после бесплатного замера</span></aside></div>
      </div>
    </section>
    <section class="section content-section" id="details"><div class="container content-grid"><div><span class="section-num">01</span><span class="eyebrow">О технологии</span></div><article class="seo-copy"><h2>{escape(p['intro_title'])}</h2><p>{escape(p['intro'])}</p><h3>Подходит для:</h3><ul class="check-list">{fits}</ul></article></div></section>
    <section class="section included"><div class="container"><div class="section-head reveal"><div><span class="section-num">02</span><span class="eyebrow">Состав услуги</span></div><h2>Что входит<br>в работу</h2><p>Состав фиксируем в смете, чтобы до старта было понятно, за что вы платите.</p></div><ol class="included-list">{includes}</ol></div></section>
    <section class="section price-factors"><div class="container content-grid"><div><span class="section-num">03</span><span class="eyebrow">Цена</span></div><article class="seo-copy"><h2>Как формируется стоимость</h2><p>{escape(p['factors'])}</p><div class="price-callout"><strong>{escape(p['price'])}</strong><span>ориентир по базовой работе</span><a href="../../ceny/">Посмотреть все цены <span class="icon icon--right" aria-hidden="true"></span></a></div></article></div></section>
    <section class="section faq" id="faq"><div class="container faq__grid"><div class="faq__title reveal"><span class="section-num">04</span><span class="eyebrow">Вопросы</span><h2>Что важно знать</h2><p>Ответим на остальные вопросы после короткого описания объекта.</p></div><div class="accordion">{faqs}</div></div></section>
    <section class="contact" id="contact"><div class="container contact__grid"><div class="contact__copy reveal"><span class="eyebrow">Бесплатный замер</span><h2>Получите точную смету</h2><p>Оставьте телефон. Уточним площадь и состояние объекта, ответим на вопросы и согласуем время замера.</p><ul><li>Ответ без навязчивых продаж</li><li>Цена после осмотра</li><li>Сроки в договоре</li></ul></div>
      <form class="form reveal" data-lead-form novalidate><div class="form__row"><label>Ваше имя<input type="text" name="name" placeholder="Например, Александр" minlength="2" maxlength="60" autocomplete="name" required></label><label>Телефон<input type="tel" name="phone" placeholder="+375 (__) ___-__-__" maxlength="30" autocomplete="tel" inputmode="tel" required></label></div><input type="hidden" name="service" value="{escape(p['service'])}"><label>Комментарий <span>(необязательно)</span><textarea name="message" rows="3" maxlength="500" placeholder="Площадь и тип помещения"></textarea></label><input class="form__trap" type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true"><button class="button button--accent" type="submit">Получить расчёт <span class="icon" aria-hidden="true"></span></button><p class="form__legal">Нажимая кнопку, вы соглашаетесь на обработку данных для связи по заявке.</p><div class="form__status" data-form-status aria-live="polite"></div></form>
    </div></section>
  </main>
  <footer class="footer"><div class="container footer__top"><a class="logo logo--light" href="../../">{logo()}</a><div class="footer__links"><a href="../../#services">Услуги</a><a href="../../ceny/">Цены</a><a href="../../#benefits">О нас</a><a href="#faq">Вопросы</a></div><a class="button button--outline" href="#contact">Оставить заявку <span class="icon" aria-hidden="true"></span></a></div><div class="container footer__bottom"><span>© 2026 РОВНО. Минск и Минская область.</span><span>Механизированная штукатурка и отделочные работы</span></div></footer>
  <a class="mobile-cta" href="#contact" aria-label="Рассчитать стоимость работ">Рассчитать стоимость <span class="icon" aria-hidden="true"></span></a>
  <script src="../../analytics.js?v=20261002-1" defer></script><script src="../../script.js?v=20261006-1" defer></script>
</body></html>'''

PRICE_FAQS = [
    ("Почему цена указана «от»?", "Базовая ставка применяется к подготовленному основанию и стандартному объёму. Перепады, толстый слой, армирование, откосы и высота помещения влияют на итоговую стоимость."),
    ("Замер действительно бесплатный?", "Да, для объектов в зоне работы выезд, замер и составление сметы выполняются бесплатно. Условия дальнего выезда по Минской области уточняются заранее."),
    ("Материалы входят в цену?", "На странице указаны ориентиры по работам. Материалы рассчитываются отдельно по фактической площади и толщине слоя, чтобы смета была прозрачной."),
    ("Стоимость фиксируется в договоре?", "Да. После осмотра согласовываем объём, сроки и цену. Дополнительные работы возможны только с согласия заказчика.")
]

def prices_html():
    url = f"{BASE}/ceny/"
    ld = {"@context":"https://schema.org","@graph":[
        {"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Главная","item":f"{BASE}/"},{"@type":"ListItem","position":2,"name":"Цены","item":url}]},
        {"@type":"ItemList","name":"Цены на штукатурные работы","itemListElement":[
            {"@type":"Offer","position":1,"name":"Механизированная штукатурка стен","price":"18","priceCurrency":"BYN","url":f"{BASE}/services/mehanizirovannaya-shtukaturka/"},
            {"@type":"Offer","position":2,"name":"Шпатлёвка стен","price":"12","priceCurrency":"BYN","url":f"{BASE}/services/shpaklevka-sten/"},
            {"@type":"Offer","position":3,"name":"Штукатурка потолков","price":"30","priceCurrency":"BYN","url":f"{BASE}/services/shtukaturka-potolkov/"},
            {"@type":"Offer","position":4,"name":"Ремонт квартиры под ключ","priceCurrency":"BYN","description":"Стоимость рассчитывается после замера и согласования состава работ","url":f"{BASE}/services/remont-pod-klyuch/"}]},
        {"@type":"FAQPage","mainEntity":faq_schema(PRICE_FAQS)}]}
    faqs = "".join(f"<details class='reveal'><summary>{escape(q)}<span>+</span></summary><p>{escape(a)}</p></details>" for q,a in PRICE_FAQS)
    rows = [
        ("Механизированная штукатурка стен", "от 18 BYN/м²", "../services/mehanizirovannaya-shtukaturka/"),
        ("Шпатлёвка стен под обои", "от 12 BYN/м²", "../services/shpaklevka-sten/"),
        ("Штукатурка потолков", "от 30 BYN/м²", "../services/shtukaturka-potolkov/"),
        ("Подготовка под покраску", "после замера", "../services/podgotovka-pod-otdelku/"),
        ("Оконные и дверные откосы", "после замера", "../services/shtukaturka-potolkov/"),
        ("Ремонт квартиры под ключ", "по смете", "../services/remont-pod-klyuch/"),
        ("Выезд, замер и смета", "0 BYN", "#contact")]
    table = "".join(f"<tr><td><a href='{link}'>{name}</a></td><td>{price}</td><td><a href='{link}'>Подробнее <span class='icon' aria-hidden='true'></span></a></td></tr>" for name,price,link in rows)
    return f'''<!doctype html><html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Цены на штукатурные работы в Минске — прайс 2026 | РОВНО</title><meta name="description" content="Цены на механизированную штукатурку, шпатлёвку стен, потолки и откосы в Минске. Бесплатный замер, прозрачная смета и фиксация стоимости."><meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1"><link rel="canonical" href="{url}"><link rel="alternate" hreflang="ru-BY" href="{url}"><link rel="icon" href="../favicon.svg" type="image/svg+xml"><meta name="theme-color" content="#f4f0e8"><meta property="og:type" content="website"><meta property="og:title" content="Цены на штукатурные работы в Минске | РОВНО"><meta property="og:description" content="Понятные ориентиры по стоимости и бесплатная точная смета после замера."><meta property="og:url" content="{url}"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Onest:wght@500;600;700&display=swap" rel="stylesheet"><link rel="stylesheet" href="../style.css?v=20261005-2"><script type="application/ld+json">{json.dumps(ld,ensure_ascii=False,separators=(',',':'))}</script></head><body class="inner-page"><div class="noise" aria-hidden="true"></div>
    <header class="header header--solid" data-header><div class="container header__inner"><a class="logo" href="../">{logo()}</a><nav class="nav"><a href="../#services">Услуги</a><a href="./">Цены</a><a href="../#benefits">Преимущества</a><a href="../#process">Этапы</a><a href="#faq">Вопросы</a></nav><a class="button button--small" href="#contact">Бесплатный замер <span class="icon" aria-hidden="true"></span></a><button class="menu" type="button" aria-label="Открыть меню" aria-expanded="false" data-menu><span></span><span></span></button></div><div class="mobile-nav" data-mobile-nav><a href="../#services">Услуги</a><a href="./">Цены</a><a href="#faq">Вопросы</a><a class="button" href="#contact">Получить расчёт <span class="icon" aria-hidden="true"></span></a></div></header>
    <main><section class="prices-hero"><div class="container"><nav class="breadcrumbs"><a href="../">Главная</a><span>›</span><span>Цены</span></nav><div class="eyebrow"><span></span> Актуальные ориентиры</div><h1>Цены на штукатурные работы в Минске</h1><p>Показываем базовые ставки без выдуманной «точной цены» до осмотра. После бесплатного замера вы получите смету с объёмами, материалами и сроками.</p><a class="button button--accent" href="#contact" data-cta="prices">Рассчитать мой объект <span class="icon" aria-hidden="true"></span></a></div></section>
    <section class="section"><div class="container"><div class="price-table-wrap"><table class="price-table"><thead><tr><th>Услуга</th><th>Стоимость работ</th><th></th></tr></thead><tbody>{table}</tbody></table></div><p class="table-note">Цены являются ориентировочными и не являются публичной офертой. Итоговая стоимость зависит от фактического состояния объекта и фиксируется в смете.</p></div></section>
    <section class="section price-factors"><div class="container content-grid"><div><span class="section-num">01</span><span class="eyebrow">Прозрачный расчёт</span></div><article class="seo-copy"><h2>Из чего складывается смета</h2><p>Мастер измеряет площадь и перепады, проверяет основание, считает откосы и сложные участки. Отдельно указываются работы и материалы. Вы видите итог до старта и можете принять решение без скрытых доплат.</p><ul class="check-list"><li>площадь и геометрия стен</li><li>толщина штукатурного слоя</li><li>требуемый уровень финишной подготовки</li><li>высота, откосы и сложные примыкания</li></ul></article></div></section>
    <section class="section faq" id="faq"><div class="container faq__grid"><div class="faq__title reveal"><span class="section-num">02</span><span class="eyebrow">Вопросы о цене</span><h2>До начала работ</h2><p>Все финансовые условия согласовываются заранее.</p></div><div class="accordion">{faqs}</div></div></section>
    <section class="contact" id="contact"><div class="container contact__grid"><div class="contact__copy reveal"><span class="eyebrow">Бесплатный замер</span><h2>Получите точную смету</h2><p>Укажите телефон и нужную услугу. Свяжемся, уточним объект и согласуем удобное время.</p></div><form class="form reveal" data-lead-form novalidate><div class="form__row"><label>Ваше имя<input name="name" placeholder="Например, Александр" minlength="2" maxlength="60" required></label><label>Телефон<input type="tel" name="phone" placeholder="+375 (__) ___-__-__" maxlength="30" inputmode="tel" required></label></div><label>Услуга<select name="service"><option>Механизированная штукатурка</option><option>Шпатлёвка стен</option><option>Штукатурка потолков</option><option>Комплексная подготовка</option><option>Ремонт квартиры под ключ</option></select></label><label>Комментарий <span>(необязательно)</span><textarea name="message" rows="3" maxlength="500" placeholder="Площадь и тип помещения"></textarea></label><input class="form__trap" name="website" tabindex="-1" autocomplete="off"><button class="button button--accent" type="submit">Получить смету <span class="icon" aria-hidden="true"></span></button><p class="form__legal">Нажимая кнопку, вы соглашаетесь на обработку данных для связи по заявке.</p><div class="form__status" data-form-status aria-live="polite"></div></form></div></section></main>
    <footer class="footer"><div class="container footer__top"><a class="logo logo--light" href="../">{logo()}</a><div class="footer__links"><a href="../#services">Услуги</a><a href="./">Цены</a><a href="../#benefits">О нас</a><a href="#faq">Вопросы</a></div><a class="button button--outline" href="#contact">Оставить заявку <span class="icon" aria-hidden="true"></span></a></div><div class="container footer__bottom"><span>© 2026 РОВНО. Минск и Минская область.</span><span>Штукатурка и отделочные работы</span></div></footer><a class="mobile-cta" href="#contact" aria-label="Рассчитать стоимость работ">Рассчитать стоимость <span class="icon" aria-hidden="true"></span></a><script src="../analytics.js?v=20261002-1" defer></script><script src="../script.js?v=20261006-1" defer></script></body></html>'''

for page in PAGES:
    out = ROOT / page["path"] / "index.html"
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(page_html(page), encoding="utf-8")

prices = ROOT / "ceny" / "index.html"
prices.parent.mkdir(parents=True, exist_ok=True)
prices.write_text(prices_html(), encoding="utf-8")
