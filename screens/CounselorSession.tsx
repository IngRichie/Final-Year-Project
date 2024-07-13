import * as React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  Dimensions,
  Pressable,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import {
  useNavigation,
  NavigationProp,
  ParamListBase,
} from "@react-navigation/native";
import CounselorCard from "../components/counselorCard"; // Adjust the import path as needed
import counselors, { Counselor } from "../components/counselors"; // Adjust the import path as needed

const { width, height } = Dimensions.get("window");

const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;
const responsiveFontSize = (percent: number) => (width * percent) / 100;

const CounselorSession: React.FC = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [selectedFeeling, setSelectedFeeling] = React.useState<string | null>(
    null
  );
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [filteredCounselors, setFilteredCounselors] =
    React.useState<Counselor[]>(counselors);

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

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0} // Adjust the offset as needed
    >
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <View style={styles.header}>
          <Text style={styles.headerText}>Counselor Session</Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.searchContainer}>
            <FontAwesome name="search" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search Counselor"
              value={searchQuery}
              onChangeText={handleSearch}
            />
          </View>
          <Text style={styles.sectionTitle}>Available Counselors</Text>
          {filteredCounselors.length > 0 ? (
            <ScrollView
              horizontal
              contentContainerStyle={styles.cardContainer}
              showsHorizontalScrollIndicator={false}
            >
              {filteredCounselors.map((counselor, index) => (
                <View key={index} style={styles.cardSpacing}>
                  <CounselorCard counselor={counselor} />
                </View>
              ))}
            </ScrollView>
          ) : (
            <Text style={styles.noResultsText}>No counselors found</Text>
          )}
          <Text style={styles.feelingsTitle}>How are you feeling today?</Text>
          <View style={styles.feelingsContainer}>
            {feelings.map((feeling, index) => (
              <Pressable
                key={index}
                style={styles.feeling}
                onPress={() => setSelectedFeeling(feeling.name)}
              >
                <View
                  style={[
                    styles.feelingIconContainer,
                    selectedFeeling === feeling.name &&
                      styles.selectedFeelingIconContainer,
                  ]}
                >
                  <FontAwesome name={feeling.icon} style={styles.feelingIcon} />
                </View>
                <Text style={styles.feelingText}>{feeling.name}</Text>
              </Pressable>
            ))}
          </View>
          <View style={styles.additionalInfo}>
            <Text style={styles.additionalInfoTitle}>Why Counseling?</Text>
            <Text style={styles.additionalInfoText}>
              Counseling can help you improve your mental health, manage stress,
              and cope with life challenges.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginBottom: responsiveWidth(17),
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
    flexGrow: 1,
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(3),
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: responsiveHeight(2),
    padding: responsiveWidth(3),
    borderRadius: responsiveWidth(2),
    backgroundColor: "#f0f0f0",
  },
  searchIcon: {
    fontSize: responsiveFontSize(6),
    marginRight: responsiveWidth(2),
  },
  searchInput: {
    flex: 1,
    fontSize: responsiveFontSize(4),
  },
  sectionTitle: {
    fontSize: responsiveFontSize(5),
    fontWeight: "700",
    marginBottom: responsiveHeight(2),
  },
  cardContainer: {
    flexDirection: "row",
    marginBottom: responsiveHeight(3),
  },
  cardSpacing: {
    marginRight: responsiveWidth(5),
  },
  noResultsText: {
    fontSize: responsiveFontSize(4),
    color: "#333",
    textAlign: "center",
    marginVertical: responsiveHeight(2),
  },
  feelingsTitle: {
    fontSize: responsiveFontSize(5),
    fontWeight: "700",
    textAlign: "center",
    marginBottom: responsiveHeight(2),
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
  },
  additionalInfo: {
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(3),
    backgroundColor: "#f5f5f5",
    borderRadius: responsiveWidth(2),
    marginBottom: responsiveHeight(3),
  },
  additionalInfoTitle: {
    fontSize: responsiveFontSize(5),
    fontWeight: "700",
    marginBottom: responsiveHeight(2),
  },
  additionalInfoText: {
    fontSize: responsiveFontSize(4),
    color: "#333",
  },
});

export default CounselorSession;
