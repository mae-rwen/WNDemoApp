import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
//import Pdf from "react-native-pdf";
import { useNavigation } from "@react-navigation/native";
import {
  ArrowDownTrayIcon,
  ArrowLeftCircleIcon,
  ShareIcon,
} from "react-native-heroicons/outline";
import { StatusBar } from "expo-status-bar";
import { themeColors } from "../theme";

const { width, height } = Dimensions.get("window");

export default function PdfViewPage(props) {
  const item = props.route.params;
  const navigation = useNavigation();

  // const pdfSource = {
  //   uri: item?.pdfFile,
  //   cache: true,
  // };
  return (
    <View className="flex-1">
      <StatusBar style="dark" />

      <View className="pt-10 space-y-4">
        <View className="mx-4 flex-row justify-between items-center">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeftCircleIcon size="50" strokeWidth={1.2} color="black" />
          </TouchableOpacity>
          <Text
            style={{ color: themeColors.text }}
            className="text-3xl font-semibold"
          >
            {item.name}
          </Text>
          <View className="flex-row justify-between space-x-2">
            <TouchableOpacity
              className="rounded-full border-2 border-black p-2"
              onPress={() => {}}
            >
              <ShareIcon size="24" strokeWidth={2} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              className="rounded-full border-2 border-black p-2"
              onPress={() => {}}
            >
              <ArrowDownTrayIcon size="24" strokeWidth={2} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        {/* <Pdf
          trustAllCerts={false}
          source={pdfSource}
          style={{
            width: width,
            height: height * 0.9,
          }}
        /> */}
        <Text>Odf view here</Text>
      </View>
    </View>
  );
}
