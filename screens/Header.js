import React from "react";
import { TouchableOpacity, Text } from "react-native";

export default function Header({ handleLogout }) {
  return (
    <TouchableOpacity onPress={handleLogout}>
      <Text>Logout</Text>
    </TouchableOpacity>
  );
}
