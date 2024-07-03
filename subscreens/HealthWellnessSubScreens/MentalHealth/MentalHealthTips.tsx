import * as React from "react";
import { StyleSheet, Text, View } from "react-native";

const MentalHealthTips = () => {
  return (
    <View style={styles.mentalHealth}>
      
      <View style={[styles.searchTipWrapper, styles.tipLayout]}>
        <Text style={[styles.searchTip, styles.searchTipFlexBox]}>
          Search tip
        </Text>
      </View>
      <View style={[styles.mhcontainer, styles.mhcontainerShadowBox]}>
        <View style={[styles.tipContainer, styles.mhcontainerShadowBox]} />
        <View style={[styles.mentalHealthTipTopic, styles.tipLayout]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchTipFlexBox: {
    textAlign: "left",
    position: "absolute",
  },
  tipLayout: {
    height: 77,
    width: 374,
    position: "absolute",
    overflow: "hidden",
  },
  mhcontainerShadowBox: {
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    width: 374,
    position: "absolute",
  },
  vectorIcon: {
    width: 13,
    height: 23,
    zIndex: 0,
  },
  screenName: {
    height: "28.74%",
    width: "54.64%",
    top: "36.41%",
    left: "13.46%",
    fontSize: 27,
    lineHeight: 24,
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
    color: "#fff",
    zIndex: 1,
  },
  statusBar: {
    top: 0,
    backgroundColor: "#004d9a",
    width: 431,
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 30,
    left: 0,
    position: "absolute",
    overflow: "hidden",
  },
  searchTip: {
    top: 19,
    left: 24,
    fontSize: 32,
    fontWeight: "200",
    fontFamily: "Inter-ExtraLight",
    color: "#b4b4b4",
  },
  searchTipWrapper: {
    marginLeft: -187,
    top: 112,
    left: "50%",
    backgroundColor: "#fdfdfd",
    borderStyle: "solid",
    borderColor: "#89c3fc",
    borderWidth: 1,
    borderRadius: 16,
  },
  tipContainer: {
    top: 80,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowRadius: 25,
    elevation: 25,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
    backgroundColor: "#cae4fe",
    height: 322,
    left: 0,
  },
  mentalHealthTipTopic: {
    top: 3,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: "#436d98",
    left: 0,
  },
  mhcontainer: {
    top: 232,
    left: 28,
    shadowColor: "rgba(0, 0, 0, 0.09)",
    shadowRadius: 15.5,
    elevation: 15.5,
    height: 399,
    borderRadius: 16,
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

export default MentalHealthTips;
