import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator, // Import ActivityIndicator
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

export default function Profile() {
  const [image, setImage] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleUpdatePress = () => {
    if (isEditable) {
      setIsSaving(true);
      setTimeout(() => {
        setIsSaving(false);
        setIsEditable(false);
      }, 2000);
    } else {
      setIsEditable(true);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", marginTop: 80 }}>
      <View>
        {image ? (
          <Image
            source={{ uri: image }}
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
            style={styles.input}
            editable={isEditable ? true : false}
            placeholder="Username"
            value="Some Username"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nama Lengkap</Text>
          <TextInput
            style={styles.input}
            editable={isEditable ? true : false}
            placeholder="Nama Lengkap"
            value="Some Full Name"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            editable={isEditable ? true : false}
            placeholder="Email"
            value="example@example.com"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Alamat</Text>
          <TextInput
            style={styles.input}
            editable={isEditable ? true : false}
            placeholder="Alamat"
            value="Some Address"
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={handleUpdatePress}
          disabled={isSaving}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontSize: 16,
            }}
          >
            {isEditable ? (isSaving ? "" : "Save Changes") : "Update"}
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
});
