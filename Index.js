import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();
const app = express();
app.use(express.json());

const TELEGRAM_API = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`;
const CHAT_ID = process.env.CHAT_ID;

app.post('/', async (req, res) => {
  const data = req.body;
  if (!data || !data.event || !data.tx) return res.sendStatus(400);

  const msg = `🚀 Dex Alert\nEvent: ${data.event}\nToken: ${data.token}\nTX: ${data.tx}`;
  await fetch(TELEGRAM_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: CHAT_ID, text: 
