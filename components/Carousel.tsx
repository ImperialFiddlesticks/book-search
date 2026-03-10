import React, { ReactNode, useState } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  useWindowDimensions,
} from "react-native";

const CARD_GAP = 8;
const HORIZONTAL_PADDING = 16;

interface CarouselProps {
  readonly children: ReactNode;
  readonly itemWidth: number;
}

export default function Carousel({ children, itemWidth }: CarouselProps) {
  const { width: screenWidth } = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);

  const snapInterval = itemWidth + CARD_GAP;
  const itemsPerPage = Math.max(
    1,
    Math.round((screenWidth - HORIZONTAL_PADDING * 2) / snapInterval),
  );
  const childCount = React.Children.count(children);
  const pageCount = Math.ceil(childCount / itemsPerPage);

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={snapInterval}
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: HORIZONTAL_PADDING }}
        onScroll={(e) => {
          const page = Math.round(
            e.nativeEvent.contentOffset.x / (snapInterval * itemsPerPage),
          );
          setCurrentIndex(page);
        }}
        scrollEventThrottle={16}
      >
        {children}
      </ScrollView>

      {pageCount > 1 && (
        <View style={styles.dots}>
          {Array.from({ length: pageCount }).map((_, i) => (
            <View
              key={i}
              style={[styles.dot, i === currentIndex && styles.dotActive]}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
    marginTop: 12,
    marginBottom: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ddd",
  },
  dotActive: {
    backgroundColor: "#C8703A",
  },
});
