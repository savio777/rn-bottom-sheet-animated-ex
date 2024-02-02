import {
  ForwardRefRenderFunction,
  ReactNode,
  forwardRef,
  useCallback,
  useImperativeHandle,
} from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
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

const BottomSheet = forwardRef<IBottomSheetMethods, IProps>(
  ({ snapTo, children }, ref) => {
    const { height } = Dimensions.get("screen");

    const closeHeight = height;
    const percentage = parseFloat(snapTo.replace("%", "")) / 100;
    const openHeight = height - height * percentage;

    const topAnimation = useSharedValue(closeHeight);
    const contextTopAnimation = useSharedValue(0);

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

    return (
      <>
        <BackDrop
          topAnimation={topAnimation}
          closeHeight={closeHeight}
          openHeight={openHeight}
          close={close}
        />

        <GestureDetector gesture={pan}>
          <Animated.View style={[styles.container, animationStyle]}>
            <View style={styles.line} />

            {children}
          </Animated.View>
        </GestureDetector>
      </>
    );
  }
);

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

export default BottomSheet;
