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
import BottomSheetCommentUI from "./BottomSheetCommentUI";
import BottomSheet from "@devvie/bottom-sheet";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import Foundation from "react-native-vector-icons/Foundation";

import client from "../utils/client";

const BottomSheetGIF = forwardRef(({ height, id, name, image }, ref) => {
  console.log("gif id : ", id);

  const [gifData, setGifData] = useState({});
  const [commentData, setCommentData] = useState([]);

  const [isLoved, setIsLoved] = useState(false);
  const [isBookmark, setIsBookmark] = useState(false);
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);
  const [loading, setLoading] = useState(true);

  const loveAnimation = useRef(new Animated.Value(0)).current;
  const [isShining, setIsShining] = useState(false);
  const shiningAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const shiningInterval = setInterval(() => {
      setIsShining((prevIsShining) => !prevIsShining);
    }, 1000);

    return () => clearInterval(shiningInterval);
  }, []);

  useEffect(() => {
    if (isShining) {
      Animated.timing(shiningAnimation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(shiningAnimation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [isShining]);

  const toggleLove = () => {
    setIsLoved(!isLoved);
    startLoveAnimation();
  };

  const toggleBookmark = () => {
    setIsBookmark(!isBookmark);
  };

  const startLoveAnimation = () => {
    Animated.timing(loveAnimation, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start(() => {
      loveAnimation.setValue(0);
    });
  };

  const loveStyle = {
    transform: [
      {
        translateY: loveAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [100, -200],
        }),
      },
      {
        scale: loveAnimation.interpolate({
          inputRange: [0, 1, 1],
          outputRange: [0, 5, 1],
        }),
      },
    ],
  };

  const sheetRef = useRef(null);

  const openBottomSheet = () => {
    sheetRef.current?.open();
  };

  const toggleMenu = () => {
    setIsMenuExpanded(!isMenuExpanded);
  };

  const fetchGIFData = async () => {
    setLoading(true);
    try {
      const response = await client.get(`get-photo/${id}`);
      setGifData(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGIFData();
  }, [id]);

  const {
    judul_foto,
    lokasi_file,
    created_at,
    comment,
    like,
    download,
    user,
    member,
    kategori,
  } = gifData;

  const slicedComments = comment?.slice(0, 2);
  console.log("sliced comment : ", slicedComments);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "id-ID",
      options
    );
    return formattedDate;
  };

  function formatTime(createdAt) {
    const currentTime = new Date();
    const commentTime = new Date(createdAt);
    const timeDifference = currentTime - commentTime;

    if (timeDifference > 7 * 24 * 3600 * 1000) {
      return commentTime.toLocaleDateString();
    } else if (timeDifference > 24 * 3600 * 1000) {
      return Math.floor(timeDifference / (24 * 3600 * 1000)) + " h";
    } else if (timeDifference > 3600 * 1000) {
      return Math.floor(timeDifference / (3600 * 1000)) + " j";
    } else if (timeDifference > 60 * 1000) {
      return Math.floor(timeDifference / (60 * 1000)) + " m";
    } else {
      return "Baru saja";
    }
  }

  const placeholderImage = require("../assets/images/placeholder-image-3.png");

  // if (loading) {
  //   return (
  //     <View style={styles.loadingContainer}>
  //       <ActivityIndicator size="large" color="#A9329D" />
  //     </View>
  //   );
  // }

  console.log("======= GIF DETAIL DATA : ===========", gifData);

  return (
    <BottomSheet
      ref={ref}
      style={styles.container}
      animationType="slide"
      height={height}
      containerHeight={Dimensions.get("window").height + 75}
    >
      <View style={styles.contentContainer}>
        <View style={styles.imageWrapper}>
          {/* {user?.foto_profil ? (
            <Image
              source={{ uri: user?.foto_profil }}
              style={{ width: 50, height: 50, borderRadius: 100 }}
            />
          ) : (
            <Image
              source={placeholderImage}
              style={{ width: 50, height: 50, borderRadius: 100 }}
            />
          )} */}
          <View style={styles.userAvatarContainer}>
            {gifData.user?.foto_profil ? (
              <Image
                source={{ uri: gifData.user?.foto_profil }}
                style={styles.userAvatar}
              />
            ) : (
              <Image
                source={require("../assets/images/placeholder-image-3.png")}
                style={styles.userAvatar}
              />
            )}
            {gifData?.user?.status === "2" && (
              <Animated.View
                style={[
                  styles.crownWrapper,
                  {
                    opacity: shiningAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.2, 1],
                    }),
                  },
                ]}
              >
                <Foundation
                  name="crown"
                  size={16}
                  color={"#FFBB48"}
                  style={styles.crownIcon}
                />
              </Animated.View>
            )}
          </View>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.textBold}>
            {user?.username}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.bottomSheetButton}
            onPress={toggleLove}
          >
            <AntDesign
              name={"hearto"}
              style={{ color: "#A9329D", fontSize: 20 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bottomSheetButton}
            onPress={toggleBookmark}
          >
            <FontAwesome
              name={isBookmark ? "bookmark" : "bookmark-o"}
              style={{ color: "#A9329D", fontSize: 20 }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: lokasi_file }}
            style={styles.bottomSheetImage}
          />
          {isMenuExpanded ? (
            <>
              <View style={styles.downloadIcons}>
                <TouchableOpacity
                  style={styles.downloadIcon}
                  onPress={toggleMenu}
                >
                  <Entypo
                    name={"download"}
                    style={{ color: "#FFF", fontSize: 16 }}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.menuIcons}>
                <TouchableOpacity style={styles.menuIcon} onPress={toggleMenu}>
                  <Entypo
                    name={"share"}
                    style={{ color: "#FFF", fontSize: 16 }}
                  />
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <TouchableOpacity style={styles.moreButton} onPress={toggleMenu}>
              <Feather
                name={"more-horizontal"}
                style={{ color: "#FFF", fontSize: 20 }}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.bottomSheetTop}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[styles.textBold, { fontSize: 24 }]}
          >
            {judul_foto}
          </Text>
          <Text style={[styles.text, { color: "#7C7C7C" }]}>
            {formatDate(created_at)}
          </Text>
        </View>
        <View style={styles.commentContainer}>
          <Text style={[styles.text, { fontSize: 16 }]}>Komentar</Text>
          {comment?.length > 3 && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => openBottomSheet()}
            >
              <Feather
                name={"more-horizontal"}
                style={{ color: "#FFF", fontSize: 18 }}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={{ marginTop: 8 }}>
          {comment?.length > 0 ? (
            slicedComments.map((comment, index) => {
              console.log("Photo comment : ", comment);
              return (
                <View style={styles.comment} key={index}>
                  {comment.user.foto_profil ? (
                    <Image
                      source={{ uri: comment.user.foto_profil }}
                      style={{ width: 40, height: 40, borderRadius: 50 }}
                    />
                  ) : (
                    <Image
                      source={placeholderImage}
                      style={{ width: 35, height: 35, borderRadius: 100 }}
                    />
                  )}
                  <View>
                    <View style={styles.commentWrapper}>
                      <Text style={styles.commentAuthor}>
                        {comment?.user.nama_lengkap}
                      </Text>
                      <Text style={styles.commentHours}>
                        {formatTime(comment.created_at)}
                      </Text>
                    </View>
                    <Text style={styles.commentText}>
                      {comment?.isi_komentar}
                    </Text>
                  </View>
                </View>
              );
            })
          ) : (
            <View style={styles.addComment}>
              <TextInput
                style={styles.input}
                placeholder="Tambahkan komentar"
              />
              <TouchableOpacity>
                <Text style={styles.text}>Kirim</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>

      <Animated.View style={[styles.loveIcon, loveStyle]}>
        <AntDesign name="heart" style={{ color: "#A9329D", fontSize: 30 }} />
      </Animated.View>
      <BottomSheetCommentUI ref={sheetRef} />
    </BottomSheet>
  );
});

export default BottomSheetGIF;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  userAvatarContainer: {
    position: "relative",
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  crownWrapper: {
    position: "absolute",
    bottom: 0,
    right: 0,
    transform: [{ translateX: 4 }, { translateY: -30 }],
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 4,
    minWidth: 24,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 10,
  },
  crownIcon: {
    opacity: 0.5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loveIcon: {
    position: "absolute",
    alignSelf: "center",
    top: -40,
    right: 70,
    opacity: 0.25,
  },
  imageContainer: {
    position: "relative",
  },
  moreButton: {
    position: "absolute",
    top: 15,
    right: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#A9329D",
    padding: 4,
    borderRadius: 60,
  },
  buttonContainer: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  contentContainer: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  imageWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  bottomSheetButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 35,
    backgroundColor: "#F9F9F9",
    padding: 8,
    borderRadius: 60,
    shadowColor: "#717171",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    elevation: 20,
  },
  bottomSheetImage: {
    borderRadius: 16,
    resizeMode: "cover",
    width: "100%",
    height: 200,
  },
  bottomSheetTop: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  commentContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 25,
  },
  commentWrapper: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  commentHours: {
    fontSize: 13,
    fontFamily: "Poppins-Regular",
    color: "#bababa",
  },
  commentHeader: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
  },
  comment: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 12,
    marginTop: 16,
  },
  commentAuthor: {
    fontFamily: "Poppins-Bold",
    marginBottom: 5,
  },
  commentText: {
    fontFamily: "Poppins-Regular",
    fontSize: 15,
  },
  addComment: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  submitButton: {
    backgroundColor: "#A9329D",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  submitButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#A9329D",
    padding: 4,
    borderRadius: 50,
    color: "white",
  },
  buttonDownload: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#A9329D",
    color: "white",
    borderRadius: 50,
    padding: 7,
    marginTop: 20,
  },
  menuIcons: {
    position: "absolute",
    top: 15,
    right: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#A9329D",
    padding: 6,
    borderRadius: 60,
    zIndex: 1,
  },
  downloadIcons: {
    position: "absolute",
    top: 15,
    right: 65,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#A9329D",
    padding: 6,
    borderRadius: 60,
    zIndex: 1,
  },
  menuIcon: {
    marginHorizontal: 5,
  },
  downloadIcon: {
    marginHorizontal: 5,
  },
  text: {
    fontFamily: "Poppins-Regular",
  },
  textBold: {
    fontFamily: "Poppins-Bold",
  },
});
