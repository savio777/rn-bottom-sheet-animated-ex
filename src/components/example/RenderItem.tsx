import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { IData } from "../../data";

type Props = {
  item: IData;
};

const RenderItem = ({ item }: Props) => (
  <TouchableOpacity
    onPress={() => console.log(`${item.text} ${item.id}`)}
    style={[styles.container]}
  >
    <View style={styles.imageContainer}>
      <Image source={item.image} style={styles.image} />
    </View>
    <Text style={styles.text}>{item.text}</Text>
    <Text style={styles.text}>{item.id}</Text>
  </TouchableOpacity>
);

export default RenderItem;

const styles = StyleSheet.create({
  container: {
    padding: 14,
    marginHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  imageContainer: {
    backgroundColor: "#572ce8",
    padding: 10,
    borderRadius: 8,
  },
  image: {
    width: 30,
    height: 30,
  },
  text: {
    color: "black",
    fontSize: 16,
  },
});
