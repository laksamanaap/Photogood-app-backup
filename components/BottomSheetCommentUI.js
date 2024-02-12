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

  const [newComment, setNewComment] = useState("");

  const handleCommentChange = (text) => {
    setNewComment(text);
  };

  const handleAddComment = () => {
    console.log("Tambahkan komentar:", newComment);
    setNewComment("");
  };

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
          <TouchableOpacity style={styles.comment} key={index}>
            <Image
              source={comment.image}
              style={{ width: 40, height: 40, borderRadius: 50 }}
            ></Image>
            <View>
              <View style={styles.commentWrapper}>
                <Text style={styles.commentAuthor}>{comment.author}</Text>
                <Text style={styles.commentHours}>1h</Text>
              </View>
              <Text style={styles.commentText}>{comment.text}</Text>
            </View>
          </TouchableOpacity>
        ))}
        <View style={styles.addComment}>
          <TextInput
            style={styles.input}
            placeholder="Tambahkan komentar"
            value={newComment}
            onChangeText={handleCommentChange}
          />
          <TouchableOpacity onPress={handleAddComment}>
            <Text style={styles.text}>Kirim</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </BottomSheet>
  );
});

export default BottomSheetCommentUI;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 72,
  },
  commentHours: {
    fontFamily: "Poppins-Regular",
    color: "#888",
  },
  commentWrapper: {
    flexDirection: "row",
    gap: 12,
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
    marginBottom: 16,
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
    marginBottom: 20,
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
