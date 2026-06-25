# Simple Email Notification Setup (2 minutes!)

Fuck Google Calendar's complexity. Let's use Resend - it's actually simple.

## Option 1: Resend (Recommended - Actually Works)

### 1. Sign up at [resend.com](https://resend.com)
   - It's free for 100 emails/day
   - Takes 30 seconds

### 2. Get your API key
   - Go to [resend.com/api-keys](https://resend.com/api-keys)
   - Create a new API key
   - Copy it

### 3. Add to `.env.local`:
```bash
RESEND_API_KEY=re_abc123xyz789...
```

### 4. Done!
When someone schedules a meeting:
- You get an email at marcobraunschweiler@gmail.com
- Email includes an .ics file you can click to add to ANY calendar
- Has a reply-to set to their email
- No Google bullshit required

---

## Option 2: Just Log to Console (Works Right Now)

Don't even want to deal with emails? The form ALREADY WORKS:
- Meeting requests show up in your terminal
- You can manually add them to your calendar
- Zero configuration needed

---

## Option 3: Save to a Database

Want to track meetings properly? Use Supabase:
1. Create a free project at [supabase.com](https://supabase.com)
2. Create a `meetings` table
3. Save submissions there
4. Check them whenever you want

---

## Why This is Better Than Google Calendar

- **No service accounts**
- **No JSON key files**
- **No permission errors**
- **No admin console**
- **No sharing calendars**
- **Actually fucking works**

The .ics file that gets emailed works with:
- Google Calendar
- Apple Calendar
- Outlook
- Any calendar app

Just click the attachment and it adds the meeting. Simple.