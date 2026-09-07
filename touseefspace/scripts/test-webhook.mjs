import { encodeSignatureHeader, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import fs from "fs";
import path from "path";

// Load SANITY_REVALIDATE_SECRET from local .env if available
let secret = process.env.SANITY_REVALIDATE_SECRET;
if (!secret) {
  try {
    const envPath = path.resolve(process.cwd(), ".env");
    const envContent = fs.readFileSync(envPath, "utf-8");
    const match = envContent.match(/SANITY_REVALIDATE_SECRET=["']?([^"'\r\n]+)["']?/);
    if (match) secret = match[1];
  } catch {}
}

if (!secret) {
  console.error("❌ Error: SANITY_REVALIDATE_SECRET not found in environment or .env file.");
  process.exit(1);
}

const payload = {
  _type: process.argv[2] || "project",
  slug: process.argv[3] || "aunvu-erp",
};

const stringifiedPayload = JSON.stringify(payload);
const timestamp = Math.floor(Date.now() / 1000);

async function run() {
  const signature = await encodeSignatureHeader(stringifiedPayload, timestamp, secret);
  const targetUrl = process.env.TEST_URL || "http://localhost:3000/api/revalidate";

  console.log(`📡 Sending test webhook to ${targetUrl}...`);
  console.log("📦 Payload:", payload);

  try {
    const res = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        [SIGNATURE_HEADER_NAME]: signature,
      },
      body: stringifiedPayload,
    });

    const data = await res.json();
    console.log(`\nStatus: ${res.status} ${res.statusText}`);
    console.log("Response:", JSON.stringify(data, null, 2));

    if (res.ok) {
      console.log("\n✅ Webhook revalidation succeeded locally!");
    } else {
      console.log("\n❌ Webhook revalidation failed.");
    }
  } catch (err) {
    console.error("\n❌ Could not connect to dev server. Is 'npm run dev' running on http://localhost:3000?");
  }
}

run();
