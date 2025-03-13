import express from 'express';
import cors from 'cors';
import process from 'process';
import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/prompt', (req, res) => {
  const { prompt } = req.body;
 

  // Call the Python script with the prompt
  const scriptPath = path.join(__dirname, '../main.py');
  exec(`python "${scriptPath}" "${prompt}"`, (error, stdout, stderr) => {
    if (error) {
      console.error('Error executing Python script:', error);
      res.status(500).json({ error: 'An error occurred. Please try again.' });
      return;
    }
    if (stderr) {
      console.error('Error in Python script:', stderr);
      res.status(500).json({ error: 'An error occurred. Please try again.' });
      return;
    }
    console.log('Python script output:', stdout);
    res.json({ response: stdout.trim() });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});