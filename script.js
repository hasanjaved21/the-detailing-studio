// Mobile navigation toggle
const mainNav = document.querySelector(".main-nav");
const navToggle = document.querySelector(".nav-toggle");

if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    mainNav.classList.toggle("open");
  });

  // Close menu when clicking a nav link (on mobile)
  const navLinks = mainNav.querySelectorAll(".nav-links a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
    });
  });
}

// Smooth scroll for custom buttons that reference sections
document.querySelectorAll("[data-scroll-to]").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const targetSelector = btn.getAttribute("data-scroll-to");
    if (!targetSelector) return;
    const target = document.querySelector(targetSelector);
    if (!target) return;

    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// Booking form -> WhatsApp pre-filled message
const bookingForm = document.getElementById("booking-form");

if (bookingForm) {
  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = bookingForm.name?.value?.trim() || "";
    const phone = bookingForm.phone?.value?.trim() || "";
    const service = bookingForm.service?.value || "";
    const car = bookingForm.car?.value?.trim() || "";
    const message = bookingForm.message?.value?.trim() || "";

    const lines = [
      "Hi The Detailing Studio, I'd like to book a detailing slot.",
      "",
      name && `Name: ${name}`,
      phone && `Phone / WhatsApp: ${phone}`,
      service && `Service: ${service}`,
      car && `Car: ${car}`,
      message && `Details: ${message}`,
    ].filter(Boolean);

    const fullMessage = encodeURIComponent(lines.join("\n"));

    // Your main WhatsApp number
    const whatsappNumber = "923422411694";
    const url = `https://wa.me/${whatsappNumber}?text=${fullMessage}`;

    window.open(url, "_blank");
  });
}

// Dynamic year in footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Handle mobile navigation toggle
const nav = document.querySelector(".main-nav");
const navToggle = document.querySelector(".nav-toggle");

if (nav && navToggle) {
  navToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}

// Smooth scrolling for internal navigation and link buttons
const scrollLinks = document.querySelectorAll(
  'a[href^="#"], button[data-scroll-to]'
);

scrollLinks.forEach((el) => {
  const targetSelector =
    el.tagName.toLowerCase() === "a"
      ? el.getAttribute("href")
      : el.getAttribute("data-scroll-to");

  if (!targetSelector || targetSelector === "#") return;

  el.addEventListener("click", (event) => {
    // Only prevent default for same-page links
    if (targetSelector.startsWith("#")) {
      event.preventDefault();
      const target = document.querySelector(targetSelector);
      if (target) {
        const navHeight = document.querySelector(".main-nav")?.offsetHeight || 0;
        const targetPos =
          target.getBoundingClientRect().top + window.pageYOffset - navHeight - 8;

        window.scrollTo({
          top: targetPos,
          behavior: "smooth",
        });

        // Close mobile nav after click
        if (nav && nav.classList.contains("open")) {
          nav.classList.remove("open");
        }
      }
    }
  });
});

// Booking form -> WhatsApp
const bookingForm = document.getElementById("booking-form");
const WHATSAPP_NUMBER = "923001234567"; // Change to your number if needed

if (bookingForm) {
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = bookingForm.name.value.trim();
    const phone = bookingForm.phone.value.trim();
    const service = bookingForm.service.value;
    const car = bookingForm.car.value.trim();
    const message = bookingForm.message.value.trim();

    let text = `Hi The Detailing Studio,%0A%0AI'd like to book a detailing service.%0A%0A`;
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

// Dynamic year in footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}


