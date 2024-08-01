import express from 'express';
import cors from 'cors';
import { jwt } from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const AccessToken = jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

app.get('/token', (req, res) => {
  const identity = req.query.identity as string;

  // Create an access token
  const token = new AccessToken(
    process.env.TWILIO_ACCOUNT_SID!,
    process.env.TWILIO_API_KEY_SID!,
    process.env.TWILIO_API_KEY_SECRET!,
    { identity }
  );

  token.identity = identity;

  // Grant the access token Twilio Video capabilities
  const videoGrant = new VideoGrant();
  token.addGrant(videoGrant);

  // Serialize the token to a JWT string and include it in a JSON response
  res.send({
    identity: identity,
    token: token.toJwt(),
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Token server running on port ${PORT}`);
});
