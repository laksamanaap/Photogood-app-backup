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
import client from "../utils/client";

const BottomSheetUI = forwardRef(({ height }, ref) => {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const sheetRef = useRef(null);

  const openBottomSheet = () => {
    sheetRef.current?.open();
  };

  const toggleMenu = () => {
    setIsMenuExpanded(!isMenuExpanded);
  };

  const placeholderImage = require("../assets/images/placeholder-image-3.png");
  const pickImage = async (sourceType) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      sourceType: sourceType,
    });

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };

  const pickFromCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <BottomSheet
      ref={ref}
      style={styles.container}
      animationType="slide"
      height={height}
      containerHeight={Dimensions.get("window").height + 75}
    >
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.imagePreview}>
          {image && (
            <Image source={{ uri: image }} style={styles.previewImage} />
          )}
          {!image && (
            <Text style={{ fontFamily: "Poppins-Regular" }}>
              No image selected
            </Text>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => pickImage(ImagePicker.MediaTypeOptions.Images)}
          >
            <Text style={styles.buttonText}>Unggah Gambar</Text>
          </TouchableOpacity>
          <Text>Atau</Text>
          <TouchableOpacity style={styles.button} onPress={pickFromCamera}>
            <Text style={styles.buttonText}>Kamera</Text>
          </TouchableOpacity>
        </View>

        <View style={{ width: "100%", marginTop: 30 }}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nama Album</Text>
            <TextInput style={styles.input} placeholder="Nama Album" />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Deskripsi Album</Text>
            <TextInput style={styles.input} placeholder="Deskripsi Album" />
          </View>
          <View>
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: isLoading ? "#ccc" : "#A9329D" },
              ]}
            >
              <Text style={styles.buttonText}>
                {isLoading ? "Mengunggah..." : "Buat Album"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </BottomSheet>
  );
});

export default BottomSheetUI;

const styles = StyleSheet.create({
  contentContainer: {
    padding: 30,
    justifyContent: "center",
  },

  imagePreview: {
    height: 150,
    marginBottom: 30,
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
    borderStyle: "dashed",
    borderColor: "#888",
    alignItems: "center",
    justifyContent: "center",
  },
  previewImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#A9329D",
    minWidth: 100,
    padding: 8,
    borderRadius: 50,
    fontFamily: "Poppins-Regular",
  },
  buttonText: {
    fontFamily: "Poppins-Regular",
    color: "#fff",
    fontSize: 13,
  },
  inputContainer: {
    width: "100%",
  },
  label: {
    fontFamily: "Poppins-Regular",
    marginBottom: 10,
    color: "#333",
  },
  input: {
    fontFamily: "Poppins-Regular",
    backgroundColor: "#FFFFFF",
    height: 40,
    width: "100%",
    borderColor: "#FFFFFF",
    borderWidth: 1,
    marginBottom: 25,
    padding: 10,
    borderRadius: 50,
  },
});
