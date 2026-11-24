const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("main section[id]");
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

const closeMenu = () => {
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Open navigation menu");
  navLinks.classList.remove("open");
  document.body.classList.remove("menu-open");
};

navToggle.addEventListener("click", () => {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
  navLinks.classList.toggle("open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});

navItems.forEach((link) => link.addEventListener("click", closeMenu));

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

window.addEventListener(
  "scroll",
  () => {
    header.classList.toggle("scrolled", window.scrollY > 12);
  },
  { passive: true }
);

const updateActiveLink = () => {
  let currentSection = "home";

  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 160) {
      currentSection = section.id;
    }
  });

  navItems.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${currentSection}`);
  });
};

window.addEventListener("scroll", updateActiveLink, { passive: true });
updateActiveLink();

contactForm.addEventListener("input", (event) => {
  if (event.target.matches("input, textarea, select")) {
    event.target.classList.remove("invalid");
    formStatus.textContent = "";
    formStatus.classList.remove("error");
  }
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const fields = [...contactForm.querySelectorAll("input, select, textarea")];
  const invalidFields = fields.filter((field) => !field.checkValidity());

  fields.forEach((field) => field.classList.toggle("invalid", !field.checkValidity()));

  if (invalidFields.length) {
    formStatus.textContent = "Please complete all fields with valid information.";
    formStatus.classList.add("error");
    invalidFields[0].focus();
    return;
  }

  const data = new FormData(contactForm);
  const subject = `Portfolio inquiry: ${data.get("projectType")}`;
  const body = [
    `Hi Alex,`,
    "",
    data.get("message"),
    "",
    `From: ${data.get("name")}`,
    `Email: ${data.get("email")}`,
  ].join("\n");

  formStatus.textContent = "Opening your email app…";
  formStatus.classList.remove("error");
  window.location.href = `mailto:hello@alexmorgan.dev?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

document.querySelector("#year").textContent = new Date().getFullYear();
