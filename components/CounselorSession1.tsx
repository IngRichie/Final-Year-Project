import * as React from "react";
import { Button } from "react-native-paper";
import { StyleProp, ViewStyle, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";

export type CounselorSession1Type = {
  style?: StyleProp<ViewStyle>;
};

const CounselorSession1 = ({ style }: CounselorSession1Type) => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <Button
      mode="text"
      labelStyle={styles.counselorSessionBtn}
      onPress={() => navigation.navigate("CounselorSession")}
    >
      Counselor Session
    </Button>
  );
};

const styles = StyleSheet.create({
  counselorSessionBtn: {
    color: "#000",
    fontSize: 20,
    fontFamily: "Inter-Regular",
    textTransform: "capitalize",
  },
});

export default CounselorSession1;
