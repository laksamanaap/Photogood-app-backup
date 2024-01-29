import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";

export default function Bookmark({ navigation }) {
  console.log("Navigation : ", navigation);

  const [profileImage, setProfileImage] = useState(
    require("../assets/images/placeholder-image-3.png")
  );
  const [activeTab, setActiveTab] = useState("posts");

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
    const data = activeTab === "posts" ? posts : savedItems;
    return (
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Image source={item.image} style={styles.itemImage} />
        )}
        numColumns={2}
      />
    );
  };

  return (
    <View style={{ flex: 1, marginTop: 30, alignItems: "center" }}>
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
      {renderContent()}
    </View>
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
