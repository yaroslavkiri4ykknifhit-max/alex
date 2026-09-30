(() => {
  "use strict";

  const API_ENDPOINT = "https://rovno-leads-minsk.cherelle397.chatgpt.site/api/lead";
  const header = document.querySelector("[data-header]");
  const menuButton = document.querySelector("[data-menu]");
  const mobileNav = document.querySelector("[data-mobile-nav]");
  const ATTRIBUTION_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "yclid", "gclid"];

  const saveAttribution = () => {
    const params = new URLSearchParams(window.location.search);
    let stored = {};
    try { stored = JSON.parse(sessionStorage.getItem("rovno_attribution") || "{}"); } catch { stored = {}; }
    ATTRIBUTION_KEYS.forEach((key) => {
      const value = params.get(key);
      if (value) stored[key] = value.slice(0, 200);
    });
    if (!stored.landing_page) stored.landing_page = window.location.href.slice(0, 500);
    if (!stored.referrer && document.referrer) stored.referrer = document.referrer.slice(0, 500);
    try { sessionStorage.setItem("rovno_attribution", JSON.stringify(stored)); } catch { /* Private mode may block storage. */ }
    return stored;
  };

  const attribution = saveAttribution();
  window.dataLayer = window.dataLayer || [];
  const trackGoal = (goal, params = {}) => {
    window.dataLayer.push({ event: goal, ...params });
    const metricaId = Number(window.ROVNO_METRICA_ID || 0);
    if (metricaId && typeof window.ym === "function") window.ym(metricaId, "reachGoal", goal, params);
  };

  let lastY = window.scrollY;
  let ticking = false;
  const updateHeader = () => {
    const y = window.scrollY;
    header?.classList.toggle("is-scrolled", y > 24);
    header?.classList.toggle("is-hidden", y > 170 && y > lastY && !mobileNav?.classList.contains("is-open"));
    lastY = y;
    ticking = false;
  };

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });

  const closeMenu = () => {
    menuButton?.setAttribute("aria-expanded", "false");
    mobileNav?.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  };

  menuButton?.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") !== "true";
    menuButton.setAttribute("aria-expanded", String(open));
    mobileNav?.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
  });
  mobileNav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

  document.querySelectorAll("[data-cta], a[href='#contact'], a[href$='#contact']").forEach((link) => {
    link.addEventListener("click", () => trackGoal("cta_click", { cta: link.textContent.trim().slice(0, 80), page: location.pathname }));
  });

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -35px" });
    revealItems.forEach((item, index) => {
      item.style.transitionDelay = `${Math.min(index % 5, 3) * 60}ms`;
      observer.observe(item);
    });
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  const area = document.querySelector("[data-area]");
  const areaOutput = document.querySelector("[data-area-output]");
  const priceOutput = document.querySelector("[data-price]");
  const updateEstimate = () => {
    const value = Number(area?.value || 100);
    if (areaOutput) areaOutput.textContent = `${value} м²`;
    if (priceOutput) priceOutput.textContent = `от ${(value * 18).toLocaleString("ru-RU")} BYN`;
  };
  area?.addEventListener("input", updateEstimate);
  updateEstimate();

  document.querySelectorAll(".accordion details").forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) return;
      document.querySelectorAll(".accordion details[open]").forEach((other) => {
        if (other !== item) other.open = false;
      });
    });
  });

  const form = document.querySelector("[data-lead-form]");
  const status = document.querySelector("[data-form-status]");
  const submitButton = form?.querySelector("button[type='submit']");
  const phoneInput = form?.querySelector("input[name='phone']");
  let formStarted = false;
  form?.addEventListener("focusin", () => {
    if (formStarted) return;
    formStarted = true;
    trackGoal("form_start", { page: location.pathname });
  });

  phoneInput?.addEventListener("input", () => {
    const raw = phoneInput.value.replace(/\D/g, "").slice(0, 12);
    let digits = raw;
    if (digits.startsWith("375")) digits = digits.slice(3);
    if (!digits) return;
    const parts = [digits.slice(0, 2), digits.slice(2, 5), digits.slice(5, 7), digits.slice(7, 9)];
    phoneInput.value = `+375 (${parts[0]}${parts[0].length === 2 ? ")" : ""}${parts[1] ? ` ${parts[1]}` : ""}${parts[2] ? `-${parts[2]}` : ""}${parts[3] ? `-${parts[3]}` : ""}`;
  });

  const setStatus = (message, type = "") => {
    if (!status) return;
    status.textContent = message;
    status.className = `form__status${type ? ` is-${type}` : ""}`;
  };

  form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    setStatus("");

    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      service: String(data.get("service") || "").trim(),
      message: String(data.get("message") || "").trim(),
      website: String(data.get("website") || "").trim(),
      page: window.location.href,
      sentAt: new Date().toISOString(),
      attribution
    };

    if (payload.name.length < 2) {
      setStatus("Введите имя — минимум 2 символа.", "error");
      return;
    }
    if (payload.phone.replace(/\D/g, "").length < 9) {
      setStatus("Проверьте номер телефона.", "error");
      return;
    }

    submitButton.disabled = true;
    submitButton.firstChild.textContent = "Отправляем… ";

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.ok) throw new Error(result.error || "request_failed");

      form.reset();
      setStatus("Спасибо! Заявка отправлена. Скоро с вами свяжемся.", "success");
      trackGoal("lead_sent", { service: payload.service, page: location.pathname, ...attribution });
    } catch (error) {
      setStatus("Не удалось отправить заявку. Проверьте интернет и попробуйте ещё раз.", "error");
    } finally {
      submitButton.disabled = false;
      submitButton.firstChild.textContent = "Получить расчёт ";
    }
  });
})();
