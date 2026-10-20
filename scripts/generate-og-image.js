const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function createOgImage() {
  const root = path.resolve(__dirname, '..');
  const cutoutPath = path.join(root, 'public', 'images', 'hero-cutout.png');

  // 1. Prepare Cutout Portrait (Height: 520px, Width: ~444px)
  const resizedCutout = await sharp(cutoutPath)
    .resize({ height: 515, fit: 'contain' })
    .toBuffer();

  const cutoutMeta = await sharp(resizedCutout).metadata();
  console.log('Resized cutout dimensions:', cutoutMeta.width, cutoutMeta.height);

  // 2. Base Background SVG (Layer 0 + Layer 1: Burnt Orange Block & Blueprint Grid)
  const baseBgSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#11110F"/>
      <stop offset="100%" stop-color="#080807"/>
    </linearGradient>
    <radialGradient id="vignette" cx="60%" cy="40%" r="70%">
      <stop offset="0%" stop-color="#1E140F" stop-opacity="0.4"/>
      <stop offset="60%" stop-color="#0A0A09" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="#050505" stop-opacity="0.98"/>
    </radialGradient>
    <pattern id="orangeStripes" width="12" height="12" patternUnits="userSpaceOnUse">
      <rect width="12" height="12" fill="#E64A11"/>
      <line x1="0" y1="6" x2="12" y2="6" stroke="#000000" stroke-width="2" stroke-opacity="0.18"/>
    </pattern>
    <filter id="blockShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="20" stdDeviation="30" flood-color="#000000" flood-opacity="0.85"/>
    </filter>
  </defs>

  <!-- Canvas Background -->
  <rect width="1200" height="630" fill="url(#bgGrad)"/>
  <rect width="1200" height="630" fill="url(#vignette)"/>

  <!-- Exposed Blueprint Grid Lines -->
  <line x1="60" y1="0" x2="60" y2="630" stroke="#FFFFFF" stroke-width="1" stroke-opacity="0.04"/>
  <line x1="470" y1="0" x2="470" y2="630" stroke="#FFFFFF" stroke-width="1" stroke-opacity="0.03"/>
  <line x1="1140" y1="0" x2="1140" y2="630" stroke="#FFFFFF" stroke-width="1" stroke-opacity="0.04"/>

  <!-- Outer Swiss Perimeter Frame -->
  <rect x="20" y="20" width="1160" height="590" rx="3" fill="none" stroke="#262624" stroke-width="1"/>

  <!-- TOP PERIMETER BAR -->
  <line x1="20" y1="58" x2="1180" y2="58" stroke="#262624" stroke-width="1"/>
  
  <g font-family="monospace, -apple-system" font-size="11" font-weight="700" letter-spacing="3" fill="#8E8E88">
    <circle cx="52" cy="38" r="4" fill="#E64A11"/>
    <text x="66" y="42" fill="#FFFFFF">01. ARCHITECTURE</text>
    
    <text x="520" y="42">FULL-STACK SYSTEMS</text>
    
    <text x="1005" y="42" fill="#E64A11">@NAEEIM.SITE_</text>
  </g>

  <!-- LAYER 0: GIANT WATERMARK TEXT -->
  <text x="640" y="380" text-anchor="middle" font-family="-apple-system, system-ui, sans-serif" font-size="180" font-weight="900" fill="#141412" letter-spacing="-8" opacity="0.65">
    NAEEIM // 01
  </text>

  <!-- ========================================================= -->
  <!-- LAYER 1: BURNT ORANGE GEOMETRIC POSTER BLOCK (LEFT)       -->
  <!-- ========================================================= -->
  <g filter="url(#blockShadow)">
    <rect x="70" y="125" width="410" height="425" rx="3" fill="url(#orangeStripes)" stroke="#E64A11" stroke-width="2"/>
    
    <!-- Top-Left Editorial Lead-in inside block -->
    <text x="96" y="166" font-family="-apple-system, system-ui, sans-serif" font-size="13" font-weight="300" fill="#FFE0D4" letter-spacing="0.5">
      Need a resilient
    </text>
    <text x="96" y="188" font-family="-apple-system, system-ui, sans-serif" font-size="15" font-weight="700" fill="#FFFFFF" letter-spacing="0.2">
      full-stack system?
    </text>

    <!-- Bottom Studio Watermark inside block -->
    <text x="96" y="525" font-family="monospace, -apple-system" font-size="10" font-weight="700" fill="#000000" letter-spacing="2" opacity="0.7">
      // 01 STUDIO ARCHITECT
    </text>
  </g>

  <!-- Floating Pixel 1 (Top-Left above block) -->
  <rect x="180" y="88" width="12" height="12" fill="#E64A11" rx="1"/>
</svg>
  `.trim();

  // 3. Foreground Typography & Details SVG (Layer 3: Sits ON TOP of Cutout)
  const foregroundSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <filter id="textGlow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="4" stdDeviation="12" flood-color="#000000" flood-opacity="0.95"/>
    </filter>
  </defs>

  <!-- ========================================================= -->
  <!-- LAYER 3: 3-ROW STACKED IMPACT TYPOGRAPHY (RIGHT)          -->
  <!-- ========================================================= -->
  <g font-family="-apple-system, system-ui, 'Helvetica Neue', sans-serif" filter="url(#textGlow)">
    <!-- Row 1: NAEEIM -->
    <text x="440" y="215" font-size="88" font-weight="900" fill="#FFFFFF" letter-spacing="-3">
      NAEEIM
    </text>

    <!-- Row 2: SOFTWARE -->
    <text x="440" y="295" font-size="88" font-weight="900" fill="#FFFFFF" letter-spacing="-3">
      SOFTWARE
    </text>

    <!-- Row 3: ARCHITECT -->
    <text x="440" y="375" font-size="88" font-weight="900" fill="#E64A11" letter-spacing="-3">
      ARCHITECT
    </text>

    <!-- Circular Chevron Graphic -->
    <circle cx="1035" cy="348" r="26" fill="none" stroke="#FFFFFF" stroke-width="2.5"/>
    <path d="M1030 338 L1041 348 L1030 358" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="square"/>
  </g>

  <!-- Floating Pixels -->
  <rect x="880" y="145" width="10" height="10" fill="#525252" rx="1"/>
  <rect x="1005" y="495" width="12" height="12" fill="#E64A11" rx="1"/>

  <!-- BIO PARAGRAPH -->
  <g font-family="-apple-system, system-ui, sans-serif" font-size="16" fill="#A3A39E" letter-spacing="-0.1" filter="url(#textGlow)">
    <text x="442" y="425" font-weight="400">
      Founder &amp; CEO at <tspan fill="#FFFFFF" font-weight="600">WebZen Bangladesh</tspan>. Shipping mission-critical
    </text>
    <text x="442" y="450" font-weight="400">
      web applications, clinical zero-queue portals, and high-uptime platforms.
    </text>
  </g>

  <!-- TACTILE ACTION BUTTONS (Matching Current Site) -->
  <g font-family="monospace, -apple-system" font-size="11" font-weight="800" letter-spacing="1">
    <!-- Button 1: Solid White (EXPLORE DOSSIERS ↗) -->
    <rect x="442" y="480" width="182" height="38" rx="3" fill="#FFFFFF"/>
    <text x="533" y="504" text-anchor="middle" fill="#000000">EXPLORE DOSSIERS ↗</text>

    <!-- Button 2: Dark Bordered (EXECUTIVE CV) -->
    <rect x="638" y="480" width="160" height="38" rx="3" fill="#141412" stroke="#333330" stroke-width="1.5"/>
    <text x="718" y="504" text-anchor="middle" fill="#EDEDEC">📄 EXECUTIVE CV</text>

    <!-- Button 3: Tag / 600+ Solved -->
    <rect x="812" y="480" width="168" height="38" rx="3" fill="#141412" stroke="#E64A11" stroke-width="1.5"/>
    <text x="896" y="504" text-anchor="middle" fill="#E64A11">600+ CP SOLVED</text>
  </g>

  <!-- BOTTOM PERIMETER BAR -->
  <line x1="20" y1="570" x2="1180" y2="570" stroke="#262624" stroke-width="1"/>
  
  <g font-family="monospace, -apple-system" font-size="11" font-weight="700" letter-spacing="3" fill="#787872">
    <text x="52" y="593" fill="#EDEDEC">@NAEEIM.SITE_</text>
    <text x="490" y="593">DHAKA, BD // UTC+6</text>
    <text x="965" y="593" fill="#E64A11">@600_PROBLEMS_SOLVED</text>
  </g>
</svg>
  `.trim();

  // 4. Render Base Background SVG to PNG
  const basePng = await sharp(Buffer.from(baseBgSvg))
    .png()
    .toBuffer();

  // 5. Render Foreground Typography SVG to PNG
  const foregroundPng = await sharp(Buffer.from(foregroundSvg))
    .png()
    .toBuffer();

  // 6. Multi-layer Composite: Base -> Cutout Portrait -> Foreground Typography
  // Cutout height is 515. Orange block bottom is 125 + 425 = 550.
  // Placement top = 550 - 515 = 35px!
  // Head extends from y=35 to y=125 (90px heroic breakout above orange block!)
  // Left = 160 (places right half over the orange block, shoulder extends toward text)
  const finalComposite = await sharp(basePng)
    .composite([
      {
        input: resizedCutout,
        top: 35,
        left: 155,
      },
      {
        input: foregroundPng,
        top: 0,
        left: 0,
      },
    ])
    .png({ quality: 95 })
    .toBuffer();

  // 7. Save to app/opengraph-image.png (Next.js App Router convention)
  const appOgPath = path.join(root, 'app', 'opengraph-image.png');
  fs.writeFileSync(appOgPath, finalComposite);
  console.log('Saved:', appOgPath);

  // 8. Save to public/og-image.png (for explicit metadata URL reference)
  const publicOgPath = path.join(root, 'public', 'og-image.png');
  fs.writeFileSync(publicOgPath, finalComposite);
  console.log('Saved:', publicOgPath);

  // 9. Save to app/twitter-image.png
  const appTwitterPath = path.join(root, 'app', 'twitter-image.png');
  fs.writeFileSync(appTwitterPath, finalComposite);
  console.log('Saved:', appTwitterPath);
}

createOgImage().catch(err => {
  console.error(err);
  process.exit(1);
});

