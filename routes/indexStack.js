import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import { View, Platform } from "react-native";
import { useLoadFonts } from "../components/Fonts";

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

const MainTabs = () => {
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
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <AntDesign
                name="setting"
                size={28}
                color={focused ? "#A9329D" : "#111"}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  const fontsLoaded = useLoadFonts();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
