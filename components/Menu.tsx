import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import { StyleSheet, View, Text, Image, Dimensions, Alert, Linking, Platform, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDarkMode } from "../components/DarkModeContext";
import { useProfileImage } from "../components/ProfileImageContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";

import { firebaseConfig, auth, db, storage } from "../firebaseConfig";

const { width, height } = Dimensions.get("window");

const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;
const responsiveFontSize = (percent: number) => (width * percent) / 100;

const Menu = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState<string | null>(null);
  const { profileImage, setProfileImage } = useProfileImage();
  const { isDarkModeEnabled, toggleDarkMode } = useDarkMode();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const unsubscribeSnapshot = onSnapshot(userDocRef, async (doc) => {
          const userData = doc.data();
          if (userData) {
            setEmail(userData.email);
            if (userData.profileImage) {
              const profileImageUrl = await getDownloadURL(ref(storage, userData.profileImage));
              setProfileImage(profileImageUrl);
            }
          }
        });

        return () => unsubscribeSnapshot();
      } else {
        setEmail(null);
        setProfileImage(null);
      }
    });

    return () => unsubscribeAuth();
  }, [auth, db, storage]);

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
              size={responsiveFontSize(30)}
              color="#dadada"
              style={dynamicStyles.placeholderIcon}
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
          onPress={() => navigation.navigate("ClinicAppointment")}
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

const getDynamicStyles = (isDarkModeEnabled: boolean) => StyleSheet.create({
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
  },
  placeholderIcon: {
    marginBottom: responsiveHeight(1),
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
