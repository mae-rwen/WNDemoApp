import { View, Text, Button } from "react-native";
import React from "react";
import * as FileSystem from "expo-file-system";
import { shareAsync } from "expo-sharing";

import { pdfDummy } from "../assets";

export default function PDFviewer() {
  const downloadFile = async () => {
    const filename = "Blatt EZ80.pdf";
    const result = await FileSystem.downloadAsync(
      "https://www.wackerneuson.de/media/contentserv/211914.pdf",
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
        await FileSystem.StorageAccessFramework.createFileAsync(
          perm.directoryUri,
          filename,
          mimetype
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

  return (
    <View style={{ flex: 1, paddingTop: 200 }}>
      <Button title="Download" onPress={downloadFile} />
    </View>
  );
}
