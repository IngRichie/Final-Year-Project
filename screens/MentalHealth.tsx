import * as React from "react";
import { Text, StyleSheet, View, ScrollView, Pressable, Dimensions, Image, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import StatusBar from "../components/StatusBar"; // Adjust path as per your project structure

const { width, height } = Dimensions.get("window");

const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;
const responsiveFontSize = (percent: number) => (width * percent) / 100;

const MentalHealthResourcesScreen = ({ navigation }) => {
  const resources = [
    {
      id: 1,
      title: "Understanding Anxiety",
      description: "Learn about the symptoms, causes, and treatments for anxiety disorders.",
      imageUrl: "https://example.com/anxiety.jpg",
      link: "https://www.example.com/anxiety",
    },
    {
      id: 2,
      title: "Dealing with Depression",
      description: "A comprehensive guide to understanding and managing depression.",
      imageUrl: "https://example.com/depression.jpg",
      link: "https://www.example.com/depression",
    },
    {
      id: 3,
      title: "Meditation for Mental Health",
      description: "Discover the benefits of meditation and how it can improve your mental health.",
      imageUrl: "https://example.com/meditation.jpg",
      link: "https://www.example.com/meditation",
    },
    {
      id: 4,
      title: "Mindfulness Exercises",
      description: "Practical exercises to help you practice mindfulness in your daily life.",
      imageUrl: "https://example.com/mindfulness.jpg",
      link: "https://www.example.com/mindfulness",
    },
  ];

  const openLink = (link) => {
    Linking.openURL(link);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar screenName="Mental Health Resources" />
     
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

export default MentalHealthResourcesScreen;
