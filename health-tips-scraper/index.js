const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Enable CORS for all requests

app.get('/api/daily-tips', async (req, res) => {
  try {
    const { data } = await axios.get('https://www.healthline.com/nutrition');
    const $ = cheerio.load(data);
    const tips = [];

    $('.css-0 .css-1g87l9m').each((index, element) => {
      const title = $(element).find('h2').text();
      const image = $(element).find('img').attr('src');
      const description = $(element).find('p').text();

      tips.push({ title, image, description });
    });

    res.json(tips);
  } catch (error) {
    console.error("Error fetching health tips:", error);
    res.status(500).json({ error: 'Failed to fetch health tips' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
