import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  Dimensions,
  KeyboardAvoidingView,
  Modal,
  Alert,
  Platform,
  TextInput as RNTextInput,
  TouchableOpacity as RNTouchableOpacity,
} from "react-native";
import styled from "styled-components/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/MaterialIcons";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { db, auth } from "../firebaseConfig";
import { collection, addDoc, serverTimestamp, doc, getDoc } from "firebase/firestore";
import { useDarkMode } from "../components/DarkModeContext";

const TouchableOpacity = Platform.OS === 'web' ? require('react-native-web').TouchableOpacity : RNTouchableOpacity;

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
  const [screenWidth, setScreenWidth] = useState(Dimensions.get("window").width);
  const [screenHeight, setScreenHeight] = useState(Dimensions.get("window").height);
  const { isDarkModeEnabled, toggleDarkMode } = useDarkMode();

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

  useEffect(() => {
    const handleResize = ({ window }) => {
      setScreenWidth(window.width);
      setScreenHeight(window.height);
    };

    const dimensionListener = Dimensions.addEventListener("change", handleResize);

    return () => {
      dimensionListener?.remove();
    };
  }, []);

  useEffect(() => {
    const fetchUserSettings = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData && userData.isDarkModeEnabled) {
            toggleDarkMode();
          }
        }
      }
    };

    fetchUserSettings();
  }, [toggleDarkMode]);

  const vw = screenWidth / 100;
  const vh = screenHeight / 100;

  const dynamicStyles = getDynamicStyles(vw, vh, isDarkModeEnabled);

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    if (selectedTime) {
      setTime(selectedTime);
    }
    if (Platform.OS !== 'web') {
      setShowTimePicker(false);
    }
  };

  const handleConfirmTime = () => {
    setTimes([...times, time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })]);
    setShowTimePicker(false);
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
      await addDoc(collection(db, "medReminder"), {
        medicationName,
        selectedForm,
        selectedUnit,
        frequency: customFrequency.trim() !== "" ? customFrequency : frequency,
        times,
        timestamp: serverTimestamp(),
      });
      Alert.alert(
        "Success",
        "Medication details saved successfully",
        [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
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
    <SafeAreaView style={dynamicStyles.container}>
      <ScrollView contentContainerStyle={dynamicStyles.scrollContainer}>
        <KeyboardAvoidingView behavior={"padding"} style={{ flex: 1 }}>
          <Header vw={vw} vh={vh}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={responsiveFontSize(vw, 6)} color={isDarkModeEnabled ? "#fff" : "#000"} />
            </TouchableOpacity>
            <HeaderText vw={vw} isDarkModeEnabled={isDarkModeEnabled}>Add Medicine</HeaderText>
          </Header>
          <Image source={require("../assets/medicine.png")} style={dynamicStyles.icon} />

          <FormContainer vw={vw} vh={vh} isDarkModeEnabled={isDarkModeEnabled}>
            <SectionTitle vw={vw} vh={vh} isDarkModeEnabled={isDarkModeEnabled}>Medication Name</SectionTitle>
            <StyledInput
              vw={vw}
              placeholder="Enter the medication name"
              value={medicationName}
              onChangeText={setMedicationName}
              placeholderTextColor={isDarkModeEnabled ? "#ccc" : "#888"}
              isDarkModeEnabled={isDarkModeEnabled}
            />

            <SectionTitle vw={vw} vh={vh} isDarkModeEnabled={isDarkModeEnabled}>Form</SectionTitle>
            <Row vw={vw} vh={vh}>
              <DropdownButton vw={vw} vh={vh} onPress={() => setShowFormModal(true)} isDarkModeEnabled={isDarkModeEnabled}>
                <DropdownButtonText vw={vw} isDarkModeEnabled={isDarkModeEnabled}>{selectedForm}</DropdownButtonText>
                <Icon name="arrow-drop-down" size={responsiveFontSize(vw, 6)} color="#318CE7" />
              </DropdownButton>
            </Row>

            <SectionTitle vw={vw} vh={vh} isDarkModeEnabled={isDarkModeEnabled}>Unit</SectionTitle>
            <Row vw={vw} vh={vh}>
              <DropdownButton vw={vw} vh={vh} onPress={() => setShowUnitModal(true)} isDarkModeEnabled={isDarkModeEnabled}>
                <DropdownButtonText vw={vw} isDarkModeEnabled={isDarkModeEnabled}>{selectedUnit}</DropdownButtonText>
                <Icon name="arrow-drop-down" size={responsiveFontSize(vw, 6)} color="#318CE7" />
              </DropdownButton>
            </Row>

            <SectionTitle vw={vw} vh={vh} isDarkModeEnabled={isDarkModeEnabled}>Frequency</SectionTitle>
            <Row vw={vw} vh={vh}>
              <DropdownButton vw={vw} vh={vh} onPress={() => setShowFrequencyModal(true)} isDarkModeEnabled={isDarkModeEnabled}>
                <DropdownButtonText vw={vw} isDarkModeEnabled={isDarkModeEnabled}>
                  {customFrequency.trim() !== "" ? customFrequency : frequency}
                </DropdownButtonText>
                <Icon name="arrow-drop-down" size={responsiveFontSize(vw, 6)} color="#318CE7" />
              </DropdownButton>
            </Row>

            <SectionTitle vw={vw} vh={vh} isDarkModeEnabled={isDarkModeEnabled}>Time</SectionTitle>
            <Row vw={vw} vh={vh}>
              <DropdownButton vw={vw} vh={vh} onPress={() => setShowTimePicker(true)} isDarkModeEnabled={isDarkModeEnabled}>
                <DropdownButtonText vw={vw} isDarkModeEnabled={isDarkModeEnabled}>
                  {time.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </DropdownButtonText>
                <Icon name="arrow-drop-down" size={responsiveFontSize(vw, 6)} color="#318CE7" />
              </DropdownButton>
            </Row>

            <AddButton vw={vw} vh={vh} disabled={medicationName.trim() === ""} onPress={handleAddMedicine}>
              <AddButtonText vw={vw} disabled={medicationName.trim() === ""}>
                Add Medicine
              </AddButtonText>
            </AddButton>
          </FormContainer>

          {showTimePicker && Platform.OS !== 'web' && (
            <DateTimePicker
              testID="dateTimePicker"
              value={time}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={handleTimeChange}
            />
          )}

          {showTimePicker && Platform.OS === 'web' && (
            <Modal
              animationType="fade"
              transparent={true}
              visible={showTimePicker}
              onRequestClose={() => setShowTimePicker(false)}
            >
              <CenteredModalContainer>
                <ModalContent vw={vw} isDarkModeEnabled={isDarkModeEnabled}>
                  <ModalTitle vw={vw} vh={vh} isDarkModeEnabled={isDarkModeEnabled}>Select Time</ModalTitle>
                  <input
                    type="time"
                    value={time.toLocaleTimeString('en-US', { hour12: false }).substring(0, 5)}
                    onChange={(e) => handleTimeChange({ type: 'set' }, new Date(`1970-01-01T${e.target.value}:00`))}
                    style={{
                      width: '100%', padding: 10, borderRadius: 10, borderWidth: 1,
                      borderColor: isDarkModeEnabled ? "#666" : "#ccc", outline: 'none',
                      backgroundColor: isDarkModeEnabled ? "#383838" : "#fff", color: isDarkModeEnabled ? "#fff" : "#000"
                    }}
                  />
                  <ButtonRow vw={vw} vh={vh}>
                    <CloseButton vw={vw} vh={vh} onPress={() => setShowTimePicker(false)}>
                      <CloseButtonText vw={vw}>Cancel</CloseButtonText>
                    </CloseButton>
                    <ConfirmButton vw={vw} vh={vh} isDarkModeEnabled={isDarkModeEnabled} onPress={handleConfirmTime}>
                      <ConfirmButtonText vw={vw} isDarkModeEnabled={isDarkModeEnabled}>OK</ConfirmButtonText>
                    </ConfirmButton>
                  </ButtonRow>
                </ModalContent>
              </CenteredModalContainer>
            </Modal>
          )}

          <Modal
            animationType="fade"
            transparent={true}
            visible={showFormModal}
            onRequestClose={() => setShowFormModal(false)}
          >
            <ModalContainer>
              <ModalContent vw={vw} isDarkModeEnabled={isDarkModeEnabled}>
                <ModalTitle vw={vw} vh={vh} isDarkModeEnabled={isDarkModeEnabled}>Select Medication Form</ModalTitle>
                <OptionsContainer vw={vw} vh={vh}>
                  {forms.map((form) => (
                    <OptionItem
                      key={form}
                      vw={vw}
                      vh={vh}
                      onPress={() => {
                        setSelectedForm(form);
                        setShowFormModal(false);
                      }}
                      isDarkModeEnabled={isDarkModeEnabled}
                    >
                      <OptionText vw={vw} isDarkModeEnabled={isDarkModeEnabled}>{form}</OptionText>
                    </OptionItem>
                  ))}
                </OptionsContainer>
                <CloseButton vw={vw} vh={vh} onPress={() => setShowFormModal(false)}>
                  <CloseButtonText vw={vw}>Close</CloseButtonText>
                </CloseButton>
              </ModalContent>
            </ModalContainer>
          </Modal>

          <Modal
            animationType="fade"
            transparent={true}
            visible={showUnitModal}
            onRequestClose={() => setShowUnitModal(false)}
          >
            <ModalContainer>
              <ModalContent vw={vw} isDarkModeEnabled={isDarkModeEnabled}>
                <ModalTitle vw={vw} vh={vh} isDarkModeEnabled={isDarkModeEnabled}>Select Unit</ModalTitle>
                <OptionsContainer vw={vw} vh={vh}>
                  {units.map((unit) => (
                    <OptionItem
                      key={unit}
                      vw={vw}
                      vh={vh}
                      onPress={() => {
                        setSelectedUnit(unit);
                        setShowUnitModal(false);
                      }}
                      isDarkModeEnabled={isDarkModeEnabled}
                    >
                      <OptionText vw={vw} isDarkModeEnabled={isDarkModeEnabled}>{unit}</OptionText>
                    </OptionItem>
                  ))}
                </OptionsContainer>
                <CloseButton vw={vw} vh={vh} onPress={() => setShowUnitModal(false)}>
                  <CloseButtonText vw={vw}>Close</CloseButtonText>
                </CloseButton>
              </ModalContent>
            </ModalContainer>
          </Modal>

          <Modal
            animationType="fade"
            transparent={true}
            visible={showFrequencyModal}
            onRequestClose={() => setShowFrequencyModal(false)}
          >
            <ModalContainer>
              <ModalContent vw={vw} isDarkModeEnabled={isDarkModeEnabled}>
                <ModalTitle vw={vw} vh={vh} isDarkModeEnabled={isDarkModeEnabled}>Select Frequency</ModalTitle>
                <OptionsContainer vw={vw} vh={vh}>
                  {frequencies.map((freq) => (
                    <OptionItem
                      key={freq}
                      vw={vw}
                      vh={vh}
                      onPress={() => selectFrequency(freq)}
                      isDarkModeEnabled={isDarkModeEnabled}
                    >
                      <OptionText vw={vw} isDarkModeEnabled={isDarkModeEnabled}>{freq}</OptionText>
                    </OptionItem>
                  ))}
                  {frequency === "Other" && (
                    <StyledInput
                      vw={vw}
                      placeholder="Enter custom frequency"
                      value={customFrequency}
                      onChangeText={setCustomFrequency}
                      placeholderTextColor={isDarkModeEnabled ? "#ccc" : "#888"}
                      isDarkModeEnabled={isDarkModeEnabled}
                    />
                  )}
                </OptionsContainer>
                <CloseButton vw={vw} vh={vh} onPress={() => setShowFrequencyModal(false)}>
                  <CloseButtonText vw={vw}>Close</CloseButtonText>
                </CloseButton>
              </ModalContent>
            </ModalContainer>
          </Modal>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

const responsiveWidth = (vw: number, percent: number) => vw * percent;
const responsiveHeight = (vh: number, percent: number) => vh * percent;
const responsiveFontSize = (vw: number, percent: number) => vw * percent;

const getDynamicStyles = (vw: number, vh: number, isDarkModeEnabled: boolean) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkModeEnabled ? "#1E1E1E" : "#fff",
    },
    scrollContainer: {
      flexGrow: 1,
      paddingBottom: responsiveHeight(vh, 10),
      paddingHorizontal: responsiveWidth(vw, 5),
    },
    icon: {
      width: responsiveWidth(vw, 30),
      height: responsiveWidth(vw, 30),
      alignSelf: "center",
      marginBottom: responsiveHeight(vh, 2),
    },
    input: {
      borderWidth: 1,
      borderColor: isDarkModeEnabled ? "#666" : "#ccc",
      padding: 10,
      borderRadius: 10,
      width: "100%",
      marginBottom: 20,
      fontSize: responsiveFontSize(vw, 4),
      backgroundColor: isDarkModeEnabled ? "#383838" : "#fff",
      color: isDarkModeEnabled ? "#fff" : "#000",
      ...Platform.select({
        web: {
          outline: "none",
          boxShadow: "none",
        },
      }),
    },
  });
};

const Header = styled.View<{ vw: number; vh: number }>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${({ vh, vw }) => responsiveHeight(vh, 2)}px ${({ vw }) => responsiveWidth(vw, 5)}px;
`;

const HeaderText = styled.Text<{ vw: number; isDarkModeEnabled: boolean }>`
  color: ${({ isDarkModeEnabled }) => (isDarkModeEnabled ? "#fff" : "#318CE7")};
  font-size: ${({ vw }) => responsiveFontSize(vw, 5)}px;
  font-weight: bold;
`;

const FormContainer = styled.View<{ vw: number; vh: number; isDarkModeEnabled: boolean }>`
  width: 98%;
  align-self: center;
  background-color: ${({ isDarkModeEnabled }) => (isDarkModeEnabled ? "#1E1E1E" : "#fff")};
  padding: ${({ vh }) => responsiveHeight(vh, 3)}px;
  border-radius: 20px;
  margin: ${({ vh, vw }) => responsiveHeight(vh, 3)}px ${({ vw }) => responsiveWidth(vw, 5)}px;
`;

const SectionTitle = styled.Text<{ vw: number; vh: number; isDarkModeEnabled: boolean }>`
  font-size: ${({ vw }) => responsiveFontSize(vw, 4.5)}px;
  font-weight: bold;
  margin-bottom: ${({ vh }) => responsiveHeight(vh, 1.5)}px;
  color: ${({ isDarkModeEnabled }) => (isDarkModeEnabled ? "#fff" : "#000")};
`;

const Row = styled.View<{ vw: number; vh: number }>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ vh }) => responsiveHeight(vh, 2)}px;
`;

const DropdownButton = styled.TouchableOpacity<{ vw: number; vh: number; isDarkModeEnabled: boolean }>`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${({ vh }) => responsiveHeight(vh, 1.5)}px;
  background-color: ${({ isDarkModeEnabled }) => (isDarkModeEnabled ? "#333" : "#f0f0f5")};
  border-radius: 10px;
  margin: 0 ${({ vw }) => responsiveWidth(vw, 1)}px;
`;

const DropdownButtonText = styled.Text<{ vw: number; isDarkModeEnabled: boolean }>`
  font-size: ${({ vw }) => responsiveFontSize(vw, 4)}px;
  color: ${({ isDarkModeEnabled }) => (isDarkModeEnabled ? "#fff" : "#318CE7")};
`;

const AddButton = styled.TouchableOpacity<{ disabled: boolean; vw: number; vh: number }>`
  background-color: ${({ disabled }) => (disabled ? "#ccc" : "#318CE7")};
  padding: ${({ vh }) => responsiveHeight(vh, 2)}px;
  border-radius: 10px;
  align-items: center;
  width: 100%;
`;

const AddButtonText = styled.Text<{ disabled: boolean; vw: number }>`
  color: ${({ disabled }) => (disabled ? "#888" : "#fff")};
  font-size: ${({ vw }) => responsiveFontSize(vw, 4)}px;
`;

const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const CenteredModalContainer = styled(ModalContainer)`
  justify-content: center;
`;

const ModalContent = styled.View<{ vw: number; isDarkModeEnabled: boolean }>`
  width: 80%;
  background-color: ${({ isDarkModeEnabled }) => (isDarkModeEnabled ? "#383838" : "#fff")};
  border-radius: 10px;
  padding: 20px;
  align-items: center;
`;

const ModalTitle = styled.Text<{ vw: number; vh: number; isDarkModeEnabled: boolean }>`
  font-size: ${({ vw }) => responsiveFontSize(vw, 5)}px;
  font-weight: bold;
  margin-bottom: ${({ vh }) => responsiveHeight(vh, 2)}px;
  color: ${({ isDarkModeEnabled }) => (isDarkModeEnabled ? "#fff" : "#000")};
`;

const CloseButton = styled.TouchableOpacity<{ vw: number; vh: number }>`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #318CE7;
  border-radius: 10px;
`;

const CloseButtonText = styled.Text<{ vw: number }>`
  color: #fff;
  font-size: ${({ vw }) => responsiveFontSize(vw, 4)}px;
`;

const ConfirmButton = styled.TouchableOpacity<{ vw: number; vh: number; isDarkModeEnabled: boolean }>`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: ${({ isDarkModeEnabled }) => (isDarkModeEnabled ? "#333" : "#318CE7")};
  border-radius: 10px;
`;

const ConfirmButtonText = styled.Text<{ vw: number; isDarkModeEnabled: boolean }>`
  color: ${({ isDarkModeEnabled }) => (isDarkModeEnabled ? "#fff" : "#000")};
  font-size: ${({ vw }) => responsiveFontSize(vw, 4)}px;
`;

const ButtonRow = styled.View<{ vw: number; vh: number }>`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: ${({ vh }) => responsiveHeight(vh, 2)}px;
`;

const OptionsContainer = styled.ScrollView<{ vw: number; vh: number }>`
  width: 90%;
  max-height: ${({ vh }) => responsiveHeight(vh, 20)}px;
  margin-bottom: ${({ vh }) => responsiveHeight(vh, 2)}px;
`;

const OptionItem = styled.TouchableOpacity<{ vw: number; vh: number; isDarkModeEnabled: boolean }>`
  padding: ${({ vh }) => responsiveHeight(vh, 1.5)}px;
  background-color: ${({ isDarkModeEnabled }) => (isDarkModeEnabled ? "#333" : "#f2f2f2")};
  margin-bottom: ${({ vh }) => responsiveHeight(vh, 1)}px;
  border-radius: 10px;
  width: 100%;
  align-self: center;
`;

const OptionText = styled.Text<{ vw: number; isDarkModeEnabled: boolean }>`
  font-size: ${({ vw }) => responsiveFontSize(vw, 4)}px;
  color: ${({ isDarkModeEnabled }) => (isDarkModeEnabled ? "#fff" : "#000")};
`;

const StyledInput = styled(RNTextInput)<{ vw: number; isDarkModeEnabled: boolean }>`
  border-width: 1px;
  border-color: ${({ isDarkModeEnabled }) => (isDarkModeEnabled ? "#666" : "#ccc")};
  padding: 10px;
  border-radius: 10px;
  width: 100%;
  margin-bottom: 20px;
  font-size: ${({ vw }) => responsiveFontSize(vw, 4)}px;
  outline: none;
  box-shadow: none;
  &:focus {
    outline: none;
    box-shadow: none;
  }
  background-color: ${({ isDarkModeEnabled }) => (isDarkModeEnabled ? "#383838" : "#fff")};
  color: ${({ isDarkModeEnabled }) => (isDarkModeEnabled ? "#fff" : "#000")};
`;

export default CombinedScreen;
