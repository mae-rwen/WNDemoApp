import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductsList from "./screens/ProductsList";
import ProductDetails from "./screens/ProductDetails";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="List"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="List" component={ProductsList} />
          <Stack.Screen name="Details" component={ProductDetails} />
        </Stack.Navigator>
      </NavigationContainer>

      <StatusBar style="auto" />
    </>
  );
}
