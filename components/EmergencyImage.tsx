import * as React from "react";
import { StyleProp, ViewStyle, StyleSheet } from "react-native";
import { Image } from "expo-image";

export type EmergencyImageType = {
  style?: StyleProp<ViewStyle>;
};

const EmergencyImage = ({ style }: EmergencyImageType) => {
  return (
    <Image
      style={[styles.emergencyIcon, style]}
      contentFit="cover"
      source={require("../assets/emergency1.png")}
    />
  );
};

const styles = StyleSheet.create({
  emergencyIcon: {
    width: 57,
    height: 45,
  },
});

export default EmergencyImage;
