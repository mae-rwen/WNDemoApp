import { View, Text, Dimensions } from "react-native";
import React from "react";
import Pdf from "react-native-pdf";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

export default function PdfViewPage() {
  const pdfSource = {
    uri: "https://www.wackerneuson.de/media/contentserv/211914.pdf",
    cache: true,
  };
  return (
    <View className="flex-1">
      <Pdf
        trustAllCerts={false}
        source={pdfSource}
        style={{
          flex: 1,
          width: width,
          height: height,
        }}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`number of pages: ${numberOfPages}`);
        }}
      />
    </View>
  );
}
