import React, { useCallback } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  CBAnimatedNavBar,
  CBAnimatedHeader,
  CBAnimatedTabBar,
  CBTabRoute,
  CBTabView,
  CBTabBar,
} from "./lib";
import { useScrollManager } from "./hooks";
import { Scene, NavBar, NavBarTitle, Header } from "./components";

const initialWidth = Dimensions.get("window").width;
export type tabKeys = "all" | "tradable" | "gainers" | "losers";
export const tabs = [
  { key: "all" as tabKeys, title: "All assets" },
  { key: "gainers" as tabKeys, title: "Gainers" },
  { key: "losers" as tabKeys, title: "Losers" },
];

export default function App() {
  const {
    scrollY,
    index,
    setIndex,
    getRefForKey,
    ...sceneProps
  } = useScrollManager(tabs);

  const renderScene = useCallback(
    ({ route: tab }: { route: CBTabRoute }) => (
      <Scene
        isActive={tabs[index].key === tab.key}
        routeKey={tab.key}
        scrollY={scrollY}
        {...sceneProps}
      />
    ),
    [getRefForKey, index, tabs, scrollY]
  );

  return (
    <SafeAreaProvider>
      <NavBar>
        <CBAnimatedNavBar scrollY={scrollY}>
          <NavBarTitle />
        </CBAnimatedNavBar>
      </NavBar>

      <View style={styles.screen}>
        <CBAnimatedHeader scrollY={scrollY}>
          <Header />
        </CBAnimatedHeader>

        <CBTabView
          index={index}
          setIndex={setIndex}
          width={initialWidth}
          routes={tabs}
          renderTabBar={(p) => (
            <CBAnimatedTabBar scrollY={scrollY}>
              <CBTabBar {...p} />
            </CBAnimatedTabBar>
          )}
          renderScene={renderScene}
        />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
