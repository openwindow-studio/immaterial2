// Simple Discord Bot for DM Notifications
// Run this separately: node discord-bot.js

const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');
const app = express();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.DirectMessages]
});

const YOUR_USER_ID = '623189716782678016';

app.use(express.json());

// Endpoint your website will call
app.post('/meeting', async (req, res) => {
  const { email, date, time, timezone, topic } = req.body;

  try {
    const user = await client.users.fetch(YOUR_USER_ID);
    await user.send({
      embeds: [{
        title: '📅 New Meeting Request',
        color: 0x0D1EFF,
        fields: [
          { name: '📧 Email', value: email, inline: true },
          { name: '📅 Date', value: date, inline: true },
          { name: '⏰ Time', value: `${time} (${timezone})`, inline: true },
          { name: '💬 Topic', value: topic || 'Not specified', inline: false }
        ],
        timestamp: new Date().toISOString()
      }]
    });
    res.json({ success: true });
  } catch (error) {
    console.error('Error sending DM:', error);
    res.status(500).json({ error: 'Failed to send DM' });
  }
});

client.once('ready', () => {
  console.log(`Bot is ready! Logged in as ${client.user.tag}`);
  app.listen(3005, () => {
    console.log('Bot API listening on port 3005');
  });
});

// Login with your bot token
client.login('YOUR_BOT_TOKEN_HERE');

/*
Setup:
1. Create bot at https://discord.com/developers/applications
2. Get bot token from Bot section
3. Invite bot to your server (no permissions needed for DMs)
4. npm install discord.js express
5. Replace YOUR_BOT_TOKEN_HERE
6. Run: node discord-bot.js
7. Update your API to call http://localhost:3005/meeting
*/