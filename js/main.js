// Veritas Counsel — site behaviour

// ============================================================
//  CALENDLY  — set this ONE value once you have the link.
//  e.g. "https://calendly.com/veritas-counsel"
//  (Your 15-min and 30-min event types appear inside the picker.)
// ============================================================
const CALENDLY_URL = "";

// Point every [data-calendly] button at the booking link (new tab).
document.querySelectorAll("[data-calendly]").forEach((el) => {
  if (CALENDLY_URL) {
    el.setAttribute("href", CALENDLY_URL);
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  }
  // If no URL yet, links fall back to contact.html (already in the href).
});

// Inline booking widget on the contact page.
const embed = document.getElementById("calendly-embed");
if (embed && CALENDLY_URL) {
  embed.classList.remove("img-ph");
  embed.removeAttribute("data-label");
  const frame = document.createElement("iframe");
  frame.src = CALENDLY_URL;
  frame.title = "Book a call with Veritas Counsel";
  frame.style.width = "100%";
  frame.style.height = "640px";
  frame.style.border = "0";
  frame.style.borderRadius = "8px";
  embed.replaceWith(frame);
}

// ---- Mobile nav ----
const nav = document.getElementById("nav");
const toggle = nav?.querySelector(".nav__toggle");
toggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});

// Close the mobile menu after tapping a real link.
nav?.querySelectorAll(".nav__menu a:not(.nav__link), .nav__cta a").forEach((a) => {
  a.addEventListener("click", () => nav.classList.remove("open"));
});

// ---- Footer year ----
const y = document.getElementById("year");
if (y) y.textContent = new Date().getFullYear();
