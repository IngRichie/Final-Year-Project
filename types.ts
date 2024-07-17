export type RootStackParamList = {
  WelcomeScreen: undefined;
  LoginScreen: undefined;
  SignUpScreen: undefined;
  ForgetPassword: undefined;
  MainTabs: undefined;
  MedSchedule: undefined;
  FitnessNutrition: undefined;
  Settings: undefined;
  CounselorChat: undefined;
  CallScreen: undefined;
  CounselorDetails: undefined;
  BookAppointment: undefined;
  NewsPage: undefined;
  NotificationScreen: undefined;
  ProfileScreen: undefined;
  PrivacyScreen: undefined;
  PreferencesScreen: undefined;
  AccessibilityScreen: undefined;
  NotificationSettings: undefined;
  MentalHealth: undefined;
  Homepage: undefined;
  Homepage1: undefined;
  FirstAid: undefined;
  SymptomAssessment: undefined;
  CounselorSession: undefined;
  DailyTipDetailScreen: undefined;
  MedicationList: undefined;
  AddMedication: undefined;
  MedicationReminderScreen: undefined; // Add this line
  EnrichedMedication: undefined;
  ChooseMedicationType: { medicationName: string };
  AddMedicationStrengthScreen: { medicationName: string; medicationType: string };
  AddMedicationTimeScreen: { medicationName: string; medicationType: string; strength: string; selectedUnit: string };
  NextScreen: { medicationName: string; medicationType: string; frequency: string; times: string[] };
  ChooseMedicationTypeScreen: { medicationName: string };

};
