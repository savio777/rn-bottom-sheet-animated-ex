import {
  ReactNode,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from "react";
import { Dimensions, FlatListProps, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  AnimatedProps,
  AnimatedScrollViewProps,
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import BackDrop from "./BackDrop";

const configWithSpring = { damping: 100, stiffness: 400 };

type IProps = {
  snapTo: string;
  children?: ReactNode;
};

export type IBottomSheetMethods = {
  expand: () => void;
  close: () => void;
};

const BottomSheetFlatlist = forwardRef<
  IBottomSheetMethods,
  IProps & FlatListProps
>(({ snapTo, children, ...rest }, ref) => {
  const inset = useSafeAreaInsets();
  const { height } = Dimensions.get("screen");

  const closeHeight = height;
  const percentage = parseFloat(snapTo.replace("%", "")) / 100;
  const openHeight = height - height * percentage;

  const topAnimation = useSharedValue(closeHeight);
  const contextTopAnimation = useSharedValue(0);
  const scrollBegin = useSharedValue(0);
  const scrollY = useSharedValue(0);

  const [enableScroll, setEnableScroll] = useState(true);

  const animationStyle = useAnimatedStyle(() => {
    const top = topAnimation.value;

    return {
      top,
    };
  });

  const expand = useCallback(() => {
    "worklet";
    topAnimation.value = withTiming(openHeight);
  }, [topAnimation, openHeight]);

  const close = useCallback(() => {
    "worklet";
    topAnimation.value = withTiming(closeHeight);
  }, [topAnimation, closeHeight]);

  useImperativeHandle(
    ref,
    () => ({
      expand,
      close,
    }),
    [expand, close]
  );

  const pan = Gesture.Pan()
    .onBegin(() => {
      contextTopAnimation.value = topAnimation.value;
    })
    .onUpdate((e) => {
      const translationY = e.translationY;

      // dont pass limit init height
      if (translationY < 0) {
        topAnimation.value = withSpring(openHeight, configWithSpring);

        return;
      }

      topAnimation.value = withSpring(
        translationY + contextTopAnimation.value,
        configWithSpring
      );
    })
    .onEnd(() => {
      if (topAnimation.value > openHeight + 100) {
        topAnimation.value = withSpring(closeHeight, configWithSpring);

        return;
      }

      topAnimation.value = withSpring(openHeight, configWithSpring);
    });

  const onScroll = useAnimatedScrollHandler({
    onBeginDrag: (e) => {
      scrollBegin.value = e.contentOffset.y;
    },
    onScroll: (e) => {
      scrollY.value = e.contentOffset.y;
    },
  });

  const panScroll = Gesture.Pan()
    .onBegin(() => {
      contextTopAnimation.value = topAnimation.value;
    })
    .onUpdate((e) => {
      const translationY = e.translationY;

      // dont pass limit init height
      if (translationY < 0) {
        topAnimation.value = withSpring(openHeight, configWithSpring);

        return;
      }

      if (translationY > 0 && scrollY.value === 0) {
        runOnJS(setEnableScroll)(false);
        topAnimation.value = withSpring(
          Math.max(
            contextTopAnimation.value + translationY - scrollBegin.value,
            openHeight
          ),
          configWithSpring
        );
      }
    })
    .onEnd(() => {
      runOnJS(setEnableScroll)(true);
      if (topAnimation.value > openHeight + 100) {
        topAnimation.value = withSpring(closeHeight, configWithSpring);

        return;
      }

      topAnimation.value = withSpring(openHeight, configWithSpring);
    });

  const scrollGesture = Gesture.Native();

  return (
    <>
      <BackDrop
        topAnimation={topAnimation}
        closeHeight={closeHeight}
        openHeight={openHeight}
        close={close}
      />

      <GestureDetector gesture={pan}>
        <Animated.View
          style={[
            styles.container,
            animationStyle,
            {
              paddingBottom: inset.bottom,
            },
          ]}
        >
          <View style={styles.line} />

          <GestureDetector
            gesture={Gesture.Simultaneous(panScroll, scrollGesture)}
          >
            <Animated.FlatList
              {...rest}
              showsVerticalScrollIndicator
              scrollEventThrottle={16}
              onScroll={onScroll}
              bounces={false}
              scrollEnabled={enableScroll}
            />
          </GestureDetector>
        </Animated.View>
      </GestureDetector>
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 222,
  },
  line: {
    alignSelf: "center",
    marginVertical: 10,
    width: 50,
    height: 4,
    backgroundColor: "black",
    borderRadius: 20,
  },
});

export default BottomSheetFlatlist;
