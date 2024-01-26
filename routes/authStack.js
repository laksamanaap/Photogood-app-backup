import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Home from "../screens/Home";
import Detail from "../screens/Detail";
import Login from "../screens/Login";
import Register from "../screens/Register";

const screens = {
  Register: {
    screen: Register,
    navigationOptions: {
      title: null,
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
      },
    },
  },
  Login: {
    screen: Login,
    navigationOptions: {
      title: null,
      headerLeft: null,
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
      },
    },
  },
};

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
