import * as React from "react";
import { StyleSheet, Text, View, Pressable, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useDarkMode } from './DarkModeContext'; // Import the dark mode context

const { width, height } = Dimensions.get("window");

const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;
const responsiveFontSize = (percent: number) => (width * percent) / 100;

const CustomStatusBar = ({ screenName, icon }: { screenName: string, icon?: string }) => {
  const navigation = useNavigation();
  const { isDarkModeEnabled } = useDarkMode(); // Get the dark mode state

  return (
    <View style={styles.statusBar}>
      <Pressable style={styles.leftArrowParent} onPress={() => navigation.goBack()}>
        <Ionicons
          name="arrow-back"
          size={responsiveFontSize(7.5)}
          color={isDarkModeEnabled ? "#fff" : "#333"}
          style={styles.leftArrowIcon}
        />
      </Pressable>
      <View style={styles.statusBarInner}>
        <View style={styles.screenNameContainer}>
          {icon && <Ionicons name={icon} size={responsiveFontSize(7.5)} color="#fff" style={styles.screenIcon} />}
          <Text style={styles.screenNameText}>{screenName}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    width: "100%",
  },
  statusBarInner: {
    width: "70%",
    justifyContent: "center",
    backgroundColor: "#318CE7",
    paddingLeft: responsiveFontSize(8.0),
    marginTop: responsiveFontSize(4.5),
    borderTopRightRadius: responsiveFontSize(8.0),
    borderBottomRightRadius: responsiveFontSize(8.0),
    height: responsiveHeight(5),
  },
  leftArrowParent: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: responsiveWidth(5.75),
    marginTop: responsiveWidth(3.75),
  },
  leftArrowIcon: {},
  screenNameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  screenIcon: {
    marginRight: responsiveWidth(2.5),
  },
  screenNameText: {
    fontSize: responsiveFontSize(5.0),
    fontWeight: "bold",
    color: "#fff",
  },
  greetingContainer: {
    paddingHorizontal: responsiveWidth(2.5),
    paddingVertical: responsiveHeight(1.75),
    justifyContent: "center",
    alignItems: "center",
  },
  greeting: {
    fontSize: responsiveFontSize(4.0),
    color: "#fff",
  },
});

export default CustomStatusBar;
