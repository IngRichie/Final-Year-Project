import * as React from "react";
import { Button } from "react-native-paper";
import { StyleProp, ViewStyle, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";

export type SymptomAssessment1Type = {
  style?: StyleProp<ViewStyle>;
};

const SymptomAssessment1 = ({ style }: SymptomAssessment1Type) => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <Button
      mode="text"
      labelStyle={styles.symptomAssessmentBtn}
      onPress={() => navigation.navigate("SymptomAssessment")}
    >
      Symptom Assessment
    </Button>
  );
};

const styles = StyleSheet.create({
  symptomAssessmentBtn: {
    color: "#000",
    fontSize: 20,
    fontFamily: "Inter-Regular",
    textTransform: "capitalize",
  },
});

export default SymptomAssessment1;
