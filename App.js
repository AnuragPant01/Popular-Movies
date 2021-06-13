import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigation from "./src/app/index";
import Toast from "react-native-toast-message";

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <AppNavigation />
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </NavigationContainer>
  );
}
