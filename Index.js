const express = require("express");
const fetch = require("node-fetch");
const app = express();

const PORT = process.env.PORT || 3000;
const TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

app.use(express.json());

app.post("/webhook", async (req, res) => {
  const data = req.body;
  console.log("Webhook received:", data);

  const message = `📈 New trade:\n${JSON.stringify(data, null, 2)}`;

  try {
    await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message
      })
    });
    res.sendStatus(200);
  } catch (err) {
    console.error("Telegram error:", err);
    res.sendStatus(500);
  }
});

app.listen(PORT, () => {
  console.log(`✅ Webhook server running on port ${PORT}`);
});
