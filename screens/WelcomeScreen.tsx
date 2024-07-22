import * as React from "react";
import { View, Text, Pressable, StyleSheet, Dimensions, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const WelcomeScreen = ({ navigation }: { navigation: any }) => {
  const [screenWidth, setScreenWidth] = React.useState(Dimensions.get("window").width);
  const [screenHeight, setScreenHeight] = React.useState(Dimensions.get("window").height);

  React.useEffect(() => {
    const handleResize = ({ window }) => {
      setScreenWidth(window.width);
      setScreenHeight(window.height);
    };

    const subscription = Dimensions.addEventListener("change", handleResize);

    return () => {
      subscription?.remove();
    };
  }, []);

  const vw = screenWidth / 100;
  const vh = screenHeight / 100;

  const dynamicStyles = getDynamicStyles(vw, vh, screenWidth);

  return (
    <View style={dynamicStyles.container}>
      <Text style={dynamicStyles.welcomeText}>Welcome to CampCare!</Text>
      <Pressable
        style={dynamicStyles.buttonContainer}
        onPress={() => navigation.navigate("LoginScreen")}
      >
        <LinearGradient colors={["#318CE7", "#1F75FE"]} style={dynamicStyles.button}>
          <Text style={dynamicStyles.buttonText}>Login</Text>
        </LinearGradient>
      </Pressable>
      <Pressable
        style={dynamicStyles.buttonContainer}
        onPress={() => navigation.navigate("SignUpScreen")}
      >
        <LinearGradient colors={["#318CE7", "#1F75FE"]} style={dynamicStyles.button}>
          <Text style={dynamicStyles.buttonText}>Sign Up</Text>
        </LinearGradient>
      </Pressable>
    </View>
  );
};

const getDynamicStyles = (vw: number, vh: number, screenWidth: number) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fff",
      padding: Platform.OS === 'web' ? 5 * vw : 20, // Use percentage padding for web
    },
    welcomeText: {
      fontFamily: "Poppins-SemiBold",
      fontSize: Platform.OS === 'web' ? 5 * vw : screenWidth * 0.063, // Use vw for web
      marginBottom: Platform.OS === 'web' ? 5 * vh : screenWidth * 0.05, // Use vh for web
      textAlign: "center",
    },
    buttonContainer: {
      marginVertical: Platform.OS === 'web' ? 1 * vh : screenWidth * 0.01, // Use vh for web
      width: Platform.OS === 'web' ? 80 * vw : screenWidth * 0.8, // Use vw for web
    },
    button: {
      paddingVertical: Platform.OS === 'web' ? 1.5 * vh : screenWidth * 0.012, // Use vh for web
      paddingHorizontal: Platform.OS === 'web' ? 10 * vw : screenWidth * 0.1, // Use vw for web
      borderRadius: 10,
      alignItems: "center",
    },
    buttonText: {
      fontFamily: "Poppins-SemiBold",
      color: "#fff",
      fontSize: Platform.OS === 'web' ? 4 * vw : screenWidth * 0.05, // Use vw for web
    },
  });
};

export default WelcomeScreen;
