import * as React from "react";
import { Image, StyleSheet, Text, View, Pressable, Dimensions } from "react-native";
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/build/MaterialIcons";

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
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

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
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>★★★★★</Text>
          <MaterialIcons name="navigate-next" size={responsiveFontSize(6)} color="#0063ae" />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  counselorCard: {
    flexDirection: "row",
    padding: responsiveWidth(2.5), // Decreased padding
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
    width: responsiveWidth(26), // Decreased image width
    height: responsiveWidth(32), // Decreased image height
    borderTopLeftRadius: responsiveWidth(2.8),
    borderBottomLeftRadius: responsiveWidth(2.8)
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
    marginBottom: responsiveHeight(0.5), // Decreased marginBottom
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: responsiveFontSize(4), // Increased font size
    color: "#ffb400",
  },
});

export default CounselorCard;
