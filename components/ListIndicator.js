import { View, Dimensions, StyleSheet } from "react-native";
import React from "react";

const COLORS = { primary: "#a9a9a9", white: "#fff" };

export default function ListIndicator({ products, currentProductIndex }) {
  return (
    <View
      style={{
        marginBottom: 30,
        justifyContent: "space-between",
        paddingHorizontal: 20,
      }}
    >
      {/* Indicator container */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        {/* Render indicator */}
        {products.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              currentProductIndex == index && {
                backgroundColor: COLORS.white,
                width: 25,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  indicator: {
    height: 2.5,
    width: 10,
    backgroundColor: "grey",
    marginHorizontal: 3,
    borderRadius: 2,
  },
});
