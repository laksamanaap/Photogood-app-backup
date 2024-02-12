import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import { View, Platform, TouchableOpacity } from "react-native";
import { useLoadFonts } from "../components/Fonts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

// Screen
import Home from "../screens/Home";
import History from "../screens/History";
import Profile from "../screens/Profile";
import Upload from "../screens/Upload";
import Bookmark from "../screens/Bookmark";
import Settings from "../screens/Settings";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarShadow: false,
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    height: 70,
    backgroundColor: "#fff",
  },
};

const MainTabs = ({ handleLogout }) => {
  console.log("Main Tabs Handle Logout : ", handleLogout);

  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const getTokenFromStorage = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token !== null) {
          console.log("Main Tabs Token retrieved from AsyncStorage:", token);
          setAuthenticated(true);
        }
      } catch (error) {
        console.error("Error retrieving token from AsyncStorage:", error);
        AsyncStorage.removeItem("token");
        handleLogout();
      }
    };

    getTokenFromStorage();
  }, []);

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="home"
              size={25}
              color={focused ? "#A9329D" : "#111"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="profile"
              size={25}
              color={focused ? "#A9329D" : "#111"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Upload"
        component={Upload}
        options={{
          tabBarIcon: ({ focused }) => (
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
          ),
        }}
      />
      <Tab.Screen
        name="Bookmark"
        component={Bookmark}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="bookmark-o"
              size={25}
              color={focused ? "#A9329D" : "#111"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        initialParams={{ handleLogout: () => navigation.navigate("Login") }}
        options={({ route }) => ({
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <AntDesign
                name="setting"
                size={28}
                color={focused ? "#A9329D" : "#111"}
              />
            </View>
          ),
          handleLogout: route.params.handleLogout,
        })}
      />
    </Tab.Navigator>
  );
};

const App = (props) => {
  const fontsLoaded = useLoadFonts();
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogout = props.screenProps.handleLogout;
  console.log("Handle Logout Function :   ", handleLogout);

  console.log("App Props", props);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="MainTabs" options={{ headerShown: false }}>
          {() => <MainTabs handleLogout={handleLogout} />}
        </Stack.Screen>
        <Stack.Screen
          options={({ navigation }) => ({
            title: null,
            headerShown: true,
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0,
              backgroundColor: "transparent",
            },
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <View
                  style={{
                    marginTop: 16,
                    marginLeft: 16,
                    backgroundColor: "#A9329D",
                    borderRadius: 50,
                    padding: 4,
                  }}
                >
                  <Entypo name="chevron-left" size={26} color="white" />
                </View>
              </TouchableOpacity>
            ),
          })}
          name="Profile"
          component={Profile}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
