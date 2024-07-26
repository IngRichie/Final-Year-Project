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
  Platform,
  Alert,
} from "react-native";
import { useNavigation, NavigationProp, ParamListBase } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useDarkMode } from '../components/DarkModeContext'; // Import the dark mode context

// Conditionally import based on the platform
const TouchableOpacity = Platform.OS === 'web' ? require('react-native-web').TouchableOpacity : require('react-native').TouchableOpacity;

const NewsPage: React.FC = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const { isDarkModeEnabled } = useDarkMode(); // Consume the dark mode context
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("https://newsapi.org/v2/top-headlines", {
          params: {
            category: "health",
            country: "us",
            apiKey: "d5438597f0d84a6aaace851b3aa26759",
          },
        });

        if (response.status === 200) {
          setNews(response.data.articles);
        } else {
          console.error(`Error fetching news: ${response.status} ${response.statusText}`);
          Alert.alert("Error", `Error fetching news: ${response.status} ${response.statusText}`);
        }
      } catch (error) {
        console.error("Error fetching health news:", error);
        Alert.alert("Error", "Error fetching health news. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();

    const interval = setInterval(fetchNews, 300000); // Refresh news every 5 minutes

    return () => clearInterval(interval);
  }, []);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleReadMore = (link: string) => {
    Linking.openURL(link);
  };

  if (loading) {
    return (
      <SafeAreaView style={getDynamicStyles(screenWidth, screenHeight, isDarkModeEnabled).container}>
        <ActivityIndicator size="large" color="#318CE7" />
      </SafeAreaView>
    );
  }

  const vw = screenWidth / 100;
  const vh = screenHeight / 100;

  const dynamicStyles = getDynamicStyles(vw, vh, screenWidth, isDarkModeEnabled);

  return (
    <SafeAreaView style={dynamicStyles.container}>
      <StatusBar barStyle={isDarkModeEnabled ? "light-content" : "dark-content"} backgroundColor={isDarkModeEnabled ? "#121212" : "#fff"} />
      <View style={dynamicStyles.header}>
        <TouchableOpacity style={dynamicStyles.backButton} onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={responsiveFontSize(vw, 6)} color={isDarkModeEnabled ? "#fff" : "#000"} />
        </TouchableOpacity>
        <Text style={dynamicStyles.headerText}>Health News</Text>
      </View>
      <ScrollView contentContainerStyle={dynamicStyles.scrollContainer}>
        {news.map((article, index) => (
          <View key={index} style={dynamicStyles.newsItem}>
            {article.urlToImage && (
              <Image source={{ uri: article.urlToImage }} style={dynamicStyles.newsImage} />
            )}
            <View style={dynamicStyles.newsContent}>
              <Text style={dynamicStyles.newsTitle}>{article.title}</Text>
              <Text style={dynamicStyles.newsDescription}>
                {article.description?.length > 50
                  ? `${article.description.substring(0, 50)}...`
                  : article.description}
              </Text>
              <Pressable onPress={() => handleReadMore(article.url)}>
                <Text style={dynamicStyles.readMore}>Read More</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

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

const responsiveWidth = (vw: number, percent: number) => vw * percent;
const responsiveHeight = (vh: number, percent: number) => vh * percent;
const responsiveFontSize = (vw: number, percent: number) => vw * percent;

const getDynamicStyles = (vw: number, vh: number, screenWidth: number, isDarkModeEnabled: boolean) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkModeEnabled ? "#121212" : "#fff",
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: responsiveWidth(vw, 5),
      paddingVertical: responsiveHeight(vh, 2),
    },
    backButton: {
      marginRight: responsiveWidth(vw, 2),
    },
    headerText: {
      fontSize: responsiveFontSize(vw, 5),
      fontWeight: "bold",
      color: isDarkModeEnabled ? "#fff" : "#000",
    },
    scrollContainer: {
      paddingHorizontal: responsiveWidth(vw, 5),
      paddingVertical: responsiveHeight(vh, 3),
    },
    newsItem: {
      flexDirection: "column",
      marginBottom: responsiveHeight(vh, 3),
      backgroundColor: isDarkModeEnabled ? "#333" : "#f9f9f9",
      borderRadius: responsiveWidth(vw, 2),
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
      width: "100%",
      height: responsiveHeight(vh, 25),
      borderTopLeftRadius: responsiveWidth(vw, 2),
      borderTopRightRadius: responsiveWidth(vw, 2),
    },
    newsContent: {
      flex: 1,
      padding: responsiveWidth(vw, 3),
    },
    newsTitle: {
      fontSize: responsiveFontSize(vw, 4),
      fontWeight: "bold",
      marginBottom: responsiveHeight(vh, 1),
      color: isDarkModeEnabled ? "#fff" : "#000",
    },
    newsDescription: {
      fontSize: responsiveFontSize(vw, 3.5),
      color: isDarkModeEnabled ? "#aaa" : "#333",
      marginBottom: responsiveHeight(vh, 1),
    },
    readMore: {
      fontSize: responsiveFontSize(vw, 3.5),
      color: "#318CE7",
      fontWeight: "bold",
    },
  });
};

export default NewsPage;
