export async function sendSlackNotification(name: string, email: string) {
    const webhookUrl = process.env.SLACK_WEBHOOK_URL;
    if (!webhookUrl) {
      console.warn("SLACK_WEBHOOK_URL not set, skipping notification");
      return;
    }
  
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: `🎉 New Tootler waitlist signup!\n*Name:* ${name}\n*Email:* ${email}`,
        }),
      });
    } catch (err) {
      console.error("Slack notification failed:", err);
    }
  }