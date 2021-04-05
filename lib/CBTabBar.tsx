import React, { FunctionComponent, useCallback, useMemo, useRef } from "react";
import {
  findNodeHandle,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Pressable,
} from "react-native";
import { NavigationState, SceneRendererProps } from "react-native-tab-view";

import { CBTabRoute } from "./CBTabView";

export interface CBTabBarProps extends SceneRendererProps {
  navigationState: NavigationState<CBTabRoute>;
  setIndex: (index: number) => void;
}

export const CBTabBar: FunctionComponent<CBTabBarProps> = ({
  navigationState,
  setIndex,
}) => {
  const scrollRef = useRef<ScrollView>(null);
  const tabs = useMemo(() => {
    return navigationState.routes.map((route: any, index: number) => {
      return (
        <CBTabBarButton
          key={index}
          index={index}
          onPress={setIndex}
          title={route.title}
          active={navigationState.index === index}
          scrollViewRef={scrollRef.current}
        />
      );
    });
  }, [navigationState.index, navigationState.routes, setIndex]);

  return <View style={styles.tabBar}>{tabs}</View>;
};

interface TabBarButtonProps {
  active: boolean;
  index: number;
  onPress: (index: number) => void;
  title: string;
  scrollViewRef: ScrollView | null;
}

const CBTabBarButton: FunctionComponent<TabBarButtonProps> = ({
  active,
  index,
  onPress,
  title,
  scrollViewRef,
}) => {
  const xPosition = useRef<number | null>(null);

  const handleRef = useCallback(
    (el: View | null) => {
      const scrollNode = findNodeHandle(scrollViewRef);
      if (el && scrollNode) {
        el.measureLayout(
          scrollNode,
          (offsetX) => {
            xPosition.current = offsetX;
          },
          () => {}
        );
      }
    },
    [scrollViewRef]
  );

  const wrappedOnPress = useCallback(() => {
    if (xPosition.current) {
      scrollViewRef?.scrollTo({
        x: index === 0 ? 0 : xPosition.current,
        y: 0,
        animated: true,
      });
    }
    return onPress(index);
  }, [index, onPress, scrollViewRef]);

  return (
    <Pressable onPress={wrappedOnPress}>
      <View
        ref={handleRef}
        style={[
          styles.pill,
          {
            backgroundColor: active ? "#eee" : "transparent",
          },
        ]}
      >
        <Text>{title}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 0,
  },
  contentContainer: {
    flexGrow: 1,
  },
  pill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  tabBar: {
    flexDirection: "row",
    paddingBottom: 16,
    paddingLeft: 32,
  },
});
