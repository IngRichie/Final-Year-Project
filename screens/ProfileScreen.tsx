import * as React from "react";
import { Text, StyleSheet, View, Pressable, Dimensions, ScrollView, Alert, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import StatusBar from "../components/StatusBar"; // Adjust path as per your project structure

const { width, height } = Dimensions.get("window");

const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;
const responsiveFontSize = (percent: number) => (width * percent) / 100;

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

const Profile = () => {
  const [editable, setEditable] = React.useState(false);
  const [firstName, setFirstName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("9898712132");
  const auth = getAuth();
  const db = getFirestore();

  React.useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setFirstName(userData.firstname);
          setEmail(userData.email);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleEditPress = () => {
    setEditable(true);
  };

  const handleSavePress = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        await updateDoc(doc(db, "users", user.uid), {
          firstname: firstName,
          email: email
        });
      }
      setEditable(false);
      Alert.alert("Success", "Profile updated successfully.");
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "Failed to update profile.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar screenName="Profile" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Pressable
            onPress={handleEditPress}
            style={styles.editIconContainer}
          >
            <FontAwesome
              name="pencil"
              size={24}
              color="#fff"
              style={styles.editIcon}
            />
          </Pressable>
          <View style={styles.profileHeader}>
            <FontAwesome name="user-circle" size={responsiveWidth(20)} color="#fff" />
            <View style={styles.profileInfo}>
              {editable ? (
                <TextInput
                  style={[styles.profileNameInput, styles.textInput]}
                  value={firstName}
                  onChangeText={setFirstName}
                  editable={editable}
                />
              ) : (
                <Text style={styles.profileName}>{firstName}</Text>
              )}
            </View>
            <Pressable
              onPress={handleEditPress}
              style={styles.cameraIconContainer}
            >
              <MaterialCommunityIcons
                name="camera"
                size={24}
                color="#fff"
                style={styles.cameraIcon}
              />
            </Pressable>
          </View>
          <View style={styles.profileDetails}>
            <View style={styles.personalDetails}>
              <DetailRow
                label="Email"
                value={email}
                editable={editable}
                onChangeText={setEmail}
                iconName="envelope-o"
              />
              <DetailRow
                label="Phone"
                value={phone}
                editable={editable}
                onChangeText={setPhone}
                iconName="phone"
              />
            </View>
          </View>
        </ScrollView>
        {editable && (
          <Pressable
            onPress={handleSavePress}
            style={styles.saveButton}
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </Pressable>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const DetailRow = ({
  label,
  value,
  iconName,
  editable,
  onChangeText
}: {
  label: string;
  value?: string;
  iconName: string;
  editable?: boolean;
  onChangeText?: (text: string) => void;
}) => {
  return (
    <Pressable style={styles.detailRow}>
      <FontAwesome name={iconName} size={24} color="#1F75FE" style={styles.detailIcon} />
      <View style={styles.detailTextContainer}>
        <Text style={styles.label}>{label}</Text>
        {editable ? (
          <TextInput
            style={[styles.valueInput, styles.textInput]}
            value={value}
            onChangeText={onChangeText}
            editable={editable}
          />
        ) : (
          <Text style={styles.value}>{value}</Text>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f8",
  },
  scrollContainer: {
    flexGrow: 1,
    padding: responsiveWidth(5),
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F75FE',
    padding: responsiveWidth(5),
    borderRadius: 10,
    marginBottom: responsiveHeight(2),
    position: 'relative',
  },
  profileInfo: {
    marginLeft: responsiveWidth(5),
  },
  profileName: {
    fontSize: responsiveFontSize(6),
    color: "#fff",
    fontWeight: "bold",
  },
  profileNameInput: {
    fontSize: responsiveFontSize(6),
    color: "#fff",
    fontWeight: "bold",
  },
  cameraIconContainer: {
    position: "absolute",
    bottom: responsiveHeight(5),
    right: responsiveWidth(4),
    backgroundColor: "#1F75FE",
    borderRadius: 50,
    padding: responsiveWidth(1),
    borderWidth: 1,
    borderColor: 'white'
  },
  cameraIcon: {
    fontSize: responsiveFontSize(5),
  },
  editIconContainer: {
    zIndex: 1,
    position: "absolute",
    top: responsiveHeight(19.5),
    right: responsiveWidth(8),
    backgroundColor: "#1F75FE",
    borderRadius: 70,
    padding: responsiveWidth(1),
    width: responsiveFontSize(9),
    height: responsiveFontSize(9),
    alignItems: 'center',
    justifyContent: 'center'
  },
  saveButton: {
    position: "absolute",
    bottom: responsiveHeight(2),
    left: responsiveWidth(5),
    right: responsiveWidth(5),
    backgroundColor: "#1F75FE",
    borderRadius: 10,
    padding: responsiveHeight(2),
    alignItems: 'center',
  },
  saveButtonText: {
    color: "#fff",
    fontSize: responsiveFontSize(4),
    fontWeight: "bold",
  },
  editIcon: {
    fontSize: responsiveFontSize(5),
  },
  profileDetails: {
    backgroundColor: "#fff",
    padding: responsiveWidth(5),
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: responsiveHeight(2),
  },
  personalDetails: {
    marginBottom: responsiveHeight(2),
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: responsiveHeight(2),
    borderBottomWidth: 1,
    borderBottomColor: "rgba(204, 204, 204, 0.3)",
    justifyContent: 'space-between',
  },
  detailIcon: {
    marginRight: responsiveWidth(2),
  },
  detailTextContainer: {
    flex: 1,
    marginLeft: responsiveWidth(2),
  },
  label: {
    fontSize: responsiveFontSize(4.5),
    color: "#000",
  },
  value: {
    fontSize: responsiveFontSize(3.5),
    color: "#666",
  },
  valueInput: {
    fontSize: responsiveFontSize(3.5),
    color: "#666",
  },
  textInput: {
    ...Platform.select({
      web: {
        outline: 'none',
        boxShadow: 'none',
      },
    }),
  },
});

export default Profile;
