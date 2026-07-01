/**
 * migrate-tailwind.js
 * Inserts the correct relative <link> to assets/css/tailwind.css in
 * every HTML file that was already stripped of the CDN script.
 *
 * Run once: node migrate-tailwind.js
 */

const fs   = require("fs");
const path = require("path");

const ROOT = __dirname;

// Depth → relative path to tailwind.css
const DEPTH_MAP = {
  0: "./assets/css/tailwind.css",           // root files (index.html, 404.html)
  1: "../assets/css/tailwind.css",          // pages/*.html
  2: "../../assets/css/tailwind.css",       // pages/components/*.html, pages/dashboard/*.html
  3: "../../../assets/css/tailwind.css",    // pages/dashboard/<role>/*.html
};

function depthFromRoot(filePath) {
  const rel = path.relative(ROOT, path.dirname(filePath));
  if (!rel) return 0;
  return rel.split(path.sep).length;
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  const depth  = depthFromRoot(filePath);
  const relCss = DEPTH_MAP[depth] || ("../".repeat(depth) + "assets/css/tailwind.css");
  const linkTag = `    <link rel="stylesheet" href="${relCss}" />`;

  // Only insert if not already present
  if (!content.includes("tailwind.css")) {
    content = content.replace(/<\/head>/, linkTag + "\n  </head>");
    fs.writeFileSync(filePath, content, "utf8");
    return true;
  }
  return false;
}

// Walk all HTML files, skip node_modules
function walk(dir) {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === "node_modules") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(walk(full));
    } else if (entry.name.endsWith(".html")) {
      results.push(full);
    }
  }
  return results;
}

const htmlFiles = walk(ROOT);
let updated = 0;
let skipped = 0;

for (const file of htmlFiles) {
  const changed = processFile(file);
  const rel = path.relative(ROOT, file);
  if (changed) {
    console.log("LINKED: " + rel);
    updated++;
  } else {
    console.log("SKIP:   " + rel);
    skipped++;
  }
}

console.log("\nDone -- " + updated + " updated, " + skipped + " skipped.");
