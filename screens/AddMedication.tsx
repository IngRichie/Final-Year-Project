import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Alert,
} from "react-native";
import styled from "styled-components/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/MaterialIcons";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { db } from '../firebaseConfig'; // Ensure the correct path
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const { width, height } = Dimensions.get("window");

const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;
const responsiveFontSize = (percent: number) => (width * percent) / 100;

interface CombinedScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

const CombinedScreen: React.FC<CombinedScreenProps> = ({ navigation }) => {
  const [medicationName, setMedicationName] = useState("");
  const [selectedForm, setSelectedForm] = useState("Capsule");
  const [selectedUnit, setSelectedUnit] = useState("mg");
  const [frequency, setFrequency] = useState("Every Day");
  const [customFrequency, setCustomFrequency] = useState("");
  const [showFrequencyModal, setShowFrequencyModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showUnitModal, setShowUnitModal] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [time, setTime] = useState(new Date());
  const [times, setTimes] = useState<string[]>([]);

  const forms = [
    "Capsule",
    "Tablet",
    "Liquid",
    "Topical",
    "Cream",
    "Device",
    "Drops",
    "Foam",
    "Gel",
    "Inhaler",
    "Injection",
    "Lotion",
    "Ointment",
    "Patch",
    "Powder",
    "Spray",
    "Suppository",
  ];
  const units = ["mg", "mcg", "g", "ml", "%"];
  const frequencies = ["Every Day", "Every Week", "Every Month", "Other"];

  const handleTimeChange = (event: { type: string }, selectedTime?: Date) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(Platform.OS === "ios");
    setTime(currentTime);

    if (event.type === "set") {
      setTimes([...times, currentTime.toLocaleTimeString()]);
    }
  };

  const selectFrequency = (selectedFrequency: string) => {
    if (selectedFrequency === "Other") {
      setFrequency(selectedFrequency);
      setShowFrequencyModal(true);
    } else {
      setFrequency(selectedFrequency);
      setCustomFrequency("");
      setShowFrequencyModal(false);
    }
  };

  const handleAddMedicine = async () => {
    try {
      console.log("Attempting to add document to Firestore...");
      console.log("Medication Name:", medicationName);
      console.log("Selected Form:", selectedForm);
      console.log("Selected Unit:", selectedUnit);
      console.log("Frequency:", customFrequency.trim() !== "" ? customFrequency : frequency);
      console.log("Times:", times);

      await addDoc(collection(db, "medReminder"), {
        medicationName,
        selectedForm,
        selectedUnit,
        frequency: customFrequency.trim() !== "" ? customFrequency : frequency,
        times,
        timestamp: serverTimestamp(),
      });
      console.log("Document successfully added!");
      Alert.alert(
        "Success",
        "Medication details saved successfully",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate("MedSchedule"), // Navigate to MedSchedule screen
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error("Error adding document:", error);
      Alert.alert("Error", "Failed to save medication details");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >
          <Header>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={24} color="#318CE7" />
            </TouchableOpacity>
            <HeaderText>Add Medicine</HeaderText>
          </Header>
          <Image
            source={require("../assets/medicine.png")}
            style={styles.icon}
          />

          <FormContainer>
            <SectionTitle>Pill Name</SectionTitle>
            <StyledInput
              placeholder="Enter the pill name"
              value={medicationName}
              onChangeText={setMedicationName}
              placeholderTextColor="#888"
            />

            <SectionTitle>Dose</SectionTitle>
            <Row>
              <DropdownButton onPress={() => setShowUnitModal(true)}>
                <DropdownButtonText>{selectedUnit}</DropdownButtonText>
                <Icon name="arrow-drop-down" size={24} color="#318CE7" />
              </DropdownButton>
              <DropdownButton onPress={() => setShowFormModal(true)}>
                <DropdownButtonText>{selectedForm}</DropdownButtonText>
                <Icon name="arrow-drop-down" size={24} color="#318CE7" />
              </DropdownButton>
            </Row>

            <SectionTitle>Time</SectionTitle>
            <Row>
              <DropdownButton onPress={() => setShowTimePicker(true)}>
                <DropdownButtonText>
                  {time.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </DropdownButtonText>
                <Icon name="arrow-drop-down" size={24} color="#318CE7" />
              </DropdownButton>
            </Row>

            <SectionTitle>How to Use</SectionTitle>
            <Row>
              <DropdownButton onPress={() => setShowFrequencyModal(true)}>
                <DropdownButtonText>
                  {customFrequency.trim() !== "" ? customFrequency : frequency}
                </DropdownButtonText>
                <Icon name="arrow-drop-down" size={24} color="#318CE7" />
              </DropdownButton>
            </Row>

            <AddButton
              onPress={handleAddMedicine}
              disabled={medicationName.trim() === ""}
            >
              <AddButtonText disabled={medicationName.trim() === ""}>
                Add Medicine
              </AddButtonText>
            </AddButton>
          </FormContainer>

          {showTimePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={time}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={handleTimeChange}
            />
          )}

          {/* Medication Type Modal */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={showFormModal}
            onRequestClose={() => setShowFormModal(false)}
          >
            <ModalContainer>
              <ModalContent>
                <ModalTitle>Select Medication Type</ModalTitle>
                <OptionsContainer>
                  {forms.map((form) => (
                    <OptionItem
                      key={form}
                      onPress={() => {
                        setSelectedForm(form);
                        setShowFormModal(false);
                      }}
                    >
                      <OptionText>{form}</OptionText>
                    </OptionItem>
                  ))}
                </OptionsContainer>
                <CloseButton onPress={() => setShowFormModal(false)}>
                  <CloseButtonText>Close</CloseButtonText>
                </CloseButton>
              </ModalContent>
            </ModalContainer>
          </Modal>

          {/* Unit Modal */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={showUnitModal}
            onRequestClose={() => setShowUnitModal(false)}
          >
            <ModalContainer>
              <ModalContent>
                <ModalTitle>Select Unit</ModalTitle>
                <OptionsContainer>
                  {units.map((unit) => (
                    <OptionItem
                      key={unit}
                      onPress={() => {
                        setSelectedUnit(unit);
                        setShowUnitModal(false);
                      }}
                    >
                      <OptionText>{unit}</OptionText>
                    </OptionItem>
                  ))}
                </OptionsContainer>
                <CloseButton onPress={() => setShowUnitModal(false)}>
                  <CloseButtonText>Close</CloseButtonText>
                </CloseButton>
              </ModalContent>
            </ModalContainer>
          </Modal>

          {/* Frequency Modal */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={showFrequencyModal}
            onRequestClose={() => setShowFrequencyModal(false)}
          >
            <ModalContainer>
              <ModalContent>
                <ModalTitle>Select Frequency</ModalTitle>
                <OptionsContainer>
                  {frequencies.map((freq) => (
                    <OptionItem
                      key={freq}
                      onPress={() => selectFrequency(freq)}
                    >
                      <OptionText>{freq}</OptionText>
                    </OptionItem>
                  ))}
                  {frequency === "Other" && (
                    <StyledInput
                      placeholder="Enter custom frequency"
                      value={customFrequency}
                      onChangeText={setCustomFrequency}
                      placeholderTextColor="#888"
                    />
                  )}
                </OptionsContainer>
                <CloseButton onPress={() => setShowFrequencyModal(false)}>
                  <CloseButtonText>Close</CloseButtonText>
                </CloseButton>
              </ModalContent>
            </ModalContainer>
          </Modal>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f5",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: responsiveHeight(10),
    paddingHorizontal: responsiveWidth(5),
  },
  icon: {
    width: responsiveWidth(30),
    height: responsiveWidth(30),
    alignSelf: "center",
    marginBottom: responsiveHeight(2),
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 10,
    width: "100%",
    marginBottom: 20,
    fontSize: responsiveFontSize(4),
  },
});

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${responsiveHeight(2)}px ${responsiveWidth(5)}px;
`;

const HeaderText = styled.Text`
  color: #318CE7;
  font-size: ${responsiveFontSize(5)}px;
  font-weight: bold;
`;

const FormContainer = styled.View`
  width: 98%;
  alignSelf: center;
  background-color: #fff;
  padding: ${responsiveHeight(3)}px;
  border-radius: 20px;
  margin: ${responsiveHeight(3)}px ${responsiveWidth(5)}px;
`;

const SectionTitle = styled.Text`
  font-size: ${responsiveFontSize(4.5)}px;
  font-weight: bold;
  margin-bottom: ${responsiveHeight(1.5)}px;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${responsiveHeight(2)}px;
`;

const DropdownButton = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${responsiveHeight(1.5)}px;
  background-color: #f0f0f5;
  border-radius: 10px;
  margin: 0 ${responsiveWidth(1)}px;
`;

const DropdownButtonText = styled.Text`
  font-size: ${responsiveFontSize(4)}px;
  color: #318CE7;
`;

const AddButton = styled.TouchableOpacity<{ disabled: boolean }>`
  background-color: ${({ disabled }) => (disabled ? "#ccc" : "#318CE7")};
  padding: ${responsiveHeight(2)}px;
  border-radius: 10px;
  align-items: center;
  width: 100%;
`;

const AddButtonText = styled.Text<{ disabled: boolean }>`
  color: ${({ disabled }) => (disabled ? "#888" : "#fff")};
  font-size: ${responsiveFontSize(4)}px;
`;

const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.View`
  width: 80%;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  align-items: center;
`;

const ModalTitle = styled.Text`
  font-size: ${responsiveFontSize(5)}px;
  font-weight: bold;
  margin-bottom: ${responsiveHeight(2)}px;
`;

const CloseButton = styled.TouchableOpacity`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #318CE7;
  border-radius: 10px;
`;

const CloseButtonText = styled.Text`
  color: #fff;
  font-size: ${responsiveFontSize(4)}px;
`;

const OptionsContainer = styled.ScrollView`
  width: 90%;
  max-height: ${responsiveHeight(20)}px;
  margin-bottom: ${responsiveHeight(2)}px;
`;

const OptionItem = styled.TouchableOpacity`
  padding: ${responsiveHeight(1.5)}px;
  background-color: #f2f2f2;
  margin-bottom: ${responsiveHeight(1)}px;
  border-radius: 10px;
  width: 100%;
  align-self: center;
`;

const OptionText = styled.Text`
  font-size: ${responsiveFontSize(4)}px;
  color: #000;
`;

const StyledInput = styled.TextInput`
  border-width: 1px;
  border-color: #ccc;
  padding: 10px;
  border-radius: 10px;
  width: 100%;
  margin-bottom: 20px;
  font-size: ${responsiveFontSize(4)};
`;

export default CombinedScreen;
