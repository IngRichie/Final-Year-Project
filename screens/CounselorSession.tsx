import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TextInput, 
  Pressable, 
  Dimensions, 
  SafeAreaView, 
  StatusBar, 
  KeyboardAvoidingView, 
  Platform 
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation, NavigationProp, ParamListBase } from "@react-navigation/native";
import CounselorCard from "../components/counselorCard"; // Adjust the import path as needed
import counselors, { Counselor } from "../components/counselors"; // Adjust the import path as needed
import { useDarkMode } from '../components/DarkModeContext'; // Import the dark mode context

const { width, height } = Dimensions.get("window");

const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;
const responsiveFontSize = (percent: number) => (width * percent) / 100;

const CounselorSession: React.FC = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const { isDarkModeEnabled } = useDarkMode(); // Consume the dark mode context
  const [selectedFeeling, setSelectedFeeling] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredCounselors, setFilteredCounselors] = useState<Counselor[]>(counselors);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      const filtered = counselors.filter((counselor) =>
        counselor.fullName.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCounselors(filtered);
    } else {
      setFilteredCounselors(counselors);
    }
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const feelings = [
    { name: "Happy", icon: "smile-o" },
    { name: "Calm", icon: "meh-o" },
    { name: "Relax", icon: "frown-o" },
    { name: "Focus", icon: "eye" },
  ];

  const dynamicStyles = getDynamicStyles(isDarkModeEnabled);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0} // Adjust the offset as needed
    >
      <SafeAreaView style={dynamicStyles.container}>
        <StatusBar barStyle={isDarkModeEnabled ? "light-content" : "dark-content"} backgroundColor={isDarkModeEnabled ? "#121212" : "#fff"} />
        <View style={dynamicStyles.header}>
          <Text style={dynamicStyles.headerText}>Counselor Session</Text>
        </View>
        <ScrollView contentContainerStyle={dynamicStyles.scrollContainer}>
          <View style={dynamicStyles.searchContainer}>
            <FontAwesome name="search" style={dynamicStyles.searchIcon} />
            <TextInput
              style={[
                dynamicStyles.searchInput,
                Platform.OS === "web" && dynamicStyles.webSearchInput,
              ]}
              placeholder="Search Counselor"
              value={searchQuery}
              onChangeText={handleSearch}
              placeholderTextColor={isDarkModeEnabled ? "#888" : "#555"}
            />
          </View>
          <Text style={dynamicStyles.sectionTitle}>Available Counselors</Text>
          {filteredCounselors.length > 0 ? (
            <ScrollView
              horizontal
              contentContainerStyle={dynamicStyles.cardContainer}
              showsHorizontalScrollIndicator={false}
            >
              {filteredCounselors.map((counselor, index) => (
                <View key={index} style={dynamicStyles.cardSpacing}>
                  <CounselorCard counselor={counselor} />
                </View>
              ))}
            </ScrollView>
          ) : (
            <Text style={dynamicStyles.noResultsText}>No counselors found</Text>
          )}
          <Text style={dynamicStyles.feelingsTitle}>How are you feeling today?</Text>
          <View style={dynamicStyles.feelingsContainer}>
            {feelings.map((feeling, index) => (
              <Pressable
                key={index}
                style={dynamicStyles.feeling}
                onPress={() => setSelectedFeeling(feeling.name)}
              >
                <View
                  style={[
                    dynamicStyles.feelingIconContainer,
                    selectedFeeling === feeling.name &&
                      dynamicStyles.selectedFeelingIconContainer,
                  ]}
                >
                  <FontAwesome name={feeling.icon} style={dynamicStyles.feelingIcon} />
                </View>
                <Text style={dynamicStyles.feelingText}>{feeling.name}</Text>
              </Pressable>
            ))}
          </View>
          <View style={dynamicStyles.additionalInfo}>
            <Text style={dynamicStyles.additionalInfoTitle}>Why Counseling?</Text>
            <Text style={dynamicStyles.additionalInfoText}>
              Counseling can help you improve your mental health, manage stress,
              and cope with life challenges.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const getDynamicStyles = (isDarkModeEnabled: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDarkModeEnabled ? "#121212" : "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(2),
  },
  headerText: {
    fontSize: responsiveFontSize(5),
    fontWeight: "bold",
    color: isDarkModeEnabled ? "#fff" : "#000",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: responsiveWidth(5),
    paddingBottom: responsiveHeight(10),
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: responsiveHeight(1.4),
    backgroundColor: "#e9ecef",
    borderRadius: responsiveFontSize(2),
    backgroundColor: isDarkModeEnabled ? "#333" : "#f0f0f0",
    
    
  },
  searchIcon: {
    fontSize: responsiveFontSize(6),
    marginRight: responsiveWidth(2),
    color: isDarkModeEnabled ? "#888" : "#000",
  },
  searchInput: {
    flex: 1,
    fontSize: responsiveFontSize(5),
    color: isDarkModeEnabled ? "#fff" : "#000",
  },
  webSearchInput: {
    outlineStyle: "none",
  },
  sectionTitle: {
    fontSize: responsiveFontSize(5),
    fontWeight: "700",
    marginBottom: responsiveHeight(2),
    color: isDarkModeEnabled ? "#fff" : "#000",
  },
  cardContainer: {
    flexDirection: "row",
    marginBottom: responsiveHeight(3),
  },
  cardSpacing: {
    marginRight: responsiveWidth(5),
    backgroundColor: isDarkModeEnabled ? "#333" : "#fff",
    borderRadius: responsiveWidth(2),
    overflow: "hidden",
  },
  noResultsText: {
    fontSize: responsiveFontSize(4),
    color: isDarkModeEnabled ? "#aaa" : "#333",
    textAlign: "center",
    marginVertical: responsiveHeight(2),
  },
  feelingsTitle: {
    fontSize: responsiveFontSize(5),
    fontWeight: "700",
    textAlign: "center",
    marginBottom: responsiveHeight(2),
    color: isDarkModeEnabled ? "#fff" : "#000",
  },
  feelingsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: responsiveHeight(3),
  },
  feeling: {
    alignItems: "center",
  },
  feelingIconContainer: {
    backgroundColor: "#318CE7",
    borderRadius: responsiveWidth(3),
    padding: responsiveWidth(3),
    marginBottom: responsiveHeight(1.5),
  },
  selectedFeelingIconContainer: {
    backgroundColor: "#0050a0",
  },
  feelingIcon: {
    fontSize: responsiveFontSize(8),
    color: "#fff",
  },
  feelingText: {
    fontSize: responsiveFontSize(4),
    textAlign: "center",
    color: isDarkModeEnabled ? "#fff" : "#000",
  },
  additionalInfo: {
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(3),
    backgroundColor: isDarkModeEnabled ? "#333" : "#f5f5f5",
    borderRadius: responsiveWidth(2),
    marginBottom: responsiveHeight(3),
  },
  additionalInfoTitle: {
    fontSize: responsiveFontSize(5),
    fontWeight: "700",
    marginBottom: responsiveHeight(2),
    color: isDarkModeEnabled ? "#fff" : "#000",
  },
  additionalInfoText: {
    fontSize: responsiveFontSize(4),
    color: isDarkModeEnabled ? "#ccc" : "#333",
  },
  '@media (min-width: 768px)': {
    headerText: {
      fontSize: responsiveFontSize(4),
    },
    searchInput: {
      fontSize: responsiveFontSize(4),
    },
    sectionTitle: {
      fontSize: responsiveFontSize(4),
    },
    cardSpacing: {
      marginRight: responsiveWidth(4),
    },
    noResultsText: {
      fontSize: responsiveFontSize(3.5),
    },
    feelingsTitle: {
      fontSize: responsiveFontSize(4),
    },
    feelingIcon: {
      fontSize: responsiveFontSize(7),
    },
    feelingText: {
      fontSize: responsiveFontSize(3.5),
    },
    additionalInfoTitle: {
      fontSize: responsiveFontSize(4),
    },
    additionalInfoText: {
      fontSize: responsiveFontSize(3.5),
    },
  },
});

export default CounselorSession;
