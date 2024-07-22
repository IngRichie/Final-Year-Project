import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, FlatList, SafeAreaView, Dimensions } from "react-native";
import { useNavigation, RouteProp, ParamListBase } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

type InterestScreenNavigationProp = StackNavigationProp<
  ParamListBase,
  "InterestsScreen"
>;

type InterestScreenRouteProp = RouteProp<
  ParamListBase,
  "InterestsScreen"
>;

type Props = {
  route: InterestScreenRouteProp;
  navigation: InterestScreenNavigationProp;
};

const interestsList = [
  "Fitness",
  "Nutrition",
  "Mental Health",
  "General Health",
  "Diseases",
  "Treatments",
  "Medicines",
  "Lifestyle",
  "Research",
];

const InterestsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { userId } = route.params;
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [screenWidth, setScreenWidth] = useState(Dimensions.get("window").width);
  const [screenHeight, setScreenHeight] = useState(Dimensions.get("window").height);

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

  const vw = screenWidth / 100;
  const vh = screenHeight / 100;

  const dynamicStyles = getDynamicStyles(vw, vh);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prevInterests) =>
      prevInterests.includes(interest)
        ? prevInterests.filter((item) => item !== interest)
        : [...prevInterests, interest]
    );
  };

  const handleSave = async () => {
    try {
      await updateDoc(doc(db, "users", userId), {
        interests: selectedInterests,
      });
      navigation.navigate("LoginScreen");
    } catch (error) {
      console.error("Error saving interests: ", error);
    }
  };

  const handleSkip = () => {
    navigation.navigate("LoginScreen");
  };

  return (
    <SafeAreaView style={dynamicStyles.container}>
      <Text style={dynamicStyles.header}>Select Your Interests</Text>
      <FlatList
        data={interestsList}
        keyExtractor={(item) => item}
        numColumns={2}
        renderItem={({ item }) => (
          <Pressable
            style={[
              dynamicStyles.interestItem,
              selectedInterests.includes(item) && dynamicStyles.selectedInterestItem,
            ]}
            onPress={() => toggleInterest(item)}
          >
            <Text style={dynamicStyles.interestText}>{item}</Text>
          </Pressable>
        )}
        contentContainerStyle={dynamicStyles.interestsContainer}
      />
      <View style={dynamicStyles.buttonContainer}>
        <Pressable style={dynamicStyles.button} onPress={handleSave}>
          <Text style={dynamicStyles.buttonText}>Save</Text>
        </Pressable>
        <Pressable style={dynamicStyles.button} onPress={handleSkip}>
          <Text style={dynamicStyles.buttonText}>Skip</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const responsiveWidth = (vw, percent) => vw * percent;
const responsiveHeight = (vh, percent) => vh * percent;
const responsiveFontSize = (vw, percent) => vw * percent;

const getDynamicStyles = (vw, vh) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#fff",
    },
    header: {
      fontSize: responsiveFontSize(vw, 6),
      fontWeight: "bold",
      marginVertical: responsiveHeight(vh, 2),
    },
    interestsContainer: {
      justifyContent: "center",
    },
    interestItem: {
      backgroundColor: "#e0e0e0",
      padding: responsiveHeight(vh, 2),
      margin: responsiveWidth(vw, 2),
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      width: responsiveWidth(vw, 40),
    },
    selectedInterestItem: {
      backgroundColor: "#318CE7",
    },
    interestText: {
      fontSize: responsiveFontSize(vw, 4),
      color: "#333",
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginTop: responsiveHeight(vh, 2),
    },
    button: {
      backgroundColor: "#318CE7",
      padding: responsiveHeight(vh, 2),
      borderRadius: 10,
      marginHorizontal: responsiveWidth(vw, 5),
      width: responsiveWidth(vw, 30),
      alignItems: "center",
    },
    buttonText: {
      color: "#fff",
      fontSize: responsiveFontSize(vw, 4),
    },
  });
};

export default InterestsScreen;
