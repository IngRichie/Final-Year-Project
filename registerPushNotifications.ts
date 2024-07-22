import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { collection, getDocs, Firestore, addDoc } from "firebase/firestore";

export async function registerForPushNotificationsAsync(): Promise<string | undefined> {
  let token: string | undefined;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Platform.OS === 'web') {
    console.log('Web platform detected, no push token required');
    return;
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }

    token = (await Notifications.getExpoPushTokenAsync({
      projectId: Constants.manifest.extra?.eas?.projectId,
    })).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}

export async function schedulePushNotification(db: Firestore, userEmail: string) {
  const now = new Date();
  const currentTime = now.getTime();

  const q = collection(db, 'medReminder');
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach(async (doc) => {
    const data = doc.data();
    if (data.times && Array.isArray(data.times)) {
      data.times.forEach(async (time: string) => {
        const reminderTime = new Date();
        const [hour, minute] = time.split(':');
        const [hourPart, period] = hour.split(' ');
        const formattedHour = period === 'PM' ? parseInt(hourPart) + 12 : parseInt(hourPart);
        reminderTime.setHours(formattedHour);
        reminderTime.setMinutes(parseInt(minute));
        reminderTime.setSeconds(0);

        const reminderTimestamp = reminderTime.getTime();

        if (Math.abs(reminderTimestamp - currentTime) <= 5 * 60 * 1000) {
          const notificationContent = {
            title: `Medication Reminder`,
            body: `It's time to take your ${data.medicationName} (${data.selectedForm}, ${data.selectedUnit})`,
            data: { ...data },
            timestamp: new Date().toISOString(),
          };

          if (Platform.OS === 'web') {
            // Save notification to Firestore for web and let Firebase Extensions handle sending email
            await addDoc(collection(db, 'notifications'), {
              ...notificationContent,
              email: userEmail,
            });
          } else {
            // Schedule push notification for mobile devices
            await Notifications.scheduleNotificationAsync({
              content: {
                title: notificationContent.title,
                body: notificationContent.body,
                sound: "default",
                data: notificationContent.data,
              },
              trigger: { seconds: 2 },
            });
          }
        }
      });
    }
  });
}
