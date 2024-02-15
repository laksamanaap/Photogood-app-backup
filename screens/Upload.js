import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import DropDownPicker from "react-native-dropdown-picker";
import client from "../utils/client";

export default function Upload() {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [items, setItems] = useState([
    { label: "Hewan", value: "Hewan" },
    { label: "Tumbuhan", value: "Banana" },
  ]);

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

  // const handleUpdatePress = () => {
  //   if (!isSaving) {
  //     setIsSaving(true);
  //     setTimeout(() => {
  //       setIsSaving(false);
  //       navigation.navigate("Home");
  //     }, 2500);
  //   }
  // };

  const handleUpload = async () => {
    if (!image) {
      Alert.alert("An error occured!", "Pilih foto terlebih dahulu!");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("images", {
        uri: image,
        name: "photo.jpg",
        type: "image/jpeg",
      });
      // Temporary
      formData.append("judul_foto", "laksa");
      formData.append("deskripsi_foto", "melody");
      formData.append("user_id", "2");
      formData.append("kategori_id", "1");
      formData.append("type_foto", "GIF");
      formData.append("status", "1");

      const responseGuest = await client.post("/v1/store-guest-photo", formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("ResponseGuest Upload Photo:", responseGuest.data);

      Alert.alert(
        "Success",
        "Foto berhasil diunggah",
        [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate("Home");
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      // console.error("Error:", error);
      Alert.alert("An error occured", error?.response.data.message);
    }

    setIsLoading(false);
  };

  console.log("Image Value : ", image);

  return (
    <View style={styles.container}>
      <View style={styles.imagePreview}>
        {image && <Image source={{ uri: image }} style={styles.previewImage} />}
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
          <Text style={styles.label}>Judul Foto</Text>
          <TextInput style={styles.input} placeholder="Judul Foto" />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Deskripsi Foto</Text>
          <TextInput style={styles.input} placeholder="Deskripsi Foto" />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Kategori Foto</Text>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            style={{
              borderWidth: 0,
              backgroundColor: "#ECECEC",
            }}
            dropDownContainerStyle={{
              borderWidth: 0,
              backgroundColor: "white",
            }}
            textStyle={{
              color: "#888",
              fontFamily: "Poppins-Regular",
            }}
            arrowStyle={{
              color: "#888",
            }}
          />
        </View>
        <View style={{ marginTop: 25 }}>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: isLoading ? "#ccc" : "#A9329D" },
            ]}
            onPress={handleUpload}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? "Mengunggah..." : "Unggah Foto"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  imagePreview: {
    width: 300,
    height: 200,
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
  button: {
    display: "flex",
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
    fontSize: 14,
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
    backgroundColor: "#ECECEC",
    height: 40,
    width: "100%",
    borderColor: "#ECECEC",
    borderWidth: 1,
    marginBottom: 25,
    padding: 10,
    borderRadius: 50,
  },
});
