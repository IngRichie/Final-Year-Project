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
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useNavigation, NavigationProp, ParamListBase } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { db, auth } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const { width, height } = Dimensions.get("window");

const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;
const responsiveFontSize = (percent: number) => (width * percent) / 100;

type NewsArticle = {
  source: { id: string | null; name: string };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string;
};

const NewsPage: React.FC = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserInterestsAndNews = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          const userInterests = userDoc.data()?.interests || [];

          const query = userInterests.length > 0
            ? userInterests.join(' OR ')
            : 'health';

          const response = await axios.get('https://newsapi.org/v2/top-headlines', {
            params: {
              category: 'health',
              q: query,
              country: 'us',
              apiKey: 'd5438597f0d84a6aaace851b3aa26759', 
            },
          });
          setNews(response.data.articles);
        }
      } catch (error) {
        console.error('Error fetching personalized health news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInterestsAndNews();
  }, []);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleReadMore = (link: string) => {
    Linking.openURL(link);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#318CE7" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={responsiveFontSize(6)} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Health News</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {news.map((article, index) => (
          <View key={index} style={styles.newsItem}>
            {article.urlToImage && (
              <Image source={{ uri: article.urlToImage }} style={styles.newsImage} />
            )}
            <View style={styles.newsContent}>
              <Text style={styles.newsTitle}>{article.title}</Text>
              <Text style={styles.newsDescription}>
                {article.description?.length > 50
                  ? `${article.description.substring(0, 50)}...`
                  : article.description}
              </Text>
              <Pressable onPress={() => handleReadMore(article.url)}>
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
    flexDirection: "column",
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
    width: '100%',
    height: responsiveHeight(25),
    borderTopLeftRadius: responsiveWidth(2),
    borderTopRightRadius: responsiveWidth(2),
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
