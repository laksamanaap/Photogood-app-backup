import { Text, Platform, View, TouchableOpacity } from "react-native";
import Home from "../screens/Home";
import History from "../screens/History";
import Profile from "../screens/Profile";
import Upload from "../screens/Upload";
import Detail from "../screens/Detail";
import Bookmark from "../screens/Bookmark";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const Tab = createBottomTabNavigator();
const screenOptions = {
  tabBarShadow: false,
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    height: 70,
    backround: "#fff",
  },
};
export default function App(props) {
  console.log("index props", props);
  const handleLogout = props.screenProps.handleLogout;
  console.log(handleLogout);

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <AntDesign
                    name="home"
                    size={25}
                    color={focused ? "#A9329D" : "#111"}
                  />
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="History"
          component={History}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <AntDesign
                    name="profile"
                    size={25}
                    color={focused ? "#A9329D" : "#111"}
                  />
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="Upload"
          component={Upload}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#A9329D",
                    width: Platform.OS === "ios" ? 50 : 60,
                    height: Platform.OS === "ios" ? 50 : 60,
                    top: Platform.OS === "ios" ? -10 : -25,
                    borderRadius: Platform.OS === "ios" ? 25 : 30,
                    shadowColor: "#A9329D",
                    shadowOffset: { width: 5, height: 5 },
                    shadowOpacity: 0.5,
                    shadowRadius: 3,
                    elevation: 5,
                  }}
                >
                  <AntDesign name="pluscircleo" size={25} color="#ffffff" />
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="Bookmark"
          component={Bookmark}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <FontAwesome
                    name="bookmark-o"
                    size={25}
                    color={focused ? "#A9329D" : "#111"}
                  />
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Ionicons
                    name="person-circle-outline"
                    size={28}
                    color={focused ? "#A9329D" : "#111"}
                  />
                </View>
              );
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
