# Device Verification — Vercel (Per-Bot Isolation)

## Exact behavior

Each bot gets a separate verification namespace.

Example:

Bot A + Device X -> verified
Bot A + Device X + another Telegram account -> blocked

Bot B + Device X -> verified again (fresh)

The same device fingerprint is NOT shared between bots.

## Storage key

The API stores:

`device:{botId}:{fingerprint}`

So changing `botId` creates a completely new verification space.

## Environment variables

Add these to the Vercel project:

- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`

They must point to your Vercel-compatible Redis/KV REST database.

## Open URL

`https://YOUR-DOMAIN.vercel.app/?botId=YOUR_BOT_ID&userId=TELEGRAM_USER_ID&userName=USERNAME&webhookUrl=YOUR_WEBHOOK_URL`

## Important limitation

A browser fingerprint is only a best-effort device identifier. Browsers can change or restrict fingerprintable information, so it cannot guarantee a permanent hardware-level device ID.
