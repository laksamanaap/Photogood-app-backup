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
    screen: (props) => (
      <Login
        {...props}
        handleAuthenticated={props.navigation.getParam("handleAuthenticated")}
      />
    ),
    navigationOptions: ({ navigation }) => {
      return {
        title: null,
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
      };
    },
  },
};

const HomeStack = createStackNavigator(screens);

const AuthNavigator = createAppContainer(HomeStack);

export default AuthNavigator;
