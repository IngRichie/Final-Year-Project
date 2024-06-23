import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  ScrollView,
  Pressable,
  Dimensions,
} from "react-native";
import CustomStatusBar from "../components/StatusBar"; // Adjust the import path as needed

const { width, height } = Dimensions.get("window");

const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;
const responsiveFontSize = (percent: number) => (width * percent) / 100;

const SymptomAssessment = () => {
  const [symptom, setSymptom] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
    // Logic for what happens when Next button is pressed
    console.log("Next button pressed");
    // Example: navigation.navigate("NextScreen");
  };

  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
    // Logic for what happens when Previous button is pressed
    console.log("Previous button pressed");
    // Example: navigation.navigate("PreviousScreen");
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <CustomStatusBar screenName={"Symptom Assessment"} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          {/* Section 1 */}
          <View style={styles.section}>
            <Text style={styles.warningText}>
              If you have serious symptoms, do not use CampCare. Please contact
              emergency services immediately.
            </Text>
          </View>

          {/* Section 2 */}
          <View style={styles.BtnSection}>
            <View style={styles.symptomInputContainer}>
              <Text style={styles.inputLabel}>
                What symptom(s) are you experiencing?
              </Text>
              <TextInput
                style={styles.textInput}
                value={symptom}
                onChangeText={setSymptom}
                placeholder="e.g. Headache"
                placeholderTextColor="#6b6b6b"
                multiline={false}
            
              />
            </View>
            <View style={styles.navigationButtons}>
              <Pressable
                style={[styles.navButton, currentPage === 1 && styles.disabled]}
                onPress={handlePrevious}
                disabled={currentPage === 1}
              >
                <Text style={styles.navButtonText}>Previous</Text>
              </Pressable>
              <Pressable style={styles.navButton} onPress={handleNext}>
                <Text style={styles.navButtonText}>Next</Text>
              </Pressable>
            </View>
          </View>

          {/* Navigation Buttons */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "#1F75FE",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingBottom: responsiveHeight(5),
  },
  section: {
    backgroundColor: "#1F75FE",
    paddingVertical: responsiveHeight(5),
    height: "40%",
  },
  BtnSection: {
    backgroundColor: "white",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingVertical: responsiveHeight(5),
    height: "70%",
  },
  warningText: {
    fontSize: responsiveFontSize(5),
    color: "#fff",
    marginLeft: responsiveFontSize(5),
    marginBottom: responsiveHeight(3),
  },
  symptomInputContainer: {
    marginTop: responsiveHeight(2),
  },
  inputLabel: {
    fontSize: responsiveFontSize(4.5),
    color: "#000",
    marginLeft: responsiveFontSize(5),
    marginBottom: responsiveHeight(2),
  },
  textInput: {
  
    height: responsiveHeight(7),
    // margin: 12,
    borderWidth: 1,
    padding: 10,
    width: "90%",
    alignSelf: "center",
    borderRadius: 8,
    borderColor: "#004d9a",
    fontSize: responsiveFontSize(5), 
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: responsiveHeight(3),
  },
  navButton: {
    backgroundColor: "#fbfaf3",
    alignItems: "center",
    justifyContent: "center",
    height: responsiveHeight(7),
    width: "35%",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 10,
  },
  navButtonText: {
    fontSize: responsiveFontSize(3.5),
    color: "#333",
  },
  disabled: {
    opacity: 0.5,
  },
});

export default SymptomAssessment;
