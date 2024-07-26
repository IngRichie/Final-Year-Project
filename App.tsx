import * as imports from "./imports";
import { useVoiceCommands, initVoiceCommands } from './voiceCommands';
import { useNavigation } from '@react-navigation/native';
import { db, auth } from "./firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { View, TouchableOpacity, StyleSheet, Platform, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import React, { useEffect, useState, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync, schedulePushNotification } from './registerPushNotifications';
import HealthNewsInterest from "./screens/HealthNewsInterest";
import SplashScreen from "./components/SplashScreen";
import { DarkModeProvider } from './components/DarkModeContext'; // Import DarkModeProvider
import { useDarkMode } from './components/DarkModeContext'; // Import useDarkMode hook
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'; // Import KeyboardAwareScrollView

const {
  Text,
  NavigationContainer,
  useFonts,
  AppLoading,
  Homepage1,
  FirstAid,
  SymptomAssessment,
  CounselorSession,
  DailyTipDetailScreen,
  MedSchedule,
  FitnessNutrition,
  Settings,
  CounselorDetails,
  BookAppointment,
  AddMedication,
  Menu,
  WelcomeScreen,
  LoginScreen,
  SignUpScreen,
  ForgetPassword,
  NewsPage,
  NotificationScreen,
  ProfileScreen,
  PrivacyScreen,
  PreferencesScreen,
  AccessibilityScreen,
  NotificationSettings,
  MentalHealth,
  RootStackParamList,
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
  Drawer,
  Tab,
  Stack,
} = imports;

// Initialize Notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Homepage1" component={Homepage1} />
    <Stack.Screen name="FirstAid" component={FirstAid} />
    <Stack.Screen name="CounselorSession" component={CounselorSession} />
    <Stack.Screen name="DailyTipDetailScreen" component={DailyTipDetailScreen} />
  </Stack.Navigator>
);

const CenterButton = (props: any) => {
  const [firstName, setFirstName] = useState("");
  const { startRecording, stopRecording, isRecording } = useVoiceCommands();
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userQuery = query(collection(db, "users"), where("email", "==", user.email));
          const userSnapshot = await getDocs(userQuery);
          if (!userSnapshot.empty) {
            const userData = userSnapshot.docs[0].data();
            if (userData && userData.firstname) {
              setFirstName(userData.firstname);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
    initVoiceCommands(navigation);
  }, [navigation]);

  const handleRecordButtonPress = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <TouchableOpacity {...props} style={styles.centerButton} onPress={handleRecordButtonPress}>
      <View style={[styles.centerButtonContainer, { backgroundColor: isRecording ? "#FF6347" : "#318CE7" }]}>
        <FontAwesome5 name="robot" color="#fff" size={responsiveFontSize(6)} />
      </View>
    </TouchableOpacity>
  );
};

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarShowLabel: true,
      tabBarStyle: styles.tabBar,
      tabBarHideOnKeyboard: true,
      tabBarIcon: ({ color, size }) => {
        let iconName: string;
        if (route.name === "HomeTab") {
          iconName = "home";
        } else if (route.name === "FirstAidTab") {
          iconName = "briefcase-medical";
        } else if (route.name === "NewsPageTab") {
          iconName = "newspaper";
        } else if (route.name === "CounselorSessionTab") {
          iconName = "user-friends";
        }

        return <FontAwesome5 name={iconName} size={size} color={color} />;
      },
      tabBarLabel: ({ focused }) => {
        let label: string | number | boolean | imports.React.ReactElement<any, string | imports.React.JSXElementConstructor<any>> | Iterable<imports.React.ReactNode> | null | undefined;
        if (route.name === "HomeTab") {
          label = "Home";
        } else if (route.name === "FirstAidTab") {
          label = "First Aid";
        } else if (route.name === "NewsPageTab") {
          label = "News";
        } else if (route.name === "CounselorSessionTab") {
          label = "Counselor";
        }
        return (
          <Text
            style={{
              color: focused ? "#673ab7" : "#222",
              fontSize: responsiveFontSize(3),
              fontFamily: "Poppins-Regular",
            }}
          >
            {label}
          </Text>
        );
      },
    })}
  >
    <Tab.Screen name="HomeTab" component={HomeStack} options={{ headerShown: false }} />
    <Tab.Screen name="FirstAidTab" component={FirstAid} options={{ headerShown: false }} />
    <Tab.Screen
      name="CenterButton"
      component={View}
      options={{
        tabBarButton: (props) => <CenterButton {...props} />,
        headerShown: false,
      }}
    />
    <Tab.Screen name="NewsPageTab" component={NewsPage} options={{ headerShown: false }} />
    <Tab.Screen name="CounselorSessionTab" component={CounselorSession} options={{ headerShown: false }} />
  </Tab.Navigator>
);

const AppStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="SplashScreen">
    <Stack.Screen name="SplashScreen" component={SplashScreen} />
    <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
    <Stack.Screen name="LoginScreen" component={LoginScreen} />
    <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
    <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
    <Stack.Screen name="MainTabs" component={MainTabs} />
    <Stack.Screen name="MedSchedule" component={MedSchedule} />
    <Stack.Screen name="FitnessNutrition" component={FitnessNutrition} />
    <Stack.Screen name="Settings" component={Settings} />
    <Stack.Screen name="CounselorDetails" component={CounselorDetails} />
    <Stack.Screen name="BookAppointment" component={BookAppointment} />
    <Stack.Screen name="NewsPage" component={NewsPage} />
    <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
    <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    <Stack.Screen name="PrivacyScreen" component={PrivacyScreen} />
    <Stack.Screen name="PreferencesScreen" component={PreferencesScreen} />
    <Stack.Screen name="AccessibilityScreen" component={AccessibilityScreen} />
    <Stack.Screen name="NotificationSettings" component={NotificationSettings} />
    {/* <Stack.Screen name="MentalHealth" component={MentalHealth} /> */}
    <Stack.Screen name="AddMedication" component={AddMedication} />
    <Stack.Screen name="SymptomAssessment" component={SymptomAssessment} />
    <Stack.Screen name="HealthNewsInterest" component={HealthNewsInterest} />
  </Stack.Navigator>
);

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
  });

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();

  useEffect(() => {
    if (Platform.OS !== 'web') {
      registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });

      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });

      return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    }
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <DarkModeProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0} // Adjust as needed
        >
          <NavigationContainer>
            <Drawer.Navigator
              drawerContent={(props) => <Menu {...props} />}
              screenOptions={({ route }) => ({
                swipeEnabled: false,
              })}
            >
              <Drawer.Screen name="Home" component={AppStack} options={{ headerShown: false }} />
            </Drawer.Navigator>
          </NavigationContainer>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </DarkModeProvider>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 0,
    height: responsiveHeight(8.75),
    backgroundColor: "#fff",
    borderTopRightRadius: responsiveHeight(1.5),
    borderTopLeftRadius: responsiveHeight(1.5),
    paddingBottom: responsiveHeight(1.25),
    width: "100%",
    ...Platform.select({
      web: {
        boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
      },
      default: {
        elevation: 5,
      },
    }),
  },
  centerButton: {
    top: -responsiveHeight(3.75),
    justifyContent: "center",
    alignItems: "center",
  },
  centerButtonContainer: {
    width: responsiveWidth(17.5),
    height: responsiveWidth(17.5),
    borderRadius: responsiveWidth(8.75),
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      web: {
        boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
      },
      default: {
        elevation: 5,
      },
    }),
  },
});

export default App;
