import React, { forwardRef, useState, useRef } from "react";
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
} from "react-native";
import BottomSheet from "@devvie/bottom-sheet";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";

const BottomSheetUI = forwardRef(({ height, id, name, image }, ref) => {
  const [isLoved, setIsLoved] = useState(false);
  const [isBookmark, setIsBookmark] = useState(false);
  const loveAnimation = useRef(new Animated.Value(0)).current;

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

  const dummyComments = [
    {
      author: "Cak Imin Slepet",
      text: "Sangar awmu cak!.",
    },
    {
      author: "Cak Imin Slepet",
      text: "Sangar awmu cak!.",
    },
    {
      author: "Cak Imin Slepet",
      text: "Sangar awmu cak!.",
    },
    {
      author: "Cak Imin Slepet",
      text: "Sangar awmu cak!.",
    },
    {
      author: "Cak Imin Slepet",
      text: "Sangar awmu cak!.",
    },
    {
      author: "Cak Imin Slepet",
      text: "Sangar awmu cak!.",
    },
    {
      author: "Cak Imin Slepet",
      text: "Sangar awmu cak!.",
    },
  ];

  return (
    <BottomSheet
      ref={ref}
      style={styles.container}
      animationType="slide"
      height={700}
      containerHeight={Dimensions.get("window").height + 75}
    >
      <View style={styles.contentContainer}>
        <View style={styles.imageWrapper}>
          <Image
            source={image}
            style={{ width: 50, height: 50, borderRadius: 100 }}
          />
          <Text style={{ fontWeight: "bold" }}>Laksamana</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.bottomSheetButton}
            onPress={toggleLove}
          >
            <AntDesign
              name={isLoved ? "heart" : "hearto"}
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
          <Image source={image} style={styles.bottomSheetImage} />
          <TouchableOpacity style={styles.shareButton}>
            <Entypo name={"share"} style={{ color: "#FFF", fontSize: 18 }} />
          </TouchableOpacity>
        </View>
        <View style={styles.bottomSheetTop}>
          <Text style={{ fontWeight: "bold", fontSize: 24 }}>Gadis Sampul</Text>
          <Text style={{ color: "#7C7C7C" }}>24 Februari 2024</Text>
        </View>
        <View style={{ marginTop: 25, paddingBottom: 25 }}>
          <Text style={styles.commentHeader}>Komentar</Text>
          {dummyComments.map((comment, index) => (
            <View style={styles.comment} key={index}>
              <Text style={styles.commentAuthor}>{comment.author}</Text>
              <Text style={styles.commentText}>{comment.text}</Text>
            </View>
          ))}
          <View style={styles.addComment}>
            <TextInput
              style={styles.input}
              placeholder="Tambahkan komentar..."
            />
            <TouchableOpacity style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Kirim</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <Animated.View style={[styles.loveIcon, loveStyle]}>
        <AntDesign name="heart" style={{ color: "#A9329D", fontSize: 30 }} />
      </Animated.View>
    </BottomSheet>
  );
});

export default BottomSheetUI;

const styles = StyleSheet.create({
  container: {
    padding: 20,
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
  shareButton: {
    position: "absolute",
    top: 15,
    right: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#A9329D",
    padding: 5,
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
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  commentContainer: {
    marginTop: 20,
  },
  commentHeader: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
  },
  comment: {
    backgroundColor: "#F5F5F5",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  commentAuthor: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  commentText: {
    fontSize: 16,
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
});
