import * as React from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView, SafeAreaView } from "react-native";
import StatusBar from "../components/StatusBar";

const { width, height } = Dimensions.get("window");

const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;
const responsiveFontSize = (percent: number) => (width * percent) / 100;

const CounselorDetails = ({ route }) => {
  const { counselor } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar screenName="Counselor Details" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.detailsContainer}>
          <Text style={styles.label}>Position:</Text>
          <Text style={styles.text}>{counselor.position}</Text>

          <Text style={styles.label}>Full Name:</Text>
          <Text style={styles.text}>{counselor.fullName}</Text>

          <Text style={styles.label}>Description:</Text>
          <Text style={styles.text}>{counselor.description}</Text>

          <Text style={styles.label}>Availability:</Text>
          <Text style={[styles.text, { color: counselor.available ? "#0f0" : "#f00" }]}>
            {counselor.available ? "Available" : "Not Available"}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(3),
    // justifyContent: "center",
  },
  header: {
    fontSize: responsiveFontSize(5),
    fontWeight: "bold",
    marginBottom: responsiveHeight(3),
    textAlign: "center",
  },
  detailsContainer: {
    backgroundColor: "#f5f5f5",
    padding: responsiveWidth(5),
    borderRadius: responsiveWidth(2),
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: responsiveWidth(2),
    shadowOffset: { width: 0, height: responsiveHeight(0.5) },
    elevation: 5,
  },
  label: {
    fontSize: responsiveFontSize(4),
    fontWeight: "bold",
    marginBottom: responsiveHeight(1),
  },
  text: {
    fontSize: responsiveFontSize(3.5),
    marginBottom: responsiveHeight(2),
  },
});

export default CounselorDetails;
