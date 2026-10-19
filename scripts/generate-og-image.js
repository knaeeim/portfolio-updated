const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function createOgImage() {
  const root = path.resolve(__dirname, '..');
  const cutoutPath = path.join(root, 'public', 'images', 'hero-cutout.png');

  // 1. Prepare Cutout Portrait (Height: 520px)
  const resizedCutout = await sharp(cutoutPath)
    .resize({ height: 530, fit: 'contain' })
    .toBuffer();

  const cutoutMeta = await sharp(resizedCutout).metadata();
  console.log('Resized cutout dimensions:', cutoutMeta.width, cutoutMeta.height);

  // 2. Base 1200x630 SVG with Editorial Poster Aesthetics
  const baseSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#121210"/>
      <stop offset="100%" stop-color="#080807"/>
    </linearGradient>
    <radialGradient id="vignette" cx="75%" cy="40%" r="65%">
      <stop offset="0%" stop-color="#24140D" stop-opacity="0.4"/>
      <stop offset="60%" stop-color="#0A0A09" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#050505" stop-opacity="0.95"/>
    </radialGradient>
    <pattern id="corduroy" width="12" height="12" patternUnits="userSpaceOnUse">
      <line x1="0" y1="6" x2="12" y2="6" stroke="#000000" stroke-width="2" stroke-opacity="0.15"/>
    </pattern>
    <pattern id="orangeStripes" width="12" height="12" patternUnits="userSpaceOnUse">
      <rect width="12" height="12" fill="#E64A11"/>
      <line x1="0" y1="6" x2="12" y2="6" stroke="#000000" stroke-width="2" stroke-opacity="0.2"/>
    </pattern>
    <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#000000" flood-opacity="0.8"/>
    </filter>
  </defs>

  <!-- Background Base -->
  <rect width="1200" height="630" fill="url(#bgGrad)"/>
  <rect width="1200" height="630" fill="url(#vignette)"/>

  <!-- Subtle Exposed Grid Lines (Swiss Precision) -->
  <line x1="60" y1="0" x2="60" y2="630" stroke="#FFFFFF" stroke-width="1" stroke-opacity="0.04"/>
  <line x1="710" y1="0" x2="710" y2="630" stroke="#FFFFFF" stroke-width="1" stroke-opacity="0.04"/>
  <line x1="1140" y1="0" x2="1140" y2="630" stroke="#FFFFFF" stroke-width="1" stroke-opacity="0.04"/>

  <!-- Outer Border Frame -->
  <rect x="24" y="24" width="1152" height="582" rx="4" fill="none" stroke="#262624" stroke-width="1"/>

  <!-- TOP PERIMETER BAR -->
  <line x1="24" y1="68" x2="1176" y2="68" stroke="#262624" stroke-width="1"/>
  
  <g font-family="monospace, -apple-system" font-size="11" font-weight="700" letter-spacing="3" fill="#8E8E88">
    <!-- Left badge -->
    <circle cx="64" cy="46" r="4" fill="#E64A11"/>
    <text x="78" y="50" fill="#FFFFFF">01. ARCHITECTURE</text>
    
    <!-- Center coordinate -->
    <text x="460" y="50">DHAKA, BD // UTC+6</text>
    
    <!-- Right domain -->
    <text x="1000" y="50" fill="#E64A11">@NAEEIM.SITE_</text>
  </g>

  <!-- BACKGROUND WATERMARK (Subtle Large Text) -->
  <text x="70" y="490" font-family="-apple-system, system-ui, sans-serif" font-size="170" font-weight="900" fill="#141412" letter-spacing="-8" opacity="0.6">
    NAEEIM
  </text>

  <!-- ========================================================= -->
  <!-- RIGHT SIDE: BURNT ORANGE GEOMETRIC POSTER BLOCK           -->
  <!-- ========================================================= -->
  <g filter="url(#cardShadow)">
    <rect x="740" y="115" width="370" height="425" rx="4" fill="url(#orangeStripes)" stroke="#E64A11" stroke-width="2"/>
    
    <!-- Top-Left Editorial Lead-in inside block -->
    <text x="765" y="152" font-family="-apple-system, system-ui, sans-serif" font-size="13" font-weight="300" fill="#FFE5DC" letter-spacing="0.5">
      Need a resilient
    </text>
    <text x="765" y="172" font-family="-apple-system, system-ui, sans-serif" font-size="14" font-weight="700" fill="#FFFFFF" letter-spacing="0.2">
      full-stack system?
    </text>

    <!-- Bottom Studio Watermark inside block -->
    <text x="765" y="515" font-family="monospace, -apple-system" font-size="10" font-weight="700" fill="#000000" letter-spacing="2" opacity="0.6">
      // 01 STUDIO ARCHITECT
    </text>
  </g>

  <!-- ========================================================= -->
  <!-- LEFT SIDE: EDITORIAL STACKED IMPACT TYPOGRAPHY            -->
  <!-- ========================================================= -->
  <g font-family="-apple-system, system-ui, 'Helvetica Neue', sans-serif">
    <!-- Row 1: NAEEIM -->
    <text x="68" y="178" font-size="78" font-weight="900" fill="#FFFFFF" letter-spacing="-3">
      NAEEIM
    </text>

    <!-- Row 2: SOFTWARE -->
    <text x="68" y="250" font-size="78" font-weight="900" fill="#FFFFFF" letter-spacing="-3">
      SOFTWARE
    </text>

    <!-- Row 3: ARCHITECT -->
    <text x="68" y="322" font-size="78" font-weight="900" fill="#E64A11" letter-spacing="-3">
      ARCHITECT
    </text>

    <!-- Circular Chevron Graphic -->
    <circle cx="560" cy="298" r="24" fill="none" stroke="#FFFFFF" stroke-width="2"/>
    <path d="M556 290 L566 298 L556 306" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="square"/>
  </g>

  <!-- BIO PARAGRAPH -->
  <g font-family="-apple-system, system-ui, sans-serif" font-size="17" fill="#A8A8A2" letter-spacing="-0.2">
    <text x="70" y="375" font-weight="400">
      Founder &amp; CEO at <tspan fill="#FFFFFF" font-weight="600">WebZen Bangladesh</tspan>. Shipping mission-critical
    </text>
    <text x="70" y="401" font-weight="400">
      web platforms, clinical zero-queue systems &amp; cloud architectures.
    </text>
  </g>

  <!-- CREDENTIAL PILLS & TECH TAGS -->
  <g font-family="monospace, -apple-system" font-size="11" font-weight="700" letter-spacing="1">
    <!-- Pill 1: 600+ CP -->
    <rect x="70" y="435" width="145" height="32" rx="3" fill="#181816" stroke="#E64A11" stroke-width="1.5"/>
    <text x="86" y="456" fill="#E64A11">600+ CP SOLVED</text>

    <!-- Pill 2: 100+ MENTORED -->
    <rect x="225" y="435" width="145" height="32" rx="3" fill="#181816" stroke="#333330" stroke-width="1"/>
    <text x="241" y="456" fill="#EDEDEC">100+ MENTORED</text>

    <!-- Pill 3: NEXT.JS 16 -->
    <rect x="380" y="435" width="125" height="32" rx="3" fill="#181816" stroke="#333330" stroke-width="1"/>
    <text x="398" y="456" fill="#EDEDEC">NEXT.JS 16</text>

    <!-- Pill 4: AI RESEARCH -->
    <rect x="515" y="435" width="125" height="32" rx="3" fill="#181816" stroke="#333330" stroke-width="1"/>
    <text x="532" y="456" fill="#10B981">AI VISION</text>
  </g>

  <!-- BOTTOM PERIMETER BAR -->
  <line x1="24" y1="562" x2="1176" y2="562" stroke="#262624" stroke-width="1"/>
  
  <g font-family="monospace, -apple-system" font-size="11" font-weight="700" letter-spacing="3" fill="#787872">
    <text x="64" y="586" fill="#EDEDEC">WWW.NAEEIM.SITE</text>
    <text x="460" y="586">PRODUCTION SYSTEMS &amp; ADVISORY</text>
    <text x="970" y="586" fill="#E64A11">© 2026 NAEEIM</text>
  </g>

</svg>
  `.trim();

  // 3. Render base SVG to 1200x630 PNG buffer
  const basePng = await sharp(Buffer.from(baseSvg))
    .png()
    .toBuffer();

  // 4. Calculate Cutout Portrait Placement
  // Cutout height is 530px. Orange block bottom is 115 + 425 = 540.
  // So placement at top = 540 - 530 = 10px!
  // Head extends from 10px to 115px (105px breakout above orange block!)
  // Horizontal placement: x = 700 (overlapping right of orange block nicely)
  const finalComposite = await sharp(basePng)
    .composite([
      {
        input: resizedCutout,
        top: 10,
        left: 700,
      },
    ])
    .png({ quality: 95 })
    .toBuffer();

  // 5. Save to app/opengraph-image.png (Next.js App Router convention)
  const appOgPath = path.join(root, 'app', 'opengraph-image.png');
  fs.writeFileSync(appOgPath, finalComposite);
  console.log('Saved:', appOgPath);

  // 6. Save to public/og-image.png (for explicit metadata URL reference)
  const publicOgPath = path.join(root, 'public', 'og-image.png');
  fs.writeFileSync(publicOgPath, finalComposite);
  console.log('Saved:', publicOgPath);

  // 7. Save to app/twitter-image.png and public/twitter-image.png
  const appTwitterPath = path.join(root, 'app', 'twitter-image.png');
  fs.writeFileSync(appTwitterPath, finalComposite);
  console.log('Saved:', appTwitterPath);
}

createOgImage().catch(err => {
  console.error(err);
  process.exit(1);
});
