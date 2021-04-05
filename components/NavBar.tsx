import React, { FunctionComponent, ReactNode } from "react";
import { Animated, StyleSheet, View, ViewStyle, Text } from "react-native";
import { useSafeArea } from "react-native-safe-area-context";

export const NAV_HEADER_HEIGHT = 82;
export const NAV_TITLE_HEIGHT = 56;

export const NavBar: FunctionComponent = ({ children }) => {
  const { top: paddingTop } = useSafeArea();

  return (
    <View style={[styles.container, { paddingTop }]}>
      <Animated.View style={[styles.titleContainer]}>{children}</Animated.View>
    </View>
  );
};

export const NavBarTitle = () => (
  <Text style={styles.title}>This is the title.</Text>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    zIndex: 10,
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: NAV_TITLE_HEIGHT,
    flexGrow: 1,
  },
  title: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
});
