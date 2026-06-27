// Veritas Counsel — site behaviour

// ============================================================
//  CALENDLY  — set this ONE value once you have the link.
//  e.g. "https://calendly.com/veritas-counsel"
//  (Your 15-min and 30-min event types appear inside the picker.)
// ============================================================
const CALENDLY_URL = "";

// (Calendly links are applied near the end, after the drawer CTA is injected.)

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

// ============================================================
//  Mobile navigation — full-height drawer with accordions
// ============================================================
const nav = document.getElementById("nav");
const toggle = nav?.querySelector(".nav__toggle");
const menu = nav?.querySelector(".nav__menu");
const mqMobile = window.matchMedia("(max-width: 920px)");

function setMenu(open) {
  if (!nav) return;
  nav.classList.toggle("open", open);
  toggle?.setAttribute("aria-expanded", String(open));
  document.body.style.overflow = open ? "hidden" : "";
  if (!open) {
    nav.querySelectorAll(".has-dropdown.open").forEach((li) => li.classList.remove("open"));
  }
}

toggle?.addEventListener("click", () => setMenu(!nav.classList.contains("open")));

// Inject a full-width CTA at the foot of the drawer (mobile only via CSS).
if (menu) {
  const wrap = document.createElement("div");
  wrap.className = "nav__drawer-cta";
  const cta = document.createElement("a");
  cta.className = "btn btn--primary btn--lg";
  cta.setAttribute("data-calendly", "");
  cta.href = "contact.html";
  cta.textContent = "Speak to a Specialist";
  cta.addEventListener("click", () => setMenu(false));
  wrap.appendChild(cta);
  menu.appendChild(wrap);
}

// Top-level links: on mobile, a dropdown parent toggles its accordion
// instead of navigating; everything else navigates and closes the drawer.
nav?.querySelectorAll(".nav__menu .nav__link").forEach((link) => {
  link.addEventListener("click", (e) => {
    const li = link.closest(".has-dropdown");
    if (li && mqMobile.matches) {
      e.preventDefault();
      const willOpen = !li.classList.contains("open");
      nav.querySelectorAll(".has-dropdown.open").forEach((o) => { if (o !== li) o.classList.remove("open"); });
      li.classList.toggle("open", willOpen);
    } else {
      setMenu(false);
    }
  });
});

// Sub-menu links always navigate → close the drawer.
nav?.querySelectorAll(".dropdown a").forEach((a) =>
  a.addEventListener("click", () => setMenu(false))
);

// Reset cleanly when crossing back to desktop.
mqMobile.addEventListener("change", (e) => { if (!e.matches) setMenu(false); });

// ---- Apply Calendly link to every CTA (incl. the injected drawer button) ----
document.querySelectorAll("[data-calendly]").forEach((el) => {
  if (CALENDLY_URL) {
    el.setAttribute("href", CALENDLY_URL);
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  }
  // If no URL yet, links fall back to contact.html (already in the href).
});

// ---- Footer year ----
const y = document.getElementById("year");
if (y) y.textContent = new Date().getFullYear();
