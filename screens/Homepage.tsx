import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Pressable,
  Image,
  Animated,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation, NavigationProp, DrawerActions } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { db, auth } from "../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import mentalHealthTips from "../components/MentalHealthTips"; // Adjust import path
import { MentalHealthTip } from "../types"; // Adjust import path

const { width, height } = Dimensions.get("window");

const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;
const responsiveFontSize = (percent: number) => (width * percent) / 100;

type RootStackParamList = {
  Home: undefined;
  SymptomAssessment: undefined;
  ClinicAppointment: undefined;
  FitnessNutrition: undefined;
  MentalHealth: undefined;
  CounselorSession: undefined;
  DailyTipDetailScreen: { tip: MentalHealthTip };
};

const Homepage: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [firstName, setFirstName] = useState<string>("");
  const [greeting, setGreeting] = useState<string>("");
  const [currentTipIndex, setCurrentTipIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredTips, setFilteredTips] = useState<MentalHealthTip[]>(mentalHealthTips);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userQuery = query(
            collection(db, "users"),
            where("email", "==", user.email)
          );
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
  }, []);

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting("Good Morning");
    } else if (currentHour < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTipIndex((prevIndex) => (prevIndex + 1) % mentalHealthTips.length);
      fadeIn();
    }, 12000);
  
    return () => clearInterval(interval);
  }, []);
  
  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 100, 
      useNativeDriver: true,
    }).start(() => fadeOut());
  };
  
  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 100,
      delay: 18000, 
      useNativeDriver: true,
    }).start(() => setLoading(false)); 
  };
  

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setFilteredTips(
      mentalHealthTips.filter(tip =>
        tip.tip.toLowerCase().includes(query.toLowerCase()) // Filter by tip topic
      )
    );
  };

  // Default value to avoid undefined errors
  const currentTip = filteredTips[currentTipIndex] || {
    tip: "No tip available",
    description: "",
    image: "",
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      <Pressable
        style={styles.menuIconContainer}
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      >
        <FontAwesome5 name="bars" style={styles.menuIcon} />
      </Pressable>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Hi, {firstName}!</Text>
        <Text style={styles.subHeaderText}>{greeting}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.mainContainer}>
        <View style={styles.searchContainer}>
          <FontAwesome5 name="search" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Tips"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
        {loading ? (
          <View style={styles.tipsContainer}>
            <View style={styles.welcomeContainer}>
            <Text style={styles.tipTitle}>{mentalHealthTips[0].tip}</Text>
            <Text style={styles.tipDescription}>
              {mentalHealthTips[0].description}
            </Text>
          </View>
          </View>
          
        ) : (
         <View style={styles.tipsContainer}>
           <Animated.View style={[styles.welcomeContainer, { opacity: fadeAnim }]}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("DailyTipDetailScreen", { tip: currentTip })
              }
            >
              <View style={styles.tipContent}>
                {currentTip.image ? (
                  <Image
                    source={{ uri: currentTip.image }}
                    style={styles.tipImage}
                  />
                ) : (
                  <View style={styles.placeholderImage} />
                )}
                <View style={styles.tipTextContainer}>
                  <Text style={styles.tipTitle}>{currentTip.tip}</Text>
                  <Text style={styles.tipDescription}>
                    {currentTip.description}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </Animated.View>
         </View>
        )}
        <View style={styles.gridContainer}>
          <View>
            <Text style={styles.quickAccess}>Quick Access</Text>
          </View>
          <View style={styles.row}>
            <Pressable
              style={styles.button}
              onPress={() => navigation.navigate("MentalHealth")}
            >
              <FontAwesome5
                name="brain"
                size={responsiveFontSize(15)}
                color="#318CE7"
              />
              <Text style={[styles.buttonText, styles.iconText]}>
                Mental Health
              </Text>
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() => navigation.navigate("SymptomAssessment")}
            >
              <FontAwesome5
                name="clipboard-list"
                size={responsiveFontSize(15)}
                color="#318CE7"
              />
              <Text style={[styles.buttonText, styles.iconText]}>
                Symptom Assessment
              </Text>
            </Pressable>
          </View>
          <View style={styles.row}>
            <Pressable
              style={styles.button}
              onPress={() => navigation.navigate("ClinicAppointment")}
            >
              <FontAwesome5
                name="hospital"
                size={responsiveFontSize(15)}
                color="#318CE7"
              />
              <Text style={[styles.buttonText, styles.iconText]}>
                Clinic Appointment
              </Text>
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() => navigation.navigate("FitnessNutrition")}
            >
              <FontAwesome5
                name="dumbbell"
                size={responsiveFontSize(15)}
                color="#318CE7"
              />
              <Text style={[styles.buttonText, styles.iconText]}>
                Fitness & Nutrition
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  menuIconContainer: {
    position: "absolute",
    top: responsiveHeight(2),
    left: responsiveWidth(6),
    zIndex: 10,
    padding: responsiveFontSize(1),
  },
  menuIcon: {
    fontSize: responsiveFontSize(6),
    color: "#333",
  },
  headerContainer: {
    marginTop: responsiveHeight(8),
    marginBottom: responsiveHeight(2),
    paddingLeft: responsiveWidth(5),
  },
  headerText: {
    fontSize: responsiveFontSize(6),
    fontWeight: "bold",
    color: "#318CE7",
  },
  subHeaderText: {
    fontSize: responsiveFontSize(4),
    color: "#318CE7",
  },

  quickAccess:{
    fontSize: responsiveFontSize(5),
    fontWeight: 'bold',
    marginBottom: responsiveFontSize(2)
  },
  mainContainer: {
    paddingHorizontal: responsiveWidth(5),
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: responsiveHeight(1.4),
    backgroundColor: "#e9ecef",
    borderRadius: responsiveFontSize(2),
  },
  searchIcon: {
    fontSize: responsiveFontSize(5),
    color: "#333",
    marginRight: responsiveWidth(2),
  },
  searchInput: {
    fontSize: responsiveFontSize(5),
    flex: 1,
    color: "#318CE7"
  },

  tipsContainer:{
    borderWidth: 2,
    height: responsiveHeight(16),
    padding:responsiveHeight(1),
    marginTop: responsiveHeight(4.4),
    borderRadius: 10,
    borderColor: "#318CE7"
  },
  // welcomeContainer: {
  //   marginVertical: responsiveHeight(4),
  
    
  // },
  tipContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  tipImage: {
    width: responsiveWidth(27),
    height: responsiveHeight(14),
    borderTopLeftRadius: responsiveWidth(2),
    borderBottomLeftRadius: responsiveWidth(2)
  },
  placeholderImage: {
    width: responsiveWidth(27),
    height: responsiveHeight(14),
    borderRadius: responsiveWidth(2),
    backgroundColor: "#ddd",
  },
  tipTextContainer: {
    marginLeft: responsiveWidth(4),
    flex: 1,
  },
  tipTitle: {
    fontSize: responsiveFontSize(4),
    fontWeight: "bold",
    color: "#318CE7",
    marginBottom: responsiveWidth(1),
  },
  tipDescription: {
    fontSize: responsiveFontSize(4),
    color: "#666",
  },
  gridContainer: {
    marginTop: responsiveHeight(4),
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: responsiveHeight(2),
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: responsiveHeight(3),
    backgroundColor: "#edf6ff",
    borderRadius: responsiveWidth(2),
    marginHorizontal: responsiveWidth(2),
    height:responsiveHeight(16),
  },
  buttonText: {
    fontSize: responsiveFontSize(4),
    color: "#333",
  },
  iconText: {
    textAlign: "center",
  },
});

export default Homepage;
