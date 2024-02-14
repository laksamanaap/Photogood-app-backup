import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Membership() {
  return (
    <ImageBackground
      source={require("../assets/images/gallery-sample-image.png")}
      style={styles.backgroundImage}
    >
      <LinearGradient
        colors={["rgba(0,0,0,0.9)", "transparent"]}
        start={{ x: 1, y: 1.4 }}
        end={{ x: 1, y: 0 }}
        style={styles.linearGradient}
      />
      <View style={styles.container}>
        <Text style={styles.heading}>Membership</Text>
        <View style={styles.membershipInfo}>
          <Text style={styles.infoTitle}>Benefits:</Text>
          <Text style={styles.infoText}>
            - Exclusive access to premium content {"\n"}- Special discounts on
            products {"\n"}- Priority customer support {"\n"}- Invitations to
            member-only events
          </Text>
        </View>
        <TouchableOpacity style={styles.membershipButton}>
          <Text style={styles.buttonText}>Upgrade Membership</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  heading: {
    fontSize: 48,
    color: "#FFFFFF",
    marginBottom: 20,
    fontFamily: "Poppins-Bold",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  membershipInfo: {
    marginBottom: 30,
    alignItems: "center",
  },
  infoTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 20,
    marginBottom: 10,
    color: "#FFFFFF",
  },
  infoText: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: "center",
  },
  membershipButton: {
    backgroundColor: "#A9329D",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 3,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    textAlign: "center",
  },
  linearGradient: {
    ...StyleSheet.absoluteFillObject,
  },
});
