const express = require('express');
const cors = require('cors');
const { jwt: { AccessToken }, jwt: { VideoGrant } } = require('twilio');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/token', (req, res) => {
  const { identity } = req.query;

  const token = new AccessToken(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_API_KEY_SID,
    process.env.TWILIO_API_KEY_SECRET
  );

  token.identity = identity;

  const videoGrant = new VideoGrant();
  token.addGrant(videoGrant);

  res.send({
    identity,
    token: token.toJwt()
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Token server running on port ${PORT}`);
});
