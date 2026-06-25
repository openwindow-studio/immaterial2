# Google Calendar API Setup Guide

## Step 1: Set up Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Name it something like "Immaterial Calendar Integration"

## Step 2: Enable Google Calendar API

1. In the Cloud Console, go to "APIs & Services" > "Library"
2. Search for "Google Calendar API"
3. Click on it and press "Enable"

## Step 3: Create Service Account Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Fill in the details:
   - Service account name: "immaterial-calendar"
   - Service account ID: (auto-generated)
   - Description: "Service account for calendar integration"
4. Click "Create and Continue"
5. Skip the optional steps and click "Done"

## Step 4: Generate Private Key

1. Click on the service account you just created
2. Go to the "Keys" tab
3. Click "Add Key" > "Create New Key"
4. Choose "JSON" format
5. Download the key file - **KEEP THIS SECURE!**
6. Rename it to `google-calendar-key.json`
7. Place it in your project root (it's already in .gitignore)

## Step 5: Share Your Calendar

1. Open [Google Calendar](https://calendar.google.com)
2. Find the calendar you want to use
3. Click the three dots next to it > "Settings and sharing"
4. Scroll to "Share with specific people"
5. Click "Add people"
6. Add the service account email from your JSON key file
   (it looks like: immaterial-calendar@project-name.iam.gserviceaccount.com)
7. Set permission to "Make changes to events"
8. Click "Send"

## Step 6: Get Your Calendar ID

1. Still in Calendar settings for your calendar
2. Scroll to "Integrate calendar"
3. Copy the "Calendar ID" (looks like: your-email@gmail.com or a long string@group.calendar.google.com)

## Step 7: Set Environment Variables

Add these to your `.env.local` file:

```bash
# Google Calendar Configuration
GOOGLE_CALENDAR_ID=your-calendar-id@gmail.com
GOOGLE_SERVICE_ACCOUNT_EMAIL=immaterial-calendar@project-name.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Or if using the JSON file directly:
GOOGLE_CALENDAR_CREDENTIALS_PATH=./google-calendar-key.json
```

## Security Notes

- **NEVER** commit the JSON key file to git
- Add `google-calendar-key.json` to `.gitignore`
- Keep your service account key secure
- Rotate keys periodically

## Testing

Once set up, the form will:
1. Create real calendar events in your Google Calendar
2. Send invitations to the email provided
3. Include the topic in the event description

## Troubleshooting

- **"Calendar not found"**: Make sure you've shared the calendar with the service account
- **"Insufficient permissions"**: Check that the service account has "Make changes to events" permission
- **"Invalid grant"**: Your service account key might be incorrect or expired
