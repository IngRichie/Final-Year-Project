import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TouchableOpacityProps } from 'react-native';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesome5, Entypo } from '@expo/vector-icons';
import Homepage from './screens/Homepage';
import Homepage1 from './screens/Homepage1';
import FirstAid from './screens/FirstAid';
import SymptomAssessment from './screens/SymptomAssessment';

import CounselorSession from './screens/CounselorSession';
import DailyTipDetailScreen from './screens/DailyTipDetailScreen';
import MedSchedule from './screens/MedSchedule';
import FitnessNutrition from './screens/FitnessNutrition';
import Settings from './screens/Settings';
import CounselorChat from './screens/CounselorChat';
import CallScreen from './screens/CallScreen';
import CounselorDetails from './screens/CounselorDetails';
import BookAppointment from './screens/BookAppointment';
import MedicationListScreen from './screens/MedicationList';
import AddMedication from './screens/AddMedication';
import ScheduleScreen1 from './screens/ScheduleScreen1';
import Menu from './components/Menu';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import ForgetPassword from './screens/ForgetPassword';
import NewsPage from './screens/NewsPage';
import NotificationScreen from './screens/NotificationScreen';
import ProfileScreen from './screens/ProfileScreen';
import PrivacyScreen from './screens/PrivacyScreen';
import PreferencesScreen from './screens/PreferencesScreen';
import AccessibilityScreen from './screens/AccessibilityScreen';
import NotificationSettings from './screens/NotificationSettings';
import MentalHealth from './screens/MentalHealth';

const { width, height } = Dimensions.get('window');

const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;
const responsiveFontSize = (percent: number) => (width * percent) / 100;

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = ({ }) => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Homepage" component={Homepage} />
    <Stack.Screen name="Homepage1" component={Homepage1} />
    <Stack.Screen name="FirstAid" component={FirstAid} />
    <Stack.Screen name="SymptomAssessment" component={SymptomAssessment} />
   
    <Stack.Screen name="CounselorSession" component={CounselorSession} />
    <Stack.Screen name="DailyTipDetailScreen" component={DailyTipDetailScreen} />
    <Stack.Screen name="MedicationList" component={MedicationListScreen} />
    {/* <Stack.Screen name="BookAppointment" component={BookAppointment} /> */}
    {/* <Stack.Screen name="AddMedication" component={AddMedication} /> */}
    {/* <Stack.Screen name="ScheduleScreen1" component={ScheduleScreen1} /> */}
  
  </Stack.Navigator>
);

const CenterButton = (props: TouchableOpacityProps) => (
  <TouchableOpacity {...props} style={styles.centerButton}>
    <View style={[styles.centerButtonContainer, { backgroundColor: '#318CE7' }]}>
      <FontAwesome5 name="robot" color="#fff" size={responsiveFontSize(6)} />
    </View>
  </TouchableOpacity>
);

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarShowLabel: true,
      tabBarStyle: styles.tabBar,
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === 'HomeTab') {
          iconName = 'home';
        } else if (route.name === 'FirstAidTab') {
          iconName = 'briefcase-medical';
        } else if (route.name === 'NewsPageTab') {
          iconName = 'newspaper';
        } else if (route.name === 'CounselorSessionTab') {
          iconName = 'user-friends';
        }

        return <FontAwesome5 name={iconName} size={size} color={color} />;
      },
      tabBarLabel: ({ focused }) => {
        let label;
        if (route.name === 'HomeTab') {
          label = 'Home';
        } else if (route.name === 'FirstAidTab') {
          label = 'First Aid';
        } else if (route.name === 'NewsPageTab') {
          label = 'News';
        } else if (route.name === 'CounselorSessionTab') {
          label = 'Counselor';
        }
        return (
          <Text style={{ color: focused ? '#673ab7' : '#222', fontSize: responsiveFontSize(3) }}>
            {label}
          </Text>
        );
      },
      tabBarVisible: route.name === 'HomeTab' || route.name === 'FirstAidTab' || route.name === 'NewsPageTab' || route.name === 'CounselorSessionTab'
    })}
  >
    <Tab.Screen
      name="HomeTab"
      component={HomeStack}
      options={{
        headerShown: false
      }}
    />
    <Tab.Screen
      name="FirstAidTab"
      component={FirstAid}
      options={{
        headerShown: false
      }}
    />
    <Tab.Screen
      name="CenterButton"
      component={View} // Using an empty view as a placeholder
      options={{
        tabBarButton: (props) => <CenterButton {...props} />,
        headerShown: false
      }}
    />
    <Tab.Screen
      name="NewsPageTab"
      component={NewsPage}
      options={{
        headerShown: false
      }}
    />
    <Tab.Screen
      name="CounselorSessionTab"
      component={CounselorSession}
      options={{
        headerShown: false
      }}
    />
  </Tab.Navigator>
);

const AppStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="WelcomeScreen">
    <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
    <Stack.Screen name="LoginScreen" component={LoginScreen} />
    <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
    <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
    <Stack.Screen name="MainTabs" component={MainTabs} />
    <Stack.Screen name="MedSchedule" component={MedSchedule} />
    <Stack.Screen name="FitnessNutrition" component={FitnessNutrition} />
    <Stack.Screen name="Settings" component={Settings} />
    <Stack.Screen name="CounselorChat" component={CounselorChat} />
    <Stack.Screen name="CallScreen" component={CallScreen} />
    <Stack.Screen name="CounselorDetails" component={CounselorDetails} />
    <Stack.Screen name="BookAppointment" component={BookAppointment} />
    <Stack.Screen name="NewsPage" component={NewsPage} />
    <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
    <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    <Stack.Screen name="PrivacyScreen" component={PrivacyScreen} />
    <Stack.Screen name="PreferencesScreen" component={PreferencesScreen} />
    <Stack.Screen name="AccessibilityScreen" component={AccessibilityScreen} />
    <Stack.Screen name="NotificationSettings" component={NotificationSettings} />
    <Stack.Screen name="MentalHealth" component={MentalHealth} />
  </Stack.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <Menu {...props} />}>
        <Drawer.Screen name="AppStack" component={AppStack} options={{ headerShown: false }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: responsiveHeight(1.5),
    left: responsiveWidth(2.5),
    right: responsiveWidth(2.5),
    height: responsiveHeight(8.75),
    backgroundColor: '#fff',
    borderBottomLeftRadius: responsiveHeight(4),
    borderBottomRightRadius: responsiveHeight(4),
    borderTopRightRadius: responsiveHeight(1.5),
    borderTopLeftRadius: responsiveHeight(1.5),
    borderTopWidth: 0,
    elevation: 10,
    paddingBottom: responsiveHeight(1.25),
  },
  centerButton: {
    top: -responsiveHeight(3.75),
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerButtonContainer: {
    width: responsiveWidth(17.5),
    height: responsiveWidth(17.5),
    borderRadius: responsiveWidth(8.75),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});

export default App;
