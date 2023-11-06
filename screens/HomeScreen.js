import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import * as Location from "expo-location";

import { MapPinIcon } from "react-native-heroicons/solid";
import { BellIcon } from "react-native-heroicons/outline";

import { themeColors } from "../theme";

import ProductsCarousel from "../components/productsCarousel/ProductsCarousel";
import NewsCarousel from "../components/newsCarousel/NewsCarousel";

export default function HomeScreen() {
  const [location, setLocation] = useState();
  const [locationShown, setLocationShown] = useState(false);
  const [locationDisplay, setLocationDisplay] = useState("");

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location not granted");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      console.log("Location:");
      console.log(currentLocation);
    };
    getLocation();
  }, []);

  const showLocation = async () => {
    const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
      longitude: location.coords.longitude,
      latitude: location.coords.latitude,
    });

    // console.log("Reverse Geocoded:");
    // console.log(reverseGeocodedAddress);
    // console.log("City:");
    // console.log(reverseGeocodedAddress[0]?.city);
    // console.log("Country code:");
    // console.log(reverseGeocodedAddress[0]?.isoCountryCode);
    setLocationDisplay(
      `${reverseGeocodedAddress[0]?.city}, ${reverseGeocodedAddress[0]?.isoCountryCode}`
    );
    setLocationShown(true);
  };

  return (
    <View className="flex-1 relative bg-white">
      <StatusBar />
      <ScrollView className="flex-1 pt-10">
        {/* avatar and bell icon */}
        <View className="px-4 flex-row justify-between items-center">
          <Image
            source={require("../assets/images/avatar.png")}
            className="h-9 w-9 rounded-full"
          />

          {locationShown ? (
            <View className="flex-row items-center space-x-2">
              <MapPinIcon size="25" color={themeColors.bgLight} />
              <Text className="text-base font-semibold">{locationDisplay}</Text>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => {
                showLocation();
              }}
              className="flex-row items-center space-x-2"
            >
              <MapPinIcon size="25" color={themeColors.bgLight} />
              <Text className="text-base font-semibold">Show location</Text>
            </TouchableOpacity>
          )}

          <BellIcon size="27" color="black" />
        </View>
        <NewsCarousel />
        <ProductsCarousel />
      </ScrollView>
    </View>
  );
}
