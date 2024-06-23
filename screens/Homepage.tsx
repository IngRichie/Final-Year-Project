import * as React from "react";
import { View, Text, Pressable, Image, StyleSheet, Dimensions, ScrollView } from "react-native";
import { useNavigation, NavigationProp, ParamListBase, DrawerActions } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;
const responsiveFontSize = (percent: number) => (width * percent) / 100;

const Homepage = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <LinearGradient
            style={styles.gradient}
            locations={[0, 1]}
            colors={["#0ABCF9", "#2C69D1"]}
          />
          <View style={styles.topIcons}>
            <Pressable onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
              <Entypo name="dots-three-vertical" style={styles.icon} />
            </Pressable>
            <Pressable onPress={() => console.log("Bell pressed")}>
              <Entypo name="bell" style={styles.icon} />
            </Pressable>
          </View>
          <View style={styles.greetingContainer}>
            <Text style={styles.greeting}>Hi, Richie</Text>
            <Text style={styles.welcome}>Welcome back</Text>
          </View>
          <View style={styles.dailyTipContainer}>
            <Text style={styles.title}>Daily health tips</Text>
            <Text style={styles.dailyTip}>
              Eating a variety of fresh, whole fruits daily boosts your health by
              providing essential vitamins, minerals, and fiber. Opt for seasonal
              fruits and choose whole fruits over juices to maximize nutrient
              intake and aid digestion.
            </Text>
          </View>
        </View>
        <View style={styles.mainContainer}>
          <View style={styles.subContainer}>
            <Pressable
              style={styles.button}
              onPress={() => navigation.navigate("HealthAndWellness")}
            >
              <>
                <Entypo name="heart" size={24} color="#01509f" style={styles.buttonIcon} />
                <Text style={styles.buttonText}>Health and Wellness</Text>
              </>
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() => navigation.navigate("EmergencyProcedures")}
            >
              <>
                <Entypo name="warning" size={24} color="#01509f" style={styles.buttonIcon} />
                <Text style={styles.buttonText}>Emergency Procedures</Text>
              </>
            </Pressable>
          </View>
          <View style={styles.subContainer}>
            <Pressable
              style={styles.button}
              onPress={() => navigation.navigate("EmergencyContacts")}
            >
              <>
                <Entypo name="phone" size={24} color="#01509f" style={styles.buttonIcon} />
                <Text style={styles.buttonText}>Emergency Contacts</Text>
              </>
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() => navigation.navigate("CounselorSession")}
            >
              <>
                <Entypo name="users" size={24} color="#01509f" style={styles.buttonIcon} />
                <Text style={styles.buttonText}>Counselor Session</Text>
              </>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    width: "100%",
    height: responsiveHeight(65),
    display: "flex",
    flexDirection: "column",
  },
  icon: {
    width: responsiveWidth(6),
    height: responsiveHeight(3),
    fontSize: responsiveFontSize(6),
    fontWeight: 'bold',
    color: 'white'
  },
  greetingContainer: {
    width: "90%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginLeft: responsiveFontSize(4.5),
    marginBottom: responsiveFontSize(4.5),
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  topIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: responsiveWidth(2.5),
    width: "95%",
    marginTop: responsiveHeight(2.5),
    marginBottom: responsiveHeight(3),
    alignSelf: 'center'
  },
  dailyTipContainer: {
    paddingHorizontal: responsiveWidth(5),
    width: '95%',
    height: '60%',
    borderRadius: 10,
    backgroundColor: 'rgba(128, 128, 128, 0.5)',
  },
  title: {
    fontSize: responsiveFontSize(5),
    fontWeight: "bold",
    color: "#fff",
  },
  dailyTip: {
    fontSize: responsiveFontSize(4),
    color: "#fff",
    marginTop: responsiveHeight(2),
  },
  greeting: {
    fontSize: responsiveFontSize(5),
    color: "#fff",
  },
  welcome: {
    fontSize: responsiveFontSize(6.5),
    fontWeight: 'bold',
    marginBottom: responsiveFontSize(6.5),
    color: "#fff",
  },
  mainContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    padding: responsiveWidth(5),
  },
  subContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#fbfaf3",
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(5),
    marginBottom: responsiveHeight(1.25),
    borderRadius: 12,
    flex: 1,
    marginHorizontal: responsiveWidth(1.25),
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 10,
    flexDirection: "row", // Added flexDirection to align icon and text horizontally
  },
  buttonText: {
    fontSize: responsiveFontSize(4),
    marginLeft: responsiveWidth(2), // Adjusted margin for spacing between icon and text
    color: '#333',
    display: 'flex',
    alignItems: 'center'
  },
  buttonIcon: {
    marginRight: responsiveWidth(2), // Added margin to separate icon from text
  },
});

export default Homepage;
