// import * as React from "react";
// import {
//   ScrollView,
//   StyleSheet,
//   Text,
//   Dimensions,
//   Pressable,
//   View,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import StatusBar from "../components/StatusBar";
// import { FontAwesome5, MaterialCommunityIcons, Entypo } from "@expo/vector-icons";

// const { width, height } = Dimensions.get("window");

// const responsiveWidth = (percent: number) => (width * percent) / 100;
// const responsiveHeight = (percent: number) => (height * percent) / 100;
// const responsiveFontSize = (percent: number) => (width * percent) / 100;

// const MentalHealth = () => {
//   const handlePress = (buttonText: string) => {
//     // Replace with your navigation logic
//     console.log(`Navigating to: ${buttonText}`);
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar screenName="Mental Health" />
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         <View style={styles.section}>
//           <Text style={styles.sectionText}>
//             Mental health involves emotional, psychological, and social well-being, influencing thoughts, feelings, and actions. It determines how we handle stress, relate to others, and make choices.
//           </Text>
//         </View>
//         <View style={styles.BtnSection}>
//           <Text style={styles.sectionTitle}>Mental Health Resources</Text>
//           <Pressable style={[styles.button, { width: responsiveWidth(90) }]} onPress={() => handlePress("Mental Health Tips")}>
//             <FontAwesome5 name="brain" size={24} color="#1F75FE" style={styles.buttonIcon} />
//             <Text style={styles.buttonText}>Mental Health Tips</Text>
//           </Pressable>
//           <Pressable style={[styles.button, { width: responsiveWidth(90) }]} onPress={() => handlePress("Mindfulness Practices")}>
//             <MaterialCommunityIcons name="meditation" size={24} color="#1F75FE" style={styles.buttonIcon} />
//             <Text style={styles.buttonText}>Mindfulness Practices</Text>
//           </Pressable>
//           <Pressable style={[styles.button, { width: responsiveWidth(90) }]} onPress={() => handlePress("Self-care Suggestions")}>
//             <FontAwesome5 name="spa" size={24} color="#1F75FE" style={styles.buttonIcon} />
//             <Text style={styles.buttonText}>Self-care Suggestions</Text>
//           </Pressable>
//           <Pressable style={[styles.button, { width: responsiveWidth(90) }]} onPress={() => handlePress("Inspirational Quotes and Affirmations")}>
//             <Entypo name="quote" size={24} color="#1F75FE" style={styles.buttonIcon} />
//             <Text style={styles.buttonText}>Inspirational Quotes and Affirmations</Text>
//           </Pressable>
//           <Pressable style={[styles.button, { width: responsiveWidth(90) }]} onPress={() => handlePress("Educational Articles")}>
//             <MaterialCommunityIcons name="book-open-page-variant" size={24} color="#1F75FE" style={styles.buttonIcon} />
//             <Text style={styles.buttonText}>Educational Articles</Text>
//           </Pressable>
//           <Pressable style={[styles.button, { width: responsiveWidth(90) }]} onPress={() => handlePress("Progress Tracking")}>
//             <FontAwesome5 name="chart-line" size={24} color="#1F75FE" style={styles.buttonIcon} />
//             <Text style={styles.buttonText}>Progress Tracking</Text>
//           </Pressable>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#1F75FE",
//   },
//   scrollContainer: {
//     flexGrow: 1,
//   },
//   section: {
//     backgroundColor: "#1F75FE",
//     height: responsiveHeight(30),
//     justifyContent: "center",
//     paddingHorizontal: responsiveWidth(5),
//   },
//   BtnSection: {
//     backgroundColor: "#fff",
//     borderTopRightRadius: 20,
//     borderTopLeftRadius: 20,
//     paddingVertical: responsiveHeight(5),
//     paddingHorizontal: responsiveWidth(5),
//     marginTop: responsiveHeight(2),
//     minHeight: responsiveHeight(57),
//   },
//   sectionTitle: {
//     fontSize: responsiveFontSize(5),
//     fontWeight: "bold",
//     marginBottom: responsiveHeight(2),
//     color: "#3a3a3a",
//   },
//   sectionText: {
//     fontSize: responsiveFontSize(4),
//     color: "#fff",
//     lineHeight: responsiveHeight(5),
//   },
//   button: {
//     flexDirection: "row",
//     alignItems: "center",
//     height: responsiveHeight(7),
//     backgroundColor: "#fbfaf3",
//     justifyContent: "flex-start",
//     paddingLeft: responsiveWidth(5),
//     marginBottom: responsiveHeight(2),
//     borderRadius: 8,
//     borderColor: "#ccc",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.8,
//     shadowRadius: 2,
//     elevation: 5,
//   },
//   buttonText: {
//     fontSize: responsiveFontSize(4),
//     marginLeft: responsiveWidth(2),
//     color: "#3a3a3a",
//   },
//   buttonIcon: {
//     marginRight: responsiveWidth(2),
//   },
// });

// export default MentalHealth;// MentalHealthTips.tsx
import * as React from "react";
import { StyleSheet, Text, View, Dimensions, ScrollView, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import healthTips from "./MentalHealthTip";
import StatusBar from "../components/StatusBar"; 

const { width, height } = Dimensions.get("window");

const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;

const MentalHealthTips: React.FC = () => {
  const [searchText, setSearchText] = React.useState("");
  const [filteredTips, setFilteredTips] = React.useState(healthTips);

  // Update filtered tips based on search text
  React.useEffect(() => {
    if (!searchText.trim()) {
      setFilteredTips(healthTips);
    } else {
      const filtered = healthTips.filter((tip) =>
        tip.topic.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredTips(filtered);
    }
  }, [searchText]);

  // Display up to 7 random tips or show "Topic not found" if no tips match
  const renderTips = () => {
    if (filteredTips.length === 0) {
      return (
        <View style={styles.tipContainer}>
          <View style={styles.tipTopic}>
            <Text style={styles.topicText}>Topic not found</Text>
          </View>
          <View style={styles.tipContent}>
            <Text style={styles.contentText}>Sorry, we couldn't find any tips for your search.</Text>
          </View>
        </View>
      );
    } else {
      // Shuffle tips for randomness
      const shuffledTips = [...filteredTips].sort(() => Math.random() - 0.5);
      // Display up to 7 random tips
      const displayedTips = shuffledTips.slice(0, 7);
      return displayedTips.map((tip) => (
        <View key={tip.id} style={styles.tipContainer}>
          <View style={styles.tipTopic}>
            <Text style={styles.topicText}>{tip.topic}</Text>
          </View>
          <View style={styles.tipContent}>
            <Text style={styles.contentText}>{tip.content}</Text>
          </View>
        </View>
      ));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar screenName="Mental Health tips" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search tip"
          value={searchText}
          onChangeText={setSearchText}
        />
        {renderTips()}
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
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(5),
  },
  searchBar: {
    backgroundColor: "#fdfdfd",
    borderWidth: 1,
    borderColor: "#89c3fc",
    borderRadius: responsiveHeight(2),
    paddingVertical: responsiveHeight(1),
    paddingHorizontal: responsiveWidth(4),
    marginBottom: responsiveHeight(2),
    fontSize: responsiveWidth(5),
    fontFamily: "Poppins-Regular",
  },
  tipContainer: {
    borderRadius: responsiveHeight(2),
    backgroundColor: "#cae4fe",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    marginTop: responsiveHeight(2),
  },
  tipTopic: {
    backgroundColor: "#1F75FE",
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(4),
    borderTopLeftRadius: responsiveHeight(2),
    borderTopRightRadius: responsiveHeight(2),
  },
  topicText: {
    fontSize: responsiveWidth(5),
    color: "#fff",
    fontFamily: "Poppins-Bold",
  },
  tipContent: {
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(4),
  },
  contentText: {
    fontSize: responsiveWidth(4.5),
    color: "#000",
    fontFamily: "Poppins-Regular",
    lineHeight: responsiveHeight(3.5),
  },
});

export default MentalHealthTips;
