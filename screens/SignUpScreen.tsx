import React, { useState } from "react";
import { StyleSheet, Text, Pressable, View, ScrollView, Dimensions, Image, Alert } from "react-native";
import { TextInput as RNPTextInput } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { setDoc, doc, serverTimestamp, getDocs, collection } from "firebase/firestore";
import { auth, db } from "../firebaseConfig"; // Ensure you import auth from your Firebase config correctly

const { width, height } = Dimensions.get("window");

const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;
const responsiveFontSize = (percent: number) => (width * percent) / 100;

const SignUpScreen: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const onSignUpPress = async () => {
    setError(null);
    try {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      // Check if username is unique
      const usernamesSnapshot = await getDocs(collection(db, "users"));
      const usernames = usernamesSnapshot.docs.map(doc => doc.data().username);
      if (usernames.includes(username)) {
        setError("Username is already taken. Please choose another one.");
        return;
      }

      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Send verification email
      await sendEmailVerification(user);

      // Store user information in Firestore
      await setDoc(doc(db, "users", user.uid), {
        username: username,
        firstname: firstname,
        email: email,
        createdAt: serverTimestamp()
      });

      // Show verification note
      Alert.alert(
        "Verification Required",
        "A verification email has been sent to your email address. Please verify your email before proceeding.",
        [{ text: "OK", onPress: () => console.log("Verification email sent") }]
      );

      // Clear input fields
      setUsername("");
      setFirstname("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      // Navigate to a verification pending screen or wait for user verification
      navigation.navigate("LoginScreen");

    } catch (error: any) {
      handleError(error);
    }
  };

  const handleError = (error: any) => {
    let message;
    switch (error.code) {
      case "auth/email-already-in-use":
        message = "The email address is already in use by another account.";
        break;
      case "auth/invalid-email":
        message = "The email address is not valid.";
        break;
      case "auth/weak-password":
        message = "The password is too weak. It should be at least 6 characters long.";
        break;
      case "auth/operation-not-allowed":
        message = "Email/password accounts are not enabled. Please contact support.";
        break;
      case "auth/invalid-argument":
        message = "An invalid argument was provided. Please check your input.";
        break;
      case "auth/invalid-user-import":
        message = "The user record to import is invalid.";
        break;
      default:
        message = "An unexpected error occurred. Please try again.";
    }
    setError(message);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <Image
            style={styles.logo}
            resizeMode="contain"
            source={require("../assets/campuscare-logo-1.png")}
          />
          <View style={styles.formContainer}>
            {error && <Text style={styles.errorText}>{error}</Text>}
            <RNPTextInput
              style={styles.input}
              label="Username"
              placeholder="Username"
              mode="outlined"
              value={username}
              onChangeText={setUsername}
              placeholderTextColor="#545454"
              outlineColor="#0b6fab"
              activeOutlineColor="#175689"
              theme={{ colors: { text: "#626262" } }}
            />
            <RNPTextInput
              style={styles.input}
              label="Firstname"
              placeholder="Firstname"
              mode="outlined"
              value={firstname}
              onChangeText={setFirstname}
              placeholderTextColor="#545454"
              outlineColor="#0b6fab"
              activeOutlineColor="#175689"
              theme={{ colors: { text: "#626262" } }}
            />
            <RNPTextInput
              style={styles.input}
              label="Email"
              placeholder="Email"
              mode="outlined"
              value={email}
              onChangeText={setEmail}
              placeholderTextColor="#545454"
              outlineColor="#0b6fab"
              activeOutlineColor="#175689"
              keyboardType="email-address"
              theme={{ colors: { text: "#626262" } }}
            />
            <RNPTextInput
              style={styles.input}
              label="Password"
              placeholder="Password"
              mode="outlined"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor="#505050"
              outlineColor="#0c6b9b"
              activeOutlineColor="#083699"
              theme={{ colors: { text: "#4b4b4b" } }}
            />
            <RNPTextInput
              style={styles.input}
              label="Confirm Password"
              placeholder="Confirm Password"
              mode="outlined"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              placeholderTextColor="#4b4b4b"
              outlineColor="#084e83"
              activeOutlineColor="#095290"
              theme={{ colors: { text: "#474747" } }}
            />
            <LinearGradient
              colors={["#318CE7", "#1F75FE"]}
              style={styles.signupButton}
            >
              <Pressable style={styles.pressable} onPress={onSignUpPress}>
                <Text style={styles.signupText}>Sign Up</Text>
              </Pressable>
            </LinearGradient>
          </View>

          <View style={styles.haveAnAccount}>
            <Text style={styles.haveAnAccountText}>Already have an account? </Text>
            <Pressable onPress={() => navigation.navigate("LoginScreen")}>
              <Text style={styles.loginBtn}>Login</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: responsiveHeight(5),
    paddingHorizontal: responsiveWidth(5),
  },
  logo: {
    width: responsiveWidth(70),
    height: responsiveHeight(17),
    marginBottom: responsiveHeight(2),
  },
  formContainer: {
    width: responsiveWidth(80),
    marginBottom: responsiveHeight(2),
  },
  input: {
    marginBottom: responsiveHeight(2),
  },
  signupButton: {
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
  },
  pressable: {
    padding: responsiveWidth(3),
    alignItems: "center",
  },
  signupText: {
    color: "#fff",
    fontSize: responsiveFontSize(5),
  },
  haveAnAccount: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: responsiveHeight(2),
    marginBottom: responsiveHeight(5),
  },
  haveAnAccountText: {
    fontSize: responsiveFontSize(4.0),
  },
  loginBtn: {
    color: "#1F75FE",
    fontSize: responsiveFontSize(4.0),
    fontWeight: "600",
    marginLeft: responsiveWidth(1),
  },
  errorText: {
    color: "red",
    marginBottom: responsiveHeight(2),
    fontSize: responsiveFontSize(3.5),
  },
});

export default SignUpScreen;
