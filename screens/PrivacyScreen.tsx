import * as React from "react";
import { Text, StyleSheet, View, ScrollView, Pressable, Dimensions } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBar from "../components/StatusBar"; // Adjust path as per your project structure

const { width, height } = Dimensions.get("window");

const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;
const responsiveFontSize = (percent: number) => (width * percent) / 100;

const Privacy = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar screenName="Privacy Policy" />
  
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.sectionTitle}>Introduction</Text>
        <Text style={styles.sectionContent}>
          Your privacy is important to us. This privacy statement explains the personal data our app processes, how our app processes it, and for what purposes.
        </Text>

        <Text style={styles.sectionTitle}>Data Collection</Text>
        <Text style={styles.sectionContent}>
          We collect data to provide better services to all our users. The types of information we collect include things you do, things others do, and information from the services you use.
        </Text>

        <Text style={styles.sectionTitle}>Data Usage</Text>
        <Text style={styles.sectionContent}>
          We use the data we collect to provide, maintain, and improve our services, to develop new services, and to protect our app and our users.
        </Text>

        <Text style={styles.sectionTitle}>Data Sharing</Text>
        <Text style={styles.sectionContent}>
          We do not share your personal information with companies, organizations, or individuals outside of our app except in the following cases: with your consent, for legal reasons, and to meet any applicable law, regulation, or legal process.
        </Text>

        <Text style={styles.sectionTitle}>Data Security</Text>
        <Text style={styles.sectionContent}>
          We work hard to protect our users from unauthorized access to or unauthorized alteration, disclosure, or destruction of information we hold.
        </Text>

        <Text style={styles.sectionTitle}>Changes to This Policy</Text>
        <Text style={styles.sectionContent}>
          Our privacy policy may change from time to time. We will post any privacy policy changes on this page and, if the changes are significant, we will provide a more prominent notice.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f8",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: responsiveWidth(5),
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  backButton: {
    marginRight: responsiveWidth(3),
  },
  headerTitle: {
    fontSize: responsiveFontSize(5),
    fontWeight: "bold",
    color: "#1F75FE",
  },
  scrollContainer: {
    padding: responsiveWidth(5),
  },
  sectionTitle: {
    fontSize: responsiveFontSize(4),
    fontWeight: "bold",
    color: "#1F75FE",
    marginVertical: responsiveHeight(2),
  },
  sectionContent: {
    fontSize: responsiveFontSize(3.5),
    color: "#666",
    lineHeight: responsiveHeight(3),
    marginBottom: responsiveHeight(2),
  },
});

export default Privacy;
