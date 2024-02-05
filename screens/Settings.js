import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const Settings = () => {
  return (
    <View style={styles.container}>
      <View style={styles.settingsCardMain}>
        <View>
          <Text style={styles.settingsTextBold}>Laksamana</Text>
          <Text style={styles.settingsTextSmall}>
            laksamana.arya1412@gmail.com
          </Text>
        </View>
        <Image
          source={require("../assets/images/placeholder-image-3.png")}
          style={{ width: 40, height: 40, borderRadius: 100 }}
        />
      </View>
      <ScrollView>
        <TouchableOpacity style={styles.settingsCardSecondary}>
          <View style={styles.settinggsCardSecondaryContainer}>
            <View style={styles.settingsCardSecondaryIcon}>
              <AntDesign name="profile" size={18} color={"#A9329D"} />
            </View>
            <Text style={styles.settingsTextBold}>History</Text>
          </View>
          <View style={styles.settingsCardSecondaryWrapper}>
            <Entypo name="chevron-right" size={18} color={"#000000"} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsCardSecondary}>
          <View style={styles.settinggsCardSecondaryContainer}>
            <View style={styles.settingsCardSecondaryIcon}>
              <Feather name="image" size={18} color={"#A9329D"} />
            </View>
            <Text style={styles.settingsTextBold}>Album</Text>
          </View>
          <View style={styles.settingsCardSecondaryWrapper}>
            <Entypo name="chevron-right" size={18} color={"#000000"} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsCardSecondary}>
          <View style={styles.settinggsCardSecondaryContainer}>
            <View style={styles.settingsCardSecondaryIcon}>
              <FontAwesome5 name="crown" size={16} color={"#A9329D"} />
            </View>
            <Text style={styles.settingsTextBold}>Membership</Text>
          </View>
          <View style={styles.settingsCardSecondaryWrapper}>
            <Entypo name="chevron-right" size={18} color={"#000000"} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsCardSecondary}>
          <View style={styles.settinggsCardSecondaryContainer}>
            <View style={styles.settingsCardSecondaryIcon}>
              <MaterialIcons name="logout" size={18} color={"#A9329D"} />
            </View>
            <Text style={styles.settingsTextBold}>Logout</Text>
          </View>
          <View style={styles.settingsCardSecondaryWrapper}>
            <Entypo name="chevron-right" size={18} color={"#000000"} />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 20,
  },
  settingsCardMain: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 16,
    marginBottom: 30,
  },
  settinggsCardSecondaryContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  settingsCardSecondaryWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  settingsCardSecondary: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "space-between",
    gap: 16,
    padding: 12,
    borderRadius: 16,
    marginBottom: 16,
  },
  settingsCardSecondaryIcon: {
    backgroundColor: "rgba(169, 50, 157, 0.10)",
    padding: 8,
    borderRadius: 12,
  },
  settingsTextBold: {
    fontFamily: "Poppins-Bold",
  },
  settingsTextSmall: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
  },
});
