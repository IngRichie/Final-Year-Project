import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import { StyleSheet, View, Text, Pressable, Dimensions, ScrollView, Alert, TextInput, Image, Platform, KeyboardAvoidingView } from "react-native";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAuth, updateEmail, EmailAuthProvider, reauthenticateWithCredential, deleteUser } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL, uploadBytes, deleteObject } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { useDarkMode } from "../components/DarkModeContext";
import { useProfileImage } from "../components/ProfileImageContext";
import StatusBar from "../components/StatusBar";

const { width, height } = Dimensions.get("window");

const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;
const responsiveFontSize = (percent: number) => (width * percent) / 100;

const Profile = () => {
  const { isDarkModeEnabled } = useDarkMode();
  const { profileImage, setProfileImage } = useProfileImage();
  const navigation = useNavigation();

  const [editable, setEditable] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [otherNames, setOtherNames] = useState("");
  const [email, setEmail] = useState("");
  const [newProfileImage, setNewProfileImage] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);

  const auth = getAuth();
  const db = getFirestore();
  const storage = getStorage();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setFirstName(userData.firstname);
          setEmail(userData.email);
          setSurname(userData.lastname);
          setOtherNames(userData.firstname);
          const imagePath = `profileImages/${user.uid}.png`;
          try {
            const profileImageUrl = await getDownloadURL(ref(storage, imagePath));
            setProfileImage(profileImageUrl);
          } catch (error) {
            if (error.code === 'storage/object-not-found') {
              console.log("Profile image does not exist.");
            } else {
              console.error("Error fetching profile image:", error);
            }
          }
        }
      }
    };

    fetchUserData();
  }, [auth, db, storage]);

  const handleProfilePictureChange = () => {
    if (Platform.OS === 'web') {
      fileInputRef.current?.click();
    } else {
      Alert.alert(
        "Select Image Source",
        "Choose the source of your profile picture",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Camera", onPress: handleCamera },
          { text: "Library", onPress: handleImagePicker }
        ]
      );
    }
  };

  const handleCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Please grant permission to access the camera.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
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

  const uploadImageAsync = async (uri: string) => {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const blob = await new Promise<Blob>((resolve, reject) => {
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

  const handleFileInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
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

  const handleEditPress = () => {
    setEditable(true);
  };

  const handleSavePress = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        if (email !== user.email) {
          await updateEmail(user, email);
        }

        await updateDoc(doc(db, "users", user.uid), {
          firstname: firstName,
          email: email,
          lastname: surname,
          otherNames: otherNames,
        });
      }
      setEditable(false);
      Alert.alert("Success", "Profile updated successfully.");
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "Failed to update profile.");
    }
  };

  const handleDeleteAccount = async () => {
    const user = auth.currentUser;
    if (user) {
      if (Platform.OS === 'web') {
        const password = prompt("Please enter your password to confirm:");
        if (password) {
          try {
            const credentials = EmailAuthProvider.credential(user.email, password);
            await reauthenticateWithCredential(user, credentials);

            await deleteDoc(doc(db, "users", user.uid));

            try {
              const profileImageRef = ref(storage, `profileImages/${user.uid}.png`);
              await deleteObject(profileImageRef);
            } catch (error) {
              if (error.code !== 'storage/object-not-found') {
                throw error;
              }
            }

            await deleteUser(user);

            alert("Account Deleted", "Your account has been deleted successfully.");
            navigation.navigate("SignUpScreen");
          } catch (error) {
            console.error("Error deleting account:", error);
            alert("Error", "Failed to delete account.");
          }
        }
      } else {
        setShowPasswordPrompt(true);
      }
    }
  };

  const handlePasswordSubmit = async () => {
    const user = auth.currentUser;
    if (user && password) {
      try {
        const credentials = EmailAuthProvider.credential(user.email, password);
        await reauthenticateWithCredential(user, credentials);

        await deleteDoc(doc(db, "users", user.uid));

        try {
          const profileImageRef = ref(storage, `profileImages/${user.uid}.png`);
          await deleteObject(profileImageRef);
        } catch (error) {
          if (error.code !== 'storage/object-not-found') {
            throw error;
          }
        }

        await deleteUser(user);

        Alert.alert("Account Deleted", "Your account has been deleted successfully.", [
          {
            text: "OK",
            onPress: () => navigation.navigate("SignUpScreen"),
          },
        ]);
      } catch (error) {
        console.error("Error deleting account:", error);
        if (error.code === 'auth/invalid-credential') {
          Alert.alert("Error", "Invalid credentials. Please try again.");
        } else {
          Alert.alert("Error", "Failed to delete account.");
        }
      } finally {
        setShowPasswordPrompt(false);
      }
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkModeEnabled ? "#1E1E1E" : "#f0f4f8" }]}>
      <StatusBar screenName="Profile" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Pressable onPress={handleEditPress} style={styles.editIconContainer}>
            <FontAwesome name="pencil" size={24} color="#fff" style={styles.editIcon} />
          </Pressable>
          <View style={styles.profileHeader}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
            ) : (
              <FontAwesome name="user-circle-o" size={responsiveWidth(20)} color="#fff" style={styles.profileIcon} />
            )}
            <View style={styles.profileInfo}>
              {editable ? (
                <TextInput
                  style={[styles.profileNameInput, styles.textInput, { color: "#fff" }]}
                  value={firstName}
                  onChangeText={setFirstName}
                  editable={editable}
                />
              ) : (
                <Text style={[styles.profileName, { color: "#fff" }]}>{firstName}</Text>
              )}
            </View>
            <Pressable onPress={handleProfilePictureChange} style={styles.cameraIconContainer}>
              <MaterialCommunityIcons name="camera" size={24} color="#fff" style={styles.cameraIcon} />
            </Pressable>
            {Platform.OS === 'web' && (
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleFileInputChange}
              />
            )}
          </View>
          <View style={[styles.profileDetails, { backgroundColor: isDarkModeEnabled ? "#333" : "#fff" }]}>
            <View style={styles.personalDetails}>
              <DetailRow
                label="Email"
                value={email}
                editable={editable}
                onChangeText={setEmail}
                iconName="envelope-o"
                isDarkModeEnabled={isDarkModeEnabled}
              />
              <DetailRow
                label="Surname"
                value={surname}
                editable={editable}
                onChangeText={setSurname}
                iconName="user"
                isDarkModeEnabled={isDarkModeEnabled}
              />
              <DetailRow
                label="Other Names"
                value={otherNames}
                editable={editable}
                onChangeText={setOtherNames}
                iconName="user"
                isDarkModeEnabled={isDarkModeEnabled}
              />
            </View>
          </View>
        </ScrollView>
        {editable && (
          <Pressable onPress={handleSavePress} style={[styles.button, styles.saveButton]}>
            <Text style={styles.saveButtonText}>Save</Text>
          </Pressable>
        )}
        {!editable && (
          <Pressable onPress={handleDeleteAccount} style={[styles.button, styles.deleteButton]}>
            <Text style={styles.deleteButtonText}>Delete Account</Text>
          </Pressable>
        )}
      </KeyboardAvoidingView>

      {showPasswordPrompt && (
        <View style={styles.passwordPromptContainer}>
          <View style={styles.passwordPrompt}>
            <Text style={styles.passwordPromptText}>Enter Password:</Text>
            <TextInput
              style={styles.passwordInput}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoFocus
            />
            <View style={styles.passwordPromptButtons}>
              <Pressable onPress={() => setShowPasswordPrompt(false)} style={styles.passwordPromptButton}>
                <Text style={styles.passwordPromptButtonText}>Cancel</Text>
              </Pressable>
              <Pressable onPress={handlePasswordSubmit} style={styles.passwordPromptButton}>
                <Text style={styles.passwordPromptButtonText}>OK</Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const DetailRow = ({
  label,
  value,
  iconName,
  editable,
  onChangeText,
  isDarkModeEnabled,
}: {
  label: string;
  value: string;
  iconName: string;
  editable: boolean;
  onChangeText: (text: string) => void;
  isDarkModeEnabled: boolean;
}) => {
  return (
    <Pressable style={styles.detailRow}>
      <FontAwesome name={iconName} size={24} color="#1F75FE" style={styles.detailIcon} />
      <View style={styles.detailTextContainer}>
        <Text style={[styles.label, { color: isDarkModeEnabled ? "#fff" : "#000" }]}>{label}</Text>
        {editable ? (
          <TextInput
            style={[styles.valueInput, styles.textInput, { color: isDarkModeEnabled ? "#fff" : "#000" }]}
            value={value}
            onChangeText={onChangeText}
            editable={editable}
          />
        ) : (
          <Text style={[styles.value, { color: isDarkModeEnabled ? "#fff" : "#000" }]}>{value}</Text>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  profileIcon: {
    width: responsiveWidth(20),
    height: responsiveWidth(20),
    borderRadius: responsiveWidth(10),
  },
  profileImage: {
    width: responsiveWidth(20),
    height: responsiveWidth(20),
    borderRadius: responsiveWidth(10),
  },
  profileInfo: {
    marginLeft: responsiveWidth(5),
  },
  profileName: {
    fontSize: responsiveFontSize(6),
    fontWeight: 'bold',
    color: '#fff',
  },
  profileNameInput: {
    fontSize: responsiveFontSize(6),
    fontWeight: 'bold',
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: responsiveHeight(5),
    right: responsiveWidth(4),
    backgroundColor: '#1F75FE',
    borderRadius: 50,
    padding: responsiveWidth(1),
    borderWidth: 1,
    borderColor: 'white',
  },
  cameraIcon: {
    fontSize: responsiveFontSize(5),
  },
  editIconContainer: {
    zIndex: 1,
    position: 'absolute',
    top: responsiveHeight(19.5),
    right: responsiveWidth(8),
    backgroundColor: '#1F75FE',
    borderRadius: 70,
    padding: responsiveWidth(1),
    width: responsiveFontSize(9),
    height: responsiveFontSize(9),
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    position: 'absolute',
    left: responsiveWidth(5),
    right: responsiveWidth(5),
    borderRadius: 10,
    padding: responsiveHeight(2),
    alignItems: 'center',
  },
  saveButton: {
    bottom: responsiveHeight(6),
    backgroundColor: '#1F75FE',
  },
  deleteButton: {
    bottom: responsiveHeight(2),
    backgroundColor: 'red',
    marginTop: responsiveHeight(2),
  },
  saveButtonText: {
    color: '#fff',
    fontSize: responsiveFontSize(4),
    fontWeight: 'bold',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: responsiveFontSize(4),
    fontWeight: 'bold',
  },
  profileDetails: {
    padding: responsiveWidth(5),
    borderRadius: 10,
    shadowColor: '#000',
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: responsiveHeight(2),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(204, 204, 204, 0.3)',
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
  },
  value: {
    fontSize: responsiveFontSize(3.5),
  },
  valueInput: {
    fontSize: responsiveFontSize(3.5),
  },
  textInput: {
    ...Platform.select({
      web: {
        outline: 'none',
        boxShadow: 'none',
      },
    }),
  },
  passwordPromptContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  passwordPrompt: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 10,
  },
  passwordPromptText: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  passwordInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  passwordPromptButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  passwordPromptButton: {
    marginLeft: 10,
  },
  passwordPromptButtonText: {
    fontSize: 16,
    color: '#1F75FE',
  },
});

export default Profile;
