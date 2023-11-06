import { View, Text, Dimensions, Image, TouchableOpacity } from "react-native";
import React from "react";
import { themeColors } from "../../theme";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

export default function NewsCard({ item }) {
  const navigation = useNavigation();
  return (
    <View
      style={{
        backgroundColor: themeColors.bgDark,
        height: height * 0.3,
        width: width,
        justifyContent: "center",
        alignItems: "center",
      }}
      className="relative"
    >
      <Image source={item.image} className="w-full h-full" />
      <View
        style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        className="absolute w-full h-full"
      >
        <View className="absolute bottom-3 mb-8 px-10 space-y-1">
          <Text className="text-3xl text-white font-semibold">
            {item.title}
          </Text>
          <Text
            className="text-base text-white"
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {item.headline}
          </Text>

          <View className="flex-row justify-start">
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("News", { ...item });
              }}
              className="p-3 px-8 rounded-full w-15"
              style={{
                backgroundColor: themeColors.bgLight,
              }}
            >
              <Text className="text-gray-700">Read more</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
