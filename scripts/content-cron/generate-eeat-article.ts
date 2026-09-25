import { GoogleGenAI } from '@google/genai';
import * as fs from 'fs';
import * as path from 'path';

const ai = new GoogleGenAI({});

async function runDailyContentEngine() {
  const today = new Date();
  const dateStr = today.toISOString().split('T')[0];

  const topics = [
    'How fixed wireless microwave relays maintain sub-30ms ping across Wise County ranches',
    'Comparing whole-home mesh Wi-Fi 6 vs standard routers in Decatur Texas stone homes',
    'Why agricultural IoT and security cameras need low-latency broadband in Bridgeport TX',
    'Eliminating video call freezing and Zoom latency on rural Texas internet connections',
    'Line-of-sight elevation tips for rural internet on Lake Bridgeport waterfront properties'
  ];

  const randomTopic = topics[Math.floor(Math.random() * topics.length)];

  const prompt = `
  You are the Lead Network Operations Engineer at Infinilink Broadband in Decatur, Texas.
  Generate a 1,200-word, highly educational MDX article answering practical rural connectivity, networking, or internet performance questions in Wise County, TX.
  Topic focus: ${randomTopic}

  Strict MDX Output Requirements:
  Output ONLY valid MDX content starting directly with frontmatter --- (do NOT wrap in triple backtick markdown code blocks).

  ---
  title: "[Catchy, SEO-rich title under 65 chars]"
  description: "[Actionable summary between 140 and 155 chars]"
  pubDate: ${dateStr}
  author: "Infinilink Technical Team"
  heroImage: "../../assets/hero.jpg"
  altText: "[Descriptive visual alt text]"
  category: "Rural Internet Guides"
  tags: ["Wise County Internet", "Decatur TX", "Fixed Wireless Broadband"]
  draft: false
  ---

  <div class="post-summary bg-blue-950/60 p-5 rounded-xl border-l-4 border-cyan-500 my-6 text-slate-200">
    [Clear 60-word summary answering the core query for voice search and AI Overviews]
  </div>

  [Structured body with ## and ### headings, 1 Markdown technical comparison table, and an FAQ section at the end]
  [Include contextual links to /plans-pricing and /service-areas/high-speed-internet-decatur-tx]
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
  });

  const rawText = response.text || '';
  const cleanMdx = rawText
    .replace(/^```(mdx|markdown)?\r?\n/, '')
    .replace(/\r?\n```\s*$/, '')
    .trim();

  const slug = `internet-guide-${dateStr}-${Math.floor(Math.random() * 1000)}`;
  const targetDir = path.join(process.cwd(), 'src', 'content', 'blog');
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const targetPath = path.join(targetDir, `${slug}.mdx`);
  fs.writeFileSync(targetPath, cleanMdx, 'utf-8');
  console.log(`[Content Engine] Successfully created E-E-A-T article: ${targetPath}`);
}

runDailyContentEngine().catch((err) => {
  console.error('[Content Engine Error]', err);
  process.exit(1);
});
