import React from "react";
import { View, Text, Pressable, StyleSheet, Dimensions } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { useDarkMode } from "../components/DarkModeContext"; // Import the dark mode context

const { width, height } = Dimensions.get("window");

const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;
const responsiveFontSize = (percent: number) => (width * percent) / 100;

const FirstAidPage = () => {
  const navigation = useNavigation();
  const { isDarkModeEnabled } = useDarkMode(); // Consume the dark mode context

  const dynamicStyles = getDynamicStyles(isDarkModeEnabled);

  return (
    <SafeAreaView style={dynamicStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#318CE7" />
    
      <View style={dynamicStyles.headerContainer}>
        <View style={dynamicStyles.header}>
          <View style={dynamicStyles.iconContainer}>
            <FontAwesome5 name="first-aid" style={dynamicStyles.firstAidIcon} />
          </View>
          <Text style={dynamicStyles.headerText}>First Aid</Text>
        </View>
      </View>
      <View style={dynamicStyles.mainContainer}>
        <View style={dynamicStyles.buttonContainer}>
          <Pressable style={dynamicStyles.button} onPress={() => console.log("Cuts/Bruises")}>
            <Text style={dynamicStyles.buttonText}>Cuts/Bruises</Text>
          </Pressable>
        </View>
        <View style={dynamicStyles.buttonContainer}>
          <Pressable style={dynamicStyles.button} onPress={() => console.log("Burns")}>
            <Text style={dynamicStyles.buttonText}>Burns</Text>
          </Pressable>
        </View>
        <View style={dynamicStyles.buttonContainer}>
          <Pressable style={dynamicStyles.button} onPress={() => console.log("Shock")}>
            <Text style={dynamicStyles.buttonText}>Shock</Text>
          </Pressable>
        </View>
        <View style={dynamicStyles.buttonContainer}>
          <Pressable style={dynamicStyles.button} onPress={() => console.log("Others")}>
            <Text style={dynamicStyles.buttonText}>Others</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const getDynamicStyles = (isDarkModeEnabled: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDarkModeEnabled ? "#121212" : "#fff",
  },
  headerContainer: {
    marginTop: responsiveHeight(6), // Adjusted to make space for the back icon
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#318CE7",
    width: "70%",
    paddingLeft: responsiveFontSize(5),
    paddingVertical: responsiveFontSize(2),
    borderTopRightRadius: responsiveFontSize(3),
    borderBottomRightRadius: responsiveFontSize(3),
  },
  iconContainer: {
    width: responsiveFontSize(10),
    height: responsiveFontSize(10),
    borderRadius: responsiveFontSize(5),
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  firstAidIcon: {
    fontSize: responsiveFontSize(6),
    color: "#318CE7",
  },
  headerText: {
    fontSize: responsiveFontSize(6),
    color: "#fff",
    marginLeft: responsiveWidth(5),
  },
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: responsiveHeight(2),
  },
  buttonContainer: {
    width: responsiveWidth(90),
    marginVertical: responsiveHeight(1),
    elevation: 5,
    backgroundColor: isDarkModeEnabled ? "#121212" : "#fff",
    borderRadius: 20,
    overflow: "hidden",
    padding: responsiveFontSize(2),
  },
  button: {
    width: "100%",
    paddingVertical: responsiveHeight(2),
    backgroundColor: isDarkModeEnabled ? "#333" : "#fbfaf3",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#318CE7",
  },
  buttonText: {
    fontSize: responsiveFontSize(6),
    color: "#318CE7",
    fontFamily: "Poppins-Bold",
  },
});

export default FirstAidPage;
