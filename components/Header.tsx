import React from "react";
import { Text, StyleSheet } from "react-native";

export const Header = () => (
  <>
    <Text style={styles.title}>CBTabView</Text>
    <Text style={styles.subtitle}>A Scrollable header, tab example.</Text>
  </>
);

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 4,
  },
  subtitle: {
    fontSize: 12,
  },
});
