import React, { useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

interface FloatingElementProps {
  delay: number;
  size: number;
  startX: number;
  startY: number;
}

function FloatingElement({
  delay,
  size,
  startX,
  startY,
}: FloatingElementProps) {
  const animationValue = useSharedValue(0);

  useEffect(() => {
    animationValue.value = withRepeat(
      withSequence(
        withTiming(0, { duration: delay }),
        withTiming(1, {
          duration: 4000 + delay,
          easing: Easing.inOut(Easing.ease),
        })
      ),
      -1,
      false
    );
  }, [delay, animationValue]);

  const animatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      animationValue.value,
      [0, 1],
      [startY, startY - 200]
    );
    const opacity = interpolate(
      animationValue.value,
      [0, 0.2, 0.8, 1],
      [0, 0.6, 0.6, 0]
    );
    const scale = interpolate(
      animationValue.value,
      [0, 0.5, 1],
      [0.8, 1.2, 0.8]
    );

    return {
      transform: [{ translateY }, { scale }],
      opacity,
    };
  });

  return (
    <Animated.View
      style={[
        styles.floatingElement,
        animatedStyle,
        {
          left: startX,
          top: startY,
          width: size,
          height: size,
          borderRadius: size / 2,
        },
      ]}
    />
  );
}

export default function AnimatedBackground() {
  const elements = [
    { delay: 0, size: 40, startX: width * 0.1, startY: height * 0.7 },
    { delay: 1000, size: 25, startX: width * 0.8, startY: height * 0.8 },
    { delay: 2000, size: 35, startX: width * 0.2, startY: height * 0.9 },
    { delay: 3000, size: 20, startX: width * 0.9, startY: height * 0.6 },
    { delay: 1500, size: 30, startX: width * 0.05, startY: height * 0.5 },
    { delay: 2500, size: 45, startX: width * 0.85, startY: height * 0.4 },
  ];

  return (
    <View style={styles.container}>
      {elements.map((element, index) => (
        <FloatingElement
          key={index}
          delay={element.delay}
          size={element.size}
          startX={element.startX}
          startY={element.startY}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    pointerEvents: "none",
  },
  floatingElement: {
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
});
