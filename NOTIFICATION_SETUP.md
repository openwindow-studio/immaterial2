# Get Instant Notifications (Pick One)

## Option 1: Discord (Easiest - 1 minute)

1. **Create a webhook in your Discord server:**
   - Go to Server Settings → Integrations → Webhooks
   - Click "New Webhook"
   - Name it "Meeting Requests"
   - Copy the webhook URL

2. **Add to `.env.local`:**
```bash
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/xxx/yyy
```

3. **Done!** You'll get instant Discord notifications

---

## Option 2: Slack

1. **Create incoming webhook:**
   - Go to [api.slack.com/apps](https://api.slack.com/apps)
   - Create new app → Incoming Webhooks → Activate
   - Add to workspace → Choose channel
   - Copy webhook URL

2. **Add to `.env.local`:**
```bash
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/xxx/yyy/zzz
```

---

## Option 3: Telegram Bot

1. **Create a bot:**
   - Message @BotFather on Telegram
   - `/newbot` → name it → get token
   - Message your bot once
   - Get your chat ID from: `https://api.telegram.org/bot<TOKEN>/getUpdates`

2. **Add to `.env.local`:**
```bash
TELEGRAM_BOT_TOKEN=123456:ABC-DEF
TELEGRAM_CHAT_ID=987654321
```

---

## What You Get:

- **Instant push notification** on your phone
- All meeting details
- Works even when laptop is closed
- No email setup needed

The form shows "Request sent, I'll be in touch" and you get notified instantly!