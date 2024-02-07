import React, { useState, useEffect, useRef } from "react";
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
  Button,
  FlatList,
} from "react-native";
import Card from "../components/Card";
import SearchPhotos from "../components/SearchPhotos";
import BottomSheetUI from "../components/BottomSheetUI";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import RenderMasonryList from "../components/RenderMasonryList";

export default function Home(props) {
  const [selectedCardID, setSelectedCardID] = useState(null);
  const [selectedCardName, setSelectedCardName] = useState(null);
  const [selectedCardImage, setSelectedCardImage] = useState(null);

  const [foto, setFoto] = useState([
    { name: "foto", key: 1 },
    { name: "foto", key: 2 },
    { name: "foto", key: 3 },
    { name: "foto", key: 4 },
    { name: "foto", key: 5 },
    { name: "foto", key: 6 },
    { name: "foto", key: 7 },
    { name: "foto", key: 8 },
  ]);

  const [gif, setGif] = useState([
    {
      name: "Ini Gif Satu",
      index: 1,
      image: require("../assets/images/bunga.png"),
    },
    {
      name: "Ini Gif Dua",
      index: 2,
      image: require("../assets/images/kucing.png"),
    },
    {
      name: "Ini Gif Tiga",
      index: 3,
      image: require("../assets/images/gigi.png"),
    },
    {
      name: "Ini Gif Empat",
      index: 4,
      image: require("../assets/images/kucing.png"),
    },
    {
      name: "Ini Gif Lima",
      index: 5,
      image: require("../assets/images/gigi.png"),
    },
    {
      name: "Ini Gif Enam",
      index: 6,
      image: require("../assets/images/bunga.png"),
    },
    {
      name: "Ini Gif Satu",
      index: 7,
      image: require("../assets/images/placeholder-image-3.png"),
    },
    {
      name: "Ini Gif Satu",
      index: 8,
      image: require("../assets/images/placeholder-image-3.png"),
    },
    {
      name: "Ini Gif Satu",
      index: 9,
      image: require("../assets/images/placeholder-image-3.png"),
    },
    {
      name: "Ini Gif Satu",
      index: 10,
      image: require("../assets/images/placeholder-image-3.png"),
    },
  ]);

  const [vector, setVector] = useState([
    { name: "vector", key: 1 },
    { name: "vector", key: 2 },
    { name: "vector", key: 3 },
    { name: "vector", key: 4 },
    { name: "vector", key: 5 },
    { name: "vector", key: 6 },
    { name: "vector", key: 7 },
    { name: "vector", key: 8 },
  ]);

  const [activeCategory, setActiveCategory] = useState("foto");

  const handleCategoryPress = (category) => {
    setActiveCategory(category);
  };

  const sheetRef = useRef(null);

  const openBottomSheet = (cardID, cardName, cardImage) => {
    setSelectedCardID(cardID);
    setSelectedCardName(cardName);
    setSelectedCardImage(cardImage);
    sheetRef.current?.open();
  };

  const renderContent = () => {
    switch (activeCategory) {
      case "gif":
        return (
          <RenderMasonryList gif={gif} openBottomSheet={openBottomSheet} />
        );
      case "foto":
        return (
          <>
            <RenderMasonryList gif={gif} openBottomSheet={openBottomSheet} />
          </>
        );
      case "vector":
        return (
          <RenderMasonryList gif={gif} openBottomSheet={openBottomSheet} />
        );
      default:
        return null;
    }
  };

  console.log("Card Image : ", selectedCardImage);

  return (
    <>
      <View style={styles.container}>
        <SearchPhotos />
        <View style={styles.categoryContainer}>
          <TouchableOpacity
            style={[
              styles.category,
              activeCategory === "gif" && styles.activeCategory,
            ]}
            onPress={() => handleCategoryPress("gif")}
          >
            <MaterialCommunityIcon
              name="file-gif-box"
              size={20}
              color="#888"
              style={[activeCategory === "gif" && styles.activeGifIcon]}
            />
            <Text
              style={[activeCategory === "gif" && styles.activeGifCategory]}
            >
              GIF
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.category,
              activeCategory === "foto" && styles.activeCategory,
            ]}
            onPress={() => handleCategoryPress("foto")}
          >
            <MaterialIcon
              name="photo-camera"
              size={20}
              color="#888"
              style={[activeCategory === "foto" && styles.activeGifIcon]}
            />
            <Text
              style={[
                activeCategory === "foto"
                  ? styles.activeGifCategory
                  : styles.text,
              ]}
            >
              Foto
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.category,
              activeCategory === "vector" && styles.activeCategory,
            ]}
            onPress={() => handleCategoryPress("vector")}
          >
            <FontAwesome
              name="paint-brush"
              size={20}
              color="#888"
              style={[activeCategory === "vector" && styles.activeGifIcon]}
            />
            <Text
              style={[
                activeCategory === "vector"
                  ? styles.activeGifCategory
                  : styles.text,
              ]}
            >
              Vector
            </Text>
          </TouchableOpacity>
        </View>
        {renderContent()}
      </View>
      <BottomSheetUI
        ref={sheetRef}
        height={685}
        id={selectedCardID}
        name={selectedCardName}
        image={selectedCardImage}
      />
    </>
  );
}

const styles = StyleSheet.create({
  bottomSheetContent: {
    padding: 20,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "scroll",
  },
  item: {
    borderRadius: 8,
    padding: 16,
    marginTop: 24,
    backgroundColor: "rgba(169, 50, 157, 0.25)",
    fontSize: 24,
    height: 200,
    width: "50%",
  },
  container: {
    marginTop: 35,
    padding: 20,
    fontFamily: "Poppins-Regular",
  },

  category: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#ECECEC",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  categoryContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 25,
    marginBottom: 16,
    fontFamily: "Poppins-Regular",
  },
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
  },
  icon: {
    marginRight: 10,
  },
  activeCategory: {
    backgroundColor: "rgba(169, 50, 157, 0.20)",
    borderColor: "rgba(169, 50, 157, 0.20)",
  },
  activeGifCategory: {
    fontFamily: "Poppins-Bold",
  },
  activeGifIcon: {
    color: "rgba(169, 50, 157, 0.60)",
  },
  card: {
    borderRadius: 24,
  },
  image: {
    width: "100%",
    height: "80%",
    resizeMode: "cover",
    borderRadius: 20,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  text: {
    fontFamily: "Poppins-Regular",
  },
  textBold: {
    fontFamily: "Poppins-Bold",
  },
});
