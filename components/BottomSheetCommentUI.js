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
  const [isLoved, setIsLoved] = useState(false);
  const [isBookmark, setIsBookmark] = useState(false);

  const dummyComments = [
    {
      author: "Cak Imin Slepet",
      text: "Sangar awmu cak!.",
    },
    {
      author: "Cak Imin Slepet",
      text: "Sangar awmu cak!.",
    },
  ];

  const slicedComments = dummyComments.slice(0, 2);

  return (
    <BottomSheet
      ref={ref}
      style={styles.container}
      animationType="slide"
      height={750}
      containerHeight={Dimensions.get("window").height + 75}
    >
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
        <View style={styles.commentContainer}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>Komentar</Text>
          <TouchableOpacity style={styles.button}>
            <Feather
              name={"more-horizontal"}
              style={{ color: "#FFF", fontSize: 18 }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 8 }}>
          {slicedComments.map((comment, index) => (
            <View style={styles.comment} key={index}>
              <Text style={styles.commentAuthor}>{comment.author}</Text>
              <Text style={styles.commentText}>{comment.text}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </BottomSheet>
  );
});

export default BottomSheetCommentUI;

const styles = StyleSheet.create({});
