import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  Pressable,
  View,
  ScrollView,
  Dimensions,
  Image,
  Alert,
  Platform,
} from "react-native";
import { TextInput as RNPTextInput } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebaseConfig"; // Ensure you import auth from your Firebase config correctly
import * as Google from "expo-auth-session/providers/google";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const { width, height } = Dimensions.get("window");

const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;
const responsiveFontSize = (percent: number) => (width * percent) / 100;

const SignUpScreen: React.FC = () => {
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "549195152079-55haub8lb64lkhm66ehidjpui9j0723r.apps.googleusercontent.com",
    iosClientId: "549195152079-366ujglsn1t97ke7qh4gfeh3vo4pjcjs.apps.googleusercontent.com",
    androidClientId: "549195152079-fgn2r7kfapu3p4u76d2ropartevciqic.apps.googleusercontent.com",
    webClientId: "549195152079-27q4qanm3i7c4bvm8akm844iflp37u3p.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      handleGoogleSignIn(authentication.accessToken);
    }
  }, [response]);

  const handleGoogleSignIn = async (token: string) => {
    const credential = GoogleAuthProvider.credential(token);
    try {
      const userCredential = await signInWithCredential(auth, credential);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        firstname: user.displayName?.split(" ")[0] || "",
        lastname: user.displayName?.split(" ")[1] || "",
        email: user.email,
        createdAt: serverTimestamp(),
        interests: [], // Initialize with an empty array
      });

      navigation.navigate("MainTabs", {
        screen: "Home",
        params: { screen: "Homepage1" },
      });
    } catch (error) {
      console.error("Google Sign-In error:", error);
    }
  };

  const onSignUpPress = async () => {
    setError(null);
    try {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Send verification email
      await sendEmailVerification(user);

      // Store user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        firstname: firstname,
        lastname: lastname,
        email: email,
        createdAt: serverTimestamp(),
        interests: [], // Initialize with an empty array
      });

      // Show verification note
      showVerificationAlert();

      // Clear input fields
      setFirstname("");
      setLastname("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      // Navigate to login screen after user is created
      navigation.navigate("LoginScreen");
    } catch (error: any) {
      handleError(error);
    }
  };

  const showVerificationAlert = () => {
    if (Platform.OS === "web") {
      window.alert(
        "A verification email has been sent to your email address. Please verify your email before proceeding."
      );
    } else {
      Alert.alert(
        "Verification Required",
        "A verification email has been sent to your email address. Please verify your email before proceeding.",
        [{ text: "OK", onPress: () => console.log("Verification email sent") }]
      );
    }
  };

  const handleError = (error: any) => {
    let message: React.SetStateAction<string | null>;
    switch (error.code) {
      case "auth/email-already-in-use":
        message = "The email address is already in use by another account.";
        break;
      case "auth/invalid-email":
        message = "The email address is not valid.";
        break;
      case "auth/weak-password":
        message =
          "The password is too weak. It should be at least 6 characters long.";
        break;
      case "auth/operation-not-allowed":
        message =
          "Email/password accounts are not enabled. Please contact support.";
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
              label="Surname"
              placeholder="Surname"
              mode="outlined"
              value={lastname}
              onChangeText={setLastname}
              placeholderTextColor="#545454"
              outlineColor="#0b6fab"
              activeOutlineColor="#175689"
              theme={{ colors: { text: "#626262" } }}
            />
            <RNPTextInput
              style={styles.input}
              label="Other names"
              placeholder="Other names"
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
            <Text style={styles.orSignUpWith}>Or Sign Up with</Text>
            <Pressable
              style={styles.googleButton}
              onPress={() => promptAsync()}
            >
              <FontAwesome
                name="google"
                size={responsiveFontSize(5)}
                color="#fff"
              />
              <Text style={styles.googleButtonText}>Sign Up with Google</Text>
            </Pressable>
          </View>

          <View style={styles.haveAnAccount}>
            <Text style={styles.haveAnAccountText}>
              Already have an account?{" "}
            </Text>
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
    marginBottom: responsiveHeight(2),
  },
  pressable: {
    padding: responsiveWidth(3),
    alignItems: "center",
  },
  signupText: {
    color: "#fff",
    fontSize: responsiveFontSize(5),
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#DB4437",
    width: "100%",
  },
  googleButtonText: {
    color: "#fff",
    fontSize: responsiveFontSize(5),
    marginLeft: 10,
  },
  orSignUpWith: {
    fontSize: responsiveFontSize(3.5),
    textAlign: "center",
    fontFamily: "Poppins-Regular",
  },
  haveAnAccount: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: responsiveHeight(2),
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
    fontSize: responsiveFontSize(4),
    textAlign: "center",
  },
});

export default SignUpScreen;
