import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, Pressable, Image, Dimensions, Alert, Linking, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDarkMode } from "../components/DarkModeContext";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";

const { width, height } = Dimensions.get("window");

const responsiveWidth = (percent) => (width * percent) / 100;
const responsiveHeight = (percent) => (height * percent) / 100;
const responsiveFontSize = (percent) => (width * percent) / 100;

const Menu = ({ navigation }) => {
  const [email, setEmail] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const { isDarkModeEnabled, toggleDarkMode } = useDarkMode();
  const auth = getAuth();
  const db = getFirestore();
  const storage = getStorage();
  const fileInputRef = useRef(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      const unsubscribe = onSnapshot(userDocRef, async (doc) => {
        const userData = doc.data();
        if (userData) {
          setEmail(userData.email);
          const imagePath = `profileImages/${user.uid}.png`;
          try {
            const profileImageUrl = await getDownloadURL(ref(storage, imagePath));
            setProfileImage(profileImageUrl);
          } catch (error) {
            console.error("Error fetching profile image:", error);
          }
        }
      });

      return () => unsubscribe();
    }
  }, []);

  const handleProfilePictureChange = () => {
    if (Platform.OS === 'web') {
      fileInputRef.current?.click();
    } else {
      handleImagePicker();
    }
  };

  const handleImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Please grant permission to access the photo library.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      try {
        const uploadedImageUrl = await uploadImageAsync(result.assets[0].uri);
        setProfileImage(uploadedImageUrl);

        const user = auth.currentUser;
        if (user) {
          await updateDoc(doc(db, "users", user.uid), {
            profileImage: `profileImages/${user.uid}.png`,
          });
        }
      } catch (error) {
        Alert.alert("Error", "Failed to upload image. Please try again.");
      }
    }
  };

  const uploadImageAsync = async (uri) => {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new Error("Failed to upload image"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const fileRef = ref(storage, `profileImages/${user.uid}.png`);
    await uploadBytes(fileRef, blob);

    blob.close();

    // Get the download URL to set it as the profile image immediately
    return await getDownloadURL(fileRef);
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const uri = URL.createObjectURL(file);
        const uploadedImageUrl = await uploadImageAsync(uri);
        setProfileImage(uploadedImageUrl);

        const user = auth.currentUser;
        if (user) {
          await updateDoc(doc(db, "users", user.uid), {
            profileImage: `profileImages/${user.uid}.png`,
          });
        }
      } catch (error) {
        Alert.alert("Error", "Failed to upload image. Please try again.");
      }
    }
  };

  const handleLogOut = async () => {
    try {
      await auth.signOut();
      navigation.navigate("LoginScreen");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleDarkModeToggle = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        toggleDarkMode();
        const newDarkModeState = !isDarkModeEnabled;
        await updateDoc(doc(db, "users", user.uid), {
          darkModeEnabled: newDarkModeState,
        });
      } catch (error) {
        console.error("Error updating dark mode:", error);
        Alert.alert("Error", "Failed to update dark mode.");
      }
    }
  };

  const dynamicStyles = getDynamicStyles(isDarkModeEnabled);

  return (
    <SafeAreaView style={dynamicStyles.container}>
      <LinearGradient
        style={dynamicStyles.header}
        locations={[0, 1]}
        colors={["#318CE7", "#1F75FE"]}
      >
        <View style={dynamicStyles.profileContainer}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={dynamicStyles.profileIcon} />
          ) : (
            <FontAwesome
              name="user-circle-o"
              size={responsiveFontSize(18)}
              color="#dadada"
              style={dynamicStyles.profileIcon}
            />
          )}
          <Text style={dynamicStyles.username}>{email}</Text>
        </View>
        <Pressable onPress={handleDarkModeToggle}>
          <Ionicons
            name={isDarkModeEnabled ? "sunny" : "moon"}
            size={responsiveFontSize(8)}
            color="#fff"
            style={dynamicStyles.nightModeIcon}
          />
        </Pressable>
      </LinearGradient>

      <View style={dynamicStyles.menuItems}>
        <Pressable
          style={({ pressed }) => [
            dynamicStyles.menuItem,
            { backgroundColor: pressed ? (isDarkModeEnabled ? "#333" : "#f0f0f0") : "transparent" },
          ]}
          onPress={() => navigation.navigate("SymptomAssessment")}
        >
          <Ionicons
            name="pulse-outline"
            size={responsiveFontSize(7)}
            color="#1F75FE"
            style={dynamicStyles.menuIcon}
          />
          <Text style={dynamicStyles.menuItemText}>Symptom Assessment</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            dynamicStyles.menuItem,
            { backgroundColor: pressed ? (isDarkModeEnabled ? "#333" : "#f0f0f0") : "transparent" },
          ]}
          onPress={() => navigation.navigate("MedSchedule")}
        >
          <Ionicons
            name="calendar-outline"
            size={responsiveFontSize(7)}
            color="#1F75FE"
            style={dynamicStyles.menuIcon}
          />
          <Text style={dynamicStyles.menuItemText}>Medication Schedule</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            dynamicStyles.menuItem,
            { backgroundColor: pressed ? (isDarkModeEnabled ? "#333" : "#f0f0f0") : "transparent" },
          ]}
          onPress={() => Linking.openURL("https://webapps.knust.edu.gh/uhs/appointments/")}
        >
          <Ionicons
            name="medkit-outline"
            size={responsiveFontSize(7)}
            color="#1F75FE"
            style={dynamicStyles.menuIcon}
          />
          <Text style={dynamicStyles.menuItemText}>Clinic Appointment</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            dynamicStyles.menuItem,
            { backgroundColor: pressed ? (isDarkModeEnabled ? "#333" : "#f0f0f0") : "transparent" },
          ]}
          onPress={() => navigation.navigate("NewsPage")}
        >
          <Ionicons
            name="newspaper-outline"
            size={responsiveFontSize(7)}
            color="#1F75FE"
            style={dynamicStyles.menuIcon}
          />
          <Text style={dynamicStyles.menuItemText}>News</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            dynamicStyles.menuItem,
            { backgroundColor: pressed ? (isDarkModeEnabled ? "#333" : "#f0f0f0") : "transparent" },
          ]}
          onPress={() => navigation.navigate("NotificationScreen")}
        >
          <Ionicons
            name="notifications-outline"
            size={responsiveFontSize(7)}
            color="#1F75FE"
            style={dynamicStyles.menuIcon}
          />
          <Text style={dynamicStyles.menuItemText}>Notifications</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            dynamicStyles.menuItem,
            { backgroundColor: pressed ? (isDarkModeEnabled ? "#333" : "#f0f0f0") : "transparent" },
          ]}
          onPress={() => navigation.navigate("Settings")}
        >
          <Ionicons
            name="settings-outline"
            size={responsiveFontSize(7)}
            color="#1F75FE"
            style={dynamicStyles.menuIcon}
          />
          <Text style={dynamicStyles.menuItemText}>Settings</Text>
        </Pressable>
      </View>

      <View style={dynamicStyles.bottomItems}>
        <View style={dynamicStyles.divider} />
        <Pressable style={dynamicStyles.logoutButton} onPress={handleLogOut}>
          <Ionicons
            name="log-out-outline"
            size={responsiveFontSize(7)}
            color="#1F75FE"
            style={dynamicStyles.menuIcon}
          />
          <Text style={dynamicStyles.menuItemText}>Log Out</Text>
        </Pressable>
      </View>
      {Platform.OS === 'web' && (
        <input type="file" accept="image/*" style={{ display: 'none' }} ref={fileInputRef} onChange={handleFileInputChange} />
      )}
    </SafeAreaView>
  );
};

const getDynamicStyles = (isDarkModeEnabled) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDarkModeEnabled ? "#1E1E1E" : "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: responsiveWidth(5),
    backgroundColor: "#1F75FE",
    height: responsiveHeight(25),
  },
  profileContainer: {
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "flex-end",
    justifyContent: 'center',
  },
  profileIcon: {
    marginBottom: responsiveHeight(1),
    width: responsiveFontSize(30),
    height: responsiveFontSize(30),
    borderRadius: responsiveFontSize(15),
    backgroundColor: '#dadada',
  },
  username: {
    fontFamily: "Poppins-SemiBold",
    fontSize: responsiveFontSize(3.5),
    color: "#fff",
  },
  nightModeIcon: {
    alignSelf: "flex-start",
    fontSize: responsiveFontSize(6),
  },
  menuItems: {
    marginTop: responsiveHeight(2.5),
    width: '100%',
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: responsiveHeight(1.25),
    paddingLeft: responsiveHeight(3.25),
  },
  menuIcon: {
    marginRight: responsiveWidth(3.75),
  },
  menuItemText: {
    fontFamily: "Poppins-Regular",
    fontSize: responsiveFontSize(4.5),
    color: isDarkModeEnabled ? "#fff" : "#333",
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: isDarkModeEnabled ? "#666" : "#ccc",
    marginVertical: responsiveHeight(1.25),
  },
  bottomItems: {
    marginTop: "auto",
    paddingHorizontal: responsiveWidth(5),
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: responsiveHeight(1.25),
  },
});

export default Menu;
