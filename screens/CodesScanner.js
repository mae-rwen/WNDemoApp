import { View, Text, StyleSheet, Button } from "react-native";
import { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";

export default function CodesScanner() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasCameraPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
    console.log("Camera permission:");
    console.log(hasCameraPermission);
    console.log("Is scanned:");
    console.log(scanned);
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`${data} Bar code type: ${type} and data ${data}`);
    console.log("Is scanned now?:");
    console.log(scanned);
  };

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}
