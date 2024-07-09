import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Pressable,
} from "react-native";
import { useNavigation, NavigationProp, DrawerActions } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import dailyTips from "./DailyTips";
import { db, auth } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

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
  DailyTipDetailScreen: { tip: any };
};

const Homepage: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [firstName, setFirstName] = useState<string>("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDoc = doc(db, "users", user.uid);
          const userSnapshot = await getDoc(userDoc);
          if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            if (userData && userData.firstName) {
              setFirstName(userData.firstName);
            } else {
              console.log("First name not found in user data!");
            }
          } else {
            console.log("No user data found!");
          }
        } else {
          console.log("No user is signed in.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleReadMorePress = (tip: any) => {
    navigation.navigate("DailyTipDetailScreen", { tip });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#318CE7" />
      <Pressable
        style={styles.menuIconContainer}
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      >
        <FontAwesome5 name="bars" style={styles.menuIcon} />
      </Pressable>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <FontAwesome5 name="user" style={styles.userIcon} />
          </View>
          <Text style={styles.headerText}>Hi, {firstName}</Text>
        </View>
      </View>
      <LinearGradient
        colors={['#369AFF', '#318CE7']}
        style={styles.dailyTipsContainer}
      >
        <View style={styles.dtTopicContainer}>
          <Text style={styles.dtTopic}>Daily Tips</Text>
        </View>
        <View style={styles.dailyTipsSubContainer}>
          {dailyTips.slice(0, 3).map((item, index) => (
            <View key={index} style={styles.TipContainer}>
             
                <Image
                  source={item.image}
                  style={styles.image}
                  resizeMode="cover"
                />
     
              <View style={styles.dailyTip}>
                <Text style={styles.dailyTipContents}>
                  {item.content.length > 20
                    ? `${item.content.substring(0, 20)}...`
                    : item.content}
                </Text>
              </View>
            </View>
          ))}
        </View>
        <Pressable
          style={styles.readMorebtn}
          onPress={() => handleReadMorePress(item)}
        >
          <Text style={styles.readMore}>READ MORE </Text>
          <FontAwesome5 name="arrow-right" style={styles.arrowRight} />
        </Pressable>
      </LinearGradient>
      <ScrollView contentContainerStyle={styles.mainContainer}>
        <View style={styles.subContainer}>
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate("MentalHealth")}
          >
            <FontAwesome5 name="brain" size={50} color="#333" />
            <Text style={[styles.buttonText, styles.iconText]}>
              Mental Health
            </Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate("SymptomAssessment")}
          >
            <FontAwesome5 name="clipboard-list" size={50} color="#333" />
            <Text style={[styles.buttonText, styles.iconText]}>
              Symptom Assessment
            </Text>
          </Pressable>
        </View>
        <View style={styles.subContainer}>
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate("ClinicAppointment")}
          >
            <FontAwesome5 name="hospital" size={50} color="#333" />
            <Text style={[styles.buttonText, styles.iconText]}>
              Clinic Appointment
            </Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate("FitnessNutrition")}
          >
            <FontAwesome5 name="dumbbell" size={50} color="#333" />
            <Text style={[styles.buttonText, styles.iconText]}>
              Fitness & Nutrition
            </Text>
          </Pressable>
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
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#318CE7",
    width: "70%",
    paddingLeft: responsiveFontSize(5),
    paddingVertical: responsiveFontSize(2),
    borderTopRightRadius: responsiveFontSize(3),
    borderBottomRightRadius: responsiveFontSize(3),
  },
  iconContainer: {
    width: responsiveFontSize(10),
    height: responsiveFontSize(10),
    borderRadius: responsiveFontSize(5),
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  userIcon: {
    fontSize: responsiveFontSize(6),
    color: "#318CE7",
  },
  headerText: {
    fontSize: responsiveFontSize(6),
    color: "#fff",
    marginLeft: responsiveWidth(5),
  },
  dailyTipsContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    marginVertical: responsiveHeight(2),
    alignItems: "center",
    padding: responsiveWidth(1),
    height: responsiveHeight(33),
    width: responsiveWidth(97),
    borderRadius: responsiveWidth(5),
    alignSelf: 'center'
  },
  dailyTipsSubContainer: {
    display: "flex",
    width: responsiveWidth(92),
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBlockColor: 'rgba(238, 234, 236, 0.26)',
  },
  dtTopicContainer: {
    width: responsiveWidth(92),
  },
  dtTopic: {
    color: 'white',
    fontSize: responsiveFontSize(4.1),
  },
  // imageContainer: {
  //   width: '100%'
    
  // },
  image: {
    width: "100%",
    height: responsiveHeight(15),
    borderRadius: responsiveFontSize(2),
    
    
  },
  dailyTip: {
    alignItems: "center",
    paddingVertical: responsiveHeight(1),
    paddingHorizontal: responsiveWidth(2),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dailyTipContents: {
    fontFamily: "Poppins-Medium",
    color: "#fff",
    fontSize: responsiveFontSize(3.6),
    textAlign: "center",
  },
  TipContainer: {
    width: "32%",
  },
  readMorebtn: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: responsiveHeight(1),
  },
  readMore: {
    fontFamily: "Poppins-Bold",
    fontSize: responsiveFontSize(3.8),
    color: "#fff",
  },
  arrowRight: {
    fontSize: responsiveFontSize(2.8),
    color: "#fff",
    marginLeft: responsiveWidth(1),
  },
  mainContainer: {
    flexGrow: 1,
    padding: responsiveWidth(5),
  },
  subContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: responsiveHeight(1),
  },
  button: {
    backgroundColor: "#fbfaf3",
    paddingVertical: responsiveHeight(1),
    borderRadius: 10,
    flex: 1,
    marginHorizontal: responsiveWidth(2.5),
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    marginVertical: responsiveHeight(0.5),
  },
  buttonText: {
    fontSize: responsiveFontSize(3.2),
    marginTop: responsiveHeight(1),
    color: "#333",
    fontFamily: "Poppins-Regular",
    textAlign: "center",
  },
  iconText: {
    color: "red",
  },
});

export default Homepage;
