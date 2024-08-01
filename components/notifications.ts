import * as Notifications from 'expo-notifications';
import { db, auth } from '../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { Platform } from 'react-native';

// Configure notifications for Android (if necessary)
if (Platform.OS === 'android') {
  Notifications.setNotificationChannelAsync('default', {
    name: 'default',
    importance: Notifications.AndroidImportance.MAX,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: '#FF231F7C',
  });
}

export const scheduleMedicationReminders = async (navigation: NavigationProp<ParamListBase>) => {
  const user = auth.currentUser;
  if (user) {
    try {
      const medReminderQuery = query(
        collection(db, 'medReminder'),
        where('userId', '==', user.uid)
      );
      const medReminderSnapshot = await getDocs(medReminderQuery);
      medReminderSnapshot.forEach(async (doc) => {
        const reminderData = doc.data();
        const timesArray = reminderData.times;

        timesArray.forEach(async (time: string) => {
          // Convert time string to Date object
          const [hours, minutes] = time.split(':').map(Number);
          const notificationTime = new Date();
          notificationTime.setHours(hours);
          notificationTime.setMinutes(minutes);
          notificationTime.setSeconds(0);

          // Schedule the notification
          await Notifications.scheduleNotificationAsync({
            content: {
              title: 'Medication Reminder',
              body: `Time to take your ${reminderData.medicationName} (${reminderData.selectedForm}, ${reminderData.selectedUnit})`,
              sound: true,
              data: {
                notificationId: doc.id,
                medicationName: reminderData.medicationName,
                selectedForm: reminderData.selectedForm,
                selectedUnit: reminderData.selectedUnit,
                frequency: reminderData.frequency,
                times: reminderData.times,
              },
            },
            trigger: {
              hour: notificationTime.getHours(),
              minute: notificationTime.getMinutes(),
              repeats: true, // Adjust this based on the medication frequency
            },
          });
        });
      });
    } catch (error) {
      console.error('Error scheduling notifications:', error);
    }
  }
};

// Call this function when the app starts or the user logs in
export const initializeNotifications = async (navigation: NavigationProp<ParamListBase>) => {
  const permission = await Notifications.getPermissionsAsync();
  if (!permission.granted) {
    await Notifications.requestPermissionsAsync();
  }
  await scheduleMedicationReminders(navigation);
};

// Handle notification responses
Notifications.addNotificationResponseReceivedListener(response => {
  const notificationData = response.notification.request.content.data as {
    notificationId: string;
    medicationName: string;
    selectedForm: string;
    selectedUnit: string;
    frequency: string;
    times: string[];
  };

  if (notificationData) {
    navigation.navigate('NotificationPage', { notificationData });
  }
});
