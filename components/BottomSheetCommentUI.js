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
import Feather from "react-native-vector-icons/Feather";

const BottomSheetCommentUI = forwardRef(({ height, id, name, image }, ref) => {
  console.log("Bottom Sheet Comment : ", ref);

  const dummyComments = [
    {
      author: "Cak Imin Slepet",
      text: "Sangar awmu cak!.",
      image: require("../assets/images/placeholder-image-3.png"),
    },
    {
      author: "Cak Imin Slepet",
      text: "Sangar awmu cak!.",
      image: require("../assets/images/placeholder-image-3.png"),
    },
    {
      author: "Cak Imin Slepet",
      text: "Sangar awmu cak!.",
      image: require("../assets/images/placeholder-image-3.png"),
    },
    {
      author: "Cak Imin Slepet",
      text: "Sangar awmu cak!.",
      image: require("../assets/images/placeholder-image-3.png"),
    },
    {
      author: "Cak Imin Slepet",
      text: "Sangar awmu cak!.",
      image: require("../assets/images/placeholder-image-3.png"),
    },
  ];

  return (
    <BottomSheet
      ref={ref}
      style={styles.container}
      animationType="slide"
      containerHeight={Dimensions.get("window").height + 75}
    >
      <Text style={[styles.text, { marginBottom: 12, textAlign: "center" }]}>
        14 Komentar
      </Text>
      <ScrollView>
        {dummyComments.map((comment, index) => (
          <View style={styles.comment} key={index}>
            <Image
              source={comment.image}
              style={{ width: 40, height: 40, borderRadius: 50 }}
            ></Image>
            <View>
              <Text style={styles.commentAuthor}>{comment.author}</Text>
              <Text style={styles.commentText}>{comment.text}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </BottomSheet>
  );
});

export default BottomSheetCommentUI;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  commentContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 25,
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
    marginBottom: 12,
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
  text: {
    fontFamily: "Poppins-Bold",
  },
});
