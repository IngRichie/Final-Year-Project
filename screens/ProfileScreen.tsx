import * as React from "react";
import { Text, StyleSheet, View, Pressable, Dimensions, ScrollView, Alert, Image, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from 'expo-image-picker';
import StatusBar from "../components/StatusBar"; // Adjust path as per your project structure

const { width, height } = Dimensions.get("window");

const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;
const responsiveFontSize = (percent: number) => (width * percent) / 100;

const Profile = () => {
  const [editable, setEditable] = React.useState(false);
  const [firstName, setFirstName] = React.useState("Victoria Heard");
  const [email, setEmail] = React.useState("heard_j@gmail.com");
  const [phone, setPhone] = React.useState("9898712132");
  const [website, setWebsite] = React.useState("www.randomweb.com");
  const [location, setLocation] = React.useState("Antigua");
  const [profileImage, setProfileImage] = React.useState(require("../assets/profilephoto.png"));

  const handleProfilePictureChange = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Please grant permission to access the photo library.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage({ uri: result.assets[0].uri });
    }
  };

  const openCameraAndLibrary = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Please grant permission to access the camera.');
      return;
    }

    Alert.alert(
      "Upload Photo",
      "Choose an option",
      [
        { text: "Camera", onPress: handleCamera },
        { text: "Photo Library", onPress: handleProfilePictureChange },
        { text: "Cancel", style: "cancel" }
      ]
    );
  };

  const handleCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage({ uri: result.uri });
    }
  };

  const handleEditPress = () => {
    setEditable(true);
  };

  const handleSavePress = () => {
    setEditable(false);
    // Add logic to save the updated information
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar screenName="Profile" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Pressable
            onPress={handleEditPress}
            style={styles.editIconContainer}
          >
            <FontAwesome
              name="pencil"
              size={24}
              color="#fff"
              style={styles.editIcon}
            />
          </Pressable>
          <View style={styles.profileHeader}>
            <Image source={profileImage} style={styles.profileImage} />
            <View style={styles.profileInfo}>
              {editable ? (
                <TextInput
                  style={styles.profileNameInput}
                  value={firstName}
                  onChangeText={setFirstName}
                  editable={editable}
                />
              ) : (
                <Text style={styles.profileName}>{firstName}</Text>
              )}
            </View>
            <Pressable
              onPress={openCameraAndLibrary}
              style={styles.cameraIconContainer}
            >
              <MaterialCommunityIcons
                name="camera"
                size={24}
                color="#fff"
                style={styles.cameraIcon}
              />
            </Pressable>
          </View>
          <View style={styles.profileDetails}>
            <View style={styles.personalDetails}>
              <DetailRow
                label="Email"
                value={email}
                editable={editable}
                onChangeText={setEmail}
                iconName="envelope-o"
              />
              <DetailRow
                label="Phone"
                value={phone}
                editable={editable}
                onChangeText={setPhone}
                iconName="phone"
              />
              <DetailRow
                label="Website"
                value={website}
                editable={editable}
                onChangeText={setWebsite}
                iconName="globe"
              />
              <DetailRow
                label="Location"
                value={location}
                editable={editable}
                onChangeText={setLocation}
                iconName="map-marker"
              />
            </View>
          </View>
          <View style={styles.utilities}>
            <DetailRow
              label="Downloads"
              iconName="download"
              onPress={() => {}}
            />
            <DetailRow
              label="Usage Analytics"
              iconName="bar-chart"
              onPress={() => {}}
            />
            <DetailRow
              label="Ask Help-Desk"
              iconName="question-circle"
              onPress={() => {}}
            />
            <DetailRow
              label="Log Out"
              iconName="sign-out"
              onPress={() => {}}
            />
          </View>
        </ScrollView>
        {editable && (
          <Pressable
            onPress={handleSavePress}
            style={styles.saveButton}
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </Pressable>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const DetailRow = ({
  label,
  value,
  onPress,
  iconName,
  editable,
  onChangeText
}: {
  label: string;
  value?: string;
  onPress?: () => void;
  iconName: string;
  editable?: boolean;
  onChangeText?: (text: string) => void;
}) => {
  return (
    <Pressable style={styles.detailRow} onPress={onPress}>
      <FontAwesome name={iconName} size={24} color="#1F75FE" style={styles.detailIcon} />
      <View style={styles.detailTextContainer}>
        <Text style={styles.label}>{label}</Text>
        {editable ? (
          <TextInput
            style={styles.valueInput}
            value={value}
            onChangeText={onChangeText}
            editable={editable}
          />
        ) : (
          <Text style={styles.value}>{value}</Text>
        )}
      </View>
      {onPress && <FontAwesome name="chevron-right" size={24} color="#1F75FE" />}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f8",
  },
  scrollContainer: {
    flexGrow: 1,
    padding: responsiveWidth(5),
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F75FE',
    padding: responsiveWidth(5),
    borderRadius: 10,
    marginBottom: responsiveHeight(2),
    position: 'relative',
  },
  profileImage: {
    width: responsiveWidth(20),
    height: responsiveWidth(20),
    borderRadius: responsiveWidth(10),
  },
  profileInfo: {
    marginLeft: responsiveWidth(5),
  },
  profileName: {
    fontSize: responsiveFontSize(6),
    color: "#fff",
    fontWeight: "bold",
  },
  profileNameInput: {
    fontSize: responsiveFontSize(6),
    color: "#fff",
    fontWeight: "bold",
  },
  cameraIconContainer: {
    position: "absolute",
    bottom: responsiveHeight(5),
    right: responsiveWidth(4),
    backgroundColor: "#1F75FE",
    borderRadius: 50,
    padding: responsiveWidth(1),
    borderWidth: 1,
    borderColor: 'white'
  },
  cameraIcon: {
    fontSize: responsiveFontSize(5),
  },
  editIconContainer: {
    zIndex: 1,
    position: "absolute",
    top: responsiveHeight(19.5),
    right: responsiveWidth(8),
    backgroundColor: "#1F75FE",
    borderRadius: 70,
    padding: responsiveWidth(1),
    width: responsiveFontSize(9),
    height: responsiveFontSize(9),
    alignItems: 'center',
    justifyContent: 'center'
  },
  saveButton: {
    position: "absolute",
    bottom: responsiveHeight(2),
    left: responsiveWidth(5),
    right: responsiveWidth(5),
    backgroundColor: "#1F75FE",
    borderRadius: 10,
    padding: responsiveHeight(2),
    alignItems: 'center',
  },
  saveButtonText: {
    color: "#fff",
    fontSize: responsiveFontSize(4),
    fontWeight: "bold",
  },
  editIcon: {
    fontSize: responsiveFontSize(5),
  },
  profileDetails: {
    backgroundColor: "#fff",
    padding: responsiveWidth(5),
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: responsiveHeight(2),
  },
  personalDetails: {
    marginBottom: responsiveHeight(2),
  },
  utilities: {
    backgroundColor: "#fff",
    padding: responsiveWidth(5),
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: responsiveHeight(2),
    borderBottomWidth: 1,
    borderBottomColor: "rgba(204, 204, 204, 0.3)",
    justifyContent: 'space-between',
  },
  detailIcon: {
    marginRight: responsiveWidth(2),
  },
  detailTextContainer: {
    flex: 1,
    marginLeft: responsiveWidth(2),
  },
  label: {
    fontSize: responsiveFontSize(4.5),
    color: "#000",
  },
  value: {
    fontSize: responsiveFontSize(3.5),
    color: "#666",
  },
  valueInput: {
    fontSize: responsiveFontSize(3.5),
    color: "#666",
  },
});

export default Profile;
