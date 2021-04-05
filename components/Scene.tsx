import React, { FunctionComponent } from "react";
import {
  StyleSheet,
  RefreshControl,
  View,
  Text,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Animated,
  FlatList,
} from "react-native";
import { CBAnimatedTabView } from "../lib";

type ScrollEvent = NativeSyntheticEvent<NativeScrollEvent>;

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i) => ({
  title: `Title ${i}`,
  key: `key-${i}`,
}));

interface SceneProps {
  isActive: boolean;
  routeKey: string;
  scrollY: Animated.Value;
  trackRef: (key: string, ref: FlatList<any>) => void;
  onMomentumScrollBegin: (e: ScrollEvent) => void;
  onMomentumScrollEnd: (e: ScrollEvent) => void;
  onScrollEndDrag: (e: ScrollEvent) => void;
}

export const Scene: FunctionComponent<SceneProps> = ({
  isActive,
  routeKey,
  scrollY,
  trackRef,
  onMomentumScrollBegin,
  onMomentumScrollEnd,
  onScrollEndDrag,
}) => (
  <View style={styles.container}>
    <CBAnimatedTabView
      data={data}
      windowSize={3}
      initialNumToRender={15}
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={() => null} />
      }
      renderItem={({ item }) => (
        <View style={styles.container}>
          <View style={styles.inner}>
            <Text>{item.title}</Text>
          </View>
        </View>
      )}
      onRef={(ref: any) => {
        trackRef(routeKey, ref);
      }}
      scrollY={isActive ? scrollY : undefined}
      onScrollEndDrag={onScrollEndDrag}
      onMomentumScrollBegin={onMomentumScrollBegin}
      onMomentumScrollEnd={onMomentumScrollEnd}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
});
