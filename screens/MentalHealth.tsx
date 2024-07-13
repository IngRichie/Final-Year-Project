import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, ScrollView, Pressable, Dimensions, Image, Linking, SafeAreaView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import StatusBar from "../components/StatusBar"; 
import { fetchMentalHealthResources, getCachedMentalHealthResources } from "../components/api"; 

const { width, height } = Dimensions.get("window");

const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;
const responsiveFontSize = (percent: number) => (width * percent) / 100;

const MentalHealthResourcesScreen: React.FC = ({ }) => {
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadResources = async () => {
      try {
        const cachedData = await getCachedMentalHealthResources();
        if (cachedData && Array.isArray(cachedData) && cachedData.length > 0) {
          setResources(cachedData);
          setLoading(false);
        }

        const data = await fetchMentalHealthResources();
        if (data && Array.isArray(data) && data.length > 0) {
          setResources(data);
        }
      } catch (error) {
        console.error("Error loading resources:", error);
      } finally {
        setLoading(false);
      }
    };

    loadResources();
  }, []);

  const openLink = (link: string) => {
    Linking.openURL(link);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!Array.isArray(resources) || resources.length === 0) {
    return (
      <View style={styles.noResourcesContainer}>
        <Text>No resources available</Text>
      </View>
    );
  }

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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noResourcesContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
