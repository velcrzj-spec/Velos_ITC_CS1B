/* =========================================================
   CS 1130 – Introduction to Computing
   branding.js – logo customization (separate from the calculators)

   How it works:
   - Any element with data-brand-slot="name" shows a logo.
   - Its original content is the DEFAULT logo.
   - Uploaded logos are saved in this browser (localStorage)
     and shown again after the page is refreshed.
   ========================================================= */


/* =========================================================
   WEBSITE LOGOS – shown to EVERYONE who opens the website
   ---------------------------------------------------------
   To change a logo for everyone, edit it here and save the file.

   Each logo can be written in one of two ways:
     { svg: `<svg ...>...</svg>` }    a logo drawn in code. It uses the
                                       website's colors and Orbitron font.
     { src: "logos/my-logo.png" }     an image file. Put the file in the
                                       website folder (e.g. a "logos" folder).

   Optional: tone: "military" (amber) or tone: "red" colors the icon tile
   on the project cards to match the logo.

   The "Wake Up, Choom" text next to the main logo takes its color from the
   main logo automatically. For a logo drawn in code you can also set it:
     main: { svg: `...`, textColor: "#c6ff00" }

   The Branding settings page (gear icon) can still try out other
   logos, but those are saved only in that one browser.
   ========================================================= */
const SITE_LOGOS = {

  // Navigation bar, top left: your "Subnet Zero" logo (logos/main-logo.png).
  // textColor sets the color of the "Wake Up, Choom" text next to it.
  main: { src: "logos/main-logo.png", textColor: "#c8e52b" },

  // About page and footer
  university: {
    svg: `
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M24 4 40 10v12c0 10-7 18-16 22C15 40 8 32 8 22V10z"/>
        <path d="M17 20h14M24 20v14M17 34h14M19 27h-4M33 27h-4"/>
        <circle class="lg-fill-magenta lg-no-stroke" cx="24" cy="15" r="2"/>
      </svg>`
  },

  // Browser tab icon: "SZ" monogram (colors written out, because a tab icon cannot use the page's colors)
  favicon: {
    svg: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
        <rect width="64" height="64" rx="14" fill="#080812"/>
        <rect x="3" y="3" width="58" height="58" rx="12" fill="none" stroke="#00f5ff" stroke-width="3"/>
        <path d="M29 19H14v12h15v14H14" fill="none" stroke="#00f5ff" stroke-width="4.5" stroke-linecap="square"/>
        <path d="M35 19h15L35 45h15" fill="none" stroke="#ff00d4" stroke-width="4.5" stroke-linecap="square" stroke-linejoin="miter"/>
      </svg>`
  },

  // Project logos (image files in the "logos" folder)
  project1: { src: "logos/project1.png", tone: "military" },   // Conversion Calculator
  project2: { src: "logos/project2.png", tone: "military" },   // Income Tax Calculator
  project3: { src: "logos/project3.png" },                     // Mathematical Operations Using Loops
  project4: { src: "logos/project4.png", tone: "red" }         // Simple Payroll System
};


/*
  Spare logos drawn in code (not used right now).
  To use one, copy its entry into SITE_LOGOS above, replacing the one there.
*/
const ALT_LOGOS = {
  // Navigation bar, top left: "SUBNET ZERO" wordmark
  main: {
    svg: `
      <svg class="logo-svg" viewBox="0 0 176 80" width="176" height="80" role="img" aria-label="Subnet Zero">
        <path class="lg-line-cyan" d="M2 12V2h12M162 2h12v10M174 68v10h-12M14 78H2V68"/>
        <text class="lg-text lg-white" x="88" y="35" text-anchor="middle" textLength="148" lengthAdjust="spacingAndGlyphs">SUBNET</text>
        <rect class="lg-fill-magenta" x="14" y="52" width="22" height="3"/>
        <rect class="lg-fill-magenta" x="140" y="52" width="22" height="3"/>
        <text class="lg-text lg-cyan" x="88" y="68" text-anchor="middle" textLength="88" lengthAdjust="spacingAndGlyphs">ZERO</text>
      </svg>`
  },

  // Project 01 – Conversion: military high-tech badge (amber, stencil font)
  project1: {
    tone: "military",
    svg: `
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path class="mil-frame" d="M11 3h26l8 8v26l-8 8H11l-8-8V11z"/>
        <path class="mil-stripes" d="M3 14 14 3M3 20 20 3"/>
        <path class="mil-chevron" d="M14 14l10 6 10-6M14 21l10 6 10-6"/>
        <text class="mil-text" x="24" y="41" text-anchor="middle" textLength="24" lengthAdjust="spacingAndGlyphs">CNV</text>
      </svg>`
  },

  // Project 02 – Income tax: same style as the main logo (brackets, cyan and magenta)
  project2: {
    svg: `
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path class="lg-line-cyan" d="M3 11V3h8M37 3h8v8M45 37v8h-8M11 45H3v-8"/>
        <path class="lg-line-white" d="M20 30V9h6a5.5 5.5 0 0 1 0 11h-6"/>
        <path class="lg-line-magenta" d="M15 13h18M15 17h18"/>
        <text class="lg-text lg-cyan lg-small" x="24" y="41" text-anchor="middle" textLength="20" lengthAdjust="spacingAndGlyphs">TAX</text>
      </svg>`
  },

  // Project 03 – Loops: dashed ring with looping arrows
  project3: {
    svg: `
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <circle class="lg-dashed" cx="24" cy="24" r="21"/>
        <path d="M30 13l4 4-4 4M15 23v-2a4 4 0 0 1 4-4h15M18 35l-4-4 4-4M33 25v2a4 4 0 0 1-4 4H14"/>
        <circle class="lg-fill-magenta lg-no-stroke" cx="45" cy="24" r="2.5"/>
      </svg>`
  },

  // Project 04 – Payroll: military + high-tech crest in red (angular industrial font)
  project4: {
    tone: "red",
    svg: `
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path class="red-frame" d="M24 2 43 9v14c0 11-8 19-19 23C13 42 5 34 5 23V9z"/>
        <path class="red-chevron" d="M15 12l9 5 9-5"/>
        <path class="red-circuit" d="M5 23h7l3-3M43 23h-7l-3-3"/>
        <circle class="red-node" cx="15" cy="20" r="1.6"/>
        <circle class="red-node" cx="33" cy="20" r="1.6"/>
        <text class="red-text" x="24" y="33" text-anchor="middle" textLength="20" lengthAdjust="spacingAndGlyphs">PAY</text>
      </svg>`
  }
};


/* ---------- Settings ---------- */

const BRAND_STORAGE_KEY = "cs1130-branding-v1";
const BRAND_MAX_FILE_BYTES = 2 * 1024 * 1024;   // 2 MB upload limit
const BRAND_MAX_PIXELS = 512;                    // big images are shrunk to save space
const BRAND_ALLOWED_TYPES = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/svg+xml": "svg",
  "image/webp": "webp"
};

/*
  The logos that can be changed.
  - id:      matches data-brand-slot="..." in index.html ("favicon" is the browser tab icon)
  - size:    [smallest, default, largest] height in pixels (null = no size control)
  - canHide: true if the logo can be removed (hidden) completely
*/
const BRAND_SLOTS = [
  { id: "main",       title: "Main website logo",       where: "Navigation bar",          size: [24, 44, 72],  canHide: true },
  { id: "university", title: "University logo",         where: "About page and footer",   size: [24, 56, 120], canHide: true },
  { id: "favicon",    title: "Website icon (favicon)",  where: "Browser tab",             size: null,          canHide: false },
  { id: "project1",   title: "Project 01 icon",         where: "Conversion card",         size: [32, 50, 80],  canHide: false },
  { id: "project2",   title: "Project 02 icon",         where: "Income Tax card",         size: [32, 50, 80],  canHide: false },
  { id: "project3",   title: "Project 03 icon",         where: "Loops card",              size: [32, 50, 80],  canHide: false },
  { id: "project4",   title: "Project 04 icon",         where: "Payroll card",            size: [32, 50, 80],  canHide: false }
];


/* ---------- Saved settings ---------- */

// Current settings for every slot: { mode: "default" | "custom" | "hidden", src, size }
let brandSettings = {};

// Default logos, remembered when the page loads
const brandDefaults = { html: new Map(), favicon: "" };

// Logos chosen but not applied yet (waiting for "Apply")
const brandPending = {};

function loadBrandSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(BRAND_STORAGE_KEY) || "{}");
    brandSettings = (saved && typeof saved === "object") ? saved : {};
  } catch (error) {
    brandSettings = {};   // storage blocked or broken: use defaults
  }
}

// Save settings. Returns true if it worked.
function saveBrandSettings() {
  try {
    localStorage.setItem(BRAND_STORAGE_KEY, JSON.stringify(brandSettings));
    return true;
  } catch (error) {
    return false;   // e.g. storage full or blocked
  }
}

function getSlotConfig(slotId) {
  for (let i = 0; i < BRAND_SLOTS.length; i++) {
    if (BRAND_SLOTS[i].id === slotId) return BRAND_SLOTS[i];
  }
  return null;
}

function getSlotSetting(slotId) {
  const config = getSlotConfig(slotId);
  const saved = brandSettings[slotId] || {};
  return {
    mode: saved.mode || "default",
    src: saved.src || "",
    size: saved.size || (config.size ? config.size[1] : null)
  };
}


/* ---------- Show logos on the page ---------- */

// Put the logos from SITE_LOGOS into the page. These become the default logos.
function installSiteLogos() {
  for (const [slotId, logo] of Object.entries(SITE_LOGOS)) {
    if (!logo) continue;

    if (slotId === "favicon") {
      const href = logo.src || "data:image/svg+xml," + encodeURIComponent(logo.svg.trim());
      document.getElementById("favicon").setAttribute("href", href);
      continue;
    }

    const config = getSlotConfig(slotId);
    for (const element of document.querySelectorAll(`[data-brand-slot="${slotId}"]`)) {
      // Color the icon tile to match the logo (see "tone" above)
      if (logo.tone) {
        element.dataset.logoTone = logo.tone;
      } else {
        delete element.dataset.logoTone;
      }
      if (logo.src) {
        const img = document.createElement("img");
        img.src = logo.src;
        img.alt = config ? config.title : "Logo";
        element.innerHTML = "";
        element.appendChild(img);
      } else {
        element.innerHTML = logo.svg.trim();
      }
    }
  }
}

// Remember each slot's original content so it can be restored
function rememberDefaults() {
  const elements = document.querySelectorAll("[data-brand-slot]");
  for (let i = 0; i < elements.length; i++) {
    brandDefaults.html.set(elements[i], elements[i].innerHTML);
  }
  brandDefaults.favicon = document.getElementById("favicon").getAttribute("href");
}

// Update one slot everywhere it appears
function applyBrandSlot(slotId) {
  const config = getSlotConfig(slotId);
  const setting = getSlotSetting(slotId);

  if (slotId === "favicon") {
    const href = (setting.mode === "custom") ? setting.src : brandDefaults.favicon;
    document.getElementById("favicon").setAttribute("href", href);
    return;
  }

  // The "Wake Up, Choom" text follows the main logo's color
  if (slotId === "main") {
    setTimeout(updateLogoTextColor, 0);
  }

  const elements = document.querySelectorAll('[data-brand-slot="' + slotId + '"]');
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    element.classList.remove("brand-custom", "brand-hidden");

    if (setting.mode === "custom") {
      const img = document.createElement("img");
      img.src = setting.src;
      img.alt = config.title;
      element.innerHTML = "";
      element.appendChild(img);
      element.classList.add("brand-custom");
    } else {
      element.innerHTML = brandDefaults.html.get(element);
      if (setting.mode === "hidden") {
        element.classList.add("brand-hidden");
      }
    }

    // Small copies (e.g. the footer logo) use 60% of the size
    if (config.size) {
      const scale = element.classList.contains("uni-logo-small") ? 0.6 : 1;
      element.style.setProperty("--brand-size", Math.round(setting.size * scale) + "px");
    }
  }
}

/* ---------- "Wake Up, Choom" text follows the main logo's color ---------- */

// Set the text colors from one main color, e.g. "#c6ff00"
function setLogoTextColor(hex) {
  const text = document.querySelector(".logo-text");
  if (!text) return;
  const names = ["--logo-text-main", "--logo-text-accent", "--logo-text-glow", "--logo-text-bar"];
  if (!hex) {
    names.forEach((name) => text.style.removeProperty(name));   // back to the wordmark colors
    return;
  }
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  const mix = (value, amount) => Math.round(value + (255 - value) * amount);   // lighten toward white
  text.style.setProperty("--logo-text-accent", hex);
  text.style.setProperty("--logo-text-main", `rgb(${mix(r, 0.75)}, ${mix(g, 0.75)}, ${mix(b, 0.75)})`);
  text.style.setProperty("--logo-text-glow", `rgba(${r}, ${g}, ${b}, 0.5)`);
  text.style.setProperty("--logo-text-bar", `rgba(${r}, ${g}, ${b}, 0.7)`);
}

// Find the main (most colorful) color of an image. Returns "#rrggbb" or "" if none.
function findLogoColor(img) {
  try {
    const size = 64;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext("2d");
    context.drawImage(img, 0, 0, size, size);
    const pixels = context.getImageData(0, 0, size, size).data;

    let red = 0, green = 0, blue = 0, weight = 0;
    for (let i = 0; i < pixels.length; i += 4) {
      const [r, g, b, a] = [pixels[i], pixels[i + 1], pixels[i + 2], pixels[i + 3]];
      if (a < 128) continue;                                   // skip transparent pixels
      const max = Math.max(r, g, b);
      const saturation = max === 0 ? 0 : (max - Math.min(r, g, b)) / max;
      if (saturation < 0.35 || max < 70) continue;             // skip grey, white, and dark pixels
      const w = saturation * max;                              // bright, colorful pixels count more
      red += r * w; green += g * w; blue += b * w; weight += w;
    }
    if (weight === 0) return "";

    // Brighten a little so the text stays readable on the dark header
    let [r, g, b] = [red, green, blue].map((sum) => sum / weight);
    const boost = 230 / Math.max(r, g, b);
    if (boost > 1) [r, g, b] = [r, g, b].map((value) => Math.min(255, value * boost));
    return "#" + [r, g, b].map((value) => Math.round(value).toString(16).padStart(2, "0")).join("");
  } catch (error) {
    return "";   // the browser blocked reading the image
  }
}

// Called whenever the main logo changes
function updateLogoTextColor() {
  const setting = getSlotSetting("main");
  const configColor = SITE_LOGOS.main && SITE_LOGOS.main.textColor;
  const img = document.querySelector('[data-brand-slot="main"] img');

  if (setting.mode !== "custom" && !img) {
    setLogoTextColor(configColor || "");                       // code logo: wordmark colors
    return;
  }
  if (!img) return;
  const apply = () => setLogoTextColor(findLogoColor(img) || configColor || "");
  if (img.complete && img.naturalWidth > 0) {
    apply();
  } else {
    img.addEventListener("load", apply, { once: true });
  }
}

function applyAllBrandSlots() {
  for (let i = 0; i < BRAND_SLOTS.length; i++) {
    applyBrandSlot(BRAND_SLOTS[i].id);
  }
}


/* ---------- Checking and preparing uploaded images ---------- */

// Find the image type from the file (or its name, if the browser gives no type)
function getImageType(file) {
  if (BRAND_ALLOWED_TYPES[file.type]) return file.type;
  const name = file.name.toLowerCase();
  if (name.endsWith(".svg")) return "image/svg+xml";
  if (name.endsWith(".png")) return "image/png";
  if (name.endsWith(".jpg") || name.endsWith(".jpeg")) return "image/jpeg";
  if (name.endsWith(".webp")) return "image/webp";
  return "";
}

// Check the file. Returns an error message, or "" if it is fine.
function validateLogoFile(file) {
  if (!file) return "No file was chosen.";
  if (getImageType(file) === "") {
    return "Unsupported file type. Please use PNG, JPG, SVG, or WebP.";
  }
  if (file.size > BRAND_MAX_FILE_BYTES) {
    return "The file is too large (" + (file.size / 1024 / 1024).toFixed(1) + " MB). The limit is 2 MB.";
  }
  if (file.size === 0) return "The file is empty.";
  return "";
}

function readFileAsDataUrl(file) {
  return new Promise(function (resolve, reject) {
    const reader = new FileReader();
    reader.onload = function () { resolve(reader.result); };
    reader.onerror = function () { reject(new Error("The file could not be read.")); };
    reader.readAsDataURL(file);
  });
}

function loadImage(src) {
  return new Promise(function (resolve, reject) {
    const img = new Image();
    img.onload = function () { resolve(img); };
    img.onerror = function () { reject(new Error("This file is not a valid image.")); };
    img.src = src;
  });
}

/*
  Turn the file into a saved image (data URL).
  - SVG files are kept as they are.
  - Large PNG/JPG/WebP images are shrunk to at most 512 px,
    keeping the aspect ratio. PNG and WebP stay transparent.
*/
async function prepareLogo(file) {
  const type = getImageType(file);
  let dataUrl = await readFileAsDataUrl(file);

  if (type === "image/svg+xml") {
    const text = await file.text();
    if (text.toLowerCase().indexOf("<svg") === -1) {
      throw new Error("This SVG file does not contain an image.");
    }
    // Make sure the browser can draw it
    await loadImage(dataUrl);
    return dataUrl;
  }

  const img = await loadImage(dataUrl);
  const largestSide = Math.max(img.naturalWidth, img.naturalHeight);
  if (largestSide > BRAND_MAX_PIXELS) {
    const scale = BRAND_MAX_PIXELS / largestSide;
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(img.naturalWidth * scale);
    canvas.height = Math.round(img.naturalHeight * scale);
    canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
    // JPG stays JPG; PNG and WebP become PNG so transparency is kept
    dataUrl = (type === "image/jpeg")
      ? canvas.toDataURL("image/jpeg", 0.9)
      : canvas.toDataURL("image/png");
  }
  return dataUrl;
}


/* ---------- Branding settings page ---------- */

// Build one settings card for a slot
function buildSlotCard(config) {
  const id = config.id;
  let html = "";
  html += '<div class="brand-slot" data-slot="' + id + '">';
  html += '  <div class="brand-slot-head"><h4>' + config.title + '</h4><span class="card-tag">' + config.where + '</span></div>';
  html += '  <div class="brand-previews">';
  html += '    <figure><div class="brand-preview" id="brandCurrent-' + id + '"></div><figcaption>Current</figcaption></figure>';
  html += '    <figure class="brand-new" id="brandNewBox-' + id + '" hidden><div class="brand-preview" id="brandNew-' + id + '"></div><figcaption>New (not applied yet)</figcaption></figure>';
  html += '  </div>';
  html += '  <label class="file-button">Choose image…';
  html += '    <input type="file" id="brandFile-' + id + '" accept=".png,.jpg,.jpeg,.svg,.webp,image/png,image/jpeg,image/svg+xml,image/webp">';
  html += '  </label>';
  html += '  <div class="brand-pending" id="brandPending-' + id + '" hidden>';
  html += '    <button type="button" data-action="apply">Apply</button>';
  html += '    <button type="button" class="btn-ghost" data-action="cancel">Cancel</button>';
  html += '  </div>';
  if (config.size) {
    html += '  <label class="brand-size-label" for="brandSize-' + id + '">Size <span id="brandSizeValue-' + id + '"></span></label>';
    html += '  <input type="range" class="brand-range" id="brandSize-' + id + '" min="' + config.size[0] + '" max="' + config.size[2] + '" step="1">';
  }
  html += '  <div class="brand-actions">';
  if (config.canHide) {
    html += '    <button type="button" class="btn-ghost" data-action="hide">Remove logo</button>';
  }
  html += '    <button type="button" class="btn-ghost" data-action="restore">Restore default</button>';
  html += '  </div>';
  html += '  <p class="brand-status" id="brandStatus-' + id + '" role="status"></p>';
  html += '</div>';
  return html;
}

// Show the current logo in the slot's "Current" preview box
function updateCurrentPreview(slotId) {
  const setting = getSlotSetting(slotId);
  const box = document.getElementById("brandCurrent-" + slotId);
  box.innerHTML = "";

  if (setting.mode === "custom") {
    const img = document.createElement("img");
    img.src = setting.src;
    img.alt = "Current logo";
    box.appendChild(img);
  } else if (setting.mode === "hidden") {
    box.innerHTML = '<span class="brand-preview-text">Removed</span>';
  } else if (slotId === "favicon") {
    const img = document.createElement("img");
    img.src = brandDefaults.favicon;
    img.alt = "Default icon";
    box.appendChild(img);
  } else {
    const element = document.querySelector('[data-brand-slot="' + slotId + '"]');
    box.innerHTML = '<span class="brand-default">' + brandDefaults.html.get(element) + '</span>';
  }

  // Size slider
  const range = document.getElementById("brandSize-" + slotId);
  if (range) {
    range.value = setting.size;
    document.getElementById("brandSizeValue-" + slotId).textContent = setting.size + "px";
  }
}

function setSlotStatus(slotId, message, isError) {
  const status = document.getElementById("brandStatus-" + slotId);
  status.textContent = message;
  status.classList.toggle("error", Boolean(isError));
}

function showPendingPreview(slotId, src) {
  const box = document.getElementById("brandNew-" + slotId);
  box.innerHTML = "";
  const img = document.createElement("img");
  img.src = src;
  img.alt = "New logo preview";
  box.appendChild(img);
  document.getElementById("brandNewBox-" + slotId).hidden = false;
  document.getElementById("brandPending-" + slotId).hidden = false;
}

function clearPending(slotId) {
  delete brandPending[slotId];
  document.getElementById("brandNewBox-" + slotId).hidden = true;
  document.getElementById("brandPending-" + slotId).hidden = true;
  document.getElementById("brandFile-" + slotId).value = "";
}

// Change a slot's setting, save it, and update the page
function updateSlot(slotId, changes, successMessage) {
  const previous = brandSettings[slotId];
  brandSettings[slotId] = Object.assign({}, getSlotSetting(slotId), changes);

  if (!saveBrandSettings()) {
    brandSettings[slotId] = previous;   // undo
    setSlotStatus(slotId, "Could not save. The browser storage may be full or blocked. Try a smaller image.", true);
    return false;
  }
  applyBrandSlot(slotId);
  updateCurrentPreview(slotId);
  setSlotStatus(slotId, successMessage, false);
  return true;
}

// A file was chosen: check it and show the preview
async function handleLogoFile(slotId, file) {
  const error = validateLogoFile(file);
  if (error !== "") {
    clearPending(slotId);
    setSlotStatus(slotId, error, true);
    return;
  }
  setSlotStatus(slotId, "Checking image…", false);
  try {
    const src = await prepareLogo(file);
    brandPending[slotId] = src;
    showPendingPreview(slotId, src);
    setSlotStatus(slotId, "Preview ready. Click Apply to use this logo.", false);
  } catch (problem) {
    clearPending(slotId);
    setSlotStatus(slotId, problem.message, true);
  }
}

// Apply / Cancel / Remove / Restore buttons
function handleSlotAction(slotId, action) {
  if (action === "apply" && brandPending[slotId]) {
    if (updateSlot(slotId, { mode: "custom", src: brandPending[slotId] }, "New logo applied.")) {
      clearPending(slotId);
    }
  } else if (action === "cancel") {
    clearPending(slotId);
    setSlotStatus(slotId, "Upload cancelled.", false);
  } else if (action === "hide") {
    clearPending(slotId);
    updateSlot(slotId, { mode: "hidden", src: "" }, "Logo removed. Click Restore default to bring it back.");
  } else if (action === "restore") {
    clearPending(slotId);
    const config = getSlotConfig(slotId);
    updateSlot(slotId, { mode: "default", src: "", size: config.size ? config.size[1] : null }, "Default logo restored.");
  }
}

function restoreAllLogos() {
  brandSettings = {};
  const saved = saveBrandSettings();
  for (let i = 0; i < BRAND_SLOTS.length; i++) {
    const id = BRAND_SLOTS[i].id;
    clearPending(id);
    applyBrandSlot(id);
    updateCurrentPreview(id);
    setSlotStatus(id, "", false);
  }
  const status = document.getElementById("brandGlobalStatus");
  status.textContent = saved ? "All default logos restored." : "Defaults shown, but the browser could not save this change.";
  status.classList.toggle("error", !saved);
}

// Build the settings page and connect its controls
function setupBrandingPage() {
  const container = document.getElementById("brandingSlots");
  let html = "";
  for (let i = 0; i < BRAND_SLOTS.length; i++) {
    html += buildSlotCard(BRAND_SLOTS[i]);
  }
  container.innerHTML = html;

  for (let i = 0; i < BRAND_SLOTS.length; i++) {
    const id = BRAND_SLOTS[i].id;
    updateCurrentPreview(id);

    document.getElementById("brandFile-" + id).addEventListener("change", function () {
      handleLogoFile(id, this.files[0]);
    });

    const range = document.getElementById("brandSize-" + id);
    if (range) {
      // Live update while dragging; save when released
      range.addEventListener("input", function () {
        brandSettings[id] = Object.assign({}, getSlotSetting(id), { size: Number(this.value) });
        applyBrandSlot(id);
        document.getElementById("brandSizeValue-" + id).textContent = this.value + "px";
      });
      range.addEventListener("change", function () {
        updateSlot(id, { size: Number(this.value) }, "Size saved.");
      });
    }
  }

  container.addEventListener("click", function (event) {
    const button = event.target.closest("button[data-action]");
    if (!button) return;
    const slotId = button.closest(".brand-slot").dataset.slot;
    handleSlotAction(slotId, button.dataset.action);
  });

  document.getElementById("brandRestoreAll").addEventListener("click", restoreAllLogos);
}


/* ---------- Start ---------- */
function setupBranding() {
  installSiteLogos();       // logos from SITE_LOGOS (shown to everyone)
  rememberDefaults();
  loadBrandSettings();
  applyAllBrandSlots();
  setupBrandingPage();
}

document.addEventListener("DOMContentLoaded", setupBranding);
