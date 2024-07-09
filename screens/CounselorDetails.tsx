import * as React from "react";
import { ScrollView, StyleSheet, Text, View, Image, SafeAreaView, Dimensions, Pressable } from "react-native";
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';

const { width, height } = Dimensions.get("window");

const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;
const responsiveFontSize = (percent: number) => (width * percent) / 100;

interface Counselor {
  fullName: string;
  position: string;
  description: string;
  available: boolean;
  experience: number; 
  rating: number; 
  specialization: string;
}

interface CounselorDetailsProps {
  route: {
    params: {
      counselor: Counselor;
    };
  };
}

const CounselorDetails: React.FC<CounselorDetailsProps> = ({ route }) => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const { counselor } = route.params;

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleBookAppointmentPress = () => {
    navigation.navigate("BookAppointment", { counselor });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={handleBackPress}>
            <MaterialIcons name="arrow-back" size={responsiveFontSize(6)} color="#000" />
          </Pressable>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>{counselor.fullName}</Text>
            <Text style={styles.subHeaderText}>{counselor.position}</Text>
          </View>
          <Pressable style={styles.menuButton}>
            <MaterialIcons name="more-vert" size={responsiveFontSize(6)} color="#000" />
          </Pressable>
        </View>
        <Image
          style={styles.counselorImage}
          source={require("../assets/counselor.png")} 
        />
        <View style={styles.iconContainer}>
          <Pressable style={styles.iconButton} onPress={handleBookAppointmentPress}>
            <FontAwesome name="calendar" size={responsiveFontSize(6)} color="#fff" />
            <Text style={styles.iconButtonText}>Book Appointment</Text>
          </Pressable>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>Details</Text>
          <Text style={styles.detailsText}>Experience: {counselor.experience} years</Text>
          <Text style={styles.detailsText}>Rating: {counselor.rating} / 5</Text>
          <Text style={styles.detailsText}>Specialization: {counselor.specialization}</Text>
        </View>
        <View style={styles.aboutContainer}>
          <Text style={styles.aboutTitle}>About Doctor</Text>
          <Text style={styles.aboutDescription}>{counselor.description}</Text>
        </View>
        <View style={styles.availabilityContainer}>
          <Text style={styles.availabilityText}>AVAILABLE</Text>
          <View style={[styles.availabilityStatus, { backgroundColor: counselor.available ? "#0f0" : "#f00" }]} />
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
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(5),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: responsiveHeight(2),
  },
  backButton: {
    padding: responsiveWidth(2),
  },
  headerTextContainer: {
    alignItems: "center",
  },
  headerText: {
    fontSize: responsiveFontSize(5),
    fontWeight: "bold",
  },
  subHeaderText: {
    fontSize: responsiveFontSize(4),
    color: "#666",
  },
  menuButton: {
    padding: responsiveWidth(2),
  },
  counselorImage: {
    width: responsiveWidth(90),
    height: responsiveHeight(40),
    marginBottom: responsiveHeight(3),
    resizeMode: "cover",
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: responsiveHeight(3),
  },
  iconButton: {
    backgroundColor: "#007bff",
    padding: responsiveWidth(4),
    borderRadius: responsiveWidth(10),
    flexDirection: "row",
    alignItems: "center",
  },
  iconButtonText: {
    marginLeft: responsiveWidth(2),
    color: "#fff",
    fontSize: responsiveFontSize(4),
  },
  detailsContainer: {
    width: "100%",
    backgroundColor: "#f5f5f5",
    padding: responsiveWidth(5),
    borderRadius: responsiveWidth(2),
    marginBottom: responsiveHeight(3),
  },
  detailsTitle: {
    fontSize: responsiveFontSize(4.5),
    fontWeight: "bold",
    marginBottom: responsiveHeight(1),
  },
  detailsText: {
    fontSize: responsiveFontSize(3.5),
    color: "#333",
    marginBottom: responsiveHeight(0.5),
  },
  aboutContainer: {
    width: "100%",
    backgroundColor: "#007bff",
    padding: responsiveWidth(5),
    borderRadius: responsiveWidth(2),
    marginBottom: responsiveHeight(3),
  },
  aboutTitle: {
    fontSize: responsiveFontSize(4.5),
    fontWeight: "bold",
    color: "#fff",
    marginBottom: responsiveHeight(1),
  },
  aboutDescription: {
    fontSize: responsiveFontSize(3.5),
    color: "#fff",
  },
  availabilityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: responsiveHeight(3),
  },
  availabilityText: {
    fontSize: responsiveFontSize(4),
    fontWeight: "bold",
    marginRight: responsiveWidth(2),
  },
  availabilityStatus: {
    width: responsiveWidth(5),
    height: responsiveWidth(5),
    borderRadius: responsiveWidth(2.5),
  },
});

export default CounselorDetails;
