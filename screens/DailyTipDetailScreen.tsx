// DailyTipDetailScreen.tsx

import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  Pressable,
} from "react-native";
import { useNavigation, NavigationProp, RouteProp } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5 } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;
const responsiveFontSize = (percent: number) => (width * percent) / 100;

type RootStackParamList = {
  DailyTipDetailScreen: { tip: any };
};

type DailyTipDetailScreenRouteProp = RouteProp<RootStackParamList, 'DailyTipDetailScreen'>;

const DailyTipDetailScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useNavigation<DailyTipDetailScreenRouteProp>();
  const { tip } = route.params;

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Pressable
          style={styles.backButton}
          onPress={handleBackPress}
        >
          <FontAwesome5 name="arrow-left" style={styles.backIcon} />
        </Pressable>
        <View style={styles.imageContainer}>
          <Image
            source={tip.image}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.contentText}>{tip.content}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(3),
  },
  backButton: {
    padding: responsiveWidth(2),
  },
  backIcon: {
    fontSize: responsiveFontSize(6),
    color: "#007bff",
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: responsiveHeight(3),
  },
  image: {
    width: responsiveWidth(90),
    height: responsiveHeight(40),
    borderRadius: responsiveFontSize(5),
  },
  contentContainer: {
    padding: responsiveWidth(5),
    backgroundColor: "#f0f0f0",
    borderRadius: responsiveWidth(2),
  },
  contentText: {
    fontSize: responsiveFontSize(4),
    color: "#333",
  },
});

export default DailyTipDetailScreen;
