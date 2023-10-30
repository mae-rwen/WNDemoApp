import { View, FlatList, TouchableOpacity, Dimensions } from "react-native";
import React, { useRef, useState } from "react";
import { news } from "../../constants";
import NewsCard from "./NewsCard";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "react-native-heroicons/outline";
import { themeColors } from "../../theme";

const { width, height } = Dimensions.get("window");

export default function NewsCarousel() {
  const newsRef = useRef();
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  const updateCurrentNewsIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentNewsIndex(currentIndex);
  };

  const previousNews = () => {
    const prevIndex = currentNewsIndex - 1;
    const offset = prevIndex * width;
    if (prevIndex >= 0) {
      newsRef.current.scrollToOffset({ offset });
      setCurrentNewsIndex(currentNewsIndex - 1);
    }
  };

  const nextNews = () => {
    const nextIndex = currentNewsIndex + 1;
    const offset = nextIndex * width;
    if (nextIndex != news.length) {
      newsRef.current.scrollToOffset({ offset });
      setCurrentNewsIndex(currentNewsIndex + 1);
    }
  };

  return (
    <View className="mt-8 py-2">
      <FlatList
        ref={newsRef}
        onMomentumScrollEnd={updateCurrentNewsIndex}
        data={news}
        renderItem={({ item }) => <NewsCard item={item} />}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
      />
      <TouchableOpacity
        onPress={previousNews}
        className="absolute top-1/2 left-1"
      >
        <ChevronLeftIcon size="25" strokeWidth={1} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={nextNews} className="absolute top-1/2 right-1">
        <ChevronRightIcon size="25" strokeWidth={1} color="white" />
      </TouchableOpacity>
      <View className=" absolute bottom-5 right-0 left-0 flex-row justify-center">
        {news.map((_, index) => (
          <View
            key={index}
            style={{
              backgroundColor:
                index === currentNewsIndex
                  ? themeColors.bgLight
                  : themeColors.bgDark,
            }}
            className="w-2 h-2 rounded-full mx-1"
          />
        ))}
      </View>
    </View>
  );
}
