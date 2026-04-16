const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const randomBetween = (min, max) => min + Math.random() * (max - min);

const initBubbleField = (canvas, prefersReducedMotion) => {
  const context = canvas.getContext("2d", { alpha: true, desynchronized: true });
  if (!context) {
    return;
  }

  const state = {
    width: 0,
    height: 0,
    dpr: 1,
    bubbles: [],
    pointer: {
      active: false,
      x: 0,
      y: 0,
      force: 0,
    },
    lastFrame: performance.now(),
  };

  const settings = {
    density: prefersReducedMotion ? 0.000024 : 0.000055,
    minRadius: prefersReducedMotion ? 10 : 9,
    maxRadius: prefersReducedMotion ? 24 : 34,
    friction: 0.994,
    buoyancy: prefersReducedMotion ? -0.003 : -0.008,
    mouseRadius: prefersReducedMotion ? 44 : 32,
    mousePush: prefersReducedMotion ? 0.48 : 1.35,
    maxSpeed: 2.2,
    restitution: 0.86,
  };

  const createBubble = (x = Math.random() * state.width, y = Math.random() * state.height) => {
    const radius = randomBetween(settings.minRadius, settings.maxRadius);
    return {
      x,
      y,
      radius,
      vx: randomBetween(-0.38, 0.38),
      vy: randomBetween(-0.3, 0.18),
      wobbleSeed: Math.random() * Math.PI * 2,
      tint: randomBetween(0.58, 1),
      mass: radius * radius * 0.015,
    };
  };

  const syncBubbleCount = () => {
    const targetCount = Math.max(18, Math.round(state.width * state.height * settings.density));

    while (state.bubbles.length < targetCount) {
      state.bubbles.push(createBubble());
    }

    if (state.bubbles.length > targetCount) {
      state.bubbles.length = targetCount;
    }
  };

  const resize = () => {
    state.dpr = Math.min(window.devicePixelRatio || 1, 2);
    state.width = Math.max(window.innerWidth, 320);
    state.height = Math.max(window.innerHeight, 320);
    canvas.width = Math.floor(state.width * state.dpr);
    canvas.height = Math.floor(state.height * state.dpr);
    canvas.style.width = `${state.width}px`;
    canvas.style.height = `${state.height}px`;
    context.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
    syncBubbleCount();
  };

  const resolveBubbleCollisions = () => {
    for (let i = 0; i < state.bubbles.length; i += 1) {
      const bubbleA = state.bubbles[i];

      for (let j = i + 1; j < state.bubbles.length; j += 1) {
        const bubbleB = state.bubbles[j];
        const dx = bubbleB.x - bubbleA.x;
        const dy = bubbleB.y - bubbleA.y;
        const distanceSquared = dx * dx + dy * dy;
        const minDistance = bubbleA.radius + bubbleB.radius;

        if (distanceSquared === 0 || distanceSquared >= minDistance * minDistance) {
          continue;
        }

        const distance = Math.sqrt(distanceSquared);
        const nx = dx / distance;
        const ny = dy / distance;
        const overlap = minDistance - distance;

        bubbleA.x -= nx * overlap * 0.5;
        bubbleA.y -= ny * overlap * 0.5;
        bubbleB.x += nx * overlap * 0.5;
        bubbleB.y += ny * overlap * 0.5;

        const relativeVx = bubbleB.vx - bubbleA.vx;
        const relativeVy = bubbleB.vy - bubbleA.vy;
        const velocityAlongNormal = relativeVx * nx + relativeVy * ny;

        if (velocityAlongNormal > 0) {
          continue;
        }

        const restitution = 0.84;
        const inverseMassA = 1 / bubbleA.mass;
        const inverseMassB = 1 / bubbleB.mass;
        const impulse = -(1 + restitution) * velocityAlongNormal / (inverseMassA + inverseMassB);
        const impulseX = impulse * nx;
        const impulseY = impulse * ny;

        bubbleA.vx -= impulseX * inverseMassA;
        bubbleA.vy -= impulseY * inverseMassA;
        bubbleB.vx += impulseX * inverseMassB;
        bubbleB.vy += impulseY * inverseMassB;
      }
    }
  };

  const applyPointerForce = (bubble, dt) => {
    if (!state.pointer.active || prefersReducedMotion) {
      return;
    }

    const dx = bubble.x - state.pointer.x;
    const dy = bubble.y - state.pointer.y;
    const distanceSquared = dx * dx + dy * dy;
    const radius = settings.mouseRadius + bubble.radius;

    if (distanceSquared <= 0 || distanceSquared >= radius * radius) {
      return;
    }

    const distance = Math.sqrt(distanceSquared);
    const influence = 1 - distance / radius;
    const nearOnly = influence * influence * influence;
    const push = settings.mousePush * nearOnly * (1 + state.pointer.force * 0.55);
    const nx = dx / distance;
    const ny = dy / distance;

    bubble.vx += nx * push * dt * 8;
    bubble.vy += ny * push * dt * 8;
  };

  const updateBubbles = (dt, now) => {
    state.bubbles.forEach((bubble) => {
      const wobble = Math.sin(now * 0.0012 + bubble.wobbleSeed) * 0.012;
      bubble.vx += wobble * dt;
      bubble.vy += settings.buoyancy * dt;

      applyPointerForce(bubble, dt);

      bubble.vx *= settings.friction;
      bubble.vy *= settings.friction;

      bubble.vx = clamp(bubble.vx, -settings.maxSpeed, settings.maxSpeed);
      bubble.vy = clamp(bubble.vy, -settings.maxSpeed, settings.maxSpeed);

      bubble.x += bubble.vx * dt * 1.2;
      bubble.y += bubble.vy * dt * 1.2;

      if (bubble.x - bubble.radius < 0) {
        bubble.x = bubble.radius;
        bubble.vx *= -settings.restitution;
      } else if (bubble.x + bubble.radius > state.width) {
        bubble.x = state.width - bubble.radius;
        bubble.vx *= -settings.restitution;
      }

      if (bubble.y - bubble.radius < 0) {
        bubble.y = bubble.radius;
        bubble.vy *= -settings.restitution;
      } else if (bubble.y + bubble.radius > state.height) {
        bubble.y = state.height - bubble.radius;
        bubble.vy *= -settings.restitution;
      }
    });

    resolveBubbleCollisions();
  };

  const drawBackgroundGlow = () => {
    const gradient = context.createRadialGradient(
      state.width * 0.74,
      state.height * 0.22,
      20,
      state.width * 0.52,
      state.height * 0.62,
      state.width * 0.8,
    );
    gradient.addColorStop(0, "rgba(186, 240, 255, 0.1)");
    gradient.addColorStop(0.56, "rgba(150, 225, 250, 0.035)");
    gradient.addColorStop(1, "rgba(150, 225, 250, 0)");
    context.fillStyle = gradient;
    context.fillRect(0, 0, state.width, state.height);
  };

  const drawBubbles = (now) => {
    context.clearRect(0, 0, state.width, state.height);
    drawBackgroundGlow();

    state.bubbles.forEach((bubble) => {
      const breathe = 1 + Math.sin(now * 0.001 + bubble.wobbleSeed) * 0.045;
      const radius = bubble.radius * breathe;

      const fillGradient = context.createRadialGradient(
        bubble.x - radius * 0.42,
        bubble.y - radius * 0.42,
        radius * 0.24,
        bubble.x,
        bubble.y,
        radius,
      );
      fillGradient.addColorStop(0, `rgba(255, 255, 255, ${0.74 * bubble.tint})`);
      fillGradient.addColorStop(0.45, `rgba(171, 236, 255, ${0.5 * bubble.tint})`);
      fillGradient.addColorStop(1, `rgba(137, 219, 250, ${0.23 * bubble.tint})`);

      context.beginPath();
      context.fillStyle = fillGradient;
      context.arc(bubble.x, bubble.y, radius, 0, Math.PI * 2);
      context.fill();

      context.beginPath();
      context.strokeStyle = `rgba(221, 248, 255, ${0.62 * bubble.tint})`;
      context.lineWidth = 1.25;
      context.arc(bubble.x, bubble.y, radius, 0, Math.PI * 2);
      context.stroke();

      context.beginPath();
      context.fillStyle = `rgba(255, 255, 255, ${0.42 * bubble.tint})`;
      context.arc(
        bubble.x - radius * 0.34,
        bubble.y - radius * 0.36,
        radius * 0.2,
        0,
        Math.PI * 2,
      );
      context.fill();
    });
  };

  const animate = (now) => {
    const dt = Math.min((now - state.lastFrame) / 16.666, 2.3);
    state.lastFrame = now;

    updateBubbles(dt, now);
    drawBubbles(now);

    if (state.pointer.active) {
      state.pointer.force *= 0.92;
    }

    window.requestAnimationFrame(animate);
  };

  const onPointerMove = (event) => {
    const rect = canvas.getBoundingClientRect();
    const nextX = event.clientX - rect.left;
    const nextY = event.clientY - rect.top;
    const deltaX = nextX - state.pointer.x;
    const deltaY = nextY - state.pointer.y;

    state.pointer.x = nextX;
    state.pointer.y = nextY;
    state.pointer.active = true;
    state.pointer.force = clamp(Math.hypot(deltaX, deltaY) * 0.05, 0, 1.35);
  };

  const onPointerLeave = () => {
    state.pointer.active = false;
    state.pointer.force = 0;
  };

  resize();
  drawBubbles(performance.now());

  window.addEventListener("resize", resize);
  if (!prefersReducedMotion) {
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("blur", onPointerLeave);
  }

  window.requestAnimationFrame(animate);
};

(() => {
  window.__AQUATECH_MAIN_LOADED = true;

  const body = document.body;
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("nav-links");
  const progressBar = document.getElementById("scroll-progress-bar");
  const yearLabel = document.getElementById("year");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const bubbleCanvas = document.getElementById("bubble-canvas");

  if (bubbleCanvas instanceof HTMLCanvasElement) {
    initBubbleField(bubbleCanvas, prefersReducedMotion);
  }

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
        const countState = { value: target * 0.18 };

        gsapGlobal.to(countState, {
          value: target,
          duration: 1.5,
          ease: "power2.out",
          onUpdate: () => {
            counterElement.textContent = `${Math.round(countState.value)}${suffix}`;
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
