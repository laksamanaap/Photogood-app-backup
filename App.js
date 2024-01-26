import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import AuthNavigator from "./routes/authStack";
import ClientNavigator from "./routes/indexStack";

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <>
      {authenticated ? (
        <ClientNavigator />
      ) : (
        <AuthNavigator setAuthenticated={setAuthenticated} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
