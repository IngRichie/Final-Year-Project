import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Dimensions,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation, NavigationProp, ParamListBase } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/build/MaterialIcons";
import { useDarkMode } from '../components/DarkModeContext'; // Import the dark mode context
import { auth, db } from "../firebaseConfig"; // Ensure you have your Firebase config properly set up
import { doc, getDoc } from 'firebase/firestore';

const { width, height } = Dimensions.get("window");

const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;
const responsiveFontSize = (percent: number) => (width * percent) / 100;

interface Counselor {
  fullName: string;
  position: string;
}

interface BookAppointmentScreenProps {
  route: {
    params: {
      counselor: Counselor;
    };
  };
}

const BookAppointmentScreen: React.FC<BookAppointmentScreenProps> = ({ route }) => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const { counselor } = route.params;
  const { isDarkModeEnabled, toggleDarkMode } = useDarkMode(); // Consume the dark mode context
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState<"date" | "time">("date");
  const [show, setShow] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState("");
  const [counselingMode, setCounselingMode] = useState<"video" | "audio" | "face-to-face">("video");
  const [selectedTime, setSelectedTime] = useState<string>("");

  useEffect(() => {
    const fetchUserSettings = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData && userData.isDarkModeEnabled) {
            toggleDarkMode(); // Toggle dark mode if user setting is true
          }
        }
      }
    };

    fetchUserSettings();
  }, [toggleDarkMode]);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode: "date" | "time") => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatePicker = () => {
    showMode("date");
  };

  const showTimePicker = () => {
    showMode("time");
  };

  const handleTimeSelection = (time: string) => {
    setSelectedTime(time);
  };

  const handleBookPress = () => {
    // Logic to book the appointment goes here
    // For now, just navigate back to the CounselorDetails screen
    navigation.goBack();
  };

  const dynamicStyles = getDynamicStyles(isDarkModeEnabled);

  return (
    <SafeAreaView style={dynamicStyles.container}>
      <ScrollView contentContainerStyle={dynamicStyles.scrollContainer}>
        <View style={dynamicStyles.header}>
          <Pressable style={dynamicStyles.backButton} onPress={handleBackPress}>
            <MaterialIcons name="arrow-back" size={responsiveFontSize(6)} color={isDarkModeEnabled ? "#fff" : "#000"} />
          </Pressable>
          <Text style={dynamicStyles.headerText}>Book Appointment</Text>
        </View>
        <Text style={dynamicStyles.label}>Date:</Text>
        <Pressable style={dynamicStyles.dateButton} onPress={showDatePicker}>
          <Text style={dynamicStyles.dateButtonText}>{date.toDateString()}</Text>
        </Pressable>
        <Text style={dynamicStyles.sectionHeaderText}>Therapy</Text>
        <Text style={dynamicStyles.subHeaderText}>1-hour session</Text>
        <Text style={dynamicStyles.priceText}>$40</Text>
        <Text style={dynamicStyles.label}>Select a time to book an appointment:</Text>
        <Text style={dynamicStyles.sectionHeaderText}>Morning</Text>
        <View style={dynamicStyles.timeContainer}>
          <Pressable style={[dynamicStyles.timeButton, selectedTime === "9:00am" && dynamicStyles.selectedTimeButton]} onPress={() => handleTimeSelection("9:00am")}>
            <Text style={dynamicStyles.timeButtonText}>9:00am</Text>
          </Pressable>
          <Pressable style={[dynamicStyles.timeButton, selectedTime === "9:30am" && dynamicStyles.selectedTimeButton]} onPress={() => handleTimeSelection("9:30am")}>
            <Text style={dynamicStyles.timeButtonText}>9:30am</Text>
          </Pressable>
          <Pressable style={[dynamicStyles.timeButton, selectedTime === "10:00am" && dynamicStyles.selectedTimeButton]} onPress={() => handleTimeSelection("10:00am")}>
            <Text style={dynamicStyles.timeButtonText}>10:00am</Text>
          </Pressable>
        </View>
        <Text style={dynamicStyles.sectionHeaderText}>Afternoon</Text>
        <View style={dynamicStyles.timeContainer}>
          <Pressable style={[dynamicStyles.timeButton, selectedTime === "12:00pm" && dynamicStyles.selectedTimeButton]} onPress={() => handleTimeSelection("12:00pm")}>
            <Text style={dynamicStyles.timeButtonText}>12:00pm</Text>
          </Pressable>
          <Pressable style={[dynamicStyles.timeButton, selectedTime === "12:30pm" && dynamicStyles.selectedTimeButton]} onPress={() => handleTimeSelection("12:30pm")}>
            <Text style={dynamicStyles.timeButtonText}>12:30pm</Text>
          </Pressable>
          <Pressable style={[dynamicStyles.timeButton, selectedTime === "1:00pm" && dynamicStyles.selectedTimeButton]} onPress={() => handleTimeSelection("1:00pm")}>
            <Text style={dynamicStyles.timeButtonText}>1:00pm</Text>
          </Pressable>
        </View>
        <Pressable style={dynamicStyles.bookButton} onPress={handleBookPress}>
          <Text style={dynamicStyles.bookButtonText}>Book Appointment</Text>
        </Pressable>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const getDynamicStyles = (isDarkModeEnabled: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDarkModeEnabled ? "#1E1E1E" : "#fff", // Use a light dark color for dark mode
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(3),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: responsiveHeight(3),
  },
  backButton: {
    padding: responsiveWidth(2),
  },
  headerText: {
    fontSize: responsiveFontSize(5),
    fontWeight: "bold",
    textAlign: "center",
    color: isDarkModeEnabled ? "#fff" : "#000",
  },
  subHeaderText: {
    fontSize: responsiveFontSize(4),
    textAlign: "center",
    color: isDarkModeEnabled ? "#fff" : "#000",
    marginBottom: responsiveHeight(1),
  },
  priceText: {
    fontSize: responsiveFontSize(4),
    textAlign: "center",
    color: isDarkModeEnabled ? "#fff" : "#000",
    marginBottom: responsiveHeight(3),
  },
  label: {
    fontSize: responsiveFontSize(4),
    marginBottom: responsiveHeight(1),
    color: isDarkModeEnabled ? "#fff" : "#000",
  },
  sectionHeaderText: {
    fontSize: responsiveFontSize(4),
    marginBottom: responsiveHeight(1),
    color: isDarkModeEnabled ? "#fff" : "#000",
    marginTop: responsiveHeight(2),
  },
  text: {
    fontSize: responsiveFontSize(3.5),
    marginBottom: responsiveHeight(2),
    color: isDarkModeEnabled ? "#fff" : "#000",
  },
  timeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginBottom: responsiveHeight(2),
  },
  timeButton: {
    backgroundColor: isDarkModeEnabled ? "#383838" : "#f0f0f0",
    padding: responsiveWidth(3),
    borderRadius: responsiveWidth(2),
    marginBottom: responsiveHeight(1),
  },
  selectedTimeButton: {
    backgroundColor: "#007bff",
  },
  timeButtonText: {
    color: isDarkModeEnabled ? "#fff" : "#000",
    fontSize: responsiveFontSize(3.5),
  },
  dateButton: {
    backgroundColor: "#007bff",
    padding: responsiveWidth(4),
    borderRadius: responsiveWidth(2),
    alignItems: "center",
    marginBottom: responsiveHeight(2),
  },
  dateButtonText: {
    color: "#fff",
    fontSize: responsiveFontSize(3.5),
  },
  bookButton: {
    backgroundColor: "#28a745",
    padding: responsiveWidth(4),
    borderRadius: responsiveWidth(2),
    alignItems: "center",
    marginBottom: responsiveHeight(3),
  },
  bookButtonText: {
    color: "#fff",
    fontSize: responsiveFontSize(3.5),
  },
});

export default BookAppointmentScreen;
