import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useState, useRef } from "react";
import RenderMasonryList from "../components/RenderMasonryList";
import BottomSheetUI from "../components/BottomSheetUI";

export default function Bookmark({ navigation }) {
  const [selectedCardID, setSelectedCardID] = useState(null);
  const [selectedCardName, setSelectedCardName] = useState(null);
  const [selectedCardImage, setSelectedCardImage] = useState(null);
  const [profileImage, setProfileImage] = useState(
    require("../assets/images/placeholder-image-3.png")
  );
  console.log("Navigation : ", navigation);

  const [activeTab, setActiveTab] = useState("posts");

  const sheetRef = useRef(null);

  const openBottomSheet = (cardID, cardName, cardImage) => {
    setSelectedCardID(cardID);
    setSelectedCardName(cardName);
    setSelectedCardImage(cardImage);
    sheetRef.current?.open();
  };

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
  ]);

  const posts = [
    {
      key: 1,
      image: require("../assets/images/placeholder-image-3.png"),
    },
    {
      key: 2,
      image: require("../assets/images/placeholder-image-3.png"),
    },
    {
      key: 3,
      image: require("../assets/images/placeholder-image-3.png"),
    },
    {
      key: 4,
      image: require("../assets/images/placeholder-image-3.png"),
    },
    {
      key: 5,
      image: require("../assets/images/placeholder-image-3.png"),
    },
    {
      key: 6,
      image: require("../assets/images/placeholder-image-3.png"),
    },
    {
      key: 7,
      image: require("../assets/images/placeholder-image-3.png"),
    },
    {
      key: 8,
      image: require("../assets/images/placeholder-image-3.png"),
    },
    {
      key: 9,
      image: require("../assets/images/placeholder-image-3.png"),
    },
    {
      key: 10,
      image: require("../assets/images/placeholder-image-3.png"),
    },
    {
      key: 11,
      image: require("../assets/images/placeholder-image-3.png"),
    },
  ];

  const savedItems = [
    {
      key: 1,
      image: require("../assets/images/placeholder-image-3.png"),
    },
    {
      key: 2,
      image: require("../assets/images/placeholder-image-3.png"),
    },
  ];

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    return (
      <TouchableOpacity
        onPress={() => openBottomSheet(item.key, item.name, item.image)}
      >
        <RenderMasonryList gif={gif} openBottomSheet={openBottomSheet} />
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={{}}>
        <View style={styles.container}>
          <Image
            style={styles.profileImage}
            source={profileImage}
            resizeMode="contain"
          />
          <View style={{ marginBottom: 20 }}>
            <TouchableOpacity
              style={[styles.tabButton]}
              onPress={() => navigation.navigate("Profile")}
            >
              <Text style={styles.tabButtonText}>Edit Profil</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.tabButton,
                activeTab === "posts" && styles.activeTabButton,
              ]}
              onPress={() => handleTabChange("posts")}
            >
              <Text style={styles.tabButtonText}>Postingan Anda</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tabButton,
                activeTab === "saved" && styles.activeTabButton,
              ]}
              onPress={() => handleTabChange("saved")}
            >
              <Text style={styles.tabButtonText}>Disimpan</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* {renderContent()} */}
        <ScrollView contentContainerStyle={{ marginBottom: 100 }}>
          <TouchableOpacity
            onPress={() => openBottomSheet(item.key, item.name, item.image)}
          >
            <RenderMasonryList gif={gif} openBottomSheet={openBottomSheet} />
          </TouchableOpacity>
        </ScrollView>
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
  container: {
    padding: 35,
    alignItems: "center",
  },
  profileImage: {
    borderRadius: 30,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  tabButton: {
    minWidth: 150,
    alignItems: "center",
    backgroundColor: "#ECECEC",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 50,
    marginHorizontal: 5,
  },
  activeTabButton: {
    backgroundColor: "rgba(169, 50, 157, 0.20)",
  },
  tabButtonText: {
    color: "#000000",
    fontSize: 14,
  },
  itemImage: {
    display: "flex",
    flexDirection: "row",
    borderRadius: 8,
  },
});
