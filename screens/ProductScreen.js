import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import * as FileSystem from "expo-file-system";
import { shareAsync } from "expo-sharing";
import {
  ArrowLeftCircleIcon,
  ShoppingCartIcon,
} from "react-native-heroicons/outline";
import { HeartIcon, StarIcon } from "react-native-heroicons/solid";
import { themeColors } from "../theme";
import Pdf from "react-native-pdf";

const { width, height } = Dimensions.get("window");

export default function ProductScreen(props) {
  const item = props.route.params;
  const navigation = useNavigation();
  const [option, setOption] = useState("v1");
  const pdfSource = { uri: item.pdfFile, cache: true };

  const downloadFileVersion1 = () => {
    const downloadFile = async () => {
      const filename = item?.pdfName;
      const result = await FileSystem.downloadAsync(
        item?.pdfFile,
        FileSystem.documentDirectory + filename
      );
      save(result.uri, filename, result.headers["Content-Type"]);
    };

    const save = async (uri, filename, mimetype) => {
      if (Platform.OS === "android") {
        const permissions =
          await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
        if (permissions.granted) {
          const base64 = await FileSystem.readAsStringAsync(uri, {
            encoding: FileSystem.EncodingType.Base64,
          });
          const customMimetype = mimetype || "manuals/pdf";
          await FileSystem.StorageAccessFramework.createFileAsync(
            permissions.directoryUri,
            filename,
            customMimetype
          )
            .then(async (uri) => {
              await FileSystem.writeAsStringAsync(uri, base64, {
                encoding: FileSystem.EncodingType.Base64,
              });
            })
            .catch((e) => console.log(e));
        } else {
          shareAsync(uri);
        }
      } else {
        shareAsync(uri);
      }
    };

    return downloadFile();
  };

  return (
    <ScrollView className="flex-1">
      <StatusBar style="light" />
      {/* background picture */}
      <Image
        source={require("../assets/images/background4.png")}
        style={{
          height: 300,
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
        }}
        className="w-full absolute"
      />
      {/* general conainer */}
      <View className="pt-10 space-y-4">
        {/* icons top */}
        <View className="mx-4 flex-row justify-between items-center">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeftCircleIcon size="50" strokeWidth={1.2} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            className="rounded-full border-2 border-white p-2"
            onPress={() => {}}
          >
            <HeartIcon size="24" color="white" />
          </TouchableOpacity>
        </View>
        {/* product image */}
        <View className="flex-row justify-center">
          <Image source={item.image} className="h-60 w-60" />
        </View>
        {/* stars */}
        <View
          style={{ backgroundColor: themeColors.bgDark }}
          className="flex-row items-center rounded-3xl mx-4 p-1 px-2 space-x-1 w-16 opacity-90"
        >
          <StarIcon size="15" color="white" />
          <Text className="text-base font-semibold text-white">
            {item.stars}
          </Text>
        </View>
        {/* name & category */}
        <View className="mx-4 flex-row justify-between items-center">
          <Text
            style={{ color: themeColors.text }}
            className="text-3xl font-semibold"
          >
            {item.name}
          </Text>
          <Text
            style={{ color: themeColors.text }}
            className="text-lg font-semibold"
          >
            {item.category}
          </Text>
        </View>
        {/* buttons */}
        <View className="mx-4 space-y-2">
          <Text
            style={{ color: themeColors.text }}
            className="text-lg font-bold"
          >
            Options etc.
          </Text>
          <View className="flex-row justify-between">
            <TouchableOpacity
              onPress={() => {
                setOption("v1");
                downloadFileVersion1();
              }}
              className="p-3 px-8 rounded-full"
              style={{
                backgroundColor:
                  option === "v1" ? themeColors.bgLight : "rgba(0,0,0,0.07)",
              }}
            >
              <Text
                className={option === "v1" ? "text-white" : "text-gray-700"}
              >
                📲 v.1
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setOption("v2");
              }}
              className="p-3 px-8 rounded-full"
              style={{
                backgroundColor:
                  option === "v2" ? themeColors.bgLight : "rgba(0,0,0,0.07)",
              }}
            >
              <Text
                className={`${
                  option === "v2" ? "text-white" : "text-gray-700"
                } line-through`}
              >
                {" "}
                📲 v.2{" "}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setOption("v3");
                navigation.navigate("PdfViewPage", { ...item });
              }}
              className="p-3 px-8 rounded-full"
              style={{
                backgroundColor:
                  option === "v3" ? themeColors.bgLight : "rgba(0,0,0,0.07)",
              }}
            >
              <Text
                className={`${
                  option === "v3" ? "text-white" : "text-gray-700"
                }`}
              >
                Manuals
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* product description */}
        <View className="flex-1">
          <View className="m-4 space-y-2">
            <Text
              style={{ color: themeColors.text }}
              className="text-lg font-bold"
            >
              About
            </Text>
            <Text className="text-gray-600">{item.desc}</Text>
          </View>

          {/* buy button */}
          <View className="flex-row justify-between px-4 my-4">
            <TouchableOpacity className="p-4 rounded-full border border-gray-400">
              <ShoppingCartIcon size="30" color="gray" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ backgroundColor: themeColors.bgLight }}
              className="p-4 rounded-full flex-1 ml-4 justify-center"
            >
              <Text className="text-center text-white text-base font-semibold">
                Check avaliability
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
