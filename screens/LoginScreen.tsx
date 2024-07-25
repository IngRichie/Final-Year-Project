import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  Pressable,
  View,
  ScrollView,
  Dimensions,
  Image,
  Platform,
} from "react-native";
import { TextInput as RNPTextInput } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { db, auth } from "../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomCheckBox from "../components/CustomCheckBox";
import * as Google from "expo-auth-session/providers/google";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const { width, height } = Dimensions.get("window");

const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;
const responsiveFontSize = (percent: number) => (width * percent) / 100;

const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const LoginScreen = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(false);
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "549195152079-55haub8lb64lkhm66ehidjpui9j0723r.apps.googleusercontent.com",
    iosClientId: "549195152079-366ujglsn1t97ke7qh4gfeh3vo4pjcjs.apps.googleusercontent.com",
    androidClientId: "549195152079-fgn2r7kfapu3p4u76d2ropartevciqic.apps.googleusercontent.com",
    webClientId: "549195152079-27q4qanm3i7c4bvm8akm844iflp37u3p.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      handleGoogleSignIn(authentication.accessToken);
    }
  }, [response]);

  useEffect(() => {
    const checkStoredCredentials = async () => {
      try {
        let storedEmail = "";
        let storedPassword = "";
        if (Platform.OS === "web") {
          storedEmail = localStorage.getItem("emailOrUsername") || "";
          storedPassword = localStorage.getItem("password") || "";
        } else {
          storedEmail = (await AsyncStorage.getItem("emailOrUsername")) || "";
          storedPassword = (await AsyncStorage.getItem("password")) || "";
        }
        if (storedEmail && storedPassword) {
          setEmailOrUsername(storedEmail);
          setPassword(storedPassword);
          onLoginPress(storedEmail, storedPassword);
        }
      } catch (error) {
        console.error("Error checking stored credentials:", error);
      }
    };
    checkStoredCredentials();
  }, []);

  const handleGoogleSignIn = async (token: string) => {
    const credential = GoogleAuthProvider.credential(token);
    try {
      const userCredential = await signInWithCredential(auth, credential);
      navigation.navigate("MainTabs", {
        screen: "Home",
        params: { screen: "Homepage1" },
      });
    } catch (error) {
      console.error("Google Sign-In error:", error);
    }
  };

  const onLoginPress = async (emailInput?: string, passwordInput?: string) => {
    try {
      let email = emailInput || emailOrUsername;
      let pass = passwordInput || password;

      if (!email || !pass) {
        throw new Error("Email and password are required.");
      }

      if (!isValidEmail(emailOrUsername)) {
        const userQuery = query(
          collection(db, "users"),
          where("username", "==", emailOrUsername)
        );
        const userSnapshot = await getDocs(userQuery);
        if (!userSnapshot.empty) {
          const userData = userSnapshot.docs[0].data();
          email = userData.email;
        } else {
          throw new Error("User not found");
        }
      }

      await signInWithEmailAndPassword(auth, email, pass);
      if (rememberMe) {
        if (Platform.OS === "web") {
          localStorage.setItem("emailOrUsername", emailOrUsername);
          localStorage.setItem("password", password);
        } else {
          await AsyncStorage.setItem("emailOrUsername", emailOrUsername);
          await AsyncStorage.setItem("password", password);
        }
      } else {
        if (Platform.OS === "web") {
          localStorage.removeItem("emailOrUsername");
          localStorage.removeItem("password");
        } else {
          await AsyncStorage.removeItem("emailOrUsername");
          await AsyncStorage.removeItem("password");
        }
      }
      setEmailOrUsername("");
      setPassword("");
      navigation.navigate("MainTabs", {
        screen: "Home",
        params: { screen: "Homepage1" },
      });
    } catch (error: any) {
      console.error("Login error:", error);
      setError(getErrorMessage(error));
    }
  };

  const getErrorMessage = (error: any) => {
    switch (error.code) {
      case "auth/invalid-email":
        return "The email address is not valid.";
      case "auth/user-disabled":
        return "Your account has been disabled. Please contact support.";
      case "auth/user-not-found":
        return "Invalid email or password.";
      case "auth/wrong-password":
        return "Invalid email or password.";
      case "auth/invalid-credential":
        return "Incorrect email or password.";
      case "auth/network-request-failed":
        return "Network error.";
      default:
        return (
          error.message || "An unexpected error occurred. Please try again."
        );
    }
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
              label="Email"
              placeholder="Email"
              mode="outlined"
              value={emailOrUsername}
              onChangeText={setEmailOrUsername}
              placeholderTextColor="#717171"
              outlineColor="#1F75FE"
              activeOutlineColor="#085ea9"
              keyboardType="default"
              theme={{
                fonts: {
                  regular: { fontFamily: "Poppins-Regular", fontWeight: "300" },
                },
                colors: { text: "#818181" },
              }}
            />
            <RNPTextInput
              style={styles.input}
              label="Password"
              placeholder="Password"
              mode="outlined"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor="#717171"
              outlineColor="#1F75FE"
              activeOutlineColor="#133e85"
              theme={{
                fonts: {
                  regular: { fontFamily: "Poppins-Regular", fontWeight: "300" },
                },
                colors: { text: "#878787" },
              }}
            />
            <View style={styles.rememberMeContainer}>
              <CustomCheckBox
                value={rememberMe}
                onValueChange={setRememberMe}
                label="Remember Me"
              />
            </View>
            <Pressable onPress={() => navigation.navigate("ForgetPassword")}>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </Pressable>
            <LinearGradient
              colors={["#318CE7", "#1F75FE"]}
              style={styles.loginButton}
            >
              <Pressable
                style={styles.pressable}
                onPress={() => onLoginPress()}
              >
                <Text style={styles.loginText}>Login</Text>
              </Pressable>
            </LinearGradient>
          </View>
          <Text style={styles.orLoginWith}>Or Login with</Text>
          <Pressable style={styles.googleButton} onPress={() => promptAsync()}>
            <FontAwesome name="google" size={responsiveFontSize(5)} color="#fff" />
            <Text style={styles.googleButtonText}>Login with Google</Text>
          </Pressable>
          <View style={styles.dontHaveAnContainer}>
            <Text style={styles.dontHaveAn}>Don't have an account yet?</Text>
            <Pressable style={styles.signUp} onPress={() => navigation.navigate("SignUpScreen")}>
              <Text style={styles.signUpBtn}>Sign Up</Text>
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
  },
  input: {
    marginBottom: responsiveHeight(2),
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: responsiveHeight(2),
  },
  forgotPassword: {
    color: "#1F75FE",
    marginBottom: responsiveHeight(2),
    fontSize: responsiveFontSize(3.5),
    fontFamily: "Poppins-Regular",
    textAlign: "right",
  },
  loginButton: {
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: responsiveHeight(2),
  },
  pressable: {
    padding: responsiveWidth(3),
    alignItems: "center",
  },
  loginText: {
    color: "#fff",
    fontSize: responsiveFontSize(5),
  },
  orLoginWith: {
    // marginVertical: responsiveHeight(2),
    fontSize: responsiveFontSize(3.5),
    fontFamily: "Poppins-Regular",
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
    width: "90%",
  },
  googleButtonText: {
    color: "#fff",
    fontSize: responsiveFontSize(5),
    marginLeft: 10,
  },
  dontHaveAnContainer: {
    marginTop: responsiveHeight(12),
    flexDirection: "row",
    alignItems: "center",
  },
  dontHaveAn: {
    fontSize: responsiveFontSize(4.0),
    fontFamily: "Poppins-Regular",
  },
  signUp: {
    marginLeft: responsiveWidth(1),
  },
  signUpBtn: {
    color: "#1F75FE",
    fontWeight: "bold",
    fontSize: responsiveFontSize(4.0),
    fontFamily: "Poppins-SemiBold",
  },
  errorText: {
    color: "red",
    marginBottom: responsiveHeight(2),
    fontSize: responsiveFontSize(4),
    fontFamily: "Poppins-Regular",
    textAlign: "center",
  },
});

export default LoginScreen;
