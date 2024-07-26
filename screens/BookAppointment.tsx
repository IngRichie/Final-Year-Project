import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Pressable,
  Dimensions,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation, NavigationProp, ParamListBase } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/build/MaterialIcons";
import { useDarkMode } from '../components/DarkModeContext'; // Import the dark mode context

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
  const { isDarkModeEnabled } = useDarkMode(); // Consume the dark mode context
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState<"date" | "time">("date");
  const [show, setShow] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState("");
  const [counselingMode, setCounselingMode] = useState<"video" | "audio" | "face-to-face">("video");

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
        <Text style={dynamicStyles.label}>Counselor:</Text>
        <Text style={dynamicStyles.text}>{counselor.fullName}</Text>
        <Text style={dynamicStyles.label}>Select Date:</Text>
        <Pressable style={dynamicStyles.button} onPress={showDatePicker}>
          <Text style={dynamicStyles.buttonText}>Choose Date</Text>
        </Pressable>
        <Text style={dynamicStyles.text}>{date.toDateString()}</Text>
        <Text style={dynamicStyles.label}>Select Time:</Text>
        <Pressable style={dynamicStyles.button} onPress={showTimePicker}>
          <Text style={dynamicStyles.buttonText}>Choose Time</Text>
        </Pressable>
        <Text style={dynamicStyles.text}>{date.toTimeString()}</Text>
        <Text style={dynamicStyles.label}>Mode of Counseling:</Text>
        <View style={dynamicStyles.modeContainer}>
          <Pressable
            style={[dynamicStyles.modeButton, counselingMode === "video" && dynamicStyles.selectedModeButton]}
            onPress={() => setCounselingMode("video")}
          >
            <Text style={dynamicStyles.modeButtonText}>Video</Text>
          </Pressable>
          <Pressable
            style={[dynamicStyles.modeButton, counselingMode === "audio" && dynamicStyles.selectedModeButton]}
            onPress={() => setCounselingMode("audio")}
          >
            <Text style={dynamicStyles.modeButtonText}>Audio</Text>
          </Pressable>
          <Pressable
            style={[dynamicStyles.modeButton, counselingMode === "face-to-face" && dynamicStyles.selectedModeButton]}
            onPress={() => setCounselingMode("face-to-face")}
          >
            <Text style={dynamicStyles.modeButtonText}>Face to Face</Text>
          </Pressable>
        </View>
        <Text style={dynamicStyles.label}>Details:</Text>
        <TextInput
          style={dynamicStyles.input}
          placeholder="Enter appointment details"
          placeholderTextColor={isDarkModeEnabled ? "#aaa" : "#555"}
          value={appointmentDetails}
          onChangeText={setAppointmentDetails}
          multiline
        />
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
    backgroundColor: isDarkModeEnabled ? "#121212" : "#fff",
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
  backButtonText: {
    fontSize: responsiveFontSize(4),
    color: isDarkModeEnabled ? "#007bff" : "#007bff",
  },
  headerText: {
    fontSize: responsiveFontSize(5),
    fontWeight: "bold",
    textAlign: "center",
    color: isDarkModeEnabled ? "#fff" : "#000",
  },
  label: {
    fontSize: responsiveFontSize(4),
    marginBottom: responsiveHeight(1),
    color: isDarkModeEnabled ? "#fff" : "#000",
  },
  text: {
    fontSize: responsiveFontSize(3.5),
    marginBottom: responsiveHeight(2),
    color: isDarkModeEnabled ? "#aaa" : "#000",
  },
  button: {
    backgroundColor: "#007bff",
    padding: responsiveWidth(4),
    borderRadius: responsiveWidth(2),
    alignItems: "center",
    marginBottom: responsiveHeight(2),
  },
  buttonText: {
    color: "#fff",
    fontSize: responsiveFontSize(3.5),
  },
  input: {
    backgroundColor: isDarkModeEnabled ? "#333" : "#f0f0f0",
    color: isDarkModeEnabled ? "#fff" : "#000",
    padding: responsiveWidth(4),
    borderRadius: responsiveWidth(2),
    fontSize: responsiveFontSize(3.5),
    marginBottom: responsiveHeight(3),
  },
  modeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: responsiveHeight(2),
  },
  modeButton: {
    backgroundColor: "#f0f0f0",
    padding: responsiveWidth(4),
    borderRadius: responsiveWidth(2),
  },
  selectedModeButton: {
    backgroundColor: "#007bff",
  },
  modeButtonText: {
    color: "#000",
    fontSize: responsiveFontSize(3.5),
  },
  bookButton: {
    backgroundColor: "#28a745",
    padding: responsiveWidth(4),
    borderRadius: responsiveWidth(2),
    alignItems: "center",
  },
  bookButtonText: {
    color: "#fff",
    fontSize: responsiveFontSize(3.5),
  },
});

export default BookAppointmentScreen;
