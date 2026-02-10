import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

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
      [0, 0.7],
    );

    // hide the backdrop when the sheet is at (or very near) the closed position
    const display = topAnimation.value >= closeHeight - 0.5 ? 'none' : 'flex';

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
    display: 'none',
    backgroundColor: 'black',
  },
});

export default BackDrop;
