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
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp, ParamListBase } from "@react-navigation/native";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Ensure this path is correct

// Conditionally import based on the platform
const TouchableOpacity = Platform.OS === 'web' ? require('react-native-web').TouchableOpacity : require('react-native').TouchableOpacity;

const { width, height } = Dimensions.get("window");

const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;
const responsiveFontSize = (percent: number) => (width * percent) / 100;

type Notification = {
  id: string;
  medicationName: string;
  selectedForm: string;
  selectedUnit: string;
  frequency: string;
  times: string[];
};

const NotificationPage: React.FC = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedNotifications, setSelectedNotifications] = useState<Set<string>>(new Set());

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'medReminder'), (querySnapshot) => {
      const fetchedNotifications: Notification[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        fetchedNotifications.push({
          id: doc.id,
          medicationName: data.medicationName,
          selectedForm: data.selectedForm,
          selectedUnit: data.selectedUnit,
          frequency: data.frequency,
          times: data.times || [], // Default to empty array if undefined
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
      await Promise.all(Array.from(selectedNotifications).map(id => deleteDoc(doc(db, 'medReminder', id))));
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
          <Text style={styles.notificationTitle}>{notification.medicationName}</Text>
          <Text style={styles.notificationDescription}>
            {notification.selectedForm} {notification.selectedUnit}
          </Text>
          <Text style={styles.notificationDate}>{notification.frequency}</Text>
          <Text style={styles.notificationTimes}>
            {notification.times.join(", ")}
          </Text>
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
  notificationTimes: {
    fontSize: responsiveFontSize(3),
    color: "#555",
    marginTop: responsiveHeight(1),
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
  // Media queries for tablet
  '@media (min-width: 768px)': {
    header: {
      paddingHorizontal: responsiveWidth(3),
      paddingVertical: responsiveHeight(1.5),
    },
    headerText: {
      fontSize: responsiveFontSize(4.5),
    },
    scrollContainer: {
      paddingHorizontal: responsiveWidth(4),
    },
    notificationItem: {
      marginBottom: responsiveHeight(2.5),
      borderRadius: responsiveWidth(1.5),
    },
    notificationContent: {
      padding: responsiveWidth(3.5),
    },
    notificationTitle: {
      fontSize: responsiveFontSize(3.5),
    },
    notificationDescription: {
      fontSize: responsiveFontSize(3),
    },
    notificationDate: {
      fontSize: responsiveFontSize(2.5),
    },
    notificationTimes: {
      fontSize: responsiveFontSize(2.5),
    },
  },
  // Media queries for desktop
  '@media (min-width: 1024px)': {
    header: {
      paddingHorizontal: responsiveWidth(2.5),
      paddingVertical: responsiveHeight(1),
    },
    headerText: {
      fontSize: responsiveFontSize(4),
    },
    scrollContainer: {
      paddingHorizontal: responsiveWidth(3.5),
    },
    notificationItem: {
      marginBottom: responsiveHeight(2),
      borderRadius: responsiveWidth(1),
    },
    notificationContent: {
      padding: responsiveWidth(3),
    },
    notificationTitle: {
      fontSize: responsiveFontSize(3),
    },
    notificationDescription: {
      fontSize: responsiveFontSize(2.5),
    },
    notificationDate: {
      fontSize: responsiveFontSize(2),
    },
    notificationTimes: {
      fontSize: responsiveFontSize(2),
    },
  },
});

export default NotificationPage;
