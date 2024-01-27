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
import { useFonts } from "expo-font";
import AppLoading from "./components/AppLoading";

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);

  const handleAuthenticated = () => {
    setAuthenticated(true);
  };

  const handleLogout = () => {
    setAuthenticated(false);
  };

  let [fontsLoaded] = useFonts({
    "Poppins-Regular": require("./assets/font/Poppins-Regular.ttf"),
  });

  return (
    <>
      <View style={styles.container}>
        {authenticated ? (
          <ClientNavigator screenProps={{ handleLogout: handleLogout }} />
        ) : (
          <AuthNavigator
            screenProps={{ handleAuthenticated: handleAuthenticated }}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    fontFamily: "Poppins-Regular",
  },
});
