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

  const mobileCta = document.querySelector(".mobile-cta");
  const contactSection = document.querySelector("#contact");
  if (mobileCta && contactSection && "IntersectionObserver" in window) {
    const ctaObserver = new IntersectionObserver(([entry]) => {
      mobileCta.classList.toggle("is-hidden", entry.isIntersecting);
    }, { threshold: 0.08 });
    ctaObserver.observe(contactSection);
  }

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

  const closeCustomSelects = (except = null) => {
    document.querySelectorAll(".custom-select.is-open").forEach((customSelect) => {
      if (customSelect === except) return;
      customSelect.classList.remove("is-open");
      customSelect.querySelector(".custom-select__trigger")?.setAttribute("aria-expanded", "false");
    });
  };

  document.querySelectorAll(".form select").forEach((select, selectIndex) => {
    const customSelect = document.createElement("div");
    const trigger = document.createElement("button");
    const value = document.createElement("span");
    const menu = document.createElement("div");
    const menuId = `service-options-${selectIndex}`;

    customSelect.className = "custom-select";
    trigger.type = "button";
    trigger.className = "custom-select__trigger";
    trigger.setAttribute("aria-haspopup", "listbox");
    trigger.setAttribute("aria-expanded", "false");
    trigger.setAttribute("aria-controls", menuId);
    value.className = "custom-select__value";
    value.textContent = select.options[select.selectedIndex]?.textContent || "Выберите услугу";
    trigger.append(value);
    trigger.insertAdjacentHTML("beforeend", '<span class="custom-select__chevron" aria-hidden="true"></span>');

    menu.className = "custom-select__menu";
    menu.id = menuId;
    menu.setAttribute("role", "listbox");
    Array.from(select.options).forEach((option, optionIndex) => {
      const item = document.createElement("button");
      item.type = "button";
      item.className = "custom-select__option";
      item.textContent = option.textContent;
      item.setAttribute("role", "option");
      item.setAttribute("aria-selected", String(option.selected));
      item.addEventListener("click", () => {
        select.selectedIndex = optionIndex;
        value.textContent = option.textContent;
        menu.querySelectorAll(".custom-select__option").forEach((menuItem, index) => {
          menuItem.setAttribute("aria-selected", String(index === optionIndex));
        });
        select.dispatchEvent(new Event("change", { bubbles: true }));
        closeCustomSelects();
        trigger.focus();
      });
      menu.append(item);
    });

    select.parentNode.insertBefore(customSelect, select);
    select.classList.add("custom-select__native");
    select.setAttribute("aria-hidden", "true");
    select.tabIndex = -1;
    customSelect.append(select, trigger, menu);

    select.form?.addEventListener("reset", () => {
      requestAnimationFrame(() => {
        const selectedIndex = select.selectedIndex;
        value.textContent = select.options[selectedIndex]?.textContent || "Выберите услугу";
        menu.querySelectorAll(".custom-select__option").forEach((menuItem, index) => {
          menuItem.setAttribute("aria-selected", String(index === selectedIndex));
        });
      });
    });

    trigger.addEventListener("click", (event) => {
      event.stopPropagation();
      const willOpen = !customSelect.classList.contains("is-open");
      closeCustomSelects(customSelect);
      customSelect.classList.toggle("is-open", willOpen);
      trigger.setAttribute("aria-expanded", String(willOpen));
    });
    trigger.addEventListener("keydown", (event) => {
      if (!["ArrowDown", "Enter", " "].includes(event.key)) return;
      event.preventDefault();
      customSelect.classList.add("is-open");
      trigger.setAttribute("aria-expanded", "true");
      menu.querySelector('[aria-selected="true"]')?.focus();
    });
    menu.addEventListener("keydown", (event) => {
      const options = Array.from(menu.querySelectorAll(".custom-select__option"));
      const current = options.indexOf(document.activeElement);
      if (event.key === "ArrowDown") {
        event.preventDefault();
        options[(current + 1) % options.length]?.focus();
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        options[(current - 1 + options.length) % options.length]?.focus();
      } else if (event.key === "Escape") {
        closeCustomSelects();
        trigger.focus();
      }
    });
  });
  document.addEventListener("click", () => closeCustomSelects());

  const form = document.querySelector("[data-lead-form]");
  const status = document.querySelector("[data-form-status]");
  const submitButton = form?.querySelector("button[type='submit']");
  const phoneInput = form?.querySelector("input[name='phone']");
  if (phoneInput) {
    const phoneControl = document.createElement("span");
    const phonePrefix = document.createElement("span");
    phoneControl.className = "phone-control";
    phonePrefix.className = "phone-control__prefix";
    phonePrefix.textContent = "+375";
    phoneInput.parentNode.insertBefore(phoneControl, phoneInput);
    phoneControl.append(phonePrefix, phoneInput);
    phoneInput.placeholder = "29 123 45 67";
    phoneInput.maxLength = 9;
    phoneInput.inputMode = "numeric";
    phoneInput.autocomplete = "tel-national";
    phoneInput.setAttribute("aria-label", "Номер телефона после +375");
  }
  let formStarted = false;
  form?.addEventListener("focusin", () => {
    if (formStarted) return;
    formStarted = true;
    trackGoal("form_start", { page: location.pathname });
  });

  phoneInput?.addEventListener("input", () => {
    let digits = phoneInput.value.replace(/\D/g, "");
    if (digits.startsWith("375")) digits = digits.slice(3);
    digits = digits.slice(0, 9);
    if (phoneInput.value !== digits) phoneInput.value = digits;
  });

  const setStatus = (message, type = "") => {
    if (!status) return;
    status.textContent = message;
    status.className = `form__status${type ? ` is-${type}` : ""}`;
  };

  const leadResult = new URLSearchParams(window.location.search).get("lead");
  if (leadResult) {
    const resultMessages = {
      success: ["Спасибо! Заявка отправлена. Скоро с вами свяжемся.", "success"],
      validation_failed: ["Проверьте имя и номер телефона.", "error"],
      delivery_failed: ["Заявка не доставлена. Попробуйте ещё раз через минуту.", "error"],
      service_not_configured: ["Сервис заявок временно недоступен. Попробуйте чуть позже.", "error"]
    };
    const [message, type] = resultMessages[leadResult] || ["Не удалось подтвердить отправку заявки.", "error"];
    setStatus(message, type);
    if (leadResult === "success") trackGoal("lead_sent", { page: location.pathname, ...attribution });
    const cleanUrl = new URL(window.location.href);
    cleanUrl.searchParams.delete("lead");
    history.replaceState(null, "", `${cleanUrl.pathname}${cleanUrl.search}${cleanUrl.hash}`);
  }

  form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    setStatus("");

    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || "").trim(),
      phone: "",
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
    const localPhone = String(data.get("phone") || "").replace(/\D/g, "").slice(0, 9);
    if (localPhone.length !== 9) {
      setStatus("Введите 9 цифр номера после +375.", "error");
      phoneInput?.focus();
      return;
    }
    payload.phone = `+375 (${localPhone.slice(0, 2)}) ${localPhone.slice(2, 5)}-${localPhone.slice(5, 7)}-${localPhone.slice(7, 9)}`;

    submitButton.disabled = true;
    submitButton.firstChild.textContent = "Отправляем… ";

    const returnUrl = new URL(window.location.href);
    returnUrl.searchParams.delete("lead");
    returnUrl.hash = "contact";
    const transport = document.createElement("form");
    transport.method = "POST";
    transport.action = API_ENDPOINT;
    transport.hidden = true;
    [["payload", JSON.stringify(payload)], ["return_to", returnUrl.toString()]].forEach(([name, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      input.value = value;
      transport.append(input);
    });
    document.body.append(transport);
    transport.submit();
  });
})();
