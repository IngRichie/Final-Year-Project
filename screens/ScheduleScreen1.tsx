import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
  TextInput,
  Switch,
  Image,
  ScrollView,
  ToastAndroid,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import Modal from "react-native-modal";

const { width, height } = Dimensions.get("window");

const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;
const responsiveFontSize = (percent: number) => (width * percent) / 100;

const ScheduleScreen1 = ({ navigation }) => {
  const [doses, setDoses] = useState([]);
  const [medicationName, setMedicationName] = useState("Omega 3");
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [currentDoseIndex, setCurrentDoseIndex] = useState(null);
  const [currentDay, setCurrentDay] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [newDose, setNewDose] = useState({ dosage: "" });

  useEffect(() => {
    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const today = new Date();
    setCurrentDay(dayNames[today.getDay()]);
  }, []);

  const handleToggleReminders = (index) => {
    const newDoses = [...doses];
    newDoses[index].remindersEnabled = !newDoses[index].remindersEnabled;
    setDoses(newDoses);
  };

  const handleTimeChange = (index, event, selectedTime) => {
    if (selectedTime) {
      const newDoses = [...doses];
      newDoses[index].time = selectedTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setDoses(newDoses);
    }
    setShowTimePicker(false);
  };

  const addDose = () => {
    setModalVisible(true);
  };

  const handleAddDose = () => {
    setDoses([...doses, { ...newDose, time: "", remindersEnabled: false }]);
    setNewDose({ dosage: "" });
    setModalVisible(false);
  };

  const removeDose = (index) => {
    const newDoses = doses.filter((_, i) => i !== index);
    setDoses(newDoses);
  };

  const isFormValid = newDose.dosage !== "";
  const isDoneButtonEnabled = doses.every((dose) => dose.time !== "");

  const showToast = (message) => {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </Pressable>
          <Text style={styles.headerTitle}>Schedule</Text>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={24} color="black" />
          </Pressable>
        </View>
        <View style={styles.content}>
          <Text style={styles.dayText}>{currentDay}</Text>
          <Text style={styles.title}>Add your medication doses and set reminders to stay on track with your schedule.</Text>
          <View style={styles.medicationInfo}>
            <Image source={require("../assets/medicine.png")} style={styles.medicationImage} />
            <View>
              <Text style={styles.medicationName}>{medicationName}</Text>
              <Text style={styles.medicationDetails}>1 tablet after meals</Text>
              <Text style={styles.medicationDays}>7 days left</Text>
            </View>
          </View>
          {doses.map((dose, index) => (
            <View key={index} style={styles.doseContainer}>
              <View style={styles.doseHeader}>
                <Text style={styles.doseLabel}>Dose {index + 1}</Text>
                <Pressable onPress={() => removeDose(index)}>
                  <Ionicons name="trash-outline" size={24} color="#ff6347" />
                </Pressable>
              </View>
              <View style={styles.doseContent}>
                <Text style={styles.doseDetails}>{dose.dosage}</Text>
                <Pressable
                  onPress={() => {
                    setShowTimePicker(true);
                    setCurrentDoseIndex(index);
                  }}
                  style={styles.timeInputContainer}
                >
                  <Text style={styles.timeInput}>{dose.time || "00:00"}</Text>
                </Pressable>
              </View>
            </View>
          ))}
          <Pressable style={styles.addDoseButton} onPress={addDose}>
            <Ionicons name="add-circle-outline" size={24} color="#fff" />
            <Text style={styles.addDoseText}>Add Dose</Text>
          </Pressable>
          <View style={styles.remindersContainer}>
            <Text style={styles.remindersLabel}>Reminders</Text>
            <Switch
              value={doses.length > 0 && doses.some((d) => d.remindersEnabled)}
              onValueChange={() => handleToggleReminders(0)}
              disabled={doses.length === 0}
            />
          </View>
          <Pressable
            style={isDoneButtonEnabled ? styles.doneButton : styles.disabledButton}
            onPress={() => {
              if (isDoneButtonEnabled) {
                navigation.navigate("MedicationList");
              } else {
                showToast("Please set the dose time.");
              }
            }}
          >
            <Text style={styles.doneButtonText}>Done</Text>
          </Pressable>
          {showTimePicker && (
            <DateTimePicker
              value={new Date()}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={(event, selectedTime) => handleTimeChange(currentDoseIndex, event, selectedTime)}
            />
          )}
        </View>
        <Modal
          isVisible={modalVisible}
          onBackdropPress={() => setModalVisible(false)}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          useNativeDriver
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Dose</Text>
            <TextInput
              style={styles.textInput}
              placeholder="e.g. 10 mL, 2 drops"
              value={newDose.dosage}
              onChangeText={(text) => setNewDose({ ...newDose, dosage: text })}
            />
            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.modalButton, styles.modalButtonCancel]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.modalButton, isFormValid ? styles.modalButtonOk : styles.modalButtonDisabled]}
                onPress={handleAddDose}
                disabled={!isFormValid}
              >
                <Text style={styles.modalButtonText}>OK</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: responsiveWidth(5),
  },
  headerTitle: {
    fontSize: responsiveFontSize(5),
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    padding: responsiveWidth(5),
  },
  dayText: {
    fontSize: responsiveFontSize(8),
    fontWeight: "bold",
    color: "#333",
    marginBottom: responsiveHeight(2),
  },
  title: {
    fontSize: responsiveFontSize(4),
    marginBottom: responsiveHeight(4),
  },
  medicationInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: responsiveHeight(4),
    height: responsiveHeight(15),
    borderRadius: responsiveHeight(2),
    padding: responsiveHeight(1),
    backgroundColor: '#1F75FE',
  },
  medicationImage: {
    width: responsiveWidth(26),
    height: responsiveWidth(28),
    marginRight: responsiveWidth(8),
    borderTopLeftRadius: responsiveHeight(2),
    borderBottomLeftRadius:responsiveHeight(2),
  },
  medicationName: {
    fontSize: responsiveFontSize(7),
    fontWeight: "bold",
    color: '#21201f',
    marginBottom: responsiveHeight(1),
  },
  medicationDetails: {
    fontSize: responsiveFontSize(4),
    color: "white",
  },
  medicationDays: {
    fontSize: responsiveFontSize(3),
    color: "white",
  },
  doseContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: responsiveHeight(2),
    padding: responsiveHeight(1),
    backgroundColor: '#f9f9f9',
    borderRadius: responsiveHeight(2),
    width: '100%',
  },
  doseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  doseLabel: {
    fontSize: responsiveFontSize(4),
    fontWeight: "bold",
  },
  doseContent: {
    marginTop: responsiveHeight(1),
  },
  doseDetails: {
    fontSize: responsiveFontSize(3),
    color: "#888",
  },
  timeInputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    alignSelf: 'flex-start',
    marginTop: responsiveHeight(1),
  },
  timeInput: {
    fontSize: responsiveFontSize(4),
    textAlign: "center",
    paddingVertical: responsiveHeight(1),
    paddingHorizontal: responsiveWidth(4),
  },
  remindersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: responsiveHeight(4),
  },
  remindersLabel: {
    fontSize: responsiveFontSize(4),
  },
  addDoseButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1F75FE",
    paddingVertical: responsiveHeight(2),
    borderRadius: responsiveFontSize(2),
    justifyContent: "center",
    marginBottom: responsiveHeight(4),
  },
  addDoseText: {
    fontSize: responsiveFontSize(4),
    color: "#fff",
    marginLeft: responsiveWidth(2),
  },
  doneButton: {
    backgroundColor: "#1F75FE",
    paddingVertical: responsiveHeight(2),
    borderRadius: responsiveFontSize(2),
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#ccc",
    paddingVertical: responsiveHeight(2),
    borderRadius: responsiveFontSize(2),
    alignItems: "center",
  },
  doneButtonText: {
    color: "#fff",
    fontSize: responsiveFontSize(4),
  },
  modalContent: {
    backgroundColor: "white",
    padding: responsiveWidth(5),
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: responsiveFontSize(5),
    fontWeight: "bold",
    marginBottom: responsiveHeight(2),
  },
  textInput: {
    width: responsiveWidth(80),
    height: responsiveHeight(6),
    borderColor: "#f5f5f5",
    borderWidth: 1,
    borderRadius: responsiveFontSize(2),
    paddingHorizontal: responsiveWidth(4),
    marginBottom: responsiveHeight(3),
    fontSize: responsiveFontSize(4),
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    width: "48%",
    padding: responsiveHeight(2),
    borderRadius: responsiveFontSize(2),
    alignItems: "center",
  },
  modalButtonCancel: {
    backgroundColor: "#1F75FE",
  },
  modalButtonOk: {
    backgroundColor: "#1F75FE",
  },
  modalButtonDisabled: {
    backgroundColor: "#ccc",
  },
  modalButtonText: {
    color: "#fff",
    fontSize: responsiveFontSize(4),
  },
});

export default ScheduleScreen1;
