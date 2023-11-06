import { FlatList, TouchableOpacity, View } from "react-native";
import React, { useRef, useState } from "react";
// import Carousel from "react-native-snap-carousel";
import ProductCard from "./ProductCard";
import { productsItems } from "../../constants";
import { Dimensions } from "react-native";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "react-native-heroicons/outline";
import { themeColors } from "../../theme";

const { width, height } = Dimensions.get("window");

export default function ProductsCarousel() {
  const newsRef = useRef();
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  const updateCurrentProductIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentProductIndex(currentIndex);
  };

  const previousProduct = () => {
    const prevIndex = currentProductIndex - 1;
    const offset = prevIndex * width;
    if (prevIndex >= 0) {
      newsRef.current.scrollToOffset({ offset });
      setCurrentProductIndex(currentProductIndex - 1);
    }
  };

  const nextProduct = () => {
    const nextIndex = currentProductIndex + 1;
    const offset = nextIndex * width;
    if (nextIndex != productsItems.length) {
      newsRef.current.scrollToOffset({ offset });
      setCurrentProductIndex(currentProductIndex + 1);
    }
  };
  return (
    <View className="mt-8 py-2 mb-20">
      <FlatList
        ref={newsRef}
        onMomentumScrollEnd={updateCurrentProductIndex}
        data={productsItems}
        renderItem={({ item }) => <ProductCard item={item} />}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToAlignment="center"
        contentContainerStyle={{
          width: width * productsItems.length,
          justifyContent: "space-around",
        }}
      />
      <TouchableOpacity
        onPress={previousProduct}
        className="absolute top-1/2 left-3"
      >
        <ChevronLeftIcon size="40" strokeWidth={1} color="grey" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={nextProduct}
        className="absolute top-1/2 right-3"
      >
        <ChevronRightIcon size="40" strokeWidth={1} color="grey" />
      </TouchableOpacity>
      <View className="absolute -bottom-4 right-0 left-0 flex-row justify-center">
        {productsItems.map((_, index) => (
          <View
            key={index}
            style={{
              backgroundColor:
                index === currentProductIndex
                  ? themeColors.bgLight
                  : themeColors.bgDark,
            }}
            className="w-2 h-2 rounded-full mx-1 bg-gray-500"
          />
        ))}
      </View>
    </View>

    // <View className="mt-8 py-2 mb-20">
    //   <Carousel
    //     containerCustomStyle={{ overflow: "visible" }}
    //     data={productsItems}
    //     renderItem={({ item }) => <ProductCard item={item} />}
    //     firstItem={1}
    //     loop={true}
    //     inactiveSlideScale={0.75}
    //     inactiveSlideOpacity={0.75}
    //     sliderWidth={400}
    //     itemWidth={260}
    //     slideStyle={{ display: "flex", alignItems: "center" }}
    //   />
    // </View>
  );
}
