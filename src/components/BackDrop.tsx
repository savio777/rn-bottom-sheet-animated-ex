import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

type IProps = {
  topAnimation: SharedValue<number>;
  openHeight: number;
  closeHeight: number;
  close: () => void;
};

const BackDrop: React.FC<IProps> = ({
  close,
  closeHeight,
  openHeight,
  topAnimation,
}) => {
  const backdropAnimation = useAnimatedStyle(() => {
    const opacity = interpolate(
      topAnimation.value,
      [closeHeight, openHeight],
      [0, 0.7]
    );

    const display = opacity === 0 ? "none" : "display";

    return { opacity, display };
  });

  return (
    <TouchableWithoutFeedback onPress={close}>
      <Animated.View style={[styles.container, backdropAnimation]} />
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    display: "none",
    backgroundColor: "black",
  },
});

export default BackDrop;
