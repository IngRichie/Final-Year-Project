import React from 'react';
import { ScrollView, StyleSheet, Text, Dimensions, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import StatusBar from '../components/StatusBar';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;
const responsiveFontSize = (percent: number) => (width * percent) / 100;

const EmergencyProcedures = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const handlePress = (screenName: string) => {
    navigation.navigate(screenName);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar screenName="Emergency Procedures" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionText}>
            Emergency procedures are predefined steps for handling crises like fires, medical incidents, and safety concerns. They provide clear instructions to ensure safety and minimize harm during emergencies.
          </Text>
        </View>
        <View style={styles.BtnSection}>
          <Text style={styles.sectionTitle}>Emergency Procedures</Text>
          <TouchableOpacity style={[styles.button, { width: responsiveWidth(90) }]} onPress={() => handlePress("MedicalEmergency")}>
            <FontAwesome5 name="medkit" size={24} color="#1F75FE" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Medical Emergency</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { width: responsiveWidth(90) }]} onPress={() => handlePress("FireEmergency")}>
            <MaterialCommunityIcons name="fire" size={24} color="#1F75FE" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Fire Emergency</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { width: responsiveWidth(90) }]} onPress={() => handlePress("PersonalSafety")}>
            <FontAwesome5 name="shield-alt" size={24} color="#1F75FE" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Personal Safety</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { width: responsiveWidth(90) }]} onPress={() => handlePress("DomesticAccident")}>
            <MaterialCommunityIcons name="home-alert" size={24} color="#1F75FE" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Domestic Accident</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F75FE',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  section: {
    backgroundColor: '#1F75FE',
    height: responsiveHeight(30),
    justifyContent: 'center',
    paddingHorizontal: responsiveWidth(5),
  },
  BtnSection: {
    backgroundColor: '#fff',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingVertical: responsiveHeight(5),
    paddingHorizontal: responsiveWidth(5),
    marginTop: responsiveHeight(2),
    minHeight: responsiveHeight(57),
  },
  sectionTitle: {
    fontSize: responsiveFontSize(5),
    fontWeight: 'bold',
    marginBottom: responsiveHeight(2),
    color: '#3a3a3a',
  },
  sectionText: {
    fontSize: responsiveFontSize(4),
    color: '#fff',
    lineHeight: responsiveHeight(5),
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    height: responsiveHeight(7),
    backgroundColor: '#fbfaf3',
    justifyContent: 'flex-start',
    paddingLeft: responsiveWidth(5),
    marginBottom: responsiveHeight(2),
    borderRadius: 8,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    fontSize: responsiveFontSize(4),
    marginLeft: responsiveWidth(2),
    color: '#3a3a3a',
  },
  buttonIcon: {
    marginRight: responsiveWidth(2),
  },
});

export default EmergencyProcedures;
