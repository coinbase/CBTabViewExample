import React, {
  FunctionComponent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { Animated } from "react-native";

import { CBTabViewOffset } from "./CBAnimatedTabView";
import { Theme } from "./CBTheme";

export interface CBAnimatedNavBarProps {
  scrollY: Animated.AnimatedValue;
  children: ReactNode;
}

export const CBAnimatedNavBar: FunctionComponent<CBAnimatedNavBarProps> = ({
  children,
  scrollY,
}) => {
  const [showTitle, setShowTitle] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: showTitle ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [opacity, showTitle]);

  useEffect(() => {
    const listener = scrollY?.addListener(({ value }) => {
      setShowTitle(value > CBTabViewOffset + Theme.sizing.header * 0.6);
    });

    return () => {
      scrollY?.removeListener(listener);
    };
  });

  return <Animated.View style={{ opacity }}>{children}</Animated.View>;
};
