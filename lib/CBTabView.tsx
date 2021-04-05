import React, { FunctionComponent, ReactNode } from "react";
import {
  NavigationState,
  SceneRendererProps,
  TabView,
  TabViewProps,
} from "react-native-tab-view";

export interface CBTabRoute {
  key: string;
  title: string;
}

export interface CBTabViewProps
  extends Pick<TabViewProps<CBTabRoute>, "renderScene"> {
  routes: CBTabRoute[];
  width: number;
  index: number;
  setIndex: (i: number) => void;
  renderTabBar: (
    props: SceneRendererProps & {
      navigationState: NavigationState<CBTabRoute>;
      setIndex: (i: number) => void;
    }
  ) => ReactNode;
  swipeEnabled?: boolean;
}

export const CBTabView: FunctionComponent<CBTabViewProps> = ({
  routes,
  width,
  renderTabBar,
  index,
  setIndex,
  renderScene,
  swipeEnabled = true,
}) => {
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={(p) =>
        renderTabBar({
          ...p,
          setIndex,
        })
      }
      onIndexChange={setIndex}
      initialLayout={{ width }}
      swipeEnabled={swipeEnabled}
    />
  );
};
