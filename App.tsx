import "react-native-gesture-handler";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { useCallback, useRef } from "react";

import BottomSheet, { IBottomSheetMethods } from "./src/components/BottomSheet";
import ContentBottomSheetExample from "./src/components/example/ContentBottomSheetExample";
import ExampleLoremText from "./src/components/example/ExampleLoremText";
import BottomSheetScroll from "./src/components/BottomSheetScroll";

export default function App() {
  const bottomSheetRef = useRef<IBottomSheetMethods>(null);
  const bottomSheetExRef = useRef<IBottomSheetMethods>(null);
  const bottomSheetExScrollRef = useRef<IBottomSheetMethods>(null);

  const expandHandler = useCallback(() => {
    bottomSheetRef?.current?.expand();
  }, []);

  const expandExHandler = useCallback(() => {
    bottomSheetExRef?.current?.expand();
  }, []);

  const expandExScrollHandler = useCallback(() => {
    bottomSheetExScrollRef?.current?.expand();
  }, []);

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={styles.wrapper}>
        <SafeAreaView style={styles.wrapper}>
          <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={expandHandler}>
              <Text style={styles.buttonText}>open</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={expandExHandler}>
              <Text style={styles.buttonText}>open ex</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={expandExScrollHandler}
            >
              <Text style={styles.buttonText}>open ex scroll</Text>
            </TouchableOpacity>
          </View>

          <BottomSheet ref={bottomSheetRef} snapTo="50%" />

          <BottomSheet ref={bottomSheetExRef} snapTo="75%">
            <ContentBottomSheetExample />
          </BottomSheet>

          <BottomSheetScroll ref={bottomSheetExScrollRef} snapTo="50%">
            <ExampleLoremText />
          </BottomSheetScroll>

          <StatusBar style="light" />
        </SafeAreaView>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: "black" },
  container: {
    flex: 1,
    gap: 16,
    padding: 16,
    paddingTop: 32,
  },
  button: {
    width: "100%",
    padding: 8,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "white",
  },
  buttonText: { fontWeight: "bold", color: "white" },
});
