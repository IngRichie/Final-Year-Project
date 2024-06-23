import * as React from "react";
import { Image, TouchableOpacity, View, StyleSheet, Text, SafeAreaView } from "react-native";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import CustomStatusBar from "../components/StatusBar";

interface EmergencyContactsProps {
  navigation: NavigationProp<ParamListBase>;
}

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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  contactsLayout: {
    width: '100%',
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#004d9a",
    marginBottom: 12,
  },
  contactItem: {
    fontSize: 20,
    color: "#080809",
    marginBottom: 14,
  },
  noContactsFound: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  formkitsadIcon: {
    width: 80,
    height: 80,
  },
  noCustomContacts: {
    fontSize: 16,
    color: "#333",
    marginTop: 10,
    textAlign: 'center',
  },
});

export default EmergencyContacts;
