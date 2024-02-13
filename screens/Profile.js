import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import client from "../utils/client";

export default function Profile() {
  const [image, setImage] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    username: "",
    nama_lengkap: "",
    email: "",
    alamat: "",
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };

  // const handleUpdatePress = async () => {
  //   if (isEditable) {
  //     setIsSaving(true);
  //     try {
  //       // Store Update
  //       await updateUserDetail();
  //       setIsSaving(false);
  //       setIsEditable(false);
  //     } catch (error) {
  //       console.error("Error updating user detail:", error);
  //       setIsSaving(false);
  //     }
  //   } else {
  //     setIsEditable(true);
  //   }
  // };

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

  const fetchUserDetail = async () => {
    try {
      const response = await client.get(`v1/show-user-detail?token=${token}`);
      console.log("settings user detail : ", response?.data);
      setUserData(response?.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateUserDetail = async () => {
    try {
      const payload = {
        alamat: formData.alamat || userData?.alamat,
        email: formData.email || userData?.email,
        username: formData.username || userData?.username,
        nama_lengkap: formData.nama_lengkap || userData?.nama_lengkap,
      };

      const response = await client.post(
        `v1/update-user-detail?token=${token}`,
        payload
      );

      Alert.alert("Success", "Berhasil update user data!");
      console.log(response, "response fetch in profile : ");
    } catch (error) {
      Alert.alert("An Error Occured!", error);
      console.error(error, "error in profile : ");
    }
  };

  useEffect(() => {
    getTokenFromStorage();
    fetchUserDetail();
    // updateUserDetail();
  }, []);

  // console.log(formData);
  // console.log(image);
  console.log(userData, "PROFILE USER DATA : ");
  console.log(formData, "PROFILE FORM DATA : ");

  return (
    <View style={{ flex: 1, alignItems: "center", marginTop: 30 }}>
      <View>
        {userData?.foto_profil ? (
          <Image
            source={{ uri: userData.foto_profil }}
            style={{ width: 150, height: 150, borderRadius: 100 }}
          />
        ) : (
          <Image
            source={require("../assets/images/placeholder-image-3.png")}
            style={{ width: 150, height: 150, borderRadius: 100 }}
          />
        )}
        <TouchableOpacity
          onPress={() => pickImage()}
          style={styles.profileIconContainer}
        >
          <MaterialIcon name="photo-camera" size={16} color="#fff" />
        </TouchableOpacity>
      </View>
      <ScrollView style={{ width: "100%", padding: 40 }}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={[styles.input, !isEditable && styles.disabledInput]}
            placeholder="Username"
            defaultValue={userData?.username}
            onChangeText={(value) =>
              setFormData({ ...formData, username: value })
            }
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nama Lengkap</Text>
          <TextInput
            style={[styles.input, !isEditable && styles.disabledInput]}
            placeholder="Nama Lengkap"
            defaultValue={userData?.nama_lengkap}
            onChangeText={(value) =>
              setFormData({ ...formData, nama_lengkap: value })
            }
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, !isEditable && styles.disabledInput]}
            placeholder="Email"
            defaultValue={userData?.email}
            onChangeText={(value) => setFormData({ ...formData, email: value })}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Alamat</Text>
          <TextInput
            style={[styles.input, !isEditable && styles.disabledInput]}
            placeholder="Alamat"
            defaultValue={userData?.alamat}
            onChangeText={(value) =>
              setFormData({ ...formData, alamat: value })
            }
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={updateUserDetail}>
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontSize: 16,
              fontFamily: "Poppins-Regular",
            }}
          >
            {/* {isEditable ? (isSaving ? "" : "Simpan Profile") : "Edit Profile"} */}
            Edit Profile
          </Text>
          {isSaving && <ActivityIndicator size="small" color="#ffffff" />}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  profileIconContainer: {
    position: "absolute",
    backgroundColor: "rgba(169, 50, 157, 0.60)",
    top: 10,
    right: 0,
    padding: 8,
    borderRadius: 24,
  },
  inputContainer: {
    width: "100%",
  },
  label: {
    marginBottom: 10,
    color: "#333",
    fontFamily: "Poppins-Regular",
  },
  input: {
    backgroundColor: "#ECECEC",
    height: 40,
    width: "100%",
    borderColor: "#ECECEC",
    borderWidth: 1,
    marginBottom: 25,
    padding: 10,
    borderRadius: 50,
    fontFamily: "Poppins-Regular",
  },
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "#A9329D",
    gap: 16,
    padding: 10,
    borderRadius: 50,
  },
  disabledInput: {
    backgroundColor: "#dedede",
  },
});
