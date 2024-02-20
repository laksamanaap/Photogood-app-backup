import React, { forwardRef, useState, useRef, useEffect } from "react";
import {
  ScrollView,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  Animated,
  Platform,
  TextInput,
  ActivityIndicator,
} from "react-native";
import BottomSheet from "@devvie/bottom-sheet";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import Foundation from "react-native-vector-icons/Foundation";
import * as ImagePicker from "expo-image-picker";

import AsyncStorage from "@react-native-async-storage/async-storage";
import client from "../utils/client";

const BottomSheetUI = forwardRef(({ height, navigation }, ref) => {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false); // State untuk menandai apakah checkbox dicentang
  const [token, setToken] = useState(null);
  const sheetRef = useRef(null);
  const [album, setAlbum] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});

  const handleCheckboxChange = (albumID) => {
    console.log(albumID, "ALBUM ID FROM BOTTOM SHEET");
    setCheckedItems({
      ...checkedItems,
      [albumID]: !checkedItems[albumID],
    });
  };

  const getTokenFromStorage = async () => {
    try {
      const storedToken = await AsyncStorage.getItem("token");
      if (storedToken !== null) {
        setToken(storedToken);
        console.log("token settings : ", storedToken);
      }
    } catch (error) {
      console.error("Error retrieving token:", error);
    }
  };

  const fetchMemberAlbum = async () => {
    try {
      const response = await client.get(`v2/show-album?token=${token}`);
      // console.log("member album list", response?.data);
      setAlbum(response?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTokenFromStorage();
    fetchMemberAlbum();
  }, []);

  console.log(album, "ALBUM DATA : ");

  return (
    <BottomSheet
      ref={ref}
      style={styles.container}
      animationType="slide"
      containerHeight={Dimensions.get("window").height + 75}
    >
      <ScrollView>
        {album.length > 0 ? (
          album.map((item, index) => (
            <View style={styles.card} key={index}>
              <View style={styles.cardWrapper}>
                {item?.bookmark_fotos?.length > 0 ? (
                  <Image
                    source={{
                      uri: item?.bookmark_fotos[
                        item?.bookmark_fotos?.length - 1
                      ]?.foto.lokasi_file,
                    }}
                    style={styles.cardAlbumImage}
                  />
                ) : (
                  <Image
                    source={require("../assets/images/placeholder-image-3.png")}
                    style={styles.cardAlbumImage}
                  />
                )}
                <View style={styles.cardAlbumTextWrapper}>
                  <Text style={styles.cardTextTitle}>{item?.nama_album}</Text>
                  <Text style={styles.cardTextSubtitle}>
                    {item?.deskripsi_album}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => handleCheckboxChange(item?.album_id)}
                style={styles.checkboxContainer}
              >
                <View
                  style={[
                    styles.checkbox,
                    checkedItems[item.album_id] && styles.checked,
                  ]}
                >
                  {checkedItems[item.album_id] && (
                    <View style={styles.innerCircle} />
                  )}
                </View>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <View style={[styles.card, styles.emptyAlbumContainer]}>
            <View style={styles.textWrapper}>
              <Text style={styles.textBookmark}>
                Album kosong! Tambahkan album untuk memulai.
              </Text>
              <View style={styles.buttonWrapper}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => navigation.navigate("Album")}
                >
                  <Text style={styles.buttonText}>Tambah Album</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Album")}
          >
            <Text style={styles.buttonText}>Tambah Album</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </BottomSheet>
  );
});

export default BottomSheetUI;

const styles = StyleSheet.create({
  container: {
    padding: 30,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    gap: 16,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  cardWrapper: {
    flexDirection: "row",
    gap: 12,
  },
  cardAlbumImage: {
    borderRadius: 50,
    height: 50,
    width: 50,
  },
  cardAlbumTextWrapper: {
    flexDirection: "column",
    justifyContent: "center",
  },
  cardTextTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 16,
  },
  cardTextSubtitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#A9329D",
    justifyContent: "center",
    alignItems: "center",
  },
  checked: {
    backgroundColor: "#FFFFFF",
  },
  innerCircle: {
    width: 10,
    height: 10,
    borderRadius: 6,
    backgroundColor: "#A9329D",
  },
  emptyAlbumContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textWrapper: {
    alignItems: "center",
  },
  textBookmark: {
    textAlign: "center",
    fontFamily: "Poppins-Bold",
    fontSize: 16,
    marginBottom: 20,
  },
  buttonWrapper: {
    width: "100%",
    marginTop: 12,
    marginBottom: 36,
  },
  button: {
    backgroundColor: "#A9329D",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
});
