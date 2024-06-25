// Import necessary libraries and components
import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import StatusBar from '../components/StatusBar';

// Dimensions of the screen
const { width, height } = Dimensions.get('window');

// Helper functions for responsive styling
const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;
const responsiveFontSize = (percent: number) => (width * percent) / 100;

const WorkoutPlans = () => {
  return (
    <SafeAreaView style={styles.container}>
        <StatusBar screenName="Workout Plans" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Workout Plans</Text>
          <Text style={styles.sectionText}>
            Explore different workout plans designed to help you achieve your fitness goals.
          </Text>
        </View>

        {/* Example content */}
        <View style={styles.planContainer}>
          <View style={styles.planItem}>
            <FontAwesome name="calendar-check-o" size={24} color="#1F75FE" style={styles.planIcon} />
            <Text style={styles.planText}>30-Day Full Body Challenge</Text>
          </View>
          <View style={styles.planItem}>
            <FontAwesome name="calendar-check-o" size={24} color="#1F75FE" style={styles.planIcon} />
            <Text style={styles.planText}>Cardio Blast for Beginners</Text>
          </View>
          <View style={styles.planItem}>
            <FontAwesome name="calendar-check-o" size={24} color="#1F75FE" style={styles.planIcon} />
            <Text style={styles.planText}>Strength Training Essentials</Text>
          </View>
          {/* Add more workout plans as needed */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#318CE7',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  section: {
    backgroundColor: '#1F75FE',
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(3),
    marginBottom: responsiveHeight(2),
  },
  sectionTitle: {
    fontSize: responsiveFontSize(5),
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: responsiveHeight(1),
  },
  sectionText: {
    fontSize: responsiveFontSize(3.5),
    color: '#fff',
  },
  planContainer: {
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(5),
    minHeight: responsiveHeight(70), // Adjust height as needed
  },
  planItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fbfaf3',
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(2),
    marginBottom: responsiveHeight(2),
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 10,
  },
  planIcon: {
    marginRight: responsiveWidth(3),
  },
  planText: {
    fontSize: responsiveFontSize(4),
    color: '#333',
  },
});

export default WorkoutPlans;
