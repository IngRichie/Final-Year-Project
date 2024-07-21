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
  Alert,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp, ParamListBase } from "@react-navigation/native";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Ensure this path is correct

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

const NotificationPage: React.FC = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedNotifications, setSelectedNotifications] = useState<Set<string>>(new Set());

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'notifications'), (querySnapshot) => {
      const fetchedNotifications: Notification[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        fetchedNotifications.push({
          id: doc.id,
          title: data.title,
          description: data.description,
          date: data.date,
        });
      });
      setNotifications(fetchedNotifications);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching notifications: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleLongPress = (id: string) => {
    if (selectedNotifications.has(id)) {
      selectedNotifications.delete(id);
    } else {
      selectedNotifications.add(id);
    }
    setSelectedNotifications(new Set(selectedNotifications));
  };

  const handleDelete = async () => {
    try {
      await Promise.all(Array.from(selectedNotifications).map(id => deleteDoc(doc(db, 'notifications', id))));
      Alert.alert("Success", "Selected notifications have been deleted.");
      setSelectedNotifications(new Set());
    } catch (error) {
      console.error("Error deleting notifications: ", error);
      Alert.alert("Error", "Failed to delete notifications.");
    }
  };

  const renderNotificationItem = (notification: Notification) => {
    const isSelected = selectedNotifications.has(notification.id);
    return (
      <TouchableOpacity
        key={notification.id}
        onLongPress={() => handleLongPress(notification.id)}
        style={[
          styles.notificationItem,
          isSelected && styles.notificationItemSelected,
        ]}
      >
        <View style={styles.notificationContent}>
          <Text style={styles.notificationTitle}>{notification.title}</Text>
          <Text style={styles.notificationDescription}>
            {notification.description.length > 50
              ? `${notification.description.substring(0, 50)}...`
              : notification.description}
          </Text>
          <Text style={styles.notificationDate}>{notification.date}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={handleBackPress}>
            <Ionicons name="arrow-back" size={responsiveFontSize(6)} color="#000" />
          </Pressable>
          <Text style={styles.headerText}>Notifications</Text>
        </View>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={responsiveFontSize(6)} color="#000" />
        </Pressable>
        <Text style={styles.headerText}>Notifications</Text>
        {selectedNotifications.size > 0 && (
          <Pressable style={styles.deleteButton} onPress={handleDelete}>
            <Ionicons name="trash" size={responsiveFontSize(6)} color="red" />
          </Pressable>
        )}
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {notifications.length === 0 ? (
          <View style={styles.noNotificationsContainer}>
            <Text style={styles.noNotificationsText}>No notifications available.</Text>
          </View>
        ) : (
          notifications.map(renderNotificationItem)
        )}
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
    justifyContent: "space-between",
  },
  backButton: {
    marginRight: responsiveWidth(2),
  },
  headerText: {
    fontSize: responsiveFontSize(5),
    fontWeight: "bold",
  },
  deleteButton: {
    marginLeft: "auto",
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
  notificationItemSelected: {
    backgroundColor: "#d1e7ff",
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: responsiveFontSize(4),
    color: "#333",
  },
  noNotificationsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noNotificationsText: {
    fontSize: responsiveFontSize(4),
    color: "#888",
  },
});

export default NotificationPage;
