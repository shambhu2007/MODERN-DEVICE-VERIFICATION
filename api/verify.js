const KV_URL = process.env.KV_REST_API_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN;

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
}

async function kv(command) {
  if (!KV_URL || !KV_TOKEN) {
    throw new Error("KV_REST_API_URL / KV_REST_API_TOKEN missing");
  }

  const response = await fetch(KV_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${KV_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(command)
  });

  if (!response.ok) {
    throw new Error(`KV error: ${response.status}`);
  }

  return response.json();
}

export default async function handler(request) {
  if (request.method === "OPTIONS") {
    return json({}, 204);
  }

  if (request.method !== "GET") {
    return json({ status: "error", message: "Method not allowed" }, 405);
  }

  const url = new URL(request.url);
  const botId = url.searchParams.get("botId") || "";
  const userId = url.searchParams.get("userId") || "";
  const fingerprint = url.searchParams.get("fingerprint") || "";

  if (!botId || !userId || !fingerprint) {
    return json({ status: "error", message: "Missing parameters" }, 400);
  }

  /*
   * IMPORTANT:
   *
   * The botId is part of the storage key.
   *
   * Bot A + Device X -> device:BOT_A:HASH_X
   * Bot B + Device X -> device:BOT_B:HASH_X
   *
   * Therefore each bot has its own completely separate verification space.
   */
  const deviceKey = `device:${botId}:${fingerprint}`;

  try {
    const existing = await kv(["GET", deviceKey]);
    const stored = existing.result;

    // Device has already been used inside THIS bot.
    if (stored) {
      let record;

      try {
        record = typeof stored === "string" ? JSON.parse(stored) : stored;
      } catch {
        record = null;
      }

      if (record && String(record.userId) === String(userId)) {
        return json({
          status: "already_verified",
          botId
        });
      }

      return json({
        status: "multiple_devices",
        botId
      });
    }

    // First verification of this device inside THIS bot.
    const record = {
      userId: String(userId),
      status: "verified",
      botId: String(botId),
      time: Date.now()
    };

    await kv(["SET", deviceKey, JSON.stringify(record)]);

    return json({
      status: "success",
      botId
    });

  } catch (error) {
    return json({
      status: "error",
      message: "Verification service unavailable"
    }, 500);
  }
    }
