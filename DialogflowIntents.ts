import * as dialogflow from '@google-cloud/dialogflow';
import { v4 as uuidv4 } from 'uuid';
import { protos } from '@google-cloud/dialogflow';

// Replace with your project ID
const projectId = 'campcare-93295';
const sessionId = uuidv4();
const languageCode = 'en';

// Instantiates a client
const intentsClient = new dialogflow.IntentsClient();

async function createIntent(displayName: string, trainingPhrasesParts: string[], action: string, fulfillmentEnabled = true) {
  const trainingPhrases: protos.google.cloud.dialogflow.v2.Intent.TrainingPhrase[] = trainingPhrasesParts.map(part => ({
    type: protos.google.cloud.dialogflow.v2.Intent.TrainingPhrase.Type.EXAMPLE,
    parts: [{ text: part }],
  }));

  const intent: protos.google.cloud.dialogflow.v2.IIntent = {
    displayName,
    trainingPhrases,
    action,
    webhookState: fulfillmentEnabled 
      ? protos.google.cloud.dialogflow.v2.Intent.WebhookState.WEBHOOK_STATE_ENABLED
      : protos.google.cloud.dialogflow.v2.Intent.WebhookState.WEBHOOK_STATE_DISABLED,
  };

  const createIntentRequest: protos.google.cloud.dialogflow.v2.ICreateIntentRequest = {
    parent: intentsClient.projectAgentPath(projectId),
    intent,
  };

  const [response] = await intentsClient.createIntent(createIntentRequest);
  console.log(`Intent ${response.name} created`);
}

async function setupDialogflow() {
  const intents = [
    { displayName: 'Navigate to Book Appointment', trainingPhrases: ['Take me to the book appointment page', 'I want to book an appointment', 'Go to appointment booking'], action: 'navigate_to_book_appointment' },
    { displayName: 'Navigate to Counselor Details', trainingPhrases: ['Show me the counselor details', 'Go to counselor details page', 'I want to see counselor information'], action: 'navigate_to_counselor_details' },
    { displayName: 'Navigate to Counselor Session', trainingPhrases: ['Take me to the counselor session page', 'I want to join a counselor session', 'Go to counselor session'], action: 'navigate_to_counselor_session' },
    { displayName: 'Navigate to Daily Tips', trainingPhrases: ['Show me the daily tips', 'Go to daily tips page', 'I want to see daily health tips'], action: 'navigate_to_daily_tips' },
    { displayName: 'Navigate to Fitness and Nutrition', trainingPhrases: ['Show me fitness and nutrition tips', 'Go to fitness and nutrition page', 'I want to see fitness and nutrition advice'], action: 'navigate_to_fitness_nutrition' },
    { displayName: 'Navigate to Forget Password', trainingPhrases: ['I forgot my password', 'Go to forget password page', 'Take me to password reset'], action: 'navigate_to_forget_password' },
    { displayName: 'Navigate to Healthy Tips', trainingPhrases: ['Show me healthy tips', 'Go to healthy tips page', 'I want to see health advice'], action: 'navigate_to_healthy_tips' },
    { displayName: 'Navigate to Homepage', trainingPhrases: ['Take me to the homepage', 'Go to the main page', 'I want to go home'], action: 'navigate_to_homepage' },
    { displayName: 'Navigate to Login Screen', trainingPhrases: ['Take me to the login page', 'I want to log in', 'Go to login screen'], action: 'navigate_to_login_screen' },
    { displayName: 'Navigate to Med Schedule', trainingPhrases: ['Show me my medication schedule', 'Go to med schedule page', 'I want to see my meds schedule'], action: 'navigate_to_med_schedule' },
    { displayName: 'Navigate to Mental Health', trainingPhrases: ['Take me to mental health page', 'Show me mental health tips', 'Go to mental health section'], action: 'navigate_to_mental_health' },
    { displayName: 'Navigate to News Page', trainingPhrases: ['Show me the news', 'Go to the news page', 'I want to see health news'], action: 'navigate_to_news_page' },
    { displayName: 'Navigate to Notification Screen', trainingPhrases: ['Show me my notifications', 'Go to notification screen', 'I want to see my alerts'], action: 'navigate_to_notification_screen' },
    { displayName: 'Navigate to Notification Settings', trainingPhrases: ['Take me to notification settings', 'Go to notification settings page', 'I want to manage my notifications'], action: 'navigate_to_notification_settings' },
    { displayName: 'Navigate to Preferences Screen', trainingPhrases: ['Take me to preferences', 'Go to preferences page', 'I want to set my preferences'], action: 'navigate_to_preferences_screen' },
    { displayName: 'Navigate to Privacy Screen', trainingPhrases: ['Show me the privacy settings', 'Go to privacy screen', 'I want to see privacy options'], action: 'navigate_to_privacy_screen' },
    { displayName: 'Navigate to Profile Screen', trainingPhrases: ['Take me to my profile', 'Go to profile page', 'I want to see my profile'], action: 'navigate_to_profile_screen' },
    { displayName: 'Navigate to Settings', trainingPhrases: ['Take me to settings', 'Go to the settings page', 'I want to change settings'], action: 'navigate_to_settings' },
    { displayName: 'Navigate to Sign Up Screen', trainingPhrases: ['Take me to sign up', 'Go to the sign up page', 'I want to create an account'], action: 'navigate_to_sign_up_screen' },
    { displayName: 'Navigate to Symptom Assessment', trainingPhrases: ['Take me to symptom assessment', 'Go to symptom assessment page', 'I want to assess my symptoms'], action: 'navigate_to_symptom_assessment' },
    { displayName: 'Check Counselor Availability', trainingPhrases: ['Is a counselor available for booking?', 'Can I book a counselor now?', 'Check if a counselor is available'], action: 'check_counselor_availability' },
    { displayName: 'Read Latest Health Tip', trainingPhrases: ['What are the latest health tips today?', 'Tell me today\'s health tips', 'Show me the latest health advice'], action: 'read_latest_health_tip' },
    { displayName: 'Read Notifications', trainingPhrases: ['What do I have on my notifications?', 'Read my notifications', 'Tell me my latest alerts'], action: 'read_notifications' },
  ];

  for (const intent of intents) {
    await createIntent(intent.displayName, intent.trainingPhrases, intent.action);
  }
}

setupDialogflow().catch(console.error);
