import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Pressable,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp, ParamListBase } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;
const responsiveFontSize = (percent: number) => (width * percent) / 100;

type Notification = {
  id: string;
  title: string;
  description: string;
  date: string;
};

const notificationsData: Notification[] = [
  {
    id: "1",
    title: "Appointment Reminder",
    description: "You have an appointment with Dr. Smith tomorrow at 10 AM.",
    date: "2023-07-04",
  },
  {
    id: "2",
    title: "New Health Tip",
    description: "Check out our latest health tip on maintaining a balanced diet.",
    date: "2023-07-03",
  },
  {
    id: "3",
    title: "Medication Alert",
    description: "Time to take your blood pressure medication.",
    date: "2023-07-02",
  },
];

const NotificationPage: React.FC = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Simulate fetching notifications from an API
    setNotifications(notificationsData);
  }, []);

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={responsiveFontSize(6)} color="#000" />
        </Pressable>
        <Text style={styles.headerText}>Notifications</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {notifications.map((notification) => (
          <View key={notification.id} style={styles.notificationItem}>
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>{notification.title}</Text>
              <Text style={styles.notificationDescription}>
                {notification.description.length > 50
                  ? `${notification.description.substring(0, 50)}...`
                  : notification.description}
              </Text>
              <Text style={styles.notificationDate}>{notification.date}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(2),
  },
  backButton: {
    marginRight: responsiveWidth(2),
  },
  headerText: {
    fontSize: responsiveFontSize(5),
    fontWeight: "bold",
  },
  scrollContainer: {
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(3),
  },
  notificationItem: {
    marginBottom: responsiveHeight(3),
    backgroundColor: "#f9f9f9",
    borderRadius: responsiveWidth(2),
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  notificationContent: {
    padding: responsiveWidth(4),
  },
  notificationTitle: {
    fontSize: responsiveFontSize(4),
    fontWeight: "bold",
    marginBottom: responsiveHeight(1),
  },
  notificationDescription: {
    fontSize: responsiveFontSize(3.5),
    color: "#333",
    marginBottom: responsiveHeight(1),
  },
  notificationDate: {
    fontSize: responsiveFontSize(3),
    color: "#888",
  },
});

export default NotificationPage;