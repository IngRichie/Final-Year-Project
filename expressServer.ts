const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const multer = require('multer');
const upload = multer();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const navigationActions = {
  navigate_to_book_appointment: 'Navigating to the Book Appointment page.',
  navigate_to_counselor_details: 'Navigating to the Counselor Details page.',
  navigate_to_counselor_session: 'Navigating to the Counselor Session page.',
  navigate_to_daily_tips: 'Navigating to the Daily Tips page.',
  navigate_to_fitness_nutrition: 'Navigating to the Fitness and Nutrition page.',
  navigate_to_forget_password: 'Navigating to the Forget Password page.',
  navigate_to_healthy_tips: 'Navigating to the Healthy Tips page.',
  navigate_to_homepage: 'Navigating to the Homepage.',
  navigate_to_login_screen: 'Navigating to the Login Screen.',
  navigate_to_med_schedule: 'Navigating to the Med Schedule page.',
  navigate_to_mental_health: 'Navigating to the Mental Health page.',
  navigate_to_news_page: 'Navigating to the News Page.',
  navigate_to_notification_screen: 'Navigating to the Notification Screen.',
  navigate_to_notification_settings: 'Navigating to the Notification Settings page.',
  navigate_to_preferences_screen: 'Navigating to the Preferences Screen.',
  navigate_to_privacy_screen: 'Navigating to the Privacy Screen.',
  navigate_to_profile_screen: 'Navigating to the Profile Screen.',
  navigate_to_settings: 'Navigating to the Settings page.',
  navigate_to_sign_up_screen: 'Navigating to the Sign Up Screen.',
  navigate_to_symptom_assessment: 'Navigating to the Symptom Assessment page.',
  check_counselor_availability: 'Checking counselor availability.',
  read_latest_health_tip: 'Reading the latest health tips.',
  read_notifications: 'Reading your notifications.',
};

app.post('/transcribe', upload.single('audio'), async (req: { file: { buffer: any; }; }, res: { json: (arg0: { transcript: any; }) => void; status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; }): void; new(): any; }; }; }) => {
  try {
    const audioBuffer = req.file.buffer;
    const response = await axios.post('https://api.assemblyai.com/v2/transcript', audioBuffer, {
      headers: {
        authorization: 'bbc677d7b8894c8badd6f29ed50707c8',
        'content-type': 'audio/wav',
      },
    });

    res.json({ transcript: response.data.text });
  } catch (error) {
    res.status(500).json({ error: 'Failed to transcribe audio' });
  }
});

app.post('/process-command', async (req: { body: { text: any; }; }, res: { json: (arg0: { command: any; }) => void; status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; }): void; new(): any; }; }; }) => {
  const { text } = req.body;

  // Call Gemini API for text processing
  try {
    const response = await axios.post('https://api.gemini.com/v1/command', { text }, {
      headers: {
        Authorization: `Bearer AIzaSyBLul9jArDlgiX5Aa6vhL2d0ChmlvG7-80`,
      },
    });

    const command = response.data.command;
    res.json({ command });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process command' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
