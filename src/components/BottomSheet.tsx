import {
  ForwardRefRenderFunction,
  forwardRef,
  useCallback,
  useImperativeHandle,
} from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type IProps = {
  snapTo: string;
};

export type IBottomSheetMethods = {
  expand: () => void;
  close: () => void;
};

const BottomSheet = forwardRef<IBottomSheetMethods, IProps>(
  ({ snapTo }, ref) => {
    const { height } = Dimensions.get("screen");

    const closeHeight = height;
    const percentage = parseFloat(snapTo.replace("%", "")) / 100;
    const openHeight = height - height * percentage;

    const topAnimation = useSharedValue(closeHeight);
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

    return (
      <Animated.View style={[styles.container, animationStyle]}>
        <View style={styles.lineContainer}>
          <View style={styles.line}></View>
        </View>
      </Animated.View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  lineContainer: { alignItems: "center", marginVertical: 10 },
  line: { width: 50, height: 4, backgroundColor: "black", borderRadius: 20 },
});

export default BottomSheet;
