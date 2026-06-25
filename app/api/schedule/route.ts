import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, dateTime, timezone, topic } = body

    // Validate required fields
    if (!email || !dateTime) {
      return NextResponse.json(
        { error: 'Email and date/time are required' },
        { status: 400 }
      )
    }

    // Format the date for logging
    const date = new Date(dateTime)
    const endDate = new Date(date.getTime() + 60 * 60 * 1000) // 1 hour meeting

    const formattedDate = date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    const formattedTime = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: timezone
    })

    // Log the meeting request to console - YOU HANDLE IT MANUALLY
    console.log('\n')
    console.log('🔔 =====================================')
    console.log('🔔 NEW MEETING REQUEST!')
    console.log('🔔 =====================================')
    console.log('📧 Email:', email)
    console.log('📅 Date:', formattedDate)
    console.log('⏰ Time:', formattedTime)
    console.log('🌍 Timezone:', timezone)
    console.log('💬 Topic:', topic || 'Not specified')
    console.log('🔔 =====================================')
    console.log('ACTION: Add this to your calendar manually')
    console.log('🔔 =====================================')
    console.log('\n')

    // Send Discord notification if webhook is configured
    let discordNotified = false
    if (process.env.DISCORD_WEBHOOK_URL) {
      try {
        const discordRes = await fetch(process.env.DISCORD_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: '<@623189716782678016> New meeting request!',
            embeds: [{
              title: '📅 New Meeting Request',
              color: 0x0D1EFF,
              fields: [
                { name: '📧 Email', value: email, inline: true },
                { name: '📅 Date', value: formattedDate, inline: true },
                { name: '⏰ Time', value: `${formattedTime} (${timezone})`, inline: true },
                { name: '💬 Topic', value: topic || 'Not specified', inline: false }
              ],
              timestamp: new Date().toISOString()
            }]
          })
        })
        if (discordRes.ok) {
          discordNotified = true
          console.log('📱 Discord notification sent')
        } else {
          const detail = await discordRes.text().catch(() => '')
          console.error(`❌ Discord webhook returned ${discordRes.status}: ${detail}`)
        }
      } catch (err) {
        console.error('❌ Discord webhook failed:', err)
      }
    } else {
      console.error('⚠️ DISCORD_WEBHOOK_URL is not set — no Discord notification was sent')
    }

    // Send Slack notification if webhook is configured
    if (process.env.SLACK_WEBHOOK_URL) {
      try {
        await fetch(process.env.SLACK_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: `🔔 New Meeting Request!\n*Email:* ${email}\n*Date:* ${formattedDate}\n*Time:* ${formattedTime} (${timezone})\n*Topic:* ${topic || 'Not specified'}`
          })
        })
        console.log('📱 Slack notification sent')
      } catch (err) {
        console.error('Slack webhook failed:', err)
      }
    }

    // Save to file as backup
    const fs = require('fs').promises
    const meetingLog = `
Meeting Request - ${new Date().toISOString()}
Email: ${email}
Date: ${formattedDate}
Time: ${formattedTime}
Timezone: ${timezone}
Topic: ${topic || 'Not specified'}
-------------------
`
    try {
      await fs.appendFile('meeting-requests.log', meetingLog)
    } catch (err) {
      // Ignore file write errors
    }

    return NextResponse.json({
      success: true,
      message: 'Request received',
      notified: discordNotified,
      details: {
        email,
        dateTime: `${formattedDate} at ${formattedTime}`,
        timezone,
        topic
      }
    })

  } catch (error) {
    console.error('Schedule API error:', error)
    return NextResponse.json(
      { error: 'Failed to process meeting request' },
      { status: 500 }
    )
  }
}