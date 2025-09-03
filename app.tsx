import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import CartScreen from "./src/cart";
import HomeScreen from "./src/list";
import DeviceInfoScreen from "./src/nativeModule";
import UsersScreen from "./src/offlinecache";
import ProductScreen from "./src/products";
import store from "./src/redux/store";
import TaskScreen from "./src/tasks";
import TokenScreen from "./src/token";
export type RootStackParamList = {
  Tasks: undefined;
  List: undefined;
  ProductDetails: undefined;
  Cart: undefined;
  UsersScreen: { userId?: string }; 
  TokenScreen: undefined;
  DeviceInfoScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const linking = {
    prefixes: ["myapp://","exp://192.168.1.5:8081"],
    config: {
      screens: {
        UsersScreen: "profile/:userId",
      },
    },
  };
  return (
    <Provider store={store}>
      <NavigationContainer linking={linking}>
        <Stack.Navigator
          initialRouteName="Tasks"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Tasks" component={TaskScreen} />
          <Stack.Screen name="List" component={HomeScreen} />
          <Stack.Screen name="ProductDetails" component={ProductScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="UsersScreen" component={UsersScreen} />
          <Stack.Screen name="TokenScreen" component={TokenScreen} />
          <Stack.Screen name="DeviceInfoScreen" component={DeviceInfoScreen} /> 
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
