import * as React from "react";
import { useState } from "react";
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
import { handleSignUp } from "../utils/auth";

const { width, height } = Dimensions.get("window");

const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;
const responsiveFontSize = (percent: number) => (width * percent) / 100;

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const onSignUpPress = () => {
    const errorMsg = handleSignUp(email, password, confirmPassword);
    if (errorMsg) {
      setError(errorMsg);
    } else {
      setError(null);
      navigation.navigate("DrawerRoot", { screen: "LoginScreen" });
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
              colors={["#066fd2", "#004e9d"]}
              style={styles.signupButton}
            >
              <Pressable style={styles.pressable} onPress={onSignUpPress}>
                <Text style={styles.signupText}>Sign Up</Text>
              </Pressable>
            </LinearGradient>
          </View>

          <View style={styles.socialMediaSignupContainer}>
            <Text style={styles.orSignUp}>Or Sign Up with</Text>
            <View style={styles.socialMediaSignup}>
              <Pressable onPress={() => {}}>
                <Image
                  style={styles.socialIcon}
                  resizeMode="contain"
                  source={require("../assets/image-1.png")}
                />
              </Pressable>
              <Pressable onPress={() => {}}>
                <Image
                  style={styles.socialIcon}
                  resizeMode="contain"
                  source={require("../assets/image-2.png")}
                />
              </Pressable>
              <Pressable onPress={() => {}}>
                <Image
                  style={styles.socialIcon}
                  resizeMode="contain"
                  source={require("../assets/image-3.png")}
                />
              </Pressable>
            </View>
          </View>
          <View style={styles.haveAnAccount}>
            <Text style={styles.haveAnAccountText}>Have an account? </Text>
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
  orSignUp: {
    marginBottom: responsiveHeight(2),
    fontSize: responsiveFontSize(4),
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
    color: "#004d9a",
    fontSize: responsiveFontSize(4.0),
    fontWeight: "600",
    marginLeft: responsiveWidth(1),
  },

  socialMediaSignupContainer: {
    marginBottom: responsiveHeight(8),
    marginTop: responsiveHeight(2),
    alignItems: "center",
  },
  socialMediaSignup: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: responsiveWidth(60),
    marginBottom: responsiveHeight(2),
  },
  socialIcon: {
    width: responsiveWidth(10),
    height: responsiveWidth(10),
  },
  errorText: {
    color: "red",
    marginBottom: responsiveHeight(2),
    fontSize: responsiveFontSize(3.5),
  },
});

export default SignUpScreen;
