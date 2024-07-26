import * as React from "react";
import { Text, StyleSheet, View, ScrollView, Switch, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBar from "../components/StatusBar";
import * as Speech from 'expo-speech';
import Slider from '@react-native-community/slider';
import ModalSelector from 'react-native-modal-selector';
import { useDarkMode } from '../components/DarkModeContext';

const AccessibilityScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { isDarkModeEnabled, toggleDarkMode } = useDarkMode();
  const [isVoiceOverEnabled, setIsVoiceOverEnabled] = React.useState(false);
  const [selectedVoice, setSelectedVoice] = React.useState<string | null>(null);
  const [rate, setRate] = React.useState<number>(1.0);
  const [voices, setVoices] = React.useState<Speech.Voice[]>([]);
  const [screenWidth, setScreenWidth] = React.useState(Dimensions.get("window").width);
  const [screenHeight, setScreenHeight] = React.useState(Dimensions.get("window").height);

  const toggleVoiceOverSwitch = () => setIsVoiceOverEnabled(previousState => !previousState);

  React.useEffect(() => {
    Speech.getAvailableVoicesAsync().then(setVoices);

    const handleResize = ({ window }: any) => {
      setScreenWidth(window.width);
      setScreenHeight(window.height);
    };

    const dimensionListener = Dimensions.addEventListener("change", handleResize);

    return () => {
      dimensionListener?.remove();
    };
  }, []);

  const vw = screenWidth / 100;
  const vh = screenHeight / 100;

  const dynamicStyles = getDynamicStyles(vw, vh, isDarkModeEnabled);

  return (
    <SafeAreaView style={dynamicStyles.container}>
      <StatusBar screenName="Accessibility" />
    
      <ScrollView contentContainerStyle={dynamicStyles.scrollContainer}>
        <View style={dynamicStyles.accessibilityItem}>
          <Text style={dynamicStyles.label}>Enable Voice Over</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#1F75FE" }}
            thumbColor={isVoiceOverEnabled ? "#fff" : "#f4f3f4"}
            onValueChange={toggleVoiceOverSwitch}
            value={isVoiceOverEnabled}
          />
        </View>
        <View style={dynamicStyles.accessibilityItem}>
          <Text style={dynamicStyles.label}>Enable Dark Mode</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#1F75FE" }}
            thumbColor={isDarkModeEnabled ? "#fff" : "#f4f3f4"}
            onValueChange={toggleDarkMode}
            value={isDarkModeEnabled}
          />
        </View>
        <View style={dynamicStyles.accessibilityItem}>
          <Text style={dynamicStyles.label}>Select Voice</Text>
          <ModalSelector
            data={voices.map((voice, index) => ({ key: index, label: voice.name, value: voice.identifier }))}
            initValue="Select a voice"
            onChange={(option) => setSelectedVoice(option.value)}
            style={dynamicStyles.picker}
          >
            <Text style={dynamicStyles.pickerText}>{selectedVoice || 'Select a voice'}</Text>
          </ModalSelector>
        </View>
        <View style={dynamicStyles.accessibilityItem}>
          <Text style={dynamicStyles.label}>Rate</Text>
          <Slider
            style={dynamicStyles.slider}
            minimumValue={0.5}
            maximumValue={2.0}
            value={rate}
            onValueChange={(value) => setRate(value)}
          />
          <Text>{rate.toFixed(1)}</Text>
        </View>
        <View style={dynamicStyles.accessibilityItem}>
          <Text style={dynamicStyles.label}>Large Text</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#1F75FE" }}
            thumbColor={false ? "#fff" : "#f4f3f4"}
            onValueChange={() => {}}
            value={false}
          />
        </View>
        <View style={dynamicStyles.accessibilityItem}>
          <Text style={dynamicStyles.label}>Reduce Motion</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#1F75FE" }}
            thumbColor={false ? "#fff" : "#f4f3f4"}
            onValueChange={() => {}}
            value={false}
          />
        </View>
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
      backgroundColor: isDarkModeEnabled ? "#121212" : "#f0f4f8",
    },
    scrollContainer: {
      padding: responsiveWidth(vw, 5),
    },
    accessibilityItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: responsiveHeight(vh, 2),
      borderBottomWidth: 1,
      borderBottomColor: isDarkModeEnabled ? "rgba(255, 255, 255, 0.3)" : "rgba(204, 204, 204, 0.3)",
    },
    label: {
      fontSize: responsiveFontSize(vw, 4.5),
      color: isDarkModeEnabled ? "#fff" : "#000",
    },
    picker: {
      height: responsiveHeight(vh, 5),
      width: responsiveWidth(vw, 50),
    },
    pickerText: {
      fontSize: responsiveFontSize(vw, 4),
      color: isDarkModeEnabled ? "#fff" : '#000',
    },
    slider: {
      width: responsiveWidth(vw, 50),
    },
  });
};

export default AccessibilityScreen;
