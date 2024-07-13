import * as imports from "./imports";
import AddMedicationStrengthScreen from "./screens/AddMedicationStrengthScreen";
import AddMedicationTimeScreen from "./screens/AddMedicationTimeScreen";
import ChooseMedicationType from "./screens/ChooseMedicationType";



const {
  React,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  NavigationContainer,
  FontAwesome5,
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
  ScheduleScreen1,
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

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Homepage1" component={Homepage1} />
    <Stack.Screen name="FirstAid" component={FirstAid} />
    <Stack.Screen name="CounselorSession" component={CounselorSession} />
    <Stack.Screen name="DailyTipDetailScreen" component={DailyTipDetailScreen} />
  </Stack.Navigator>
);

const CenterButton = (props) => (
  <TouchableOpacity {...props} style={styles.centerButton}>
    <View style={[styles.centerButtonContainer, { backgroundColor: "#318CE7" }]}>
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
        let label;
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
  <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="WelcomeScreen">
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
    <Stack.Screen name="MentalHealth" component={MentalHealth} />
    <Stack.Screen name="AddMedication" component={AddMedication} />
    <Stack.Screen name="ChooseMedicationType" component={ChooseMedicationType} />
    <Stack.Screen name="SymptomAssessment" component={SymptomAssessment} />
   
    <Stack.Screen name="AddMedicationStrengthScreen" component={AddMedicationStrengthScreen} />
    <Stack.Screen name="AddMedicationTimeScreen" component={AddMedicationTimeScreen} />

    

  </Stack.Navigator>
);

const App = () => {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator 
        drawerContent={(props) => <Menu {...props} />} 
        screenOptions={({ route }) => ({
          gestureEnabled: route.name === "HomeTab", // Enable swipe only for HomeTab
        })}
      >
        <Drawer.Screen name="AppStack" component={AppStack} options={{ headerShown: false }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0, 
    height: responsiveHeight(8.75),
    backgroundColor: "#fff",
    borderTopRightRadius: responsiveHeight(1.5),
    borderTopLeftRadius: responsiveHeight(1.5),
    paddingBottom: responsiveHeight(1.25),
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
    elevation: 5,
  },
});

export default App;
