import * as React from "react";
import { Button } from "react-native-paper";
import { StyleProp, ViewStyle, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";

export type Settings1Type = {
  style?: StyleProp<ViewStyle>;
};

const Settings1 = ({ style }: Settings1Type) => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <Button
      mode="text"
      labelStyle={styles.settingsBtn}
      onPress={() => navigation.navigate("Settings")}
    >
      Settings
    </Button>
  );
};

const styles = StyleSheet.create({
  settingsBtn: {
    color: "#000",
    fontSize: 20,
    textTransform: "capitalize",
    fontFamily: "Inter-Regular",
  },
});

export default Settings1;
