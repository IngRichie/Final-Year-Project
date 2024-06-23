import * as React from "react";
import { Button } from "react-native-paper";
import { StyleProp, ViewStyle, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";

export type FitnessNutrition1Type = {
  style?: StyleProp<ViewStyle>;
};

const FitnessNutrition1 = ({ style }: FitnessNutrition1Type) => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <Button
      mode="text"
      labelStyle={styles.fitnessNutritionBtn}
      onPress={() =>
        navigation.navigate("BottomTabsRoot", { screen: "FitnessNutrition" })
      }
    >{`Fitness & Nutrition`}</Button>
  );
};

const styles = StyleSheet.create({
  fitnessNutritionBtn: {
    color: "#000",
    fontSize: 20,
    fontFamily: "Inter-Regular",
    textTransform: "capitalize",
  },
});

export default FitnessNutrition1;
