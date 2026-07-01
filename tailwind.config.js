/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",

  /* ── Scan every HTML file in the project ── */
  content: [
    "./*.html",
    "./pages/**/*.html",
    "./assets/js/**/*.js",
    "./pages/dashboard/**/*.js",
  ],

  theme: {
    extend: {
      /* ── Colour Palette ── */
      colors: {
        "surface-container-low": "#0d1c2d",
        outline: "#909097",
        "on-secondary-fixed": "#001e2c",
        "tertiary-container": "#00055c",
        "surface-container-high": "#1c2b3c",
        primary: "#bec6e0",
        "on-background": "#d4e4fa",
        "primary-fixed-dim": "#bec6e0",
        surface: "#051424",
        "on-secondary": "#00354a",
        "outline-variant": "#45464d",
        "on-error": "#690005",
        "on-secondary-container": "#00374d",
        tertiary: "#bdc2ff",
        background: "#051424",
        "on-tertiary-fixed": "#000767",
        "inverse-on-surface": "#233143",
        "surface-container": "#122131",
        "inverse-surface": "#d4e4fa",
        "on-surface": "#d4e4fa",
        "on-primary-fixed-variant": "#3f465c",
        "on-error-container": "#ffdad6",
        "secondary-container": "#00a6e0",
        "on-tertiary-container": "#6c77e1",
        "surface-container-highest": "#273647",
        "secondary-fixed-dim": "#7bd0ff",
        "surface-variant": "#273647",
        error: "#ffb4ab",
        "surface-bright": "#2c3a4c",
        secondary: "#7bd0ff",
        "secondary-fixed": "#c4e7ff",
        "on-primary": "#283044",
        "inverse-primary": "#565e74",
        "on-surface-variant": "#c6c6cd",
        "surface-dim": "#051424",
        "on-primary-fixed": "#131b2e",
        "surface-tint": "#bec6e0",
        "tertiary-fixed": "#e0e0ff",
        "surface-container-lowest": "#010f1f",
        "tertiary-fixed-dim": "#bdc2ff",
        "primary-fixed": "#dae2fd",
        "on-secondary-fixed-variant": "#004c69",
        "primary-container": "#0f172a",
        "error-container": "#93000a",
        "on-primary-container": "#798098",
        "on-tertiary-fixed-variant": "#2f3aa3",
        "on-tertiary": "#131e8c",
      },

      /* ── Border Radius ── */
      borderRadius: {
        DEFAULT: "0.125rem",
        lg: "0.25rem",
        xl: "0.5rem",
        full: "0.75rem",
      },

      /* ── Spacing ── */
      spacing: {
        unit: "4px",
        gutter: "16px",
        "max-width": "1440px",
        "margin-desktop": "32px",
        "margin-mobile": "16px",
      },

      /* ── Font Families ── */
      fontFamily: {
        "body-lg": ["Inter", "system-ui", "sans-serif"],
        "headline-xl": ["Inter", "system-ui", "sans-serif"],
        "headline-md": ["Inter", "system-ui", "sans-serif"],
        "headline-lg": ["Inter", "system-ui", "sans-serif"],
        "headline-xl-mobile": ["Inter", "system-ui", "sans-serif"],
        "body-md": ["Inter", "system-ui", "sans-serif"],
        "code-sm": ["JetBrains Mono", "monospace"],
        "label-md": ["Inter", "system-ui", "sans-serif"],
      },

      /* ── Font Sizes (with line-height / letter-spacing / weight) ── */
      fontSize: {
        "body-lg": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "headline-xl": [
          "36px",
          {
            lineHeight: "44px",
            letterSpacing: "-0.02em",
            fontWeight: "700",
          },
        ],
        "headline-md": ["20px", { lineHeight: "28px", fontWeight: "600" }],
        "headline-lg": [
          "24px",
          {
            lineHeight: "32px",
            letterSpacing: "-0.01em",
            fontWeight: "600",
          },
        ],
        "headline-xl-mobile": [
          "28px",
          {
            lineHeight: "34px",
            letterSpacing: "-0.01em",
            fontWeight: "700",
          },
        ],
        "body-md": ["14px", { lineHeight: "20px", fontWeight: "400" }],
        "code-sm": ["13px", { lineHeight: "18px", fontWeight: "400" }],
        "label-md": [
          "12px",
          {
            lineHeight: "16px",
            letterSpacing: "0.05em",
            fontWeight: "600",
          },
        ],
      },
    },
  },

  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/container-queries"),
  ],
};
