import * as React from 'react';
import { View, Text, Pressable, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import StatusBar from '../components/StatusBar';

const { width, height } = Dimensions.get('window');

const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;
const responsiveFontSize = (percent: number) => (width * percent) / 100;

const HealthAndWellness = () => {
  const navigation = useNavigation();

  const handlePress = (screenName: string) => {
    navigation.navigate(screenName);
  };

  return (
    <SafeAreaView style={styles.container}>
        <StatusBar screenName="Health and Wellness" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionText}>
            Health and wellness involve maintaining physical, mental, and emotional
            well-being through balanced living. This includes regular exercise,
            nutritious eating, and mental health care to prevent diseases and
            enhance overall quality of life.
          </Text>
        </View>
        <View style={styles.BtnSection}>
          <Text style={styles.sectionTitle}>Explore</Text>
          <Pressable style={[styles.button, { width: responsiveWidth(90) }]} onPress={() => handlePress('MentalHealth')}>
            <FontAwesome5 name="brain" size={24} color="#1F75FE" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Mental Health</Text>
          </Pressable>
          <Pressable style={[styles.button, { width: responsiveWidth(90) }]} onPress={() => handlePress('Exercise')}>
            <FontAwesome5 name="dumbbell" size={24} color="#1F75FE" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Exercise</Text>
          </Pressable>
          <Pressable style={[styles.button, { width: responsiveWidth(90) }]} onPress={() => handlePress('HealthyRelationships')}>
            <MaterialCommunityIcons name="human-handsup" size={24} color="#1F75FE" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Healthy Relationships</Text>
          </Pressable>
          <Pressable style={[styles.button, { width: responsiveWidth(90) }]} onPress={() => handlePress('SubstanceAbuse')}>
            <Entypo name="warning" size={24} color="#1F75FE" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Substance Abuse</Text>
          </Pressable>
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

export default HealthAndWellness;
