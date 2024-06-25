import * as React from "react";
import { Text, StyleSheet, ImageBackground, View, Pressable, Dimensions, TextInput, ScrollView } from "react-native";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBar from "../components/StatusBar"; // Adjust path as per your project structure

const { width, height } = Dimensions.get("window");

const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;
const responsiveFontSize = (percent: number) => (width * percent) / 100;

const Profile = () => {
  const [editable, setEditable] = React.useState({
    firstName: false,
    lastName: false,
    otherNames: false,
    email: false,
  });

  const [firstName, setFirstName] = React.useState("John");
  const [lastName, setLastName] = React.useState("Doe");
  const [otherNames, setOtherNames] = React.useState("Jane");
  const [email, setEmail] = React.useState("john.doe@example.com");

  const toggleEditMode = (key: string) => {
    setEditable((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const saveChanges = () => {
    // Logic to save changes to backend or perform validation
    // For demonstration purposes, we're not implementing saving logic here
    setEditable({
      firstName: false,
      lastName: false,
      otherNames: false,
      email: false,
    });
  };

  const handleProfilePictureChange = () => {
    // Logic to handle changing profile picture
    console.log("Change profile picture functionality to be implemented");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar screenName="Profile" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ImageBackground
          style={styles.profilePhotoIcon}
          resizeMode="cover"
          source={require("../assets/profilephoto.png")}
        >
          <Pressable
            onPress={handleProfilePictureChange}
            style={styles.cameraIconContainer}
          >
            <MaterialCommunityIcons
              name="camera"
              size={24}
              color="#fff"
              style={styles.cameraIcon}
            />
          </Pressable>
          <Text style={styles.firstName}>{firstName}</Text>
        </ImageBackground>
        <View style={styles.profileDetails}>
          <View style={styles.personalDetails}>
            <DetailRow
              label="First Name:"
              value={firstName}
              editable={editable.firstName}
              onToggleEdit={() => toggleEditMode("firstName")}
              onChangeText={setFirstName}
              onSave={saveChanges}
            />
            <DetailRow
              label="Last Name:"
              value={lastName}
              editable={editable.lastName}
              onToggleEdit={() => toggleEditMode("lastName")}
              onChangeText={setLastName}
              onSave={saveChanges}
            />
            <DetailRow
              label="Other Name(s):"
              value={otherNames}
              editable={editable.otherNames}
              onToggleEdit={() => toggleEditMode("otherNames")}
              onChangeText={setOtherNames}
              onSave={saveChanges}
            />
            <DetailRow
              label="Email:"
              value={email}
              editable={editable.email}
              onToggleEdit={() => toggleEditMode("email")}
              onChangeText={setEmail}
              onSave={saveChanges}
              keyboardType="email-address"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const DetailRow = ({
  label,
  value,
  editable,
  onToggleEdit,
  onChangeText,
  onSave,
  keyboardType,
}: {
  label: string;
  value: string;
  editable: boolean;
  onToggleEdit: () => void;
  onChangeText: (text: string) => void;
  onSave: () => void;
  keyboardType?: "default" | "email-address" | "numeric";
}) => {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.label}>{label}</Text>
      {editable ? (
        <TextInput
          style={styles.inputField}
          value={value}
          onChangeText={onChangeText}
          onBlur={onSave}
          autoFocus={true}
          keyboardType={keyboardType || "default"}
        />
      ) : (
        <View style={styles.editableContainer}>
          <Text style={styles.value}>{value}</Text>
          <Pressable onPress={onToggleEdit}>
            <FontAwesome
              name="pencil"
              size={24}
              color="#1F75FE"
              style={styles.editIcon}
            />
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  profilePhotoIcon: {
    height: responsiveHeight(50),
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: responsiveWidth(10),
    paddingVertical: responsiveHeight(7),
  },
  firstName: {
    fontSize: responsiveFontSize(8),
    color: "#fff",
    textAlign: "left",
    fontFamily: "Inter-SemiBold",
    fontWeight: "600",
    lineHeight: responsiveHeight(8),
  },
  profileDetails: {
    flex: 1,
    marginTop: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(5),
  },
  personalDetails: {
    backgroundColor: "#f0f0f0",
    padding: responsiveWidth(5),
    borderRadius: 20,
    marginTop: responsiveHeight(2),
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: responsiveHeight(1),
  },
  label: {
    fontSize: responsiveFontSize(4),
    color: "#004d9b",
    fontWeight: "bold",
    flex: 1,
  },
  value: {
    fontSize: responsiveFontSize(4),
    color: "#3a3a3a",
    flex: 3,
  },
  editIcon: {
    marginLeft: responsiveWidth(2),
  },
  inputField: {
    fontSize: responsiveFontSize(4),
    color: "#3a3a3a",
    flex: 3,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: responsiveHeight(0.5),
  },
  editableContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  cameraIconContainer: {
    position: "absolute",
    top: responsiveHeight(5),
    right: responsiveWidth(5),
    backgroundColor: "#1F75FE",
    borderRadius: 50,
    padding: responsiveWidth(3),
  },
  cameraIcon: {
    textAlign: "center",
  },
});

export default Profile;
