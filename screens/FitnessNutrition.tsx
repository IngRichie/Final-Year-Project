import * as React from "react";
import { Text, StyleSheet, View, ScrollView, Pressable, Dimensions, Image, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import StatusBar from "../components/StatusBar"; // Adjust path as per your project structure

const { width, height } = Dimensions.get("window");

const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;
const responsiveFontSize = (percent: number) => (width * percent) / 100;

const FitnessNutritionScreen = ({ navigation }) => {
  const resources = [
    {
      id: 1,
      title: "Healthy Eating Tips",
      description: "Learn how to make healthier food choices and maintain a balanced diet.",
      imageUrl: "https://example.com/healthy_eating.jpg",
      link: "https://www.example.com/healthy-eating",
    },
    {
      id: 2,
      title: "Exercise for Beginners",
      description: "A beginner's guide to starting a fitness routine and staying motivated.",
      imageUrl: "https://example.com/exercise_beginners.jpg",
      link: "https://www.example.com/exercise-beginners",
    },
    {
      id: 3,
      title: "Meal Planning",
      description: "Tips and tricks for effective meal planning and preparation.",
      imageUrl: "https://example.com/meal_planning.jpg",
      link: "https://www.example.com/meal-planning",
    },
    {
      id: 4,
      title: "Hydration Importance",
      description: "Understand the importance of staying hydrated and how it affects your health.",
      imageUrl: "https://example.com/hydration.jpg",
      link: "https://www.example.com/hydration",
    },
  ];

  const openLink = (link) => {
    Linking.openURL(link);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar screenName="Fitness & Nutrition" />
    
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {resources.map(resource => (
          <Pressable key={resource.id} style={styles.resourceCard} onPress={() => openLink(resource.link)}>
            <Image source={{ uri: resource.imageUrl }} style={styles.resourceImage} />
            <View style={styles.resourceInfo}>
              <Text style={styles.resourceTitle}>{resource.title}</Text>
              <Text style={styles.resourceDescription}>{resource.description}</Text>
            </View>
          </Pressable>
        ))}
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
  resourceCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: responsiveWidth(3),
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
  resourceImage: {
    width: responsiveWidth(25),
    height: responsiveWidth(25),
    borderRadius: 10,
    marginRight: responsiveWidth(5),
  },
  resourceInfo: {
    flex: 1,
  },
  resourceTitle: {
    fontSize: responsiveFontSize(4.5),
    fontWeight: "bold",
    color: "#000",
    marginBottom: responsiveHeight(1),
  },
  resourceDescription: {
    fontSize: responsiveFontSize(3.5),
    color: "#666",
  },
});

export default FitnessNutritionScreen;
