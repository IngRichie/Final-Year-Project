import * as React from "react";
import { ScrollView, StyleSheet, Text, Dimensions, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBar from "../components/StatusBar";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;
const responsiveFontSize = (percent: number) => (width * percent) / 100;

const DomesticAccident = () => {
  const handlePress = (buttonText: string) => {
    // Replace with your navigation logic
    console.log(`Navigating to: ${buttonText}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar screenName="Domestic Accident" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionText}>
            Domestic accidents require immediate actions, safety tips, knowledge of first aid basics, and emergency contacts to ensure quick response and assistance in critical situations.
          </Text>
        </View>
        <View style={styles.BtnSection}>
          <Text style={styles.sectionTitle}>Domestic Accident</Text>
          <Pressable style={[styles.button, { width: responsiveWidth(90) }]} onPress={() => handlePress("Immediate Actions")}>
            <FontAwesome5 name="exclamation-triangle" size={24} color="#1F75FE" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Immediate Actions</Text>
          </Pressable>
          <Pressable style={[styles.button, { width: responsiveWidth(90) }]} onPress={() => handlePress("Safety Tips")}>
            <MaterialCommunityIcons name="shield" size={24} color="#1F75FE" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Safety Tips</Text>
          </Pressable>
          <Pressable style={[styles.button, { width: responsiveWidth(90) }]} onPress={() => handlePress("First Aid Basics")}>
            <FontAwesome5 name="first-aid" size={24} color="#1F75FE" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>First Aid Basics</Text>
          </Pressable>
          <Pressable style={[styles.button, { width: responsiveWidth(90) }]} onPress={() => handlePress("Emergency Contacts")}>
            <FontAwesome5 name="address-book" size={24} color="#1F75FE" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Emergency Contacts</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F75FE",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  section: {
    backgroundColor: "#1F75FE",
    height: responsiveHeight(30),
    justifyContent: "center",
    paddingHorizontal: responsiveWidth(5),
  },
  BtnSection: {
    backgroundColor: "#fff",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingVertical: responsiveHeight(5),
    paddingHorizontal: responsiveWidth(5),
    marginTop: responsiveHeight(2),
    minHeight: responsiveHeight(57),
  },
  sectionTitle: {
    fontSize: responsiveFontSize(5),
    fontWeight: "bold",
    marginBottom: responsiveHeight(2),
    color: "#3a3a3a",
  },
  sectionText: {
    fontSize: responsiveFontSize(4),
    color: "#fff",
    lineHeight: responsiveHeight(5),
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    height: responsiveHeight(7),
    backgroundColor: "#fbfaf3",
    justifyContent: "flex-start",
    paddingLeft: responsiveWidth(5),
    marginBottom: responsiveHeight(2),
    borderRadius: 8,
    borderColor: "#ccc",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    fontSize: responsiveFontSize(4),
    marginLeft: responsiveWidth(2),
    color: "#3a3a3a",
  },
  buttonIcon: {
    marginRight: responsiveWidth(2),
  },
});

export default DomesticAccident;
