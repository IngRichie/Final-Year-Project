import * as React from "react";
import { ScrollView, StyleSheet, Text, View, SafeAreaView, Dimensions, Pressable } from "react-native";
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';

const { width, height } = Dimensions.get("window");

const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;
const responsiveFontSize = (percent: number) => (width * percent) / 100;

interface Counselor {
  fullName: string;
  position: string;
}

interface ChatScreenProps {
  route: {
    params: {
      counselor: Counselor;
    };
  };
}

const ChatScreen: React.FC<ChatScreenProps> = ({ route }) => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const { counselor } = route.params;

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={handleBackPress}>
            <MaterialIcons name="arrow-back" size={responsiveFontSize(6)} color="#000" />
          </Pressable>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>{counselor.fullName}</Text>
            <Text style={styles.subHeaderText}>{counselor.position}</Text>
          </View>
          <Pressable style={styles.menuButton}>
            <MaterialIcons name="more-vert" size={responsiveFontSize(6)} color="#000" />
          </Pressable>
        </View>
        <View style={styles.chatContainer}>
          {/* Chat UI components go here */}
          <Text>Chat Screen for {counselor.fullName}</Text>
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
    alignItems: "center",
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(5),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: responsiveHeight(2),
  },
  backButton: {
    padding: responsiveWidth(2),
  },
  headerTextContainer: {
    alignItems: "center",
  },
  headerText: {
    fontSize: responsiveFontSize(5),
    fontWeight: "bold",
  },
  subHeaderText: {
    fontSize: responsiveFontSize(4),
    color: "#666",
  },
  menuButton: {
    padding: responsiveWidth(2),
  },
  chatContainer: {
    width: "100%",
    backgroundColor: "#f0f0f0",
    padding: responsiveWidth(5),
    borderRadius: responsiveWidth(2),
    marginBottom: responsiveHeight(3),
  },
});

export default ChatScreen;
