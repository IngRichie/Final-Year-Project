import * as React from "react";
import { StyleSheet, Text, View, Pressable, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, NavigationProp, ParamListBase } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import StatusBar from "../components/StatusBar";
import { useDarkMode } from "../components/DarkModeContext";

const { width, height } = Dimensions.get("window");

const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;
const responsiveFontSize = (percent: number) => (width * percent) / 100;

const Settings = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const { isDarkModeEnabled } = useDarkMode();

  const handlePress = (buttonText: string) => {
    const screenComponents: { [key: string]: React.ComponentType } = {

      Notifications: require("./NotificationScreen").default,
    };

    navigation.navigate(buttonText, {});
  };

  const dynamicStyles = getDynamicStyles(isDarkModeEnabled);

  return (
    <SafeAreaView style={dynamicStyles.container}>
      <StatusBar screenName="Settings" />
      <View style={dynamicStyles.buttonContainer}>
        <Pressable style={dynamicStyles.button} onPress={() => handlePress("ProfileScreen")}>
          <FontAwesome name="user" size={24} color="#1F75FE" style={dynamicStyles.buttonIcon} />
          <Text style={dynamicStyles.buttonText}>Profile</Text>
        </Pressable>
        <Pressable style={dynamicStyles.button} onPress={() => handlePress("AccessibilityScreen")}>
          <FontAwesome name="lock" size={24} color="#1F75FE" style={dynamicStyles.buttonIcon} />
          <Text style={dynamicStyles.buttonText}>Accessibility</Text>
        </Pressable>
        <Pressable style={dynamicStyles.button} onPress={() => handlePress("Notifications")}>
          <FontAwesome name="bell" size={24} color="#1F75FE" style={dynamicStyles.buttonIcon} />
          <Text style={dynamicStyles.buttonText}>Notifications</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const getDynamicStyles = (isDarkModeEnabled: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDarkModeEnabled ? "#121212" : "#fff",
  },
  buttonContainer: {
    marginTop: responsiveHeight(5),
    alignItems: "center",
  },
  button: {
    width: responsiveWidth(90),
    height: responsiveHeight(8),
    backgroundColor: isDarkModeEnabled ? "#333" : "#fbfaf3",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: responsiveWidth(5),
    marginBottom: responsiveHeight(2),
    borderRadius: 8,
  },
  buttonText: {
    fontSize: responsiveFontSize(5),
    color: isDarkModeEnabled ? "#ccc" : "#3a3a3a",
    marginLeft: 15,
  },
  buttonIcon: {
    marginRight: responsiveWidth(3),
  },
});

export default Settings;
