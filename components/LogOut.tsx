import * as React from "react";
import { Button } from "react-native-paper";
import { StyleProp, ViewStyle, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";

export type LogOutType = {
  style?: StyleProp<ViewStyle>;
};

const LogOut = ({ style }: LogOutType) => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <Button
      mode="text"
      labelStyle={styles.logOutBtn}
      onPress={() => navigation.navigate("LoginScreen")}
    >
      Log Out
    </Button>
  );
};

const styles = StyleSheet.create({
  logOutBtn: {
    color: "#000",
    fontSize: 25,
    fontFamily: "Inter-Regular",
  },
});

export default LogOut;
