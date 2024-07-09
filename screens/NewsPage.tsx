import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Pressable,
  StatusBar,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp, ParamListBase } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;
const responsiveFontSize = (percent: number) => (width * percent) / 100;

type NewsArticle = {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
};

const newsData: NewsArticle[] = [
  {
    id: "1",
    title: "Healthy Eating Tips",
    description: "Discover the best tips for maintaining a healthy diet...",
    image: "https://via.placeholder.com/150",
    link: "https://example.com/healthy-eating",
  },
  {
    id: "2",
    title: "Benefits of Regular Exercise",
    description: "Learn about the numerous benefits of regular physical activity...",
    image: "https://via.placeholder.com/150",
    link: "https://example.com/regular-exercise",
  },
  {
    id: "3",
    title: "Mental Health Awareness",
    description: "Find out why mental health is just as important as physical health...",
    image: "https://via.placeholder.com/150",
    link: "https://example.com/mental-health",
  },
];

const NewsPage: React.FC = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [news, setNews] = useState<NewsArticle[]>([]);

  useEffect(() => {
    // Simulate fetching news articles from an API
    setNews(newsData);
  }, []);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleReadMore = (link: string) => {
    Linking.openURL(link);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={responsiveFontSize(6)} color="#000" />
        </Pressable>
        <Text style={styles.headerText}>Health News</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {news.map((article) => (
          <View key={article.id} style={styles.newsItem}>
            <Image source={{ uri: article.image }} style={styles.newsImage} />
            <View style={styles.newsContent}>
              <Text style={styles.newsTitle}>{article.title}</Text>
              <Text style={styles.newsDescription}>
                {article.description.length > 50
                  ? `${article.description.substring(0, 50)}...`
                  : article.description}
              </Text>
              <Pressable onPress={() => handleReadMore(article.link)}>
                <Text style={styles.readMore}>Read More</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(2),
  },
  backButton: {
    marginRight: responsiveWidth(2),
  },
  headerText: {
    fontSize: responsiveFontSize(5),
    fontWeight: "bold",
  },
  scrollContainer: {
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(3),
  },
  newsItem: {
    flexDirection: "row",
    marginBottom: responsiveHeight(3),
    backgroundColor: "#f9f9f9",
    borderRadius: responsiveWidth(2),
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  newsImage: {
    width: responsiveWidth(30),
    height: responsiveHeight(15),
    borderTopLeftRadius: responsiveWidth(2),
    borderBottomLeftRadius: responsiveWidth(2),
  },
  newsContent: {
    flex: 1,
    padding: responsiveWidth(3),
  },
  newsTitle: {
    fontSize: responsiveFontSize(4),
    fontWeight: "bold",
    marginBottom: responsiveHeight(1),
  },
  newsDescription: {
    fontSize: responsiveFontSize(3.5),
    color: "#333",
    marginBottom: responsiveHeight(1),
  },
  readMore: {
    fontSize: responsiveFontSize(3.5),
    color: "#318CE7",
    fontWeight: "bold",
  },
});

export default NewsPage;
