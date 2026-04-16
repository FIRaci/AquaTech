(() => {
  window.__AQUATECH_MAIN_LOADED = true;

  const body = document.body;
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("nav-links");
  const progressBar = document.getElementById("scroll-progress-bar");
  const yearLabel = document.getElementById("year");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (yearLabel) {
    yearLabel.textContent = String(new Date().getFullYear());
  }

  const closeMenu = () => {
    if (!navToggle || !navLinks) {
      return;
    }

    navToggle.setAttribute("aria-expanded", "false");
    navLinks.classList.remove("is-open");
    body.classList.remove("nav-open");
  };

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      const nextState = !expanded;

      navToggle.setAttribute("aria-expanded", String(nextState));
      navLinks.classList.toggle("is-open", nextState);
      body.classList.toggle("nav-open", nextState);
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 860) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });
  }

  const updateProgressBar = () => {
    if (!progressBar) {
      return;
    }

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? window.scrollY / docHeight : 0;
    progressBar.style.transform = `scaleX(${progress})`;
  };

  let ticking = false;
  const onScroll = () => {
    if (ticking) {
      return;
    }

    ticking = true;
    window.requestAnimationFrame(() => {
      updateProgressBar();
      ticking = false;
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  updateProgressBar();

  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) {
        return;
      }

      faqItems.forEach((other) => {
        if (other !== item) {
          other.open = false;
        }
      });
    });
  });

  if (prefersReducedMotion) {
    return;
  }

  const gsapGlobal = window.gsap;
  const scrollTriggerGlobal = window.ScrollTrigger;

  if (!gsapGlobal || !scrollTriggerGlobal) {
    return;
  }

  gsapGlobal.registerPlugin(scrollTriggerGlobal);

  gsapGlobal.from(".site-header", {
    y: -60,
    autoAlpha: 0,
    duration: 0.7,
    ease: "power2.out",
  });

  gsapGlobal.from("[data-hero]", {
    y: 28,
    autoAlpha: 0,
    duration: 0.82,
    stagger: 0.14,
    ease: "power3.out",
  });

  const revealTargets = gsapGlobal.utils.toArray("[data-animate]");
  revealTargets.forEach((element) => {
    gsapGlobal.from(element, {
      y: 32,
      autoAlpha: 0,
      duration: 0.72,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: "top 88%",
        once: true,
      },
    });
  });

  document.querySelectorAll("[data-count]").forEach((counterElement) => {
    const target = Number(counterElement.getAttribute("data-count") || "0");
    const suffix = counterElement.getAttribute("data-suffix") || "";

    counterElement.textContent = `${target}${suffix}`;

    scrollTriggerGlobal.create({
      trigger: counterElement,
      start: "top 90%",
      once: true,
      onEnter: () => {
        const state = { value: target * 0.18 };

        gsapGlobal.to(state, {
          value: target,
          duration: 1.5,
          ease: "power2.out",
          onUpdate: () => {
            counterElement.textContent = `${Math.round(state.value)}${suffix}`;
          },
          onComplete: () => {
            counterElement.textContent = `${target}${suffix}`;
          },
        });
      },
    });
  });

  const timelineTrack = document.querySelector(".timeline-track");
  if (timelineTrack) {
    gsapGlobal.from(timelineTrack, {
      scaleY: 0,
      transformOrigin: "top center",
      ease: "none",
      scrollTrigger: {
        trigger: "#process",
        start: "top 72%",
        end: "bottom 36%",
        scrub: 0.4,
      },
    });
  }

  scrollTriggerGlobal.refresh();
})();
