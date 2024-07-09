import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, Pressable } from 'react-native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;
const responsiveFontSize = (percent: number) => (width * percent) / 100;

const MedicationListScreen = () => {
  const navigation = useNavigation();
  const [currentDay, setCurrentDay] = useState('');

  useEffect(() => {
    const dayNames = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const today = new Date();
    setCurrentDay(dayNames[today.getDay()]);
  }, []);

  const handleAddPress = () => {
    navigation.navigate('AddMedication');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButtonContainer}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
        <Text style={styles.greetingText}>Hey, Sasha!</Text>
        <Pressable style={styles.menuIconContainer}>
          <FontAwesome5 name="ellipsis-v" style={styles.menuIcon} />
        </Pressable>
      </View>
      <Text style={styles.dayText}>{currentDay}</Text>
      <View style={styles.planContainer}>
        <Text style={styles.planText}>Your plan is almost done!</Text>
        <View style={styles.planProgress}>
          <Text style={styles.planProgressText}>78%</Text>
        </View>
        <Text style={styles.planSubText}>13% than week ago</Text>
      </View>
      <View style={styles.vaccinationContainer}>
        <Text style={styles.vaccinationText}>Get vaccinated</Text>
        <Text style={styles.vaccinationSubText}>Nearest vaccination center</Text>
        <Image source={require('../assets/medicine.png')} style={styles.vaccinationImage} />
      </View>
      <View style={styles.medicationList}>
        <View style={styles.medicationItem}>
          <View style={styles.medicationTime}>
            <Text style={styles.medicationTimeText}>8:00</Text>
          </View>
          <View style={styles.medicationDetails}>
            <Text style={styles.medicationName}>Omega 3</Text>
            <Text style={styles.medicationInfo}>1 tablet after meals</Text>
            <Text style={styles.medicationDays}>7 days</Text>
          </View>
          <Image source={require('../assets/medicine.png')} style={styles.medicationImage} />
        </View>
        <View style={styles.medicationItem}>
          <View style={styles.medicationTime}>
            <Text style={styles.medicationTimeText}>8:00</Text>
          </View>
          <View style={styles.medicationDetails}>
            <Text style={styles.medicationName}>Comlivit</Text>
            <Text style={styles.medicationInfo}>1 tablet after meals</Text>
            <Text style={styles.medicationDays}>7 days</Text>
          </View>
          <Image source={require('../assets/medicine.png')} style={styles.medicationImage} />
        </View>
        <View style={styles.medicationItem}>
          <View style={styles.medicationTime}>
            <Text style={styles.medicationTimeText}>14:00</Text>
          </View>
          <View style={styles.medicationDetails}>
            <Text style={styles.medicationName}>5-HTP</Text>
            <Text style={styles.medicationInfo}>1 ampoule</Text>
            <Text style={styles.medicationDays}>2 days</Text>
          </View>
          <Image source={require('../assets/medicine.png')} style={styles.medicationImage} />
        </View>
      </View>
      <Pressable style={styles.addButton} onPress={handleAddPress}>
        <FontAwesome5 name="plus" style={styles.addIcon} />
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingHorizontal: responsiveWidth(5),
    paddingTop: responsiveHeight(2),
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButtonContainer: {
    padding: responsiveFontSize(1),
    marginRight: responsiveWidth(2),
  },
  greetingText: {
    fontSize: responsiveFontSize(5),
    fontWeight: 'bold',
    color: '#333',
  },
  menuIconContainer: {
    padding: responsiveFontSize(1),
  },
  menuIcon: {
    fontSize: responsiveFontSize(6),
    color: '#333',
  },
  dayText: {
    fontSize: responsiveFontSize(6),
    fontWeight: 'bold',
    color: '#333',
    marginTop: responsiveHeight(2),
  },
  planContainer: {
    backgroundColor: '#fff',
    borderRadius: responsiveFontSize(2),
    padding: responsiveFontSize(4),
    marginTop: responsiveHeight(3),
    alignItems: 'center',
  },
  planText: {
    fontSize: responsiveFontSize(4),
    fontWeight: 'bold',
    color: '#333',
  },
  planProgress: {
    width: responsiveFontSize(12),
    height: responsiveFontSize(12),
    borderRadius: responsiveFontSize(6),
    borderWidth: responsiveFontSize(1),
    borderColor: '#318CE7',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: responsiveHeight(1),
  },
  planProgressText: {
    fontSize: responsiveFontSize(4),
    fontWeight: 'bold',
    color: '#318CE7',
  },
  planSubText: {
    fontSize: responsiveFontSize(3),
    color: '#333',
  },
  vaccinationContainer: {
    backgroundColor: '#e0f7fa',
    borderRadius: responsiveFontSize(2),
    padding: responsiveFontSize(4),
    marginTop: responsiveHeight(3),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  vaccinationText: {
    fontSize: responsiveFontSize(4),
    fontWeight: 'bold',
    color: '#00796b',
  },
  vaccinationSubText: {
    fontSize: responsiveFontSize(3),
    color: '#00796b',
  },
  vaccinationImage: {
    width: responsiveWidth(20),
    height: responsiveHeight(10),
    resizeMode: 'contain',
  },
  medicationList: {
    marginTop: responsiveHeight(3),
  },
  medicationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: responsiveFontSize(2),
    padding: responsiveFontSize(4),
    marginBottom: responsiveHeight(2),
  },
  medicationTime: {
    width: responsiveWidth(10),
  },
  medicationTimeText: {
    fontSize: responsiveFontSize(4),
    fontWeight: 'bold',
    color: '#333',
  },
  medicationDetails: {
    flex: 1,
    paddingHorizontal: responsiveWidth(2),
  },
  medicationName: {
    fontSize: responsiveFontSize(4),
    fontWeight: 'bold',
    color: '#333',
  },
  medicationInfo: {
    fontSize: responsiveFontSize(3),
    color: '#333',
  },
  medicationDays: {
    fontSize: responsiveFontSize(3),
    color: '#333',
  },
  medicationImage: {
    width: responsiveWidth(10),
    height: responsiveHeight(5),
    resizeMode: 'contain',
  },
  addButton: {
    position: 'absolute',
    bottom: responsiveHeight(3),
    right: responsiveWidth(3),
    width: responsiveWidth(15),
    height: responsiveWidth(15),
    borderRadius: responsiveWidth(7.5),
    backgroundColor: '#318CE7',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  addIcon: {
    fontSize: responsiveFontSize(8),
    color: '#fff',
  },
});

export default MedicationListScreen;
