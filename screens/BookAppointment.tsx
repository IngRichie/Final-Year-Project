import * as React from "react";
import { ScrollView, StyleSheet, Text, View, SafeAreaView, TextInput, Button, Dimensions, Pressable } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import { useState } from "react";
import MaterialIcons from "@expo/vector-icons/build/MaterialIcons";

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
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
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

  const showMode = (currentMode: 'date' | 'time') => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatePicker = () => {
    showMode('date');
  };

  const showTimePicker = () => {
    showMode('time');
  };

  const handleBookPress = () => {
    // Logic to book the appointment goes here
    // For now, just navigate back to the CounselorDetails screen
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={handleBackPress}>
            <MaterialIcons name="arrow-back" size={responsiveFontSize(6)} color="#000" />
          </Pressable>
          <Text style={styles.headerText}>Book Appointment</Text>
        </View>
        <Text style={styles.label}>Counselor:</Text>
        <Text style={styles.text}>{counselor.fullName}</Text>
        <Text style={styles.label}>Select Date:</Text>
        <Pressable style={styles.button} onPress={showDatePicker}>
          <Text style={styles.buttonText}>Choose Date</Text>
        </Pressable>
        <Text style={styles.text}>{date.toDateString()}</Text>
        <Text style={styles.label}>Select Time:</Text>
        <Pressable style={styles.button} onPress={showTimePicker}>
          <Text style={styles.buttonText}>Choose Time</Text>
        </Pressable>
        <Text style={styles.text}>{date.toTimeString()}</Text>
        <Text style={styles.label}>Mode of Counseling:</Text>
        <View style={styles.modeContainer}>
          <Pressable
            style={[styles.modeButton, counselingMode === "video" && styles.selectedModeButton]}
            onPress={() => setCounselingMode("video")}
          >
            <Text style={styles.modeButtonText}>Video</Text>
          </Pressable>
          <Pressable
            style={[styles.modeButton, counselingMode === "audio" && styles.selectedModeButton]}
            onPress={() => setCounselingMode("audio")}
          >
            <Text style={styles.modeButtonText}>Audio</Text>
          </Pressable>
          <Pressable
            style={[styles.modeButton, counselingMode === "face-to-face" && styles.selectedModeButton]}
            onPress={() => setCounselingMode("face-to-face")}
          >
            <Text style={styles.modeButtonText}>Face to Face</Text>
          </Pressable>
        </View>
        <Text style={styles.label}>Details:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter appointment details"
          value={appointmentDetails}
          onChangeText={setAppointmentDetails}
          multiline
        />
        <Pressable style={styles.bookButton} onPress={handleBookPress}>
          <Text style={styles.bookButtonText}>Book Appointment</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    color: "#007bff",
  },
  headerText: {
    fontSize: responsiveFontSize(5),
    fontWeight: "bold",
    textAlign: "center",
  },
  label: {
    fontSize: responsiveFontSize(4),
    marginBottom: responsiveHeight(1),
  },
  text: {
    fontSize: responsiveFontSize(3.5),
    marginBottom: responsiveHeight(2),
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
    backgroundColor: "#f0f0f0",
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
