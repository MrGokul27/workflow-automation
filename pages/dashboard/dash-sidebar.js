/**
 * dash-sidebar.js  v3
 * Shared sidebar + shared header for ALL Stackly dashboard sub-pages.
 * Works regardless of whether the original header was fixed/sticky/inside-main/outside-main.
 * Path: pages/dashboard/dash-sidebar.js
 */
(function () {
  "use strict";

  /* ══════════════════════════════════════════════
     COLOUR PALETTE
  ══════════════════════════════════════════════ */
  var P = {
    secondary: {
      h: "#7bd0ff",
      a10: "rgba(123,208,255,0.10)",
      a15: "rgba(123,208,255,0.15)",
      a20: "rgba(123,208,255,0.20)",
      a30: "rgba(123,208,255,0.30)",
    },
    tertiary: {
      h: "#bdc2ff",
      a10: "rgba(189,194,255,0.10)",
      a15: "rgba(189,194,255,0.15)",
      a20: "rgba(189,194,255,0.20)",
      a30: "rgba(189,194,255,0.30)",
    },
  };

  /* ══════════════════════════════════════════════
     PAGE NAME MAP
  ══════════════════════════════════════════════ */
  var PAGE_NAMES = {
    "dashboard.html": "Overview",
    "user-management.html": "User Management",
    "global-audit.html": "Global Audit",
    "security-and-compliance.html": "Security & Compliance",
    "system-health.html": "System Health",
    "billing.html": "Billing",
    "ci-cd-pipelines.html": "CI/CD Pipelines",
    "node-deployment.html": "Node Deployment",
    "infrastructure-scaling.html": "Infrastructure Scaling",
    "execution-logs.html": "Execution Logs",
    "performance-alerts.html": "Performance Alerts",
    "orchestration.html": "Orchestration",
    "topology-map.html": "Topology Map",
    "api-management.html": "API Management",
    "integration-hub.html": "Integration Hub",
    "resource-schema.html": "Resource Schema",
    "sandbox.html": "Sandbox",
    "api-access.html": "API Access",
    "webhook.html": "Webhooks",
    "debugging.html": "Debugging",
    "documentation.html": "Documentation",
    "team-workflows.html": "Team Workflows",
    "performance-reports.html": "Performance Reports",
    "sla-tracking.html": "SLA Tracking",
    "resource-usage.html": "Resource Usage",
    "efficiency-roi.html": "Efficiency & ROI",
  };

  /* ══════════════════════════════════════════════
     ROLE → NAV CONFIG
  ══════════════════════════════════════════════ */
  var ROLES = {
    admin: {
      label: "System Admin",
      icon: "admin_panel_settings",
      accent: "secondary",
      nav: [
        { icon: "dashboard", label: "Dashboard", href: "../dashboard.html" },
        {
          icon: "group",
          label: "User Management",
          href: "./user-management.html",
        },
        { icon: "policy", label: "Global Audit", href: "./global-audit.html" },
        {
          icon: "security",
          label: "Security & Compliance",
          href: "./security-and-compliance.html",
        },
        {
          icon: "monitor_heart",
          label: "System Health",
          href: "./system-health.html",
        },
        { icon: "receipt_long", label: "Billing", href: "./billing.html" },
      ],
    },
    devops: {
      label: "DevOps Engineer",
      icon: "terminal",
      accent: "secondary",
      nav: [
        { icon: "dashboard", label: "Dashboard", href: "../dashboard.html" },
        {
          icon: "device_hub",
          label: "CI/CD Pipelines",
          href: "./ci-cd-pipelines.html",
        },
        {
          icon: "cloud_upload",
          label: "Node Deployment",
          href: "./node-deployment.html",
        },
        {
          icon: "open_in_full",
          label: "Infrastructure Scaling",
          href: "./infrastructure-scaling.html",
        },
        {
          icon: "receipt_long",
          label: "Execution Logs",
          href: "./execution-logs.html",
        },
        {
          icon: "notifications_active",
          label: "Performance Alerts",
          href: "./performance-alerts.html",
        },
      ],
    },
    architect: {
      label: "System Architect",
      icon: "account_tree",
      accent: "tertiary",
      nav: [
        { icon: "dashboard", label: "Dashboard", href: "../dashboard.html" },
        {
          icon: "account_tree",
          label: "Orchestration",
          href: "./orchestration.html",
        },
        { icon: "hub", label: "Topology Map", href: "./topology-map.html" },
        { icon: "api", label: "API Management", href: "./api-management.html" },
        {
          icon: "integration_instructions",
          label: "Integration Hub",
          href: "./integration-hub.html",
        },
        {
          icon: "schema",
          label: "Resource Schema",
          href: "./resource-schema.html",
        },
      ],
    },
    developer: {
      label: "Developer",
      icon: "code",
      accent: "secondary",
      nav: [
        { icon: "dashboard", label: "Dashboard", href: "../dashboard.html" },
        { icon: "science", label: "Sandbox", href: "./sandbox.html" },
        { icon: "key", label: "API Access", href: "./api-access.html" },
        { icon: "webhook", label: "Webhooks", href: "./webhook.html" },
        { icon: "bug_report", label: "Debugging", href: "./debugging.html" },
        {
          icon: "description",
          label: "Documentation",
          href: "./documentation.html",
        },
      ],
    },
    "operations-manager": {
      label: "Operations Manager",
      icon: "bar_chart",
      accent: "secondary",
      nav: [
        { icon: "dashboard", label: "Dashboard", href: "../dashboard.html" },
        {
          icon: "groups",
          label: "Team Workflows",
          href: "./team-workflows.html",
        },
        {
          icon: "bar_chart",
          label: "Performance Reports",
          href: "./performance-reports.html",
        },
        {
          icon: "fact_check",
          label: "SLA Tracking",
          href: "./sla-tracking.html",
        },
        {
          icon: "storage",
          label: "Resource Usage",
          href: "./resource-usage.html",
        },
        {
          icon: "trending_up",
          label: "Efficiency & ROI",
          href: "./efficiency-roi.html",
        },
      ],
    },
  };

  /* ══════════════════════════════════════════════
     HELPERS
  ══════════════════════════════════════════════ */
  function initials(email) {
    var local = email.split("@")[0];
    var parts = local
      .replace(/[._\-+]/g, " ")
      .trim()
      .split(/\s+/);
    return (
      parts.length >= 2
        ? parts[0][0] + parts[parts.length - 1][0]
        : local.slice(0, 2)
    ).toUpperCase();
  }

  function displayName(email) {
    return email
      .split("@")[0]
      .replace(/[._\-+]/g, " ")
      .replace(/\b\w/g, function (c) {
        return c.toUpperCase();
      })
      .trim();
  }

  function activePage() {
    var parts = window.location.pathname.split("/");
    return parts[parts.length - 1] || "";
  }

  function pageName() {
    var f = activePage();
    return (
      PAGE_NAMES[f] ||
      f
        .replace(/-/g, " ")
        .replace(/\.html$/, "")
        .replace(/\b\w/g, function (c) {
          return c.toUpperCase();
        })
    );
  }

  /* ══════════════════════════════════════════════
     INJECT SHARED CSS
  ══════════════════════════════════════════════ */
  function injectCSS() {
    if (document.getElementById("dsb-css")) return;
    var s = document.createElement("style");
    s.id = "dsb-css";
    s.textContent = [
      /* sidebar */
      "#sidebar { transition: transform 0.3s cubic-bezier(0.4,0,0.2,1); }",
      "#sb-overlay { transition: opacity 0.3s ease; }",
      ".sb-link { display:flex; align-items:center; gap:12px; padding:10px 12px; border-radius:8px;",
      "  font-size:13px; font-weight:600; text-decoration:none; color:#c6c6cd;",
      "  border-right:2px solid transparent; transition:background 0.15s,color 0.15s,border-color 0.15s; }",
      ".sb-link:not(.sb-active):hover { background:rgba(69,70,77,0.28); color:#d4e4fa; }",
      ".sb-chev { font-size:13px; margin-left:auto; opacity:0; transition:opacity 0.15s; }",
      ".sb-link:not(.sb-active):hover .sb-chev { opacity:0.5; }",
      ".sbi { font-family:'Material Symbols Outlined'; line-height:1; user-select:none; flex-shrink:0;",
      "  font-variation-settings:'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24; }",
      ".sbi.f1 { font-variation-settings:'FILL' 1,'wght' 400,'GRAD' 0,'opsz' 24; }",
      /* standard dashboard header */
      "#dsb-header { position:sticky; top:0; z-index:30; height:62px;",
      "  display:flex; align-items:center; padding:0 24px; gap:12px;",
      "  background:rgba(13,28,45,0.92); backdrop-filter:blur(14px); -webkit-backdrop-filter:blur(14px);",
      "  border-bottom:1px solid rgba(69,70,77,0.18); flex-shrink:0; }",
      ".dsb-hbtn { background:#1c2b3c; border:none; cursor:pointer; border-radius:8px;",
      "  width:36px; height:36px; display:flex; align-items:center; justify-content:center;",
      "  color:#c6c6cd; transition:all 0.15s; flex-shrink:0; }",
      ".dsb-hbtn:hover { background:#273647; color:#d4e4fa; }",
      ".dsb-search input { background:#1c2b3c; border:1px solid rgba(69,70,77,0.3); border-radius:8px;",
      "  padding:7px 12px 7px 34px; font-size:13px; width:160px; color:#d4e4fa;",
      "  outline:none; font-family:inherit; transition:border-color 0.2s; }",
      ".dsb-search input:focus { border-color:rgba(123,208,255,0.4); box-shadow:0 0 0 1px rgba(123,208,255,0.2); }",
      "@keyframes dsb-dot { 0%,100%{opacity:1;transform:scale(1);}50%{opacity:.5;transform:scale(1.4);} }",
      ".dsb-pdot { animation:dsb-dot 2s ease-in-out infinite; }",
      /* responsive overrides for all dashboard pages */
      "@media (max-width:1023px) {",
      "  #dsb-header { margin-left:0 !important; }",
      "  main, footer { margin-left:0 !important; }",
      "}",
      "@media (max-width:639px) {",
      "  .dsb-search { display:none !important; }",
      "}",
      /* Responsive column grid — any col-span-N without explicit responsive breakpoint stacks full on mobile */
      "@media (max-width:767px) {",
      "  [class*='col-span-']:not([class*='sm:col-span-']):not([class*='md:col-span-']):not([class*='lg:col-span-']) { grid-column: 1 / -1 !important; }",
      "  .grid { min-width:0; }",
      "  table { display:block; overflow-x:auto; -webkit-overflow-scrolling:touch; }",
      "  pre, code { max-width:100%; overflow-x:auto; white-space:pre-wrap; word-break:break-all; }",
      "  [class*='h-screen'] { height:auto !important; min-height:100dvh; }",
      "  [class*='h-\\\\[calc(100vh'] { height:auto !important; }",
      "}",
      "@media (max-width:1023px) {",
      "  [class*='lg:col-span-'] { /* controlled by lg breakpoint — OK */ }",
      "  [class*='col-span-8']:not([class*='lg:col-span-']):not([class*='md:col-span-']) { grid-column:1/-1 !important; }",
      "  [class*='col-span-4']:not([class*='lg:col-span-']):not([class*='md:col-span-']) { grid-column:1/-1 !important; }",
      "  [class*='col-span-3']:not([class*='lg:col-span-']):not([class*='md:col-span-']) { grid-column:1/-1 !important; }",
      "  [class*='col-span-5']:not([class*='lg:col-span-']):not([class*='md:col-span-']) { grid-column:1/-1 !important; }",
      "  [class*='col-span-6']:not([class*='lg:col-span-']):not([class*='md:col-span-']):not([class*='col-span-6']) { grid-column:1/-1 !important; }",
      "}",
    ].join("\n");
    document.head.appendChild(s);
  }

  /* ══════════════════════════════════════════════
     BUILD SIDEBAR
  ══════════════════════════════════════════════ */
  function buildSidebar(cfg, inits, name, email) {
    var c = P[cfg.accent] || P.secondary;
    var active = activePage();

    var navHTML = cfg.nav
      .map(function (item) {
        var fname = item.href.split("/").pop();
        var isActive = fname === active;
        var aStyle = isActive
          ? "color:" +
            c.h +
            ";background:" +
            c.a10 +
            ";border-right-color:" +
            c.h +
            ";"
          : "";
        return (
          '<a href="' +
          item.href +
          '" class="sb-link' +
          (isActive ? " sb-active" : "") +
          '" style="' +
          aStyle +
          '">' +
          '<span class="sbi' +
          (isActive ? " f1" : "") +
          '" style="font-size:19px;' +
          (isActive ? "color:" + c.h + ";" : "") +
          '">' +
          item.icon +
          "</span>" +
          "<span>" +
          item.label +
          "</span>" +
          (!isActive
            ? '<span class="sbi sb-chev" style="color:' +
              c.h +
              ';">chevron_right</span>'
            : "") +
          "</a>"
        );
      })
      .join("");

    var html = [
      '<div style="display:flex;align-items:center;gap:12px;padding:18px 20px;border-bottom:1px solid rgba(69,70,77,0.2);flex-shrink:0;">',
      '<a href="../../../index.html" style="display:flex;align-items:center;gap:12px;flex:1;min-width:0;text-decoration:none;">',
      '<div style="width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:' +
        c.a20 +
        ';">',
      '<span class="sbi f1" style="font-size:22px;color:' +
        c.h +
        ';">' +
        cfg.icon +
        "</span>",
      "</div>",
      '<div style="min-width:0;">',
      '<p style="font-weight:700;color:#d4e4fa;font-size:15px;line-height:1.2;margin:0;">Stackly</p>',
      '<p style="font-size:10px;text-transform:uppercase;letter-spacing:0.08em;color:#c6c6cd;font-weight:700;margin:2px 0 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' +
        cfg.label +
        "</p>",
      "</div>",
      "</a>",
      '<button id="sb-close-btn" onclick="sbClose()" style="display:none;background:none;border:none;cursor:pointer;',
      'color:#c6c6cd;padding:4px;border-radius:6px;align-items:center;justify-content:center;" ',
      "onmouseover=\"this.style.color='#d4e4fa';\" onmouseout=\"this.style.color='#c6c6cd';\">",
      '<span class="sbi" style="font-size:20px;">close</span>',
      "</button>",
      "</div>",
      '<nav style="flex:1;padding:12px 8px;overflow-y:auto;display:flex;flex-direction:column;gap:2px;">',
      navHTML,
      "</nav>",
      '<div style="border-top:1px solid rgba(69,70,77,0.2);padding:8px;display:flex;flex-direction:column;gap:2px;flex-shrink:0;">',
      '<a href="#" class="sb-link"><span class="sbi" style="font-size:19px;">description</span><span>Documentation</span></a>',
      '<a href="#" class="sb-link"><span class="sbi" style="font-size:19px;">contact_support</span><span>Support</span></a>',
      "</div>",
      '<div style="border-top:1px solid rgba(69,70,77,0.2);padding:16px;flex-shrink:0;">',
      '<div style="display:flex;align-items:center;gap:10px;">',
      '<div style="width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;',
      "font-weight:700;font-size:13px;flex-shrink:0;background:" +
        c.a15 +
        ";color:" +
        c.h +
        ";border:1px solid " +
        c.a30 +
        ';">' +
        inits +
        "</div>",
      '<div style="flex:1;min-width:0;">',
      '<p style="font-weight:700;color:#d4e4fa;font-size:13px;margin:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' +
        name +
        "</p>",
      '<p style="font-size:11px;color:#c6c6cd;margin:2px 0 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' +
        email +
        "</p>",
      "</div>",
      '<button onclick="doLogout()" title="Sign out" ',
      'style="background:none;border:none;cursor:pointer;padding:6px;border-radius:6px;color:#c6c6cd;',
      'display:flex;align-items:center;justify-content:center;transition:all 0.15s;" ',
      "onmouseover=\"this.style.color='#ffb4ab';this.style.background='rgba(255,180,171,0.1)';\" ",
      "onmouseout=\"this.style.color='#c6c6cd';this.style.background='none';\">",
      '<span class="sbi" style="font-size:19px;">logout</span>',
      "</button>",
      "</div>",
      "</div>",
    ].join("");

    var aside = document.getElementById("sidebar");
    if (aside) {
      aside.innerHTML = html;
      aside.style.cssText =
        "position:fixed;left:0;top:0;height:100%;width:272px;display:flex;flex-direction:column;z-index:50;background:#0d1c2d;border-right:1px solid rgba(69,70,77,0.2);transform:translateX(-100%);transition:transform 0.3s cubic-bezier(0.4,0,0.2,1);";
    }

    var ov = document.getElementById("sb-overlay");
    if (ov)
      ov.style.cssText =
        "position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:40;opacity:0;pointer-events:none;transition:opacity 0.3s ease;display:none;";
  }

  /* ══════════════════════════════════════════════
     BUILD STANDARD HEADER
     Replaces ALL existing <header> elements that look like nav bars,
     then inserts a clean <header id="dsb-header"> at the correct position.
  ══════════════════════════════════════════════ */
  function buildHeader(cfg, email) {
    var c = P[cfg.accent] || P.secondary;
    var inits = initials(email);
    var pname = pageName();

    /* ── 1. Remove ALL existing nav-style headers ── */
    var NAV_SELECTORS = [
      "header[class*='fixed']",
      "header[class*='sticky']",
      "header[class*='top-0']",
      "header[class*='z-40']",
      "header[class*='z-50']",
      "header[class*='z-30']",
    ];
    NAV_SELECTORS.forEach(function (sel) {
      var found = document.querySelectorAll(sel);
      found.forEach(function (el) {
        el.parentNode.removeChild(el);
      });
    });

    /* ── 2. Remove top-padding offsets that compensated for fixed headers ── */
    var mainEl = document.querySelector("main");
    if (mainEl) {
      /* strip pt-16 / pt-20 / pt-24 from main inline or class */
      mainEl.style.paddingTop = "";
      mainEl.className = mainEl.className
        .replace(/\bpt-\d+\b/g, "")
        .replace(/\bmt-\d+\b/g, "")
        .trim();
      /* fix overflow-hidden on body (prevents mobile scroll) */
    }
    var body = document.body;
    body.style.overflowX = "hidden";
    body.style.overflowY = "";
    body.className = body.className.replace(/\boverflow-hidden\b/g, "").trim();

    /* ── 3. Build the standard header element ── */
    var hdr = document.createElement("header");
    hdr.id = "dsb-header";
    hdr.innerHTML = [
      /* hamburger (mobile) */
      '<button id="sb-hamburger" onclick="sbOpen()" aria-label="Open navigation"',
      'style="display:none;align-items:center;justify-content:center;" class="dsb-hbtn">',
      '<span class="sbi" style="font-size:22px;">menu</span>',
      "</button>",

      /* breadcrumb + title */
      '<div style="flex:1;min-width:0;">',
      '<div style="display:flex;align-items:center;gap:3px;font-size:11px;color:#c6c6cd;margin-bottom:2px;white-space:nowrap;">',
      '<a href="../../../index.html" style="color:#c6c6cd;text-decoration:none;transition:color 0.15s;"',
      "onmouseover=\"this.style.color='#d4e4fa';\" onmouseout=\"this.style.color='#c6c6cd';\">Stackly</a>",
      '<span class="sbi" style="font-size:13px;color:#909097;">chevron_right</span>',
      '<span style="color:' +
        c.h +
        ';font-weight:700;">' +
        cfg.label +
        "</span>",
      '<span class="sbi" style="font-size:13px;color:#909097;">chevron_right</span>',
      '<span style="color:#d4e4fa;font-weight:600;">' + pname + "</span>",
      "</div>",
      '<p style="font-weight:700;color:#d4e4fa;font-size:14px;line-height:1.3;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin:0;">' +
        pname +
        "</p>",
      "</div>",

      /* right actions */
      '<div style="display:flex;align-items:center;gap:8px;flex-shrink:0;">',
      /* search — sm+ only */
      '<div id="dsb-search" class="dsb-search" style="position:relative;">',
      '<span class="sbi" style="position:absolute;left:10px;top:50%;transform:translateY(-50%);font-size:17px;color:#c6c6cd;pointer-events:none;">search</span>',
      '<input type="text" placeholder="Search workspace\u2026" />',
      "</div>",
      /* notification bell */
      '<button class="dsb-hbtn" style="position:relative;">',
      '<span class="sbi" style="font-size:20px;">notifications</span>',
      '<span class="dsb-pdot" style="position:absolute;top:7px;right:7px;width:8px;height:8px;border-radius:50%;background:#ffb4ab;"></span>',
      "</button>",
      /* avatar */
      '<div id="hdr-av" style="width:36px;height:36px;border-radius:50%;display:flex;align-items:center;',
      "justify-content:center;font-weight:700;font-size:13px;cursor:pointer;flex-shrink:0;",
      "background:" +
        c.a15 +
        ";color:" +
        c.h +
        ";border:1px solid " +
        c.a30 +
        ';">' +
        inits +
        "</div>",
      "</div>",
    ].join("");

    /* ── 4. Insert the new header ──
       Strategy: if main is the first element of body → prepend to body (before main).
       Otherwise prepend to main. */
    var aside = document.getElementById("sidebar");
    var parent =
      mainEl && mainEl.parentElement === document.body
        ? document.body
        : mainEl || document.body;

    if (mainEl && mainEl.parentElement === document.body) {
      /* header should live alongside aside & main at body level */
      document.body.insertBefore(hdr, mainEl);
    } else if (mainEl) {
      /* header inside main */
      mainEl.insertBefore(hdr, mainEl.firstChild);
    } else {
      document.body.appendChild(hdr);
    }

    /* ── 5. Apply responsive margin to header ──
       Since aside is fixed, body-level header needs lg:ml-[272px].
       Main-level header inherits main's margin so skip it. */
    if (hdr.parentElement === document.body) {
      var hMq = window.matchMedia("(min-width:1024px)");
      function applyHM(e) {
        hdr.style.marginLeft = e.matches ? "272px" : "0";
      }
      applyHM(hMq);
      hMq.addEventListener("change", applyHM);
    }

    /* ── 6. Hamburger + search responsive ── */
    var ham = document.getElementById("sb-hamburger");
    var search = document.getElementById("dsb-search");
    var lgMq = window.matchMedia("(min-width:1024px)");
    var smMq = window.matchMedia("(min-width:640px)");
    function applyLg(e) {
      if (ham) ham.style.display = e.matches ? "none" : "flex";
    }
    function applySm(e) {
      if (search) search.style.display = e.matches ? "block" : "none";
    }
    applyLg(lgMq);
    lgMq.addEventListener("change", applyLg);
    applySm(smMq);
    smMq.addEventListener("change", applySm);
  }

  /* ══════════════════════════════════════════════
     APPLY RESPONSIVE MARGINS  (main, footer)
  ══════════════════════════════════════════════ */
  function applyMainMargins() {
    var mq = window.matchMedia("(min-width:1024px)");

    /* collect targets */
    var targets = [];
    document.querySelectorAll("main, footer").forEach(function (el) {
      targets.push(el);
    });
    document.querySelectorAll("[class]").forEach(function (el) {
      var cls = el.getAttribute("class") || "";
      if (
        /ml-\[2(72|80)px\]/.test(cls) &&
        el.id !== "sidebar" &&
        el.id !== "sb-overlay"
      ) {
        if (targets.indexOf(el) === -1) targets.push(el);
      }
    });

    function apply(e) {
      targets.forEach(function (el) {
        if (
          el.id === "sidebar" ||
          el.id === "sb-overlay" ||
          el.id === "dsb-header"
        )
          return;
        el.style.marginLeft = e.matches ? "272px" : "0";
      });
    }
    apply(mq);
    mq.addEventListener("change", apply);
  }

  /* ══════════════════════════════════════════════
     SIDEBAR BREAKPOINT
  ══════════════════════════════════════════════ */
  function applySidebarBreakpoint() {
    var mq = window.matchMedia("(min-width:1024px)");
    function apply(e) {
      var sb = document.getElementById("sidebar");
      var ov = document.getElementById("sb-overlay");
      var btn = document.getElementById("sb-close-btn");
      if (!sb) return;
      if (e.matches) {
        sb.style.transform = "translateX(0)";
        if (btn) btn.style.display = "none";
        if (ov) {
          ov.style.opacity = "0";
          ov.style.pointerEvents = "none";
          ov.style.display = "none";
        }
      } else {
        sb.style.transform = "translateX(-100%)";
        if (btn) btn.style.display = "flex";
      }
    }
    apply(mq);
    mq.addEventListener("change", apply);
  }

  /* ══════════════════════════════════════════════
     GLOBAL TOGGLES
  ══════════════════════════════════════════════ */
  window.sbOpen = function () {
    var s = document.getElementById("sidebar"),
      ov = document.getElementById("sb-overlay");
    if (s) s.style.transform = "translateX(0)";
    if (ov) {
      ov.style.display = "block";
      setTimeout(function () {
        ov.style.opacity = "1";
        ov.style.pointerEvents = "auto";
      }, 10);
    }
  };
  window.sbClose = function () {
    var s = document.getElementById("sidebar"),
      ov = document.getElementById("sb-overlay");
    if (s) s.style.transform = "translateX(-100%)";
    if (ov) {
      ov.style.opacity = "0";
      ov.style.pointerEvents = "none";
      setTimeout(function () {
        ov.style.display = "none";
      }, 300);
    }
  };
  /* ══════════════════════════════════════════════
     REDIRECT EMPTY / # LINKS TO 404
  ══════════════════════════════════════════════ */
  function intercept404Links() {
    /* Resolve 404.html relative to this script's own location.
       dash-sidebar.js lives at pages/dashboard/dash-sidebar.js,
       so two levels up from the script = project root. */
    var scriptSrc =
      (document.currentScript && document.currentScript.src) ||
      (function () {
        var scripts = document.getElementsByTagName("script");
        for (var i = 0; i < scripts.length; i++) {
          if (scripts[i].src && scripts[i].src.indexOf("dash-sidebar") !== -1) {
            return scripts[i].src;
          }
        }
        return "";
      })();

    var url404;
    if (scriptSrc) {
      /* strip filename → pages/dashboard/ → pages/ → root, then append 404.html */
      url404 =
        scriptSrc
          .replace(/\/[^\/]+$/, "")
          .replace(/\/[^\/]+$/, "")
          .replace(/\/[^\/]+$/, "") + "/404.html";
    } else {
      /* fallback: resolve from current page location */
      var parts = window.location.href.split("/");
      var depth = window.location.pathname
        .replace(/\/+$/, "")
        .split("/")
        .filter(Boolean).length;
      var back = depth >= 3 ? 3 : 2;
      parts.splice(parts.length - back, back);
      url404 = parts.join("/") + "/404.html";
    }

    document.addEventListener("click", function (e) {
      /* buttons with no real action */
      var btn = e.target.closest("button");
      if (
        btn &&
        !btn.hasAttribute("onclick") &&
        btn.id !== "sb-hamburger" &&
        btn.id !== "sb-close-btn"
      ) {
        e.preventDefault();
        window.location.href = url404;
        return;
      }
      /* anchor links with # or empty href */
      var a = e.target.closest("a");
      if (!a) return;
      var href = a.getAttribute("href");
      if (href === "#" || href === "" || href === null) {
        e.preventDefault();
        window.location.href = url404;
      }
    });
  }

  window.doLogout = function () {
    sessionStorage.removeItem("stackly_user");
    localStorage.removeItem("stackly_user");
    window.location.href = "../../login.html";
  };

  /* ══════════════════════════════════════════════
     INIT
  ══════════════════════════════════════════════ */
  function init() {
    var user = null;
    try {
      var raw =
        sessionStorage.getItem("stackly_user") ||
        localStorage.getItem("stackly_user");
      if (raw) user = JSON.parse(raw);
    } catch (e) {}

    if (!user || !user.email) {
      window.location.href = "../../login.html";
      return;
    }

    var role = user.role || "admin";
    var email = user.email || "";
    var cfg = ROLES[role] || ROLES.admin;
    var name = displayName(email);
    var inits = initials(email);

    injectCSS();
    buildSidebar(cfg, inits, name, email);
    buildHeader(cfg, email);
    applySidebarBreakpoint();
    applyMainMargins();
    intercept404Links();

    /* update page title */
    var pname = pageName();
    if (pname) document.title = "Stackly \u2014 " + pname;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
