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
} from "react-native";
import BottomSheet from "@devvie/bottom-sheet";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";

import AsyncStorage from "@react-native-async-storage/async-storage";
import client from "../utils/client";

const BottomSheetCommentUI = forwardRef(
  ({ foto_id, user_id, comment, onRefresh }, ref) => {
    console.log("Bottom Sheet Comment : ", ref);
    const [token, setToken] = useState(null);
    const [newComment, setNewComment] = useState("");

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

    const handleCommentChange = (text) => {
      setNewComment(text);
    };

    const placeholderImage = require("../assets/images/placeholder-image-3.png");

    const storeUserComment = async () => {
      try {
        const payload = {
          foto_id: String(foto_id),
          user_id: String(user_id),
          isi_komentar: newComment,
        };
        const response = await client.post(
          `v1/store-guest-comment?token=${token}`,
          payload
        );
        console.log(response?.data, "COMMENT PHOTO RESPONSE");
        onRefresh();
      } catch (error) {
        console.error(error);
      }
    };

    useEffect(() => {
      getTokenFromStorage();
    }, []);

    return (
      <BottomSheet
        ref={ref}
        style={styles.container}
        animationType="slide"
        containerHeight={Dimensions.get("window").height + 75}
      >
        <Text
          style={[
            styles.text,
            {
              marginBottom: 12,
              textAlign: "center",
              fontSize: 14,
              color: "#000000",
            },
          ]}
        >
          {comment?.length} Komentar
        </Text>
        <ScrollView>
          {comment?.length > 0 &&
            comment?.map((comment, index) => {
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
                      style={{ width: 40, height: 40, borderRadius: 100 }}
                    />
                  )}
                  <View>
                    <View style={styles.commentWrapper}>
                      <Text style={styles.commentAuthor}>
                        {comment?.user.nama_lengkap || comment?.user.username}
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
            })}
          <View style={styles.addComment}>
            <TextInput
              style={styles.input}
              placeholder="Tambahkan komentar"
              value={newComment}
              onChangeText={handleCommentChange}
            />
            <TouchableOpacity onPress={storeUserComment}>
              <View style={styles.textButton}>
                <Text style={styles.text}>Kirim</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </BottomSheet>
    );
  }
);

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
    marginTop: 12,
    marginBottom: 40,
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
    fontSize: 12,
    color: "white",
  },
  textButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#A9329D",
    borderRadius: 4,
    padding: 4,
    width: 50,
  },
});
