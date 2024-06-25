import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import StatusBar from '../components/StatusBar';

const { width, height } = Dimensions.get('window');

const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;
const responsiveFontSize = (percent: number) => (width * percent) / 100;

const FitnessNutrition = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const handlePress = (screenName: string) => {
    navigation.navigate(screenName);
  };

  return (
    <SafeAreaView style={styles.container}>
        <StatusBar screenName="Fitness and Nutrition" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionText}>
            Fitness and nutrition are essential for a healthy lifestyle. Regular physical activity and a balanced diet improve strength, energy, and overall well-being, while reducing the risk of chronic diseases.
          </Text>
        </View>
        <View style={styles.BtnSection}>
          <Text style={styles.sectionTitle}>Explore</Text>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('WorkoutPlans')}>
            <FontAwesome name="heartbeat" size={24} color="#1F75FE" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Workout Plans</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('MealPlans')}>
            <FontAwesome name="cutlery" size={24} color="#1F75FE" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Meal Plans</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('HealthyTips')}>
            <FontAwesome name="lightbulb-o" size={24} color="#1F75FE" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Healthy Tips</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('GroceryList')}>
            <FontAwesome name="shopping-basket" size={24} color="#1F75FE" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Grocery Lists</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

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
    paddingVertical: responsiveHeight(5),
  },
  BtnSection: {
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(5),
    minHeight: responsiveHeight(70),
  },
  sectionTitle: {
    fontSize: responsiveFontSize(5),
    fontWeight: 'bold',
    marginBottom: responsiveHeight(2),
  },
  sectionText: {
    fontSize: responsiveFontSize(4.7),
    color: '#fff',
    marginBottom: responsiveHeight(2),
  },
  button: {
    height: responsiveHeight(7),
    backgroundColor: '#fbfaf3',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(5),
    marginBottom: responsiveHeight(2),
    borderRadius: 8,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 10,
  },
  buttonText: {
    fontSize: responsiveFontSize(4),
    color: '#333',
    flex: 1,
    textAlign: 'left',
  },
  buttonIcon: {
    marginRight: responsiveWidth(3),
  },
});

export default FitnessNutrition;
