import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import { themeColors } from "../../theme";
import { StarIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { QuestionMarkCircleIcon } from "react-native-heroicons/outline";

const { width, height } = Dimensions.get("window");

export default function ProductCard({ item }) {
  const navigation = useNavigation();
  return (
    <View
      style={{
        borderRadius: 40,
        backgroundColor: themeColors.bgDark,
        height: height * 0.5,
        width: width * 0.65,
      }}
    >
      {/* image container */}
      <View
        style={{
          marginTop: 15,
        }}
        className="flex-row justify-center"
      >
        <Image source={item.image} className="h-40 w-40" />
      </View>

      {/* details container */}
      <View className="flex-1 px-5 justify-between">
        {/* name, stars, volume */}
        <View className="space-y-3 mt-3">
          <Text className="text-3xl text-white font-semibold z-10">
            {item.name}
          </Text>

          {/* stars */}
          <View
            style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
            className="flex-row items-center rounded-3xl p-1 px-2 space-x-1 w-16"
          >
            <StarIcon size="15" color="white" />
            <Text className="text-base font-semibold text-white">
              {item.stars}
            </Text>
          </View>
          {/* volume */}
          <View className="flex-column mb-6">
            <Text className="text-base text-white font-semibold opacity-60">
              Highlights:
            </Text>
            <Text className="text-base text-white font-semibold">
              {item.highlights}
            </Text>
          </View>
        </View>
        {/* pricing container */}
        <View className="flex-row justify-end mb-10">
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Product", { ...item });
            }}
            className=" rounded-full "
          >
            <QuestionMarkCircleIcon size="50" strokeWidth={1} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
