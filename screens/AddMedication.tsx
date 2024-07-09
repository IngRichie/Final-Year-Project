import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, Dimensions, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { CameraView, Camera } from "expo-camera";
const { width, height } = Dimensions.get('window');

const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;
const responsiveFontSize = (percent: number) => (width * percent) / 100;

const AddMedicationScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [scanInitiated, setScanInitiated] = useState(false);
  const [medicationName, setMedicationName] = useState('');
  const [dosage, setDosage] = useState('');
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    setScanInitiated(false);
    const details = data.split('|');
    const name = details[0];
    const dosage = details[1];
    const imageUrl = details[2];
    setMedicationName(name);
    setDosage(dosage);
    setImage(imageUrl);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const isFormValid = medicationName !== '';

  const handleNextPress = () => {
    if (isFormValid) {
      navigation.navigate('ScheduleScreen1');
    }
  };

  const startScanning = () => {
    setScanned(false);
    setScanInitiated(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={24} color="black" />
        </Pressable>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Add medication</Text>
        <Text style={styles.instructionText}>
          Type the name of the medicine or scan the QR code to get the name and dosage.
        </Text>
        {!scanInitiated ? (
          <Pressable style={styles.scanButton} onPress={startScanning}>
            <Text style={styles.scanButtonText}>Scan QR Code</Text>
          </Pressable>
        ) : (
          <View style={styles.cameraContainer}>
            <CameraView
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ["qr", "pdf417"],
            }}
              style={StyleSheet.absoluteFillObject}
            />
          </View>
        )}
        {image && <Image source={{ uri: image }} style={styles.medicationImage} />}
        <TextInput
          style={styles.textInput}
          placeholder="Name of medicine"
          value={medicationName}
          onChangeText={setMedicationName}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Dosage (e.g. 1 tablet)"
          value={dosage}
          onChangeText={setDosage}
        />
        <Pressable
          style={[styles.nextButton, !isFormValid && styles.disabledButton]}
          onPress={handleNextPress}
          disabled={!isFormValid}
        >
          <Text style={styles.nextButtonText}>{isFormValid ? 'Next' : 'Fill in the fields'}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: responsiveWidth(5),
  },
  content: {
    flex: 1,
    alignItems: 'center',
    padding: responsiveWidth(5),
  },
  title: {
    fontSize: responsiveFontSize(7),
    fontWeight: 'bold',
    marginBottom: responsiveHeight(4),
  },
  instructionText: {
    fontSize: responsiveFontSize(4),
    color: '#333',
    marginBottom: responsiveHeight(2),
    textAlign: 'center',
  },
  cameraContainer: {
    width: responsiveWidth(70),
    height: responsiveHeight(20),
    marginBottom: responsiveHeight(4),
    overflow: 'hidden',
    borderRadius: responsiveWidth(3),
  },
  medicationImage: {
    width: responsiveWidth(70),
    height: responsiveHeight(20),
    borderRadius: responsiveWidth(3),
    marginBottom: responsiveHeight(4),
  },
  textInput: {
    width: responsiveWidth(80),
    height: responsiveHeight(6),
    borderColor: '#f5f5f5',
    borderWidth: 1,
    borderRadius: responsiveFontSize(2),
    paddingHorizontal: responsiveWidth(4),
    marginBottom: responsiveHeight(2),
    fontSize: responsiveFontSize(4),
  },
  nextButton: {
    backgroundColor: '#1F75FE',
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(10),
    borderRadius: responsiveFontSize(2),
    width: responsiveWidth(80),
    textAlign: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: responsiveFontSize(4),
    textAlign: 'center',
  },
  scanButton: {
    backgroundColor: '#1F75FE',
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(10),
    borderRadius: responsiveFontSize(2),
    marginBottom: responsiveHeight(4),
  },
  scanButtonText: {
    color: '#fff',
    fontSize: responsiveFontSize(4),
    textAlign: 'center',
  },
});

export default AddMedicationScreen;
