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

export default function App() {
  const bottomSheetRef = useRef<IBottomSheetMethods>(null);

  const expandHandler = useCallback(() => {
    bottomSheetRef?.current?.expand();
  }, []);

  const closeHandler = useCallback(() => {
    bottomSheetRef?.current?.close();
  }, []);

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={styles.wrapper}>
        <SafeAreaView style={styles.wrapper}>
          <BottomSheet ref={bottomSheetRef} snapTo="50%" />

          <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={expandHandler}>
              <Text style={styles.buttonText}>open</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={closeHandler}>
              <Text style={styles.buttonText}>close</Text>
            </TouchableOpacity>
          </View>

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
    paddingTop: 150,
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
