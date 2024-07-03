import * as React from "react";
import { View, Text, Pressable, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const WelcomeScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to CampCare!</Text>
      <Pressable
        style={styles.buttonContainer}
        onPress={() => navigation.navigate("LoginScreen")}
      >
        <LinearGradient colors={["#318CE7", "#1F75FE"]} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </LinearGradient>
      </Pressable>
      <Pressable
        style={styles.buttonContainer}
        onPress={() => navigation.navigate("SignUpScreen")}
      >
        <LinearGradient colors={["#318CE7", "#1F75FE"]} style={styles.button}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </LinearGradient>
      </Pressable>
    </View>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  welcomeText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: width * 0.063, // Responsive font size
    marginBottom: height * 0.05, // Responsive margin
    textAlign: "center",
  },
  buttonContainer: {
    marginVertical: height * 0.01, // Responsive margin
    width: width * 0.8, // Responsive width
  },
  button: {
    paddingVertical: height * 0.012, 
    paddingHorizontal: width * 0.1, 
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "Poppins_600SemiBold",
    color: "#fff",
    fontSize: width * 0.05, 
  },
});

export default WelcomeScreen;
