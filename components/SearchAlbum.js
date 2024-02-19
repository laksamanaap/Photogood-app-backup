import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Button,
  FlatList,
  KeyboardAvoidingView,
} from "react-native";
import React, { Component, useState, useEffect } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import client from "../utils/client";

const SearchPhotos = ({ onSearchResults }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <View style={styles.inputSearchContainer}>
      <AntDesign name="search1" size={20} color="#888" style={styles.icon} />
      <TextInput
        style={styles.inputSearch}
        placeholder="Temukan Album Anda"
        onChangeText={(text) => setSearchQuery(text)}
      />
    </View>
  );
};

export default SearchPhotos;

const styles = StyleSheet.create({
  inputSearchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ECECEC",
    height: 40,
    width: "100%",
    borderRadius: 50,
    paddingHorizontal: 15,
  },
  inputSearch: {
    flex: 1,
    marginLeft: 5,
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
  icon: {
    marginRight: 10,
  },
});
