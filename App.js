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
import Header from "./screens/Header";

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);

  const handleAuthenticated = () => {
    setAuthenticated(true);
  };

  const handleLogout = () => {
    <Header handleLogout={handleLogout} />;
    setAuthenticated(false);
  };

  return (
    <>
      {authenticated ? (
        <>
          <ClientNavigator screenProps={{ handleLogout: handleLogout }} />
        </>
      ) : (
        <AuthNavigator
          screenProps={{ handleAuthenticated: handleAuthenticated }}
        />
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
