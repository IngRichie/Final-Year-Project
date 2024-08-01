import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, StatusBar, TextInput, FlatList } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDarkMode } from "../components/DarkModeContext"; // Import the dark mode context
import firstAidInstructions from "../components/firstAidInstructions"; // Assuming this is the path to your .ts file

const { width, height } = Dimensions.get("window");

const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;
const responsiveFontSize = (percent: number) => (width * percent) / 100;

const FirstAidPage = () => {
  const { isDarkModeEnabled } = useDarkMode(); // Consume the dark mode context
  const dynamicStyles = getDynamicStyles(isDarkModeEnabled);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredInstructions, setFilteredInstructions] = useState(firstAidInstructions);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    const filtered = firstAidInstructions.filter((instruction) =>
      instruction.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredInstructions(filtered);
  };

  const renderInstruction = ({ item }: { item: any }) => (
    <View style={dynamicStyles.instructionContainer}>
      <Text style={dynamicStyles.instructionTitle}>{item.title}</Text>
      <Text style={dynamicStyles.instructionText}>{item.description}</Text>
    </View>
  );

  return (
    <SafeAreaView style={dynamicStyles.container}>
      <StatusBar
        barStyle={isDarkModeEnabled ? "light-content" : "dark-content"}
        backgroundColor={isDarkModeEnabled ? "#1c1c1c" : "#318CE7"}
      />
      <View style={dynamicStyles.headerContainer}>
        <View style={dynamicStyles.header}>
          <View style={dynamicStyles.iconContainer}>
            <FontAwesome5 name="first-aid" style={dynamicStyles.firstAidIcon} />
          </View>
          <Text style={dynamicStyles.headerText}>First Aid</Text>
        </View>
      </View>

      <View style={dynamicStyles.searchContainer}>
        <TextInput
          style={dynamicStyles.searchInput}
          placeholder="Search for instructions..."
          placeholderTextColor={isDarkModeEnabled ? "#999" : "#555"}
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      <FlatList
        data={filteredInstructions}
        renderItem={renderInstruction}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={dynamicStyles.listContentContainer}
      />
    </SafeAreaView>
  );
};

const getDynamicStyles = (isDarkModeEnabled: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkModeEnabled ? "#1c1c1c" : "#fff",
    },
    headerContainer: {
      marginTop: responsiveHeight(6),
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#318CE7",
      width: "70%",
      paddingLeft: responsiveFontSize(5),
      paddingVertical: responsiveFontSize(2),
      borderTopRightRadius: responsiveFontSize(3),
      borderBottomRightRadius: responsiveFontSize(3),
    },
    iconContainer: {
      width: responsiveFontSize(10),
      height: responsiveFontSize(10),
      borderRadius: responsiveFontSize(5),
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    firstAidIcon: {
      fontSize: responsiveFontSize(6),
      color: "#318CE7",
    },
    headerText: {
      fontSize: responsiveFontSize(6),
      color: "#fff",
      marginLeft: responsiveWidth(5),
    },
    searchContainer: {
      marginVertical: responsiveHeight(2),
      paddingHorizontal: responsiveWidth(5),
    },
    searchInput: {
      height: responsiveHeight(6),
      backgroundColor: isDarkModeEnabled ? "#333" : "#f2f2f2",
      color: isDarkModeEnabled ? "#fff" : "#000",
      borderRadius: 20,
      paddingHorizontal: responsiveWidth(5),
      fontSize: responsiveFontSize(4),
    },
    listContentContainer: {
      paddingHorizontal: responsiveWidth(5),
    },
    instructionContainer: {
      marginBottom: responsiveHeight(3),
      padding: responsiveHeight(2),
      backgroundColor: isDarkModeEnabled ? "#2a2a2a" : "#fff",
      borderRadius: 10,
      elevation: 3,
    },
    instructionTitle: {
      fontSize: responsiveFontSize(5),
      color: isDarkModeEnabled ? "#fff" : "#000",
      marginBottom: responsiveHeight(1),
    },
    instructionText: {
      fontSize: responsiveFontSize(4),
      color: isDarkModeEnabled ? "#ddd" : "#333",
    },
  });

export default FirstAidPage;
