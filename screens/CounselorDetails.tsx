import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Dimensions,
  Pressable,
} from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useNavigation, NavigationProp, ParamListBase } from "@react-navigation/native";
import { useDarkMode } from '../components/DarkModeContext'; // Import the dark mode context

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
  const { isDarkModeEnabled } = useDarkMode(); // Consume the dark mode context

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleBookAppointmentPress = () => {
    navigation.navigate("BookAppointment", { counselor });
  };

  const dynamicStyles = getDynamicStyles(isDarkModeEnabled);

  return (
    <SafeAreaView style={dynamicStyles.container}>
      <ScrollView contentContainerStyle={dynamicStyles.scrollContainer}>
        <View style={dynamicStyles.header}>
          <Pressable style={dynamicStyles.backButton} onPress={handleBackPress}>
            <MaterialIcons name="arrow-back" size={responsiveFontSize(6)} color={isDarkModeEnabled ? "#fff" : "#000"} />
          </Pressable>
          <Pressable style={dynamicStyles.menuButton}>
            <MaterialIcons name="more-vert" size={responsiveFontSize(6)} color={isDarkModeEnabled ? "#fff" : "#000"} />
          </Pressable>
        </View>
        <Image style={dynamicStyles.counselorImage} source={require("../assets/counselor.png")} />
        <View style={dynamicStyles.counselorInfoContainer}>
          <Text style={dynamicStyles.counselorName}>{counselor.fullName}</Text>
          <Text style={dynamicStyles.counselorSpecialization}>{counselor.specialization}</Text>
          <View style={dynamicStyles.ratingContainer}>
            <FontAwesome name="star" size={responsiveFontSize(4)} color="#FFD700" />
            <Text style={dynamicStyles.ratingText}>{counselor.rating}</Text>
          </View>
          <Text style={dynamicStyles.counselorPosition}>{counselor.position}</Text>
          <Text style={dynamicStyles.counselorExperience}>Experience: {counselor.experience} years</Text>
        </View>
        <View style={dynamicStyles.buttonGroup}>
          <Pressable style={dynamicStyles.videoCallButton} onPress={() => { /* Handle Video Call */ }}>
            <MaterialIcons name="videocam" size={responsiveFontSize(5)} color="#fff" />
            <Text style={dynamicStyles.buttonText}>Video Call</Text>
          </Pressable>
          <Pressable style={dynamicStyles.chatButton} onPress={() => { /* Handle Online Chat */ }}>
            <MaterialIcons name="chat" size={responsiveFontSize(5)} color="#fff" />
            <Text style={dynamicStyles.buttonText}>Online Chat</Text>
          </Pressable>
        </View>
        <View style={dynamicStyles.aboutContainer}>
          <Text style={dynamicStyles.aboutTitle}>About Therapists</Text>
          <Text style={dynamicStyles.aboutDescription}>{counselor.description}</Text>
        </View>
        <Pressable style={dynamicStyles.bookNowButton} onPress={handleBookAppointmentPress}>
          <Text style={dynamicStyles.bookNowText}>Book Now</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

const getDynamicStyles = (isDarkModeEnabled: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDarkModeEnabled ? "#121212" : "#fff",
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
  menuButton: {
    padding: responsiveWidth(2),
  },
  counselorImage: {
    width: responsiveWidth(30),
    height: responsiveWidth(30),
    borderRadius: responsiveWidth(15),
    marginBottom: responsiveHeight(2),
    resizeMode: "cover",
  },
  counselorInfoContainer: {
    alignItems: "center",
    marginBottom: responsiveHeight(2),
  },
  counselorName: {
    fontSize: responsiveFontSize(5),
    fontWeight: "bold",
    color: isDarkModeEnabled ? "#fff" : "#000",
  },
  counselorSpecialization: {
    fontSize: responsiveFontSize(3.5),
    color: "#007bff",
    marginBottom: responsiveHeight(1),
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: responsiveHeight(1),
  },
  ratingText: {
    fontSize: responsiveFontSize(4),
    marginLeft: responsiveWidth(1),
    color: isDarkModeEnabled ? "#fff" : "#000",
  },
  counselorPosition: {
    fontSize: responsiveFontSize(4),
    color: isDarkModeEnabled ? "#ccc" : "#666",
    marginBottom: responsiveHeight(1),
  },
  counselorExperience: {
    fontSize: responsiveFontSize(3.5),
    color: isDarkModeEnabled ? "#ccc" : "#666",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: responsiveHeight(3),
  },
  videoCallButton: {
    backgroundColor: "#007bff",
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(6),
    borderRadius: responsiveWidth(3),
    flexDirection: "row",
    alignItems: "center",
  },
  chatButton: {
    backgroundColor: "#6c757d",
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(6),
    borderRadius: responsiveWidth(3),
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: responsiveFontSize(3.5),
    marginLeft: responsiveWidth(2),
  },
  aboutContainer: {
    width: "100%",
    backgroundColor: "#f8f9fa",
    padding: responsiveWidth(5),
    borderRadius: responsiveWidth(2),
    marginBottom: responsiveHeight(3),
  },
  aboutTitle: {
    fontSize: responsiveFontSize(4.5),
    fontWeight: "bold",
    marginBottom: responsiveHeight(1),
    color: isDarkModeEnabled ? "#fff" : "#000",
  },
  aboutDescription: {
    fontSize: responsiveFontSize(3.5),
    color: isDarkModeEnabled ? "#ccc" : "#333",
  },
  bookNowButton: {
    width: "80%",
    backgroundColor: "#007bff",
    paddingVertical: responsiveHeight(2),
    borderRadius: responsiveWidth(3),
    alignItems: "center",
    marginBottom: responsiveHeight(3),
  },
  bookNowText: {
    color: "#fff",
    fontSize: responsiveFontSize(4),
    fontWeight: "bold",
  },
});

export default CounselorDetails;
