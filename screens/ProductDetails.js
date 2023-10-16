import {
  View,
  Text,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import * as FileSystem from "expo-file-system";
import { shareAsync } from "expo-sharing";

const { width, height } = Dimensions.get("window");
const COLORS = { primary: "#a9a9a9", white: "#fff" };

export default function ProductDetails({ route, navigation }) {
  const { item } = route.params;

  const downloadFile = async () => {
    const filename = item?.details.pdfName;
    const result = await FileSystem.downloadAsync(
      item?.details.filePDF,
      FileSystem.documentDirectory + filename
    );
    save(result.uri, filename, result.headers["Content-Type"]);
  };

  const save = async (uri, filename, mimetype) => {
    // if (Platform.OS === "android") {
    //   const permissions =
    //     await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
    //   if (permissions.granted) {
    //     const base64 = await FileSystem.readAsStringAsync(uri, {
    //       encoding: FileSystem.EncodingType.Base64,
    //     });
    //     await FileSystem.StorageAccessFramework.createFileAsync(
    //       perm.directoryUri,
    //       filename,
    //       mimetype
    //     )
    //       .then(async (uri) => {
    //         await FileSystem.writeAsStringAsync(uri, base64, {
    //           encoding: FileSystem.EncodingType.Base64,
    //         });
    //       })
    //       .catch((e) => console.log(e));
    //   } else {
    //     shareAsync(uri);
    //   }
    // } else {
    shareAsync(uri);
    // }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
      {/* general container */}
      <View style={{ alignItems: "center", width, marginTop: height * 0.2 }}>
        <Image source={item?.image} style={{ resizeMode: "contain" }} />

        {/* description container */}
        <View>
          <Text style={styles.title}>{item?.title}</Text>
          <Text style={styles.description}>
            {item?.details.descriptionLong}
          </Text>
        </View>

        {/* button container */}
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.btn,
              {
                borderColor: COLORS.white,
                borderWidth: 1,
                backgroundColor: "transparent",
                width: width * 0.3,
                marginTop: 15,
              },
            ]}
            onPress={downloadFile}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 15,
                color: COLORS.white,
              }}
            >
              PDF
            </Text>
          </TouchableOpacity>
        </View>

        {/* navigation container */}
        <View style={{ marginTop: height * 0.2 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("List");
            }}
          >
            <Text style={[styles.description, { color: "black" }]}>
              Back to list
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  description: {
    color: COLORS.white,
    fontSize: 13,
    marginTop: 10,
    textAlign: "center",
    lineHeight: 23,
  },
  title: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
  btn: {
    height: 50,
    borderRadius: 5,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});
