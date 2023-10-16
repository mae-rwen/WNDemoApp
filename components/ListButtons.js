import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";

const { width } = Dimensions.get("window");
const COLORS = { primary: "#a9a9a9", white: "#fff" };

export default function ListButtons({
  products,
  refProp,
  currentProductIndex,
  setCurrentProductIndex,
}) {
  const goToNextProduct = () => {
    const nextProductIndex = currentProductIndex + 1;
    if (nextProductIndex != products.length) {
      const offset = nextProductIndex * width;
      refProp?.current.scrollToOffset({ offset });
      setCurrentProductIndex(currentProductIndex + 1);
    }
  };

  const goToPreviousProduct = () => {
    const previousProductIndex = currentProductIndex - 1;
    if (previousProductIndex >= 0) {
      const offset = previousProductIndex * width;
      refProp?.current.scrollToOffset({ offset });
      setCurrentProductIndex(currentProductIndex - 1);
    }
  };

  return (
    <View
      style={{
        marginBottom: 30,
        justifyContent: "space-between",
        paddingHorizontal: 20,
      }}
    >
      {/* BACK button */}
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            styles.btn,
            {
              borderColor: COLORS.white,
              borderWidth: 1,
              backgroundColor: "transparent",
            },
          ]}
          onPress={goToPreviousProduct}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 15,
              color: COLORS.white,
            }}
          >
            BACK
          </Text>
        </TouchableOpacity>

        <View style={{ width: 15 }} />

        {/* NEXT button */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={goToNextProduct}
          style={styles.btn}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 15,
            }}
          >
            NEXT
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});
