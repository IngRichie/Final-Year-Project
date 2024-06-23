import * as React from "react";
import { Image, Pressable, StyleSheet, Text, View, SafeAreaView } from "react-native";

const EmergencyProcedures = () => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.emergencyProcedures}>
        <View style={styles.statusBar}>
          <View style={styles.statusBarInner}>
            <Pressable style={styles.backButton} onPress={() => console.log("Back button pressed")}>
              <Image
                style={styles.leftArrowIcon}
                resizeMode="cover"
                source={require("../assets/icroundarrowbackios.png")}
              />
            </Pressable>
            <View style={styles.screenName}>
              <Text style={styles.screenName1}>Emergency Procedures</Text>
            </View>
          </View>
        </View>
        <Text style={[styles.emergencyProceduresAre, styles.button1Typo]}>
          Emergency procedures are predefined steps for handling crises like
          fires, medical incidents, and safety concerns. They provide clear
          instructions to ensure safety and minimize harm during emergencies.
        </Text>
        <View style={styles.ergencyProcedureBtns}>
          <Pressable style={[styles.buttonFlexBox, styles.pressableButton]}>
            <View style={styles.bgShadowBox} />
            <Text style={[styles.button1, styles.button1Typo]}>
              Medical Emergency
            </Text>
          </Pressable>
          <Pressable style={[styles.button2, styles.buttonFlexBox, styles.pressableButton]}>
            <View style={styles.bgShadowBox} />
            <Text style={[styles.button1, styles.button1Typo]}>
              Fire Emergency
            </Text>
          </Pressable>
          <Pressable style={[styles.button2, styles.buttonFlexBox, styles.pressableButton]}>
            <View style={styles.bgShadowBox} />
            <Text style={[styles.button1, styles.button1Typo]}>
              Personal Safety
            </Text>
          </Pressable>
          <Pressable style={[styles.button2, styles.buttonFlexBox, styles.pressableButton]}>
            <View style={styles.bgShadowBox} />
            <Text style={[styles.button1, styles.button1Typo]}>
              Domestic Accident
            </Text>
          </Pressable>
        </View>
        <View style={[styles.tabBar, styles.barShadowBox]} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button1Typo: {
    fontFamily: "Inter-Regular",
    textAlign: "left",
  },
  buttonFlexBox: {
    width: 390,
    justifyContent: "center",
    alignItems: "center",
  },
  barShadowBox: {
    width: 430,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    marginTop: 28,
  },
  leftArrowIcon: {
    width: 30,
    height: 30,
  },
  screenName1: {
    top: "0%",
    left: "0%",
    lineHeight: 24,
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
    color: "#fff",
    textAlign: "left",
    fontSize: 27,
    position: "absolute",
  },
  screenName: {
    width: 171,
    height: 24,
    marginLeft: 15,
  },
  leftArrowParent: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusBarInner: {
    backgroundColor: "#004d9b",
    width: 436,
    paddingHorizontal: 10,
    paddingVertical: 30,
    justifyContent: "center",
    overflow: "hidden",
  },
  statusBar: {
    backgroundColor: "#fff",
  },
  emergencyProceduresAre: {
    fontSize: 23,
    color: "#000",
    width: 386,
    height: 283,
    marginTop: 28,
    lineHeight: 31,
    fontFamily: "Inter-Regular",
  },
  bgShadowBox: {
    zIndex: 0,
    height: 65,
    backgroundColor: "#fbfaf3",
    borderRadius: 16,
    shadowOpacity: 1,
    elevation: 50,
    shadowRadius: 50,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: "rgba(0, 0, 0, 0.15)",
    width: 390,
  },
  button1: {
    height: "39.69%",
    width: "86.41%",
    top: "31.69%",
    left: "6.67%",
    color: "#3a3a3a",
    zIndex: 1,
    lineHeight: 31,
    fontFamily: "Inter-Regular",
    fontSize: 27,
    position: "absolute",
  },
  button2: {
    marginTop: 8,
  },
  ergencyProcedureBtns: {
    marginTop: 28,
  },
  tabBar: {
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowRadius: 10,
    elevation: 10,
    height: 99,
  },
  emergencyProcedures: {
    flex: 1,
    width: "100%",
    height: 932,
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  safeAreaView: {
    flex: 1,
  },
  backButton: {
    padding: 10,
    marginRight: 10,
  },
  pressableButton: {
    overflow: "hidden",
  },
});

export default EmergencyProcedures;
