import * as React from "react";
import { StyleProp, ViewStyle, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";

export type FitnessType = {
  style?: StyleProp<ViewStyle>;
};

const Fitness = ({ style }: FitnessType) => {
  return (
    <View style={[styles.fitness, style]}>
      <Image
        style={styles.fitnessIcon}
        contentFit="cover"
        source={require("../assets/fitness-icon1.png")}
      />
      <Text style={styles.fitnessNutrition}>{`Fitness & Nutrition`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  fitnessIcon: {
    width: 31,
    height: 26,
  },
  fitnessNutrition: {
    fontSize: 11,
    lineHeight: 15,
    fontFamily: "Inter-Regular",
    color: "#004d9a",
    textAlign: "left",
    width: 96,
    marginTop: 5,
  },
  fitness: {
    alignItems: "center",
  },
});

export default Fitness;
