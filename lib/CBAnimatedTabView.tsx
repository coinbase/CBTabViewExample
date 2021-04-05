import React, { memo, ReactElement } from "react";
import { Animated, FlatListProps, Platform, ViewProps } from "react-native";
import { Theme } from "./CBTheme";

// we provide this bc ios allows overscrolling but android doesn't
// so on ios because of pull to refresh / rubberbaanding we set scroll pos to negtaive header pos
// on android we set to 0 and makeup header height diff with contentinset padding
export const CBTabViewOffset = Platform.OS === "ios" ? -Theme.sizing.header : 0;

export interface CBAnimatedTabViewProps<T>
  extends ViewProps,
    Pick<
      FlatListProps<T>,
      | "data"
      | "getItemLayout"
      | "initialNumToRender"
      | "maxToRenderPerBatch"
      | "onContentSizeChange"
      | "onMomentumScrollBegin"
      | "onMomentumScrollEnd"
      | "onScrollEndDrag"
      | "renderItem"
      | "updateCellsBatchingPeriod"
      | "windowSize"
      | "ListEmptyComponent"
    > {
  onRef: (scrollableChild: Animated.FlatList<T>) => void;
  scrollY?: Animated.AnimatedValue;
  refreshControl?: ReactElement;
}
const CBAnimatedTabViewWithoutMemo = <T extends any>({
  data,
  renderItem,
  getItemLayout,
  onContentSizeChange,
  initialNumToRender,
  maxToRenderPerBatch,
  onMomentumScrollBegin,
  onMomentumScrollEnd,
  onScrollEndDrag,
  onRef,
  scrollY,
  refreshControl,
  ListEmptyComponent,
}: CBAnimatedTabViewProps<T>) => {
  const handleScroll =
    scrollY &&
    Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
      useNativeDriver: true,
    });

  return (
    <Animated.FlatList<T>
      style={{ marginBottom: Theme.sizing.tabbar }} //tabbar is absolutely positioned
      data={data as readonly Animated.WithAnimatedValue<T>[]}
      renderItem={renderItem}
      keyboardShouldPersistTaps="always"
      ListEmptyComponent={ListEmptyComponent}
      getItemLayout={getItemLayout}
      initialNumToRender={initialNumToRender}
      maxToRenderPerBatch={maxToRenderPerBatch}
      ref={onRef}
      refreshControl={refreshControl}
      onContentSizeChange={onContentSizeChange}
      onMomentumScrollBegin={onMomentumScrollBegin}
      onMomentumScrollEnd={onMomentumScrollEnd}
      onScroll={handleScroll}
      onScrollEndDrag={onScrollEndDrag}
      // ios has over scrolling and other things which make this look and feel nicer
      contentInset={Platform.select({ ios: { top: Theme.sizing.header } })}
      contentOffset={Platform.select({
        ios: {
          x: 0,
          y: -Theme.sizing.header,
        },
      })}
      contentContainerStyle={Platform.select({
        ios: {
          flexGrow: 1,
          paddingBottom: Theme.spacing.gutter,
        },
        android: {
          flexGrow: 1,
          paddingTop: Theme.sizing.header,
          paddingBottom: Theme.spacing.gutter,
        },
      })}
    />
  );
};
// Creating an unmemoized component and casting as that type is the only way
// I can get Typescript to respect the generics of the memoized function.
export const CBAnimatedTabView = memo(
  CBAnimatedTabViewWithoutMemo
) as typeof CBAnimatedTabViewWithoutMemo;
