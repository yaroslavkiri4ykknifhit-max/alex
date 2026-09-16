(() => {
  "use strict";

  const SELECTORS = {
    loader: "[data-loader]",
    loaderProgress: "[data-loader-progress]",
    header: "[data-header]",
    menuToggle: "[data-menu-toggle]",
    mobileMenu: "[data-mobile-menu]",
    heroParallax: "[data-hero-parallax]",
    revealSections: "[data-reveal-section]",
    revealItems: ".reveal-item",
    process: "[data-process]",
    processProgress: "[data-process-progress]",
    processSteps: "[data-step]",
    contactForm: "[data-contact-form]",
    formStatus: "[data-form-status]",
    cursor: "[data-cursor]"
  };

  const qs = (selector, root = document) => root.querySelector(selector);
  const qsa = (selector, root = document) => [...root.querySelectorAll(selector)];

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function initLoader() {
    const loader = qs(SELECTORS.loader);
    const progress = qs(SELECTORS.loaderProgress);

    if (!loader || !progress) return Promise.resolve();

    document.body.classList.add("is-locked");

    return new Promise((resolve) => {
      const start = performance.now();
      const duration = prefersReducedMotion ? 120 : 900;

      const tick = (now) => {
        const ratio = Math.min(1, (now - start) / duration);
        progress.style.width = `${ratio * 100}%`;
        if (ratio < 1) {
          requestAnimationFrame(tick);
          return;
        }

        const finish = () => {
          loader.remove();
          document.body.classList.remove("is-locked");
          resolve();
        };

        if (prefersReducedMotion || typeof gsap === "undefined") {
          finish();
          return;
        }

        gsap.timeline({
          onComplete: finish
        })
          .to(loader, { yPercent: -100, duration: 1, ease: "power4.inOut" })
          .fromTo(".hero-bg", { scale: 1.08 }, { scale: 1.0, duration: 1.65, ease: "power3.out" }, "<");
      };

      requestAnimationFrame(tick);
    });
  }

  function initMenu() {
    const toggle = qs(SELECTORS.menuToggle);
    const menu = qs(SELECTORS.mobileMenu);
    if (!toggle || !menu) return;

    const closeMenu = () => {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    };

    toggle.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    qsa("a", menu).forEach((link) => link.addEventListener("click", closeMenu));

    window.addEventListener("resize", () => {
      if (window.innerWidth > 1180) closeMenu();
    }, { passive: true });
  }

  function initSmoothScroll() {
    if (prefersReducedMotion || typeof Lenis === "undefined" || typeof gsap === "undefined") {
      return null;
    }

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 0.9,
      lerp: 0.09
    });

    lenis.on("scroll", () => {
      if (typeof ScrollTrigger !== "undefined") ScrollTrigger.update();
    });

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    window.__lenis = lenis;
    return lenis;
  }

  function initHeaderBehavior() {
    const header = qs(SELECTORS.header);
    if (!header) return;

    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;

      header.classList.toggle("scrolled", y > 30);

      if (y > lastY && y > 140) {
        header.classList.add("hidden");
      } else if (y < lastY) {
        header.classList.remove("hidden");
      }

      if (y < 30) header.classList.remove("hidden");

      lastY = y;
      ticking = false;
    };

    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
  }

  function initMagneticButtons() {
    if (prefersReducedMotion || window.matchMedia("(pointer: coarse)").matches || typeof gsap === "undefined") return;

    qsa(".magnetic").forEach((element) => {
      const strength = element.classList.contains("btn") ? 0.22 : 0.12;

      element.addEventListener("pointermove", (event) => {
        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;

        gsap.to(element, {
          x: x * strength,
          y: y * strength,
          duration: .35,
          ease: "power3.out",
          overwrite: true
        });
      });

      element.addEventListener("pointerleave", () => {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: .5,
          ease: "elastic.out(1, .55)"
        });
      });
    });
  }

  function initCursor() {
    const cursor = qs(SELECTORS.cursor);
    if (!cursor || prefersReducedMotion || window.matchMedia("(pointer: coarse)").matches || typeof gsap === "undefined") return;

    const x = gsap.quickTo(cursor, "x", { duration: .22, ease: "power3.out" });
    const y = gsap.quickTo(cursor, "y", { duration: .22, ease: "power3.out" });

    window.addEventListener("pointermove", (event) => {
      x(event.clientX);
      y(event.clientY);
    }, { passive: true });

    qsa("a, button").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        gsap.to(cursor, { scale: 1.55, duration: .25, ease: "power2.out" });
      });
      el.addEventListener("mouseleave", () => {
        gsap.to(cursor, { scale: 1, duration: .25, ease: "power2.out" });
      });
    });
  }

  function initHeroAnimations() {
    if (prefersReducedMotion || typeof gsap === "undefined") return;

    const heroTl = gsap.timeline({ defaults: { ease: "power4.out" } });

    heroTl
      .to(".hero-title .line", {
        y: "0%",
        duration: 1.15,
        stagger: .14,
        delay: .15
      })
      .from(".hero-reveal", {
        y: 24,
        opacity: 0,
        duration: .85,
        stagger: .09
      }, "-=.75")
      .from(".hero-price", {
        y: 25,
        opacity: 0,
        duration: .8
      }, "-=.7")
      .from(".hero-note", {
        y: 18,
        opacity: 0,
        rotation: 0,
        duration: .8
      }, "-=.65");

    const heroBg = qs(SELECTORS.heroParallax);
    if (heroBg) {
      const heroSection = heroBg.closest(".hero");
      gsap.to(heroBg, {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: heroSection,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      if (window.matchMedia("(pointer: fine)").matches) {
        let targetX = 0;
        let targetY = 0;

        window.addEventListener("pointermove", (event) => {
          const px = event.clientX / window.innerWidth - 0.5;
          const py = event.clientY / window.innerHeight - 0.5;
          targetX = px * 18;
          targetY = py * 14;
        }, { passive: true });

        gsap.ticker.add(() => {
          gsap.to(heroBg, {
            x: targetX,
            y: targetY,
            duration: .8,
            ease: "power3.out",
            overwrite: "auto"
          });
        });
      }
    }
  }

  function initScrollReveal() {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

    qsa(SELECTORS.revealSections).forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 78%",
        onEnter: () => section.classList.add("is-visible"),
        once: true
      });

      qsa(SELECTORS.revealItems, section).forEach((item, index) => {
        gsap.to(item, {
          y: 0,
          opacity: 1,
          duration: .9,
          delay: Math.min(index * .06, .4),
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 88%",
            once: true
          }
        });
      });
    });
  }

  function initProcess() {
    const process = qs(SELECTORS.process);
    const progress = qs(SELECTORS.processProgress);
    const steps = qsa(SELECTORS.processSteps);

    if (!process || !progress || !steps.length || typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

    const updateStepStates = (progressValue) => {
      const activeIndex = Math.min(
        steps.length - 1,
        Math.max(0, Math.round(progressValue * (steps.length - 1)))
      );

      steps.forEach((step, index) => {
        const active = index <= activeIndex;
        step.classList.toggle("active", active);

        if (active) {
          const dot = qs(".step-dot", step);
          if (dot) {
            gsap.fromTo(dot,
              { scale: .86 },
              { scale: 1.12, duration: .38, yoyo: true, repeat: 1, ease: "back.out(2)" }
            );
          }
        }
      });
    };

    const proxy = { progress: 0 };

    gsap.to(proxy, {
      progress: 1,
      ease: "none",
      scrollTrigger: {
        trigger: process,
        start: "top 74%",
        end: "bottom 68%",
        scrub: .35,
        onUpdate: (self) => {
          progress.style.width = `${self.progress * 100}%`;
          updateStepStates(self.progress);
        }
      }
    });
  }

  function initPortfolioParallax() {
    if (prefersReducedMotion || typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

    qsa(".parallax-wrap").forEach((wrap) => {
      const image = qs(".parallax-image", wrap);
      if (!image) return;

      gsap.fromTo(image,
        { yPercent: -4 },
        {
          yPercent: 7,
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );
    });
  }

  function initSwiper() {
    if (typeof Swiper === "undefined") return;

    new Swiper(".reviews-swiper", {
      slidesPerView: 1.08,
      spaceBetween: 12,
      speed: 800,
      grabCursor: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      breakpoints: {
        700: {
          slidesPerView: 2,
          spaceBetween: 14
        },
        1050: {
          slidesPerView: 3,
          spaceBetween: 14
        }
      }
    });
  }

  function initFilters() {
    const filters = qsa(".filter");
    filters.forEach((button) => {
      button.addEventListener("click", () => {
        filters.forEach((item) => item.classList.remove("active"));
        button.classList.add("active");
      });
    });
  }

  function initContactForm() {
    const form = qs(SELECTORS.contactForm);
    const status = qs(SELECTORS.formStatus);
    if (!form || !status) return;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      status.className = "form-status";

      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const phone = String(data.get("phone") || "").trim();

      if (name.length < 2) {
        status.textContent = "Введите имя минимум из 2 символов.";
        status.classList.add("is-error");
        return;
      }

      const digits = phone.replace(/\D/g, "");
      if (digits.length < 9) {
        status.textContent = "Проверьте номер телефона.";
        status.classList.add("is-error");
        return;
      }

      status.textContent = "Заявка подготовлена. Подключите обработчик формы к CRM / API перед продакшеном.";
      status.classList.add("is-success");
      form.reset();
    });
  }

  async function init() {
    const lenis = initSmoothScroll();
    initMenu();
    initHeaderBehavior();
    initMagneticButtons();
    initCursor();
    initSwiper();
    initFilters();
    initContactForm();

    await initLoader();

    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
      initHeroAnimations();
      initScrollReveal();
      initProcess();
      initPortfolioParallax();
      ScrollTrigger.refresh();
    }

    if (lenis) {
      requestAnimationFrame(() => lenis.resize());
    }
  }

  document.addEventListener("DOMContentLoaded", init, { once: true });
})();
