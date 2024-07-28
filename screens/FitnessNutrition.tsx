import * as React from "react";
import { useState, useEffect } from "react";
import { 
  Text, 
  StyleSheet, 
  View, 
  ScrollView, 
  Pressable, 
  Dimensions, 
  Image, 
  Linking, 
  Platform, 
  SafeAreaView 
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import StatusBar from "../components/StatusBar"; // Adjust path as per your project structure
import { useDarkMode } from "../components/DarkModeContext"; // Import the dark mode context

const { width, height } = Dimensions.get("window");

const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;
const responsiveFontSize = (percent: number) => (width * percent) / 100;

const FitnessNutritionScreen = ({ navigation }) => {
  const { isDarkModeEnabled } = useDarkMode(); // Get the dark mode state

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

  const openLink = (link: string) => {
    Linking.openURL(link);
  };

  const dynamicStyles = getDynamicStyles(isDarkModeEnabled);

  return (
    <SafeAreaView style={dynamicStyles.container}>
      <StatusBar screenName="Fitness & Nutrition" />
      <ScrollView contentContainerStyle={dynamicStyles.scrollContainer}>
        {resources.map((resource) => (
          <Pressable
            key={resource.id}
            style={[
              dynamicStyles.resourceCard,
              Platform.OS === 'web' && dynamicStyles.webResourceCard
            ]}
            onPress={() => openLink(resource.link)}
          >
            <Image source={{ uri: resource.imageUrl }} style={dynamicStyles.resourceImage} />
            <View style={dynamicStyles.resourceInfo}>
              <Text style={dynamicStyles.resourceTitle}>{resource.title}</Text>
              <Text style={dynamicStyles.resourceDescription}>{resource.description}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const getDynamicStyles = (isDarkModeEnabled: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDarkModeEnabled ? "#121212" : "#f0f4f8",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: responsiveWidth(5),
    backgroundColor: isDarkModeEnabled ? "#1E1E1E" : "#fff",
    borderBottomWidth: 1,
    borderBottomColor: isDarkModeEnabled ? "#666" : "#ddd",
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
    backgroundColor: isDarkModeEnabled ? "#1E1E1E" : "#fff",
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
  webResourceCard: {
    cursor: 'pointer', // Web-specific style
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
    color: isDarkModeEnabled ? "#fff" : "#000",
    marginBottom: responsiveHeight(1),
  },
  resourceDescription: {
    fontSize: responsiveFontSize(3.5),
    color: isDarkModeEnabled ? "#ccc" : "#666",
  },
});

export default FitnessNutritionScreen;
