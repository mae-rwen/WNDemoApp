import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";

const { width } = Dimensions.get("window");
const COLORS = { primary: "#a9a9a9", white: "#fff" };

export default function ProductItem({ item, navigation }) {
  return (
    //* general container */
    <View style={{ alignItems: "center", width }}>
      <Image source={item?.image} style={{ resizeMode: "contain" }} />

      {/* description container */}
      <View>
        <Text style={styles.title}>{item?.title}</Text>
        <Text style={styles.description}>{item?.description}</Text>
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
          onPress={() => {
            navigation.navigate("Details", { item });
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 15,
              color: COLORS.white,
            }}
          >
            DETAILS
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  description: {
    color: COLORS.white,
    fontSize: 13,
    marginTop: 10,
    maxWidth: "70%",
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
