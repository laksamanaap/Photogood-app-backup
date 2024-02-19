import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useRef } from "react";
import RenderMasonryAlbum from "../components/RenderMasonryAlbum";
import AntDesign from "react-native-vector-icons/AntDesign";
import SearchAlbum from "../components/SearchAlbum";
import BottomSheetUI from "../components/BottomSheetAlbum";

export default function Album() {
  const [selectedCardID, setSelectedCardID] = useState(null);
  const [selectedCardName, setSelectedCardName] = useState(null);
  const [selectedCardImage, setSelectedCardImage] = useState(null);

  const openBottomSheet = (cardID, cardName, cardImage) => {
    sheetRef.current?.open();
  };

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
  ]);

  const sheetRef = useRef(null);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.albumTop}>
          <Text style={styles.albumTitle}>Jelajahi Album</Text>
          <TouchableOpacity
            style={styles.albumIcon}
            onPress={() => openBottomSheet()}
          >
            <AntDesign name="pluscircle" size={25} color="#A9329D" />
          </TouchableOpacity>
        </View>
        <SearchAlbum />
      </View>
      <RenderMasonryAlbum gif={gif} />
      <BottomSheetUI ref={sheetRef} height={600} />
    </>
  );
}

const styles = StyleSheet.create({
  container: { padding: 30 },
  albumTitle: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
  },
  albumTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
});
