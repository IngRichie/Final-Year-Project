import * as React from "react";
import { Image, TouchableOpacity, View, StyleSheet, Text, SafeAreaView, ScrollView, Dimensions } from "react-native";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import CustomStatusBar from "../components/StatusBar";

interface EmergencyContactsProps {
  navigation: NavigationProp<ParamListBase>;
}

const { width, height } = Dimensions.get("window");

const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;
const responsiveFontSize = (percent: number) => (width * percent) / 100;

const EmergencyContacts: React.FC<EmergencyContactsProps> = ({ navigation }) => {
  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleContactPress = (contactName: string) => {
    console.log(`Contact pressed: ${contactName}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Custom Status Bar */}
      <CustomStatusBar screenName="Emergency Contacts" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={[styles.section, styles.contactsLayout]}>
          <Text style={[styles.sectionTitle]}>
            KNUST Campus Security
          </Text>
          <TouchableOpacity onPress={() => handleContactPress("KNUST Security")}>
            <Text style={styles.contactItem}>KNUST Security</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleContactPress("KNUST Police")}>
            <Text style={styles.contactItem}>KNUST Police</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleContactPress("KNUST Fire Station")}>
            <Text style={styles.contactItem}>KNUST Fire Station</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleContactPress("Ghana National Fire Service")}>
            <Text style={styles.contactItem}>Ghana National Fire Service</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleContactPress("Police Information Room")}>
            <Text style={styles.contactItem}>Police Information Room</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.section, styles.contactsLayout]}>
          <Text style={[styles.sectionTitle]}>
            Custom Contacts
          </Text>
          <View style={styles.noContactsFound}>
            <Image
              style={styles.formkitsadIcon}
              source={require("../assets/formkitsad.png")}
            />
            <Text style={styles.noCustomContacts}>No Custom Contacts found</Text>
          </View>
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
  },
  section: {
    marginTop: responsiveHeight(3),
  },
  contactsLayout: {
    width: '100%',
  },
  sectionTitle: {
    fontSize: responsiveFontSize(5),
    fontWeight: "bold",
    color: "#1F75FE",
    marginBottom: responsiveHeight(2),
  },
  contactItem: {
    fontSize: responsiveFontSize(4),
    color: "#080809",
    marginBottom: responsiveHeight(2),
  },
  noContactsFound: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: responsiveHeight(3),
  },
  formkitsadIcon: {
    width: responsiveWidth(20),
    height: responsiveWidth(20),
  },
  noCustomContacts: {
    fontSize: responsiveFontSize(3.5),
    color: "#333",
    marginTop: responsiveHeight(2),
    textAlign: 'center',
  },
});

export default EmergencyContacts;
