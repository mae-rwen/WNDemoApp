import { View } from "react-native";
import React from "react";
import Carousel from "react-native-snap-carousel";
import ProductCard from "./ProductCard";
import { productsItems } from "../../constants";

export default function ProductsCarousel() {
  return (
    <View className="mt-8 py-2 mb-20">
      <Carousel
        containerCustomStyle={{ overflow: "visible" }}
        data={productsItems}
        renderItem={({ item }) => <ProductCard item={item} />}
        firstItem={1}
        loop={true}
        inactiveSlideScale={0.75}
        inactiveSlideOpacity={0.75}
        sliderWidth={400}
        itemWidth={260}
        slideStyle={{ display: "flex", alignItems: "center" }}
      />
    </View>
  );
}
