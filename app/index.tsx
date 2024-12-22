import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LeaderBoard from "@/components/LeaderBoard";

const index = () => {
  return (
    <View style={styles.container}>
      <LeaderBoard />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
