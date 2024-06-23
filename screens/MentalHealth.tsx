import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

const MentalHealth = () => {
  return (
    <View style={styles.mentalHealth}>
      <View style={[styles.mentalHealthInner, styles.navIconsFlexBox]}>
        <View style={styles.navLeftSide}>
          <Image
            style={styles.leftArrowIcon}
            contentFit="cover"
            source={require("../assets/icroundarrowbackios.png")}
          />
          <View style={styles.screenName}>
            <Text style={styles.screenName1}>{`Mental Health`}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navBarLayout: {
    width: 430,
    marginLeft: -215,
  },
  navIconsFlexBox: {
    justifyContent: "center",
    position: "absolute",
  },
  leftArrowIcon: {
    width: 30,
    height: 30,
  },
  screenName1: {
    top: "0%",
    left: "0%",
    fontSize: 27,
    lineHeight: 24,
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
    color: "#fff",
    textAlign: "left",
    position: "absolute",
  },
  screenName: {
    width: 171,
    height: 24,
    marginLeft: 15,
  },
  navLeftSide: {
    alignItems: "center",
    flexDirection: "row",
  },
  mentalHealthInner: {
    top: 0,
    left: "50%",
    backgroundColor: "#004d9b",
    paddingHorizontal: 10,
    paddingVertical: 30,
    width: 430,
    marginLeft: -215,
    overflow: "hidden",
  },
  mentalHealth: {
    backgroundColor: "#fff",
    flex: 1,
    width: "100%",
    height: 932,
    overflow: "hidden",
  },
});

export default MentalHealth;