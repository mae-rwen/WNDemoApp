import React, { useRef, useState } from "react";
import { SafeAreaView, StyleSheet, FlatList, Dimensions } from "react-native";

import { products } from "../components/products";

import ProductItem from "../components/ProductItem";
import ListIndicator from "../components/ListIndicator";
import ListButtons from "../components/ListButtons";

const { width, height } = Dimensions.get("window");
const COLORS = { primary: "#a9a9a9", white: "#fff" };

export default function ProductsList({ navigation }) {
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const ref = useRef();

  const updateCurrentProductIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentProductIndex(currentIndex);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentProductIndex}
        contentContainerStyle={{
          marginTop: height * 0.2,
        }}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={products}
        pagingEnabled
        renderItem={({ item }) => (
          <ProductItem item={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item.id}
      />
      <ListIndicator
        products={products}
        currentProductIndex={currentProductIndex}
      />
      <ListButtons
        products={products}
        refProp={ref}
        currentProductIndex={currentProductIndex}
        setCurrentProductIndex={setCurrentProductIndex}
      />
    </SafeAreaView>
  );
}
