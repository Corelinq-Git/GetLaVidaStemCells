#!/usr/bin/env node
/**
 * One-shot script to regenerate a higher-resolution, sharper Ariana portrait
 * via OpenRouter's openai/gpt-5.4-image-2 model using image-to-image.
 *
 * Usage:
 *   OPENROUTER_API_KEY=... node scripts/sharpen-ariana.mjs
 *
 * Source:  public/images/ariana.webp
 * Target:  public/images/ariana-hires.png  (then convert/copy to ariana.webp)
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const SRC = path.join(ROOT, "public/images/ariana.webp");
const OUT = path.join(ROOT, "public/images/ariana-hires.png");

const apiKey = process.env.OPENROUTER_API_KEY;
if (!apiKey) {
  console.error("Missing OPENROUTER_API_KEY env var.");
  process.exit(1);
}

const bytes = fs.readFileSync(SRC);
const b64 = bytes.toString("base64");
const dataUrl = `data:image/webp;base64,${b64}`;

const prompt = `Regenerate this exact portrait at MAXIMUM photographic resolution — magazine-cover 4K quality, ultra-sharp.
Preserve EXACTLY:
- The same woman's face, features, gentle smile, hair color and updo with loose strands
- The white medical/clinical jacket over a beige top
- Arms-crossed pose
- Warm golden-hour palm-frond bokeh background
- Approachable, professional, friendly tone
Output requirements:
- Ultra-high-definition 4K photographic detail
- Tack-sharp focus on eyes (perfect catchlights, visible iris detail)
- Real, natural skin texture with subtle pores — not airbrushed, not plastic
- Crisp fabric weave on the white coat
- Cinematic depth of field — subject razor-sharp, background dreamy bokeh
- Editorial-grade color grading, warm highlights
- No text, no watermark, no logo, no extra people, no studio elements
Return ONE photorealistic portrait at the largest available resolution.`;

const body = {
  model: "openai/gpt-5.4-image-2",
  modalities: ["image", "text"],
  messages: [
    {
      role: "user",
      content: [
        { type: "text", text: prompt },
        { type: "image_url", image_url: { url: dataUrl } },
      ],
    },
  ],
  // OpenRouter passes provider-specific extras through. gpt-image-1 accepts
  // size + quality; we request the largest portrait-oriented output + high quality.
  provider: {
    require_parameters: false,
  },
  extra_body: {
    size: "1024x1536",
    quality: "high",
  },
  // Top-level passthrough fallbacks (some providers read them from root)
  size: "1024x1536",
  quality: "high",
};

console.log("Calling OpenRouter openai/gpt-5.4-image-2 …");

const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
    "HTTP-Referer": "https://lavidastemcells.com",
    "X-Title": "La Vida Squeeze Page",
  },
  body: JSON.stringify(body),
});

if (!res.ok) {
  const txt = await res.text();
  console.error("OpenRouter error:", res.status, txt);
  process.exit(1);
}

const json = await res.json();
console.log("Raw response keys:", Object.keys(json));

const msg = json.choices?.[0]?.message;
if (!msg) {
  console.error("No message in response:", JSON.stringify(json, null, 2));
  process.exit(1);
}

// Image may appear in: msg.images[0].image_url.url
//                  or: msg.content (array w/ image_url)
//                  or: msg.content (string w/ base64)
let imgUrl = null;
if (Array.isArray(msg.images) && msg.images[0]?.image_url?.url) {
  imgUrl = msg.images[0].image_url.url;
} else if (Array.isArray(msg.content)) {
  const imgPart = msg.content.find((p) => p.type === "image_url" && p.image_url?.url);
  if (imgPart) imgUrl = imgPart.image_url.url;
}

if (!imgUrl) {
  console.error("No image found in message:", JSON.stringify(msg, null, 2));
  process.exit(1);
}

// Decode data URL → bytes → write file
const match = /^data:(image\/[a-z+]+);base64,(.+)$/i.exec(imgUrl);
if (!match) {
  console.error("Unexpected image url shape:", imgUrl.slice(0, 80));
  process.exit(1);
}
const mime = match[1];
const buf = Buffer.from(match[2], "base64");
fs.writeFileSync(OUT, buf);
console.log(`Wrote ${OUT} (${(buf.length / 1024).toFixed(1)} KB, ${mime})`);
