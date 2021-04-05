import React, { FunctionComponent, ReactNode } from "react";
import { Animated, StyleSheet, ViewProps, View } from "react-native";

import { CBTabViewOffset } from "./CBAnimatedTabView";
import { Theme } from "./CBTheme";

export interface CBAnimatedTabBarProps extends Omit<ViewProps, "style"> {
  scrollY: Animated.AnimatedValue;
  children: ReactNode;
}

export const CBAnimatedTabBar: FunctionComponent<CBAnimatedTabBarProps> = ({
  children,
  scrollY,
  ...otherProps
}) => {
  const translateY = scrollY.interpolate({
    inputRange: [CBTabViewOffset, CBTabViewOffset + Theme.sizing.header],
    outputRange: [Theme.sizing.header, 0],
    extrapolate: "clamp",
  });

  const opacity = scrollY.interpolate({
    inputRange: [
      CBTabViewOffset + Theme.sizing.header,
      CBTabViewOffset + Theme.sizing.header + 20,
    ],
    outputRange: [0, 1],
    extrapolateRight: "clamp",
  });

  return (
    <Animated.View
      style={[styles.tabBar, { transform: [{ translateY }] }]}
      {...otherProps}
    >
      {children}
      <Animated.View style={{ opacity }}>
        <View style={styles.border} />
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    width: "100%",
    zIndex: 10,
    backgroundColor: "#fff",
  },
  border: {
    height: 1,
    backgroundColor: "#eee",
  },
});
