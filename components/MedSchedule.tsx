import * as React from "react";
import { Button } from "react-native-paper";
import { StyleProp, ViewStyle, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";

export type MedScheduleType = {
  style?: StyleProp<ViewStyle>;
};

const MedSchedule = ({ style }: MedScheduleType) => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <Button
      mode="text"
      labelStyle={styles.medScheduleBtn}
      onPress={() => navigation.navigate("MedReminder")}
    >
      Med Schedule
    </Button>
  );
};

const styles = StyleSheet.create({
  medScheduleBtn: {
    color: "#000",
    fontSize: 20,
    fontFamily: "Inter-Regular",
    textTransform: "capitalize",
  },
});

export default MedSchedule;
