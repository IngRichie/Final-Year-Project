import React, { useState, useEffect } from "react";
import { StyleSheet, Text, Pressable, View, ScrollView, Dimensions, Image, Alert } from "react-native";
import { TextInput as RNPTextInput } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { setDoc, doc, serverTimestamp, getDocs, collection } from "firebase/firestore";
import { auth, db } from "../firebaseConfig"; // Ensure you import auth from your Firebase config correctly

const SignUpScreen: React.FC = () => {
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [screenWidth, setScreenWidth] = useState(Dimensions.get("window").width);
  const [screenHeight, setScreenHeight] = useState(Dimensions.get("window").height);
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  useEffect(() => {
    const handleResize = ({ window }) => {
      setScreenWidth(window.width);
      setScreenHeight(window.height);
    };

    const dimensionListener = Dimensions.addEventListener("change", handleResize);

    return () => {
      dimensionListener?.remove();
    };
  }, []);

  const vw = screenWidth / 100;
  const vh = screenHeight / 100;

  const dynamicStyles = getDynamicStyles(vw, vh);

  const onSignUpPress = async () => {
    setError(null);
    try {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Send verification email
      await sendEmailVerification(user);

      // Store user information in Firestore
      await setDoc(doc(db, "users", user.uid), {
        firstname: firstname,
        lastname: lastname,
        email: email,
        createdAt: serverTimestamp(),
        interests: [], // Initialize with an empty array
      });

      // Show verification note
      Alert.alert(
        "Verification Required",
        "A verification email has been sent to your email address. Please verify your email before proceeding.",
        [{ text: "OK", onPress: () => console.log("Verification email sent") }]
      );

      // Clear input fields
      setFirstname("");
      setLastname("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      // Navigate to the interests selection screen
      navigation.navigate("HealthNewsInterest", { userId: user.uid });

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
    <SafeAreaView style={dynamicStyles.safeArea}>
      <ScrollView contentContainerStyle={dynamicStyles.scrollView}>
        <View style={dynamicStyles.container}>
          <Image
            style={dynamicStyles.logo}
            resizeMode="contain"
            // source={require("../assets/campuscare-logo-1.png")}
          />
          <View style={dynamicStyles.formContainer}>
            {error && <Text style={dynamicStyles.errorText}>{error}</Text>}
            <RNPTextInput
              style={dynamicStyles.input}
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
              style={dynamicStyles.input}
              label="Lastname"
              placeholder="Lastname"
              mode="outlined"
              value={lastname}
              onChangeText={setLastname}
              placeholderTextColor="#545454"
              outlineColor="#0b6fab"
              activeOutlineColor="#175689"
              theme={{ colors: { text: "#626262" } }}
            />
            <RNPTextInput
              style={dynamicStyles.input}
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
              style={dynamicStyles.input}
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
              style={dynamicStyles.input}
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
              style={dynamicStyles.signupButton}
            >
              <Pressable style={dynamicStyles.pressable} onPress={onSignUpPress}>
                <Text style={dynamicStyles.signupText}>Sign Up</Text>
              </Pressable>
            </LinearGradient>
          </View>

          <View style={dynamicStyles.haveAnAccount}>
            <Text style={dynamicStyles.haveAnAccountText}>Already have an account? </Text>
            <Pressable onPress={() => navigation.navigate("LoginScreen")}>
              <Text style={dynamicStyles.loginBtn}>Login</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const responsiveWidth = (vw, percent) => vw * percent;
const responsiveHeight = (vh, percent) => vh * percent;
const responsiveFontSize = (vw, percent) => vw * percent;

const getDynamicStyles = (vw, vh) => {
  return StyleSheet.create({
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
      paddingTop: responsiveHeight(vh, 5),
      paddingHorizontal: responsiveWidth(vw, 5),
    },
    logo: {
      width: responsiveWidth(vw, 70),
      height: responsiveHeight(vh, 17),
      marginBottom: responsiveHeight(vh, 2),
    },
    formContainer: {
      width: responsiveWidth(vw, 80),
      marginBottom: responsiveHeight(vh, 2),
    },
    input: {
      marginBottom: responsiveHeight(vh, 2),
    },
    signupButton: {
      width: "100%",
      borderRadius: 10,
      overflow: "hidden",
    },
    pressable: {
      padding: responsiveWidth(vw, 3),
      alignItems: "center",
    },
    signupText: {
      color: "#fff",
      fontSize: responsiveFontSize(vw, 5),
    },
    haveAnAccount: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: responsiveHeight(vh, 2),
      marginBottom: responsiveHeight(vh, 5),
    },
    haveAnAccountText: {
      fontSize: responsiveFontSize(vw, 4.0),
    },
    loginBtn: {
      color: "#1F75FE",
      fontSize: responsiveFontSize(vw, 4.0),
      fontWeight: "600",
      marginLeft: responsiveWidth(vw, 1),
    },
    errorText: {
      color: "red",
      marginBottom: responsiveHeight(vh, 2),
      fontSize: responsiveFontSize(vw, 3.5),
    },
  });
};

export default SignUpScreen;
