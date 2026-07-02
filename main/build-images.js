/*
 * build-images.js — Responsive image build for GMIC main site.
 *
 * Converts the product-scene photos (indus/*) and factory photos (about/*, shenzhen)
 * into WebP (quality 82) plus a .jpg fallback, at the 1x and 2x pixel sizes each image
 * is actually displayed at. Output naming follows the <picture>/srcset convention used
 * across the site:
 *
 *     {name}-{W}.webp      1x  (width = W)
 *     {name}-{W}@2x.webp   2x  (width = min(2*W, native))   -- never upscaled past source
 *     {name}-{W}.jpg       1x  jpeg fallback
 *     {name}-{W}@2x.jpg    2x  jpeg fallback
 *
 * Usage:  node build-images.js
 *
 * Requires the `sharp` package. It is resolved from a normal install first, then from
 * the machine's global npm modules (that is where it lives on this box).
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ── Resolve sharp (local install, else global npm root) ─────────────────────
function loadSharp() {
  try { return require('sharp'); } catch (_) {}
  let globalRoot = '';
  try { globalRoot = execSync('npm root -g', { encoding: 'utf8' }).trim(); } catch (_) {}
  const candidates = [
    globalRoot && path.join(globalRoot, 'sharp'),
    globalRoot && path.join(globalRoot, 'openclaw', 'node_modules', 'sharp'),
  ].filter(Boolean);
  for (const c of candidates) {
    try { return require(c); } catch (_) {}
  }
  console.error('Could not load `sharp`. Install it with:  npm i sharp');
  process.exit(1);
}
const sharp = loadSharp();

const IMG_DIR = path.join(__dirname, 'img');
const WEBP_QUALITY = 82;
const JPEG_QUALITY = 82;

// ── Manifest: source (relative to img/) -> list of 1x display widths ─────────
// A source may appear at several display sizes across the site; list every
// distinct 1x width once. The 2x variant is derived as 2*W, capped at the
// source's native width (no upscaling).
const MANIFEST = [
  // Factory / manufacturing photos (mostly 3024x2016 — large enough for true 2x everywhere).
  // Widths listed = every distinct 1x display width the image is used at across the site.
  { src: 'about/assembly-workers.jpg', widths: [380, 520, 600, 680, 760, 960, 1400] },
  { src: 'about/assembly-line.jpg',    widths: [520, 680, 720, 1520] },
  { src: 'about/smt-hanwha.jpg',       widths: [380, 520] },
  { src: 'about/aoi-inspection.jpg',   widths: [380, 520, 600, 720] },
  { src: 'about/reflow-solder.jpg',    widths: [380, 520, 600, 700] },
  { src: 'about/qc-inspection.jpg',    widths: [380, 520, 600, 700, 960] },
  { src: 'about/bv50p.jpg',            widths: [380, 520, 600, 720] },
  { src: 'about/wave-solder.jpg',      widths: [380, 520, 600] },
  { src: 'about/factory-exterior.jpg', widths: [700, 960] },
  { src: 'about/smt-machines.jpg',     widths: [380, 600, 720] },
  { src: 'about/reception-logo.jpg',   widths: [600] },
  // Shenzhen office photo (2400x1614 png source -> jpg/webp)
  { src: 'shenzhen.png',               widths: [700] },
  // Product scene photos (portrait ~1000x1333 png -> jpg/webp).
  // NOTE: sources are only ~1000px wide; see the resolution warnings below.
  { src: 'indus/healthcare.png',       widths: [540] },
  { src: 'indus/enterprise.png',       widths: [540] },
  { src: 'indus/nemt.png',             widths: [540] },
  { src: 'indus/field.png',            widths: [540] },
];

async function build() {
  let made = 0;
  const warnings = [];

  for (const entry of MANIFEST) {
    const srcPath = path.join(IMG_DIR, entry.src);
    if (!fs.existsSync(srcPath)) {
      warnings.push(`MISSING SOURCE: ${entry.src}`);
      continue;
    }
    const meta = await sharp(srcPath).metadata();
    const native = meta.width;
    const dir = path.dirname(srcPath);
    const base = path.basename(entry.src, path.extname(entry.src));

    for (const w of entry.widths) {
      const targets = [
        { w1x: w, suffix: `-${w}`,     want: w },
        { w1x: w, suffix: `-${w}@2x`,  want: w * 2 },
      ];
      for (const t of targets) {
        const outW = Math.min(t.want, native); // never upscale past source
        if (t.want > native) {
          warnings.push(
            `${entry.src}: ${t.suffix} wanted ${t.want}px but source is only ${native}px wide — ` +
            `capped to ${outW}px. 需重新生成更高分辨率源图 (regenerate a higher-resolution source).`
          );
        }
        const webpOut = path.join(dir, `${base}${t.suffix}.webp`);
        const jpgOut  = path.join(dir, `${base}${t.suffix}.jpg`);
        await sharp(srcPath).resize({ width: outW, withoutEnlargement: true })
          .webp({ quality: WEBP_QUALITY }).toFile(webpOut);
        await sharp(srcPath).resize({ width: outW, withoutEnlargement: true })
          .jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toFile(jpgOut);
        made += 2;
        console.log(`  ${path.relative(__dirname, webpOut)}  (${outW}px)`);
      }
    }
  }

  console.log(`\nGenerated ${made} files.`);
  if (warnings.length) {
    console.log('\n── WARNINGS ─────────────────────────────');
    warnings.forEach(w => console.log('  ! ' + w));
  }
}

build().catch(err => { console.error(err); process.exit(1); });
