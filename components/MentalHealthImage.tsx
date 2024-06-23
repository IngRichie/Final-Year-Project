import * as React from "react";
import { StyleProp, ViewStyle, StyleSheet } from "react-native";
import { Image } from "expo-image";

export type MentalHealthImageType = {
  style?: StyleProp<ViewStyle>;
};

const MentalHealthImage = ({ style }: MentalHealthImageType) => {
  return (
    <Image
      style={[styles.mentalHealthIcon, style]}
      contentFit="cover"
      source={require("../assets/mental-health1.png")}
    />
  );
};

const styles = StyleSheet.create({
  mentalHealthIcon: {
    width: 71,
    height: 44,
  },
});

export default MentalHealthImage;
