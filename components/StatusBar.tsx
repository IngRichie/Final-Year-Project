import * as React from "react";
import { StyleSheet, Text, View, Pressable, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;
const responsiveFontSize = (percent: number) => (width * percent) / 100;

const CustomStatusBar = ({ screenName }: { screenName: string }) => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      style={styles.statusBar}
      locations={[0, 1]}
      colors={["#318CE7", "#1F75FE"]}
    >
      <View style={styles.statusBarInner}>
        <Pressable style={styles.leftArrowParent} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={responsiveFontSize(7.5)} color="#fff" style={styles.leftArrowIcon} />
          <Text style={styles.screenNameText}>{screenName}</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    width: "100%",
  },
  statusBarInner: {
    paddingHorizontal: responsiveWidth(2.5),
    paddingVertical: responsiveHeight(1.75),
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    marginTop: responsiveWidth(5),
  },
  leftArrowParent: {
    flexDirection: "row",
    alignItems: "center",
    // marginTop:responsiveHeight(.75),
  },
  leftArrowIcon: {
    marginRight: responsiveWidth(3.75),
  },
  screenNameText: {
    fontSize: responsiveFontSize(5.0),
    fontWeight: "bold",
    color: "#fff",
  },
});

export default CustomStatusBar;
