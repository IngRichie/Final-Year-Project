import * as React from "react";
import { StyleSheet, Text, View, ScrollView, Image, Dimensions } from "react-native";
import CounselorCard from "../components/counselorCard"; // Assuming this path is correct
import { counselors } from "../components/counselors"; // Assuming this path is correct
import StatusBar from "../components/StatusBar";

const { width, height } = Dimensions.get("window");

const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;
const responsiveFontSize = (percent: number) => (width * percent) / 100;

const CounselorSession = () => {
  return (
    <View style={styles.container}>
      {/* Status bar */}
      <StatusBar screenName="Counselor Session" />

      {/* Main content */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {counselors.map((counselor, index) => (
          <CounselorCard key={index} counselor={counselor} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
 
  contentContainer: {
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(4),
  },
});

export default CounselorSession;
