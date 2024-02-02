import { StyleSheet, Text, View } from "react-native";
import { lorem } from "../../data/index";

const ExampleLoremText = () => {
  return (
    <View>
      <Text style={styles.text}>{lorem}</Text>
    </View>
  );
};

export default ExampleLoremText;

const styles = StyleSheet.create({
  text: {
    padding: 10,
    color: "black",
  },
});
