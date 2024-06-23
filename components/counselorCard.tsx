import * as React from "react";
import { Image, StyleSheet, Text, View, Pressable, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

interface Counselor {
  position: string;
  fullName: string;
  description: string;
  available: boolean;
}

interface CounselorCardProps {
  counselor: Counselor;
}

const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;
const responsiveFontSize = (percent: number) => (width * percent) / 100;

const CounselorCard: React.FC<CounselorCardProps> = ({ counselor }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("CounselorDetails", { counselor });
  };

  return (
    <Pressable style={styles.counselorCard} onPress={handlePress}>
      <Image
        style={styles.counselorImage}
        source={require("../assets/image.png")} // Replace with counselor.image if dynamic
      />
      <View style={styles.counselorInfo}>
        <Text style={styles.position}>{counselor.position}</Text>
        <Text style={styles.fullName}>{counselor.fullName}</Text>
        <Text style={styles.description}>{counselor.description}</Text>
        <Text style={styles.availability}>
          Available:{" "}
          <Text style={styles.availabilityStatus}>
            {counselor.available ? "Yes" : "No"}
          </Text>
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  counselorCard: {
    flexDirection: "row",
    padding: responsiveWidth(3), // Decreased padding
    marginVertical: responsiveHeight(1), // Decreased vertical margin
    height: responsiveHeight(17),
    backgroundColor: "#fbfaf3",
    borderRadius: responsiveWidth(2), // Decreased border radius
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: responsiveWidth(1), // Decreased shadow radius
    shadowOffset: { width: 0, height: responsiveHeight(0.5) }, // Decreased shadow offset
    elevation: 5,
  },
  counselorImage: {
    width: responsiveWidth(25), // Decreased image width
    height: responsiveWidth(28), // Decreased image height
    // borderRadius: responsiveWidth(10), // Decreased image border radius
  },
  counselorInfo: {
    marginLeft: responsiveWidth(4), // Decreased marginLeft
    flex: 1,
  },
  position: {
    fontSize: responsiveFontSize(5), // Increased font size
    fontWeight: "bold",
    marginBottom: responsiveHeight(0.1), // Decreased marginBottom
  },
  fullName: {
    fontSize: responsiveFontSize(4), // Increased font size
    // fontWeight: "600",
    marginBottom: responsiveHeight(0.5), // Decreased marginBottom
  },
  description: {
    fontSize: responsiveFontSize(3.5), // Increased font size
    color: "#666",
    marginBottom: responsiveHeight(0.5), // Decreased marginBottom
  },
  availability: {
    fontSize: responsiveFontSize(3.2), // Increased font size
    color: "#333",
  },
  availabilityStatus: {
    fontWeight: "bold",
    // color: counselor.available ? "#0f0" : "#f00",
  },
});

export default CounselorCard;
