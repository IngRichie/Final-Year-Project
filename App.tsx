import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

// Import screens and components
import LoginScreen from './screens/LoginScreen';
import Homepage from './screens/Homepage';
import HealthAndWellness from './screens/HealthAndWellness';
import CounselorSession from './screens/CounselorSession';
import EmergencyContacts from './screens/EmergencyContacts';
import MentalHealth from './screens/MentalHealth';
import Exercise from './screens/Exercise';
import EmergencyProcedures from './screens/EmergencyProcedures';
import SymptomAssessment from './screens/SymptomAssessment';
import Settings from './screens/Settings';
import SignUpScreen from './screens/SignUpScreen';
import FitnessNutrition from './screens/FitnessNutrition';
import Homepage1 from './screens/Homepage1';
import MedSchedule from './screens/MedSchedule';
import Menu from './components/Menu';
import WelcomeScreen from './screens/WelcomeScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function DrawerRoot() {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false, drawerStyle: { width: Dimensions.get('window').width * 0.75 } }}
      drawerContent={(props) => <Menu {...props} />}
    >
      <Drawer.Screen name="BottomTabsRoot" component={BottomTabsRoot} />
      <Drawer.Screen name="SymptomAssessment" component={SymptomAssessment} options={{ headerShown: false }} />
      <Drawer.Screen name="MedSchedule" component={MedSchedule} options={{ headerShown: false }} />
      <Drawer.Screen name="CounselorSession" component={CounselorSession} options={{ headerShown: false }} />
      <Drawer.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
      <Drawer.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
      <Drawer.Screen name="EmergencyProcedures" component={EmergencyProcedures} options={{ headerShown: false }} />
      {/* Add more screens as needed */}
      <Drawer.Screen name="MentalHealth" component={MentalHealth} options={{ headerShown: false }} />
      <Drawer.Screen name="Exercise" component={Exercise} options={{ headerShown: false }} />
    </Drawer.Navigator>
  );
}

function BottomTabsRoot() {
  const renderTabIcon = (name: string, focused: boolean) => {
    let iconName;

    switch (name) {
      case 'Homepage1':
        iconName = focused ? 'home' : 'home-outline';
        break;
      case 'FitnessNutrition':
        iconName = focused ? 'fitness' : 'fitness-outline';
        break;
      case 'MentalHealth':
        iconName = focused ? 'happy' : 'happy-outline';
        break;
      case 'EmergencyContacts':
        iconName = focused ? 'call' : 'call-outline';
        break;
      default:
        iconName = 'ios-information-circle';
    }

    return <Ionicons name={iconName} size={Dimensions.get('window').width * 0.07} color={focused ? '#007AFF' : '#8e8e93'} />;
  };

  const getTabLabel = (name: string) => {
    switch (name) {
      case 'Homepage1':
        return 'Home';
      case 'FitnessNutrition':
        return 'Fitness';
      case 'MentalHealth':
        return 'Mental Health';
      case 'EmergencyContacts':
        return 'Emergency';
      default:
        return '';
    }
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: Dimensions.get('window').width * 0.035,
          marginTop: Dimensions.get('window').height * 0.008,
        },
        tabBarItemStyle: {
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        },
        tabBarStyle: {
          position: 'absolute',
          bottom: Dimensions.get('window').height * 0.03,
          left: Dimensions.get('window').width * 0.05,
          right: Dimensions.get('window').width * 0.05,
          height: Dimensions.get('window').height * 0.08,
          borderRadius: Dimensions.get('window').height * 0.02,
          backgroundColor: '#f7f7f7',
          elevation: 20,
          shadowColor: 'rgba(0, 0, 0, 0.75)',
          shadowOffset: { width: 0, height: Dimensions.get('window').height * 0.01 },
          shadowOpacity: 1,
          shadowRadius: Dimensions.get('window').height * 0.02,
        },
      }}
      tabBar={({ state, navigation }) => (
        <View style={styles.tabBar}>
          {state.routes.map((route, index) => (
            <TouchableOpacity key={route.key} onPress={() => navigation.navigate(route.name)} style={styles.tabItem}>
              {renderTabIcon(route.name, state.index === index)}
              <Text
                style={{
                  color: state.index === index ? '#007AFF' : '#8e8e93',
                  fontSize: Dimensions.get('window').width * 0.03,
                  marginTop: Dimensions.get('window').height * 0.005,
                }}
              >
                {getTabLabel(route.name)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    >
      <Tab.Screen name="Homepage1" component={Homepage1} />
      <Tab.Screen name="FitnessNutrition" component={FitnessNutrition} />
      <Tab.Screen name="MentalHealth" component={MentalHealth} />
      <Tab.Screen name="EmergencyContacts" component={EmergencyContacts} />
    </Tab.Navigator>
  );
}

const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setHideSplashScreen(false);
    }, 2000); // Adjust the time as needed
  }, []);

  return (
    <NavigationContainer>
      {hideSplashScreen ? null : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          <Stack.Screen name="DrawerRoot" component={DrawerRoot} />
          <Stack.Screen name="Homepage" component={Homepage} />
          <Stack.Screen name="HealthAndWellness" component={HealthAndWellness} />
          <Stack.Screen name="SymptomAssessment" component={SymptomAssessment} />
          <Stack.Screen name="EmergencyProcedures" component={EmergencyProcedures} />
          {/* Add more screens as needed */}
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: Dimensions.get('window').height * 0.1,
    borderRadius: Dimensions.get('window').height * 0.02,
    backgroundColor: '#f7f7f7',
    elevation: 20,
    shadowColor: 'rgba(0, 0, 0, 0.75)',
    shadowOffset: { width: 0, height: Dimensions.get('window').height * 0.01 },
    shadowOpacity: 1,
    shadowRadius: Dimensions.get('window').height * 0.02,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
