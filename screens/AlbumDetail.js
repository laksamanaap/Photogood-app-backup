import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import RenderMasonryAlbumDetail from "../components/RenderMasonryAlbumDetail";
import Entypo from "react-native-vector-icons/Entypo";

export default function AlbumDetail({ navigation }) {
  const [gif, setGif] = useState([
    {
      name: "Album kenangan",
      index: 1,
      image: require("../assets/images/bunga.png"),
      totalData: 14,
    },
    {
      name: "Album kenangan",
      index: 2,
      image: require("../assets/images/kucing.png"),
      totalData: 12,
    },
    {
      name: "Album kenangan",
      index: 3,
      image: require("../assets/images/gigi.png"),
      totalData: 24,
    },
    {
      name: "Album kenangan",
      index: 4,
      image: require("../assets/images/gigi.png"),
      totalData: 24,
    },
    {
      name: "Album kenangan",
      index: 5,
      image: require("../assets/images/gigi.png"),
      totalData: 24,
    },
    {
      name: "Album kenangan",
      index: 5,
      image: require("../assets/images/gigi.png"),
      totalData: 24,
    },

    {
      name: "Album kenangan",
      index: 5,
      image: require("../assets/images/gigi.png"),
      totalData: 24,
    },
    {
      name: "Album kenangan",
      index: 5,
      image: require("../assets/images/gigi.png"),
      totalData: 24,
    },
    {
      name: "Album kenangan",
      index: 5,
      image: require("../assets/images/gigi.png"),
      totalData: 24,
    },
    {
      name: "Album kenangan",
      index: 5,
      image: require("../assets/images/gigi.png"),
      totalData: 24,
    },
  ]);

  return (
    <>
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View
            style={{
              marginTop: 16,
              marginLeft: 16,
              backgroundColor: "#A9329D",
              borderRadius: 50,
              padding: 4,
            }}
          >
            <Entypo name="chevron-left" size={26} color="white" />
          </View>
        </TouchableOpacity>
        <View style={styles.marginContainer}>
          <Text style={styles.AlbumTitle}>Album Kenangan</Text>
          <Text style={styles.AlbumSubtitle}>10 Foto</Text>
        </View>
      </View>
      <View style={styles.container}>
        <RenderMasonryAlbumDetail gif={gif} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 32,
    gap: 16,
  },
  marginContainer: {
    marginTop: 18,
  },
  container: {
    paddingHorizontal: 30,
    marginTop: 24,
  },
  AlbumTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 16,
  },
  AlbumSubtitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
  },
});
