import { StyleSheet } from "react-native";

const getDynamicStyles = (isDarkModeEnabled: boolean) => 
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkModeEnabled ? "#1E1E1E" : "#fff",
    },
    scrollContainer: {
      flexGrow: 1,
      paddingHorizontal: 20,
      paddingBottom: 30,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 15,
      paddingVertical: 10,
    },
    backButton: {
      padding: 10,
    },
    headerText: {
      fontSize: 20,
      fontWeight: "bold",
      color: isDarkModeEnabled ? "#fff" : "#000",
    },
    label: {
      fontSize: 18,
      marginBottom: 10,
      color: isDarkModeEnabled ? "#fff" : "#000",
    },
    dateButton: {
      backgroundColor: "#007bff",
      padding: 15,
      borderRadius: 5,
      alignItems: "center",
      marginBottom: 20,
    },
    dateButtonText: {
      color: "#fff",
      fontSize: 18,
    },
    bookButton: {
      backgroundColor: "#28a745",
      padding: 15,
      borderRadius: 5,
      alignItems: "center",
      marginTop: 20,
    },
    bookButtonText: {
      color: "#fff",
      fontSize: 18,
    },
  });

export default getDynamicStyles;
