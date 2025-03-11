import express from 'express';
import cors from 'cors';
import process from 'process';
import OpenAI from 'openai';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: "",
  endPoint: "https://rcg-openai1.openai.azure.com/",
  // apiVersion: "your_api_version"
});

const checkFormat = async (prompt) => {
  return await client.chat.completions.create({
    // model: "your_model", // model = "deployment_name"
    messages: [
      // { role: "system", content: prompt },
      { role: "user", content: prompt }
    ],
    temperature: 0.3,
    max_tokens: 800,
    top_p: 0.95,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop: null
  });
};

app.post('/api/prompt', async (req, res) => {
  const { prompt } = req.body;

  console.log('Received request:', req.body);
  try {
    const response = await checkFormat(prompt);
    res.json(response);
  } catch (error) {
    console.error('Error fetching data from OpenAI API:', error);
    console.error('Error details:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'An error occurred. Please try again.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});