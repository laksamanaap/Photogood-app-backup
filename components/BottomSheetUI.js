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

  return (
    <BottomSheet
      ref={ref}
      height={height}
      style={styles.container}
      animationType="slide"
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
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image source={image} style={styles.bottomSheetImage} />
          <TouchableOpacity style={styles.shareButton}>
            <Entypo name={"share"} style={{ color: "#FFF", fontSize: 18 }} />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 25 }}>
          <Text>Laksa</Text>
          <Text>Laksa</Text>
          <Text>Laksa</Text>
          <Text>Laksa</Text>
          <Text>Laksa</Text>
          <Text>Laksa</Text>
          <Text>Laksa</Text>
          <Text>Laksa</Text>
          <Text>Laksa</Text>
          <Text>Laksa</Text>
          <Text>Laksa</Text>
          <Text>Laksa</Text>
          <Text>Laksa</Text>
          <Text>Laksa</Text>
          <Text>Laksa</Text>
          <Text>Laksa</Text>
          <Text>Laksa</Text>
          <Text>Laksa</Text>
          <Text>Laksa</Text>
          <Text>Laksa</Text>
          <Text>Laksa</Text>
          <Text>Laksa</Text>
          <Text>Laksa</Text>
          <Text>Laksa</Text>
          <Text>Laksa</Text>
          <Text>Laksa</Text>
          <Text>Laksa</Text>
          <Text>Laksa</Text>
          <Text>Laksa</Text>
          <Text>Laksa</Text>
          <Text>Laksa</Text>
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
});
