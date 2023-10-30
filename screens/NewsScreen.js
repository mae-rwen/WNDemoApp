import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { ArrowLeftCircleIcon, ShareIcon } from "react-native-heroicons/outline";
import { themeColors } from "../theme";

export default function NewsScreen(props) {
  const item = props.route.params;
  const navigation = useNavigation();
  return (
    <View className="flex-1">
      <StatusBar style="light" />
      {/* background picture */}
      <Image
        source={item.image}
        style={{
          height: 300,
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
        }}
        className="w-full absolute"
      />
      {/* general conainer */}
      <View className="flex-1 pt-10 ">
        {/* icons top */}
        <View className="mx-4 flex-row justify-between items-center">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeftCircleIcon size="50" strokeWidth={1.2} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            className="rounded-full border-2 border-white p-2"
            onPress={() => {}}
          >
            <ShareIcon size="24" color="white" />
          </TouchableOpacity>
        </View>
        {/* news details */}
        <View className="flex-1 mx-4 space-y-4" style={{ paddingTop: 250 }}>
          {/* title */}
          <View
            className="flex-row justify-between items-center"
            // style={{ marginTop: "300" }}
          >
            <Text
              style={{ color: themeColors.text }}
              className="text-3xl font-semibold"
            >
              {item.title}
            </Text>
          </View>
          {/* headline */}
          <View className="space-y-2">
            <Text
              style={{ color: themeColors.text }}
              className="text-lg font-bold"
            >
              {item.headline}
            </Text>
          </View>
          {/* news */}
          <View className="space-y-2">
            <Text className="text-gray-600">{item.news}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
