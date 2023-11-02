import { View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import Favourites from "../screens/Favourites";
import NewsScreen from "../screens/NewsScreen";

import {
  HomeIcon as HomeOutline,
  HeartIcon as HeartOutline,
  InformationCircleIcon as InfoOutline,
} from "react-native-heroicons/outline";
import {
  HomeIcon as HomeSolid,
  HeartIcon as HeartSolid,
  InformationCircleIcon as InfoSolid,
} from "react-native-heroicons/solid";
import { themeColors } from "../theme";
import ProductScreen from "../screens/ProductScreen";
import AboutUs from "../screens/AboutUs";
import PdfViewPage from "../screens/PdfViewPage";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "white" },
        }}
      >
        <Stack.Screen name="Home" component={HomeTabs} />
        <Stack.Screen name="Product" component={ProductScreen} />
        <Stack.Screen name="News" component={NewsScreen} />
        <Stack.Screen name="PdfViewPage" component={PdfViewPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused }) => menuIcons(route, focused),
        tabBarStyle: {
          marginBottom: 20,
          height: 75,
          borderRadius: 50,
          marginHorizontal: 20,
          backgroundColor: themeColors.bgLight,
        },
      })}
    >
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="Favourites" component={Favourites} />
      <Tab.Screen name="AboutUs" component={AboutUs} />
    </Tab.Navigator>
  );
}

const menuIcons = (route, focused) => {
  let icon;

  if (route.name === "HomeScreen") {
    icon = focused ? (
      <HomeSolid size="30" color="white" />
    ) : (
      <HomeOutline size="30" strokeWidth={2} color="white" />
    );
  } else if (route.name === "Favourites") {
    icon = focused ? (
      <HeartSolid size="30" color="white" />
    ) : (
      <HeartOutline size="30" strokeWidth={2} color="white" />
    );
  } else if (route.name === "AboutUs") {
    icon = focused ? (
      <InfoSolid size="30" color="white" />
    ) : (
      <InfoOutline size="30" strokeWidth={2} color="white" />
    );
  }

  return <View>{icon}</View>;
};
