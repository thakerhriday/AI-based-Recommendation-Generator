import OpenAI from 'openai';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,  // Make sure your API key is set in the .env file
});

const app = express();
app.use(cors());
app.use(express.json());

app.post('/generate', async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 100,
    });
    res.json({ text: response.choices[0].message.content.trim() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
