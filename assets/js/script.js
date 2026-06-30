"use strict";

/* ---- Config ---- */
const CONFIG = {
  rootPath: (() => {
    // Determine if we're in /pages/ sub-directory or root
    const path = window.location.pathname;
    if (path.includes("/pages/")) return "..";
    return ".";
  })(),
};

/* =========================================
   Component Loader
   Fetches header.html and footer.html and
   injects them into placeholder elements.
   ========================================= */
async function loadComponent(placeholderId, componentPath, callback) {
  const el = document.getElementById(placeholderId);
  if (!el) return;
  try {
    const res = await fetch(componentPath);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    el.innerHTML = html;
    if (typeof callback === "function") callback();
  } catch (err) {
    console.warn(`[Stackly] Could not load component "${componentPath}":`, err);
  }
}

/* =========================================
   Logo Path Resolver
   Sets the correct logo src based on
   the document's position in the directory.
   ========================================= */
function resolveLogoSrc() {
  const logoPath = `${CONFIG.rootPath}/assets/images/logoStackly.webp`;

  // Header logo
  const headerLogoImg = document.getElementById("nav-logo-img");
  if (headerLogoImg) headerLogoImg.src = logoPath;

  // Header logo link href
  const headerLogoLink = document.getElementById("nav-logo-link");
  if (headerLogoLink)
    headerLogoLink.href =
      CONFIG.rootPath === ".." ? "../index.html" : "./index.html";

  // Footer logos (multiple possible)
  document.querySelectorAll(".footer-logo-img").forEach((img) => {
    img.src = logoPath;
  });
}

/* =========================================
   Active Nav Link
   Marks the current page's nav link as active.
   Resolves paths for both root and /pages/ dirs.
   ========================================= */
function setActiveNavLink() {
  const currentPage = document.body.dataset.page || "";
  if (!currentPage) return;

  // Desktop nav
  document
    .querySelectorAll("#nav-links-desktop [data-page], #nav-mobile [data-page]")
    .forEach((link) => {
      link.classList.remove("active");
      if (link.dataset.page === currentPage) {
        link.classList.add("active");
      }
    });
}

/* =========================================
   Resolve Navigation Links
   Adjusts template hrefs so they work
   relative to the current page.
   ========================================= */
function resolveNavLinks() {
  const isPages = CONFIG.rootPath === "..";
  document
    .querySelectorAll("#site-header a, #site-footer a")
    .forEach((link) => {
      const href = link.getAttribute("href");
      if (href && href.startsWith("/")) {
        if (href === "/index.html") {
          link.href = isPages ? "../index.html" : "./index.html";
        } else if (href.startsWith("/pages/")) {
          const pageName = href.replace("/pages/", "");
          link.href = isPages ? `./${pageName}` : `./pages/${pageName}`;
        }
      }
    });
}

/* =========================================
   Mobile Menu Toggle
   ========================================= */
function initMobileMenu() {
  const hamburger = document.getElementById("nav-hamburger");
  const mobileNav = document.getElementById("nav-mobile");
  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener("click", () => {
    const isOpen = hamburger.classList.toggle("open");
    mobileNav.classList.toggle("open", isOpen);
    hamburger.setAttribute("aria-expanded", isOpen);
  });

  // Close on link click
  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("open");
      mobileNav.classList.remove("open");
    });
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
      hamburger.classList.remove("open");
      mobileNav.classList.remove("open");
    }
  });
}

/* =========================================
   Sticky Nav Shadow on Scroll
   ========================================= */
function initStickyNav() {
  const header = document.getElementById("site-header");
  if (!header) return;

  const navBar = header.querySelector(".nav-bar");
  if (!navBar) return;

  const onScroll = () => {
    if (window.scrollY > 20) {
      navBar.style.boxShadow = "0 2px 20px rgba(0,0,0,0.5)";
    } else {
      navBar.style.boxShadow = "";
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
}

/* =========================================
   Scroll Reveal Animation
   Uses IntersectionObserver to animate
   elements with the .reveal class.
   ========================================= */
function initScrollReveal() {
  if (!("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

/* =========================================
   ROI Calculator
   Works on pages that have #roi-hours /
   #roi-rate or #emp-slider / #hours-slider.
   ========================================= */
function initROICalculator() {
  // Variant A: pricing page (roi-hours, roi-rate → roi-result)
  const roiHours = document.getElementById("roi-hours");
  const roiRate = document.getElementById("roi-rate");
  const hoursDisplay = document.getElementById("hours-display");
  const rateDisplay = document.getElementById("rate-display");
  const roiResultA = document.getElementById("roi-result");

  if (roiHours && roiRate && roiResultA) {
    const updateA = () => {
      const h = parseInt(roiHours.value, 10);
      const r = parseInt(roiRate.value, 10);
      const savings = Math.round(h * r * 52 * 0.8);
      if (hoursDisplay) hoursDisplay.textContent = h;
      if (rateDisplay) rateDisplay.textContent = r;
      roiResultA.textContent = "$" + savings.toLocaleString();
    };
    roiHours.addEventListener("input", updateA);
    roiRate.addEventListener("input", updateA);
    updateA();
  }

  // Variant B: homepage (emp-slider, hours-slider → roi-result)
  const empSlider = document.getElementById("emp-slider");
  const hoursSlider = document.getElementById("hours-slider");
  const empVal = document.getElementById("emp-val");
  const hoursVal = document.getElementById("hours-val");
  const roiResultB = document.getElementById("roi-result");

  if (empSlider && hoursSlider && roiResultB && !roiHours) {
    const updateB = () => {
      const e = parseInt(empSlider.value, 10);
      const h = parseInt(hoursSlider.value, 10);
      const savings = e * h * 52 * 50;
      if (empVal) empVal.textContent = e;
      if (hoursVal) hoursVal.textContent = h;
      roiResultB.textContent = "$" + savings.toLocaleString();
    };
    empSlider.addEventListener("input", updateB);
    hoursSlider.addEventListener("input", updateB);
    updateB();
  }
}

/* =========================================
   Pricing Toggle (Monthly / Annual)
   ========================================= */
function initPricingToggle() {
  const toggle = document.getElementById("billing-toggle");
  const toggleThumb = document.getElementById("toggle-thumb");
  const monthlyLabel = document.getElementById("monthly-label");
  const yearlyLabel = document.getElementById("yearly-label");

  if (!toggle) return;

  const prices = {
    starter: { monthly: 49, annual: 39 },
    pro: { monthly: 199, annual: 159 },
  };

  let isAnnual = false;

  const update = () => {
    const starterEl = document.getElementById("starter-price");
    const proEl = document.getElementById("pro-price");

    if (starterEl)
      starterEl.textContent = isAnnual
        ? prices.starter.annual
        : prices.starter.monthly;
    if (proEl)
      proEl.textContent = isAnnual ? prices.pro.annual : prices.pro.monthly;

    if (toggleThumb) {
      toggleThumb.style.transform = isAnnual
        ? "translateX(28px)"
        : "translateX(0)";
    }
    if (monthlyLabel)
      monthlyLabel.style.color = isAnnual
        ? "var(--color-on-surface-variant)"
        : "var(--color-on-surface)";
    if (yearlyLabel)
      yearlyLabel.style.color = isAnnual
        ? "var(--color-secondary)"
        : "var(--color-on-surface-variant)";
  };

  toggle.addEventListener("click", () => {
    isAnnual = !isAnnual;
    update();
  });

  update();
}

/* =========================================
   FAQ Accordion (HTML <details> elements)
   Closes siblings when one opens.
   ========================================= */
function initFAQ() {
  const faqs = document.querySelectorAll("details.faq-item");
  faqs.forEach((detail) => {
    detail.addEventListener("toggle", () => {
      if (detail.open) {
        faqs.forEach((other) => {
          if (other !== detail && other.open) other.open = false;
        });
      }
    });
  });
}

/* =========================================
   Password Toggle (Login / Register)
   ========================================= */
function initPasswordToggle() {
  document.querySelectorAll("[data-toggle-password]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.dataset.togglePassword;
      const input = document.getElementById(targetId);
      const icon = btn.querySelector(".material-symbols-outlined");
      if (!input) return;
      if (input.type === "password") {
        input.type = "text";
        if (icon) icon.textContent = "visibility_off";
      } else {
        input.type = "password";
        if (icon) icon.textContent = "visibility";
      }
    });
  });
}

/* =========================================
   Contact Form
   Simple client-side UX (no real submit).
   ========================================= */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    if (!btn) return;
    const original = btn.textContent;
    btn.textContent = "Sending…";
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = "✓ Message Sent!";
      btn.style.background = "#22c55e";
      setTimeout(() => {
        btn.textContent = original;
        btn.disabled = false;
        btn.style.background = "";
        form.reset();
      }, 3000);
    }, 1200);
  });
}

/* =========================================
   Stats Counter Animation
   Triggers when the stats section scrolls in.
   ========================================= */
function initStatsCounter() {
  const statEls = document.querySelectorAll("[data-stat-target]");
  if (!statEls.length) return;
  if (!("IntersectionObserver" in window)) return;

  const animateCount = (el) => {
    const target = el.dataset.statTarget;
    // If it has non-numeric content, just display it
    if (!/^[\d.]+$/.test(target)) {
      el.textContent = target;
      return;
    }
    const num = parseFloat(target);
    const isFloat = target.includes(".");
    const duration = 1500;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = num * eased;
      el.textContent = isFloat
        ? value.toFixed(2)
        : Math.floor(value).toLocaleString();
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = isFloat ? num.toFixed(2) : num.toLocaleString();
    };
    requestAnimationFrame(step);
  };

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );

  statEls.forEach((el) => obs.observe(el));
}

/* =========================================
   Documentation Tab Switcher
   ========================================= */
function initDocsTabs() {
  const tabBtns = document.querySelectorAll("[data-tab-target]");
  if (!tabBtns.length) return;

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.dataset.tabTarget;
      const tabGroup = btn.dataset.tabGroup || "default";

      // Deactivate all tabs in group
      document
        .querySelectorAll(`[data-tab-target][data-tab-group="${tabGroup}"]`)
        .forEach((b) => {
          b.classList.remove("tab-active");
        });
      document
        .querySelectorAll(`[data-tab-panel][data-tab-group="${tabGroup}"]`)
        .forEach((p) => {
          p.hidden = true;
        });

      // Activate clicked tab
      btn.classList.add("tab-active");
      const panel = document.getElementById(targetId);
      if (panel) panel.hidden = false;
    });
  });
}

/* =========================================
   Main Init
   ========================================= */
async function initApp() {
  const root = CONFIG.rootPath;
  const componentBase = root + "/pages/components";

  // Detect if this is a pages/ file or root
  const isPages = root === "..";

  // Load shared components
  await Promise.all([
    loadComponent("header-placeholder", `${componentBase}/header.html`, () => {
      resolveNavLinks();
      resolveLogoSrc();
      setActiveNavLink();
      initMobileMenu();
      initStickyNav();
    }),
    loadComponent("footer-placeholder", `${componentBase}/footer.html`, () => {
      resolveNavLinks();
      resolveLogoSrc();
      initScrollToTop();
    }),
  ]);

  // Init page-level features
  initScrollReveal();
  initROICalculator();
  initPricingToggle();
  initFAQ();
  initPasswordToggle();
  initContactForm();
  initStatsCounter();
  initDocsTabs();
}

// Bootstrap
document.addEventListener("DOMContentLoaded", initApp);

/* =========================================
   Scroll To Top Button
   ========================================= */
function initScrollToTop() {
  const btn = document.getElementById("scroll-to-top");
  if (!btn) return;

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      btn.classList.add("visible");
    } else {
      btn.classList.remove("visible");
    }
  };

  window.addEventListener("scroll", toggleVisibility, { passive: true });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Run once on init
  toggleVisibility();
}

/* =========================================
   Page Loader
========================================= */

window.addEventListener("load", () => {
  const loader = document.getElementById("page-loader");

  setTimeout(() => {
    loader.classList.add("hide");

    setTimeout(() => {
      loader.remove();
    }, 700);
  }, 2000);
});

//  Script to redirect empty links and '#' to 404.html
document.addEventListener("click", function (event) {
  // Find the closest anchor tag if the user clicked inside a link (e.g., text, icon)
  const link = event.target.closest("a");

  if (link) {
    const href = link.getAttribute("href");

    // Check if href is missing, completely empty, or exactly '#'
    if (!href || href.trim() === "" || href.trim() === "#") {
      event.preventDefault(); // Stop default anchor behavior
      window.location.href = "../pages/components/404.html"; // Redirect to your 404 page
    }
  }
});
