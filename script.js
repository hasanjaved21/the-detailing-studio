// Main JavaScript for The Detailing Studio landing page
// - Mobile navigation
// - Smooth scrolling
// - WhatsApp booking form
// - Dynamic year
// - Metric count-up animation
// - Subtle scroll-reveal animations

const WHATSAPP_NUMBER = "923422411694";

document.addEventListener("DOMContentLoaded", () => {
  /* ========== Mobile Navigation ========== */
  const nav = document.querySelector(".main-nav");
  const navToggle = document.querySelector(".nav-toggle");

  if (nav && navToggle) {
    navToggle.addEventListener("click", () => {
      nav.classList.toggle("open");
    });

    const navLinks = nav.querySelectorAll(".nav-links a");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
      });
    });
  }

  /* ========== Smooth Scrolling ========== */
  const scrollLinks = document.querySelectorAll(
    'a[href^="#"], button[data-scroll-to]'
  );

  scrollLinks.forEach((el) => {
    const isAnchor = el.tagName.toLowerCase() === "a";
    const targetSelector = isAnchor
      ? el.getAttribute("href")
      : el.getAttribute("data-scroll-to");

    if (!targetSelector || !targetSelector.startsWith("#")) return;

    el.addEventListener("click", (event) => {
      event.preventDefault();
      const target = document.querySelector(targetSelector);
      if (!target) return;

      const navHeight = nav?.offsetHeight || 0;
      const targetPos =
        target.getBoundingClientRect().top +
        window.pageYOffset -
        navHeight -
        8;

      window.scrollTo({
        top: targetPos,
        behavior: "smooth",
      });

      if (nav && nav.classList.contains("open")) {
        nav.classList.remove("open");
      }
    });
  });

  /* ========== Booking Form -> WhatsApp ========== */
  const bookingForm = document.getElementById("booking-form");

  if (bookingForm) {
    bookingForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = bookingForm.name.value.trim();
      const phone = bookingForm.phone.value.trim();
      const service = bookingForm.service.value;
      const car = bookingForm.car.value.trim();
      const message = bookingForm.message.value.trim();

      let text =
        "Hi The Detailing Studio,%0A%0AI'd like to book a detailing service.%0A%0A";
      text += `Name: ${encodeURIComponent(name)}%0A`;
      text += `Phone / WhatsApp: ${encodeURIComponent(phone)}%0A`;
      text += `Service: ${encodeURIComponent(service)}%0A`;
      text += `Car: ${encodeURIComponent(car)}%0A`;

      if (message) {
        text += `%0ADetails: ${encodeURIComponent(message)}%0A`;
      }

      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
      window.open(url, "_blank");
    });
  }

  /* ========== Dynamic Year in Footer ========== */
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  /* ========== Metric Count-Up Animation ========== */
  const metricNumbers = document.querySelectorAll(".metric-number[data-target]");

  const animateCount = (el) => {
    const target = parseFloat(el.dataset.target || "0");
    const decimals = parseInt(el.dataset.decimals || "0", 10);
    const suffix = el.dataset.suffix || "";
    const duration = 1400;
    const startTime = performance.now();

    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic

      const current = target * eased;
      el.textContent = `${current.toFixed(decimals)}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  if (metricNumbers.length > 0) {
    const metricsSection = document.querySelector(".hero-metrics");

    const metricsObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            metricNumbers.forEach((el) => animateCount(el));
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );

    if (metricsSection) {
      metricsObserver.observe(metricsSection);
    }
  }

  /* ========== Scroll Reveal for Sections & Cards ========== */
  const revealElements = [
    ".hero-content",
    ".hero-card",
    ".hero-metrics > div",
    ".service-card",
    ".service-detail",
    ".gallery-item",
    ".pricing-card",
    ".about-inner > *",
    ".contact-inner > *",
  ]
    .map((selector) => Array.from(document.querySelectorAll(selector)))
    .flat();

  revealElements.forEach((el) => el.classList.add("reveal"));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));
});
