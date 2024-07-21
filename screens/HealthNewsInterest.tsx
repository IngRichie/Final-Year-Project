import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, FlatList, SafeAreaView, Dimensions } from "react-native";
import { useNavigation, RouteProp, ParamListBase } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const { width, height } = Dimensions.get("window");

const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;
const responsiveFontSize = (percent: number) => (width * percent) / 100;

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
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Select Your Interests</Text>
      <FlatList
        data={interestsList}
        keyExtractor={(item) => item}
        numColumns={2}
        renderItem={({ item }) => (
          <Pressable
            style={[
              styles.interestItem,
              selectedInterests.includes(item) && styles.selectedInterestItem,
            ]}
            onPress={() => toggleInterest(item)}
          >
            <Text style={styles.interestText}>{item}</Text>
          </Pressable>
        )}
        contentContainerStyle={styles.interestsContainer}
      />
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={handleSkip}>
          <Text style={styles.buttonText}>Skip</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  header: {
    fontSize: responsiveFontSize(6),
    fontWeight: "bold",
    marginVertical: responsiveHeight(2),
  },
  interestsContainer: {
    justifyContent: "center",
  },
  interestItem: {
    backgroundColor: "#e0e0e0",
    padding: responsiveHeight(2),
    margin: responsiveWidth(2),
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: responsiveWidth(40),
  },
  selectedInterestItem: {
    backgroundColor: "#318CE7",
  },
  interestText: {
    fontSize: responsiveFontSize(4),
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: responsiveHeight(2),
  },
  button: {
    backgroundColor: "#318CE7",
    padding: responsiveHeight(2),
    borderRadius: 10,
    marginHorizontal: responsiveWidth(5),
    width: responsiveWidth(30),
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: responsiveFontSize(4),
  },
});

export default InterestsScreen;
