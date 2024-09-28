// server.mjs
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint to shorten the URL
app.get('/shorten', async (req, res) => {
  console.log('Received request:', req.query);
  const { url, custom } = req.query;
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  const apiUrl = `https://ulvis.net/API/write/get?url=${encodeURIComponent(url)}${custom ? '&custom=' + custom : ''}&private=1`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.success) {
      res.json(data);
    } else {
      res.status(500).json({ error: 'Failed to shorten the URL', details: data });
    }
  } catch (error) {
    console.error('Error fetching from Ulvis API:', error);
    res.status(500).json({ error: 'Error fetching data from Ulvis API', details: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
