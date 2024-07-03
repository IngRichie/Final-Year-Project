import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  Pressable,
  View,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";
import { TextInput as RNPTextInput } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebaseConfig";

const { width, height } = Dimensions.get("window");

const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;
const responsiveFontSize = (percent: number) => (width * percent) / 100;

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [resetSent, setResetSent] = useState(false);

  const handleResetPassword = async () => {
    setError(null);
    try {
      // Validate email
      if (!isValidEmail(email)) {
        throw new Error("Please enter a valid email address.");
      }

      // Send password reset email
      await sendPasswordResetEmail(auth, email);
      setResetSent(true);
    } catch (error: any) {
      console.error("Error sending password reset email:", error);
      setError(
        "Failed to send reset email. Please check your email address and try again."
      );
    }
  };

  const isValidEmail = (email: string) => {
    // Basic email validation
    return /\S+@\S+\.\S+/.test(email);
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
            {resetSent ? (
              <View style={styles.resetSentContainer}>
                <Text style={styles.resetSentText}>
                  A password reset link has been sent to your email. Please
                  follow the instructions in the email to reset your password.
                </Text>
              </View>
            ) : (
              <>
                <Text style={styles.title}>Forgot Password</Text>
                <Text style={styles.instructions}>
                  Enter your email address below to receive instructions to
                  reset your password.
                </Text>
                {error && <Text style={styles.errorText}>{error}</Text>}
                <RNPTextInput
                  style={styles.input}
                  label="Email"
                  placeholder="Email"
                  mode="outlined"
                  value={email}
                  onChangeText={setEmail}
                  placeholderTextColor="#717171"
                  outlineColor="#1F75FE"
                  activeOutlineColor="#085ea9"
                  keyboardType="email-address"
                  theme={{ colors: { text: "#818181" } }}
                />
                <LinearGradient
                  colors={["#318CE7", "#1F75FE"]}
                  style={styles.resetButton}
                >
                  <Pressable
                    style={styles.pressable}
                    onPress={handleResetPassword}
                  >
                    <Text style={styles.resetText}>Reset Password</Text>
                  </Pressable>
                </LinearGradient>
              </>
            )}
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
  title: {
    fontSize: responsiveFontSize(5),
    marginBottom: responsiveHeight(2),
    fontFamily: "Poppins-Bold",
    textAlign: "center",
  },
  instructions: {
    fontSize: responsiveFontSize(3),
    marginBottom: responsiveHeight(3),
    fontFamily: "Poppins-Regular",
    textAlign: "center",
  },
  input: {
    marginBottom: responsiveHeight(2),
  },
  resetButton: {
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: responsiveHeight(2),
  },
  pressable: {
    padding: responsiveWidth(3),
    alignItems: "center",
  },
  resetText: {
    color: "#fff",
    fontSize: responsiveFontSize(4),
    fontFamily: "Poppins-Bold",
  },
  resetSentContainer: {
    alignItems: "center",
  },
  resetSentText: {
    fontSize: responsiveFontSize(3),
    marginBottom: responsiveHeight(2),
    fontFamily: "Poppins-Regular",
    textAlign: "center",
  },
  errorText: {
    color: "red",
    marginBottom: responsiveHeight(2),
    fontSize: responsiveFontSize(3),
    fontFamily: "Poppins-Regular",
    textAlign: "center",
  },
});

export default ForgotPasswordScreen;
