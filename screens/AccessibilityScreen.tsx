import * as React from "react";
import { Text, StyleSheet, View, ScrollView, Switch, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import StatusBar from "../components/StatusBar";
import * as Speech from 'expo-speech';
import Slider from '@react-native-community/slider';
import ModalSelector from 'react-native-modal-selector';

const { width, height } = Dimensions.get("window");

const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;
const responsiveFontSize = (percent: number) => (width * percent) / 100;

const AccessibilityScreen = ({ navigation }) => {
  const [isVoiceOverEnabled, setIsVoiceOverEnabled] = React.useState(false);
  const [isDarkModeEnabled, setIsDarkModeEnabled] = React.useState(false);
  const [selectedVoice, setSelectedVoice] = React.useState<string | null>(null);
  const [pitch, setPitch] = React.useState<number>(1.0);
  const [rate, setRate] = React.useState<number>(1.0);
  const [voices, setVoices] = React.useState<Speech.Voice[]>([]);

  const toggleVoiceOverSwitch = () => setIsVoiceOverEnabled(previousState => !previousState);
  const toggleDarkModeSwitch = () => setIsDarkModeEnabled(previousState => !previousState);

  React.useEffect(() => {
    Speech.getAvailableVoicesAsync().then(setVoices);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar screenName="Accessibility" />
    
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.accessibilityItem}>
          <Text style={styles.label}>Enable Voice Over</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#1F75FE" }}
            thumbColor={isVoiceOverEnabled ? "#fff" : "#f4f3f4"}
            onValueChange={toggleVoiceOverSwitch}
            value={isVoiceOverEnabled}
          />
        </View>
        <View style={styles.accessibilityItem}>
          <Text style={styles.label}>Enable Dark Mode</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#1F75FE" }}
            thumbColor={isDarkModeEnabled ? "#fff" : "#f4f3f4"}
            onValueChange={toggleDarkModeSwitch}
            value={isDarkModeEnabled}
          />
        </View>
        <View style={styles.accessibilityItem}>
          <Text style={styles.label}>Select Voice</Text>
          <ModalSelector
            data={voices.map((voice, index) => ({ key: index, label: voice.name, value: voice.identifier }))}
            initValue="Select a voice"
            onChange={(option) => setSelectedVoice(option.value)}
            style={styles.picker}
          >
            <Text style={styles.pickerText}>{selectedVoice || 'Select a voice'}</Text>
          </ModalSelector>
        </View>
        <View style={styles.accessibilityItem}>
          <Text style={styles.label}>Pitch</Text>
          <Slider
            style={styles.slider}
            minimumValue={0.5}
            maximumValue={2.0}
            value={pitch}
            onValueChange={(value) => setPitch(value)}
          />
          <Text>{pitch.toFixed(1)}</Text>
        </View>
        <View style={styles.accessibilityItem}>
          <Text style={styles.label}>Rate</Text>
          <Slider
            style={styles.slider}
            minimumValue={0.5}
            maximumValue={2.0}
            value={rate}
            onValueChange={(value) => setRate(value)}
          />
          <Text>{rate.toFixed(1)}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f8",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: responsiveWidth(5),
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  backButton: {
    marginRight: responsiveWidth(3),
  },
  headerTitle: {
    fontSize: responsiveFontSize(5),
    fontWeight: "bold",
    color: "#1F75FE",
  },
  scrollContainer: {
    padding: responsiveWidth(5),
  },
  accessibilityItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: responsiveHeight(2),
    borderBottomWidth: 1,
    borderBottomColor: "rgba(204, 204, 204, 0.3)",
  },
  label: {
    fontSize: responsiveFontSize(4.5),
    color: "#000",
  },
  picker: {
    height: responsiveHeight(5),
    width: responsiveWidth(50),
  },
  pickerText: {
    fontSize: responsiveFontSize(4),
    color: '#000',
  },
  slider: {
    width: responsiveWidth(50),
  },
});

export default AccessibilityScreen;
