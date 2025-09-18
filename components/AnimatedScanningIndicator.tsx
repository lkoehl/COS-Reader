import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

interface AnimatedScanningIndicatorProps {
  isScanning: boolean;
}

export default function AnimatedScanningIndicator({
  isScanning,
}: AnimatedScanningIndicatorProps) {
  const pulseAnimation = useSharedValue(0);
  const rotateAnimation = useSharedValue(0);

  useEffect(() => {
    if (isScanning) {
      // Pulse animation
      pulseAnimation.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 1000, easing: Easing.ease }),
          withTiming(0, { duration: 1000, easing: Easing.ease })
        ),
        -1,
        false
      );

      // Rotate animation
      rotateAnimation.value = withRepeat(
        withTiming(360, { duration: 2000, easing: Easing.linear }),
        -1,
        false
      );
    } else {
      pulseAnimation.value = withTiming(0, { duration: 300 });
      rotateAnimation.value = withTiming(0, { duration: 300 });
    }
  }, [isScanning]);

  const pulseStyle = useAnimatedStyle(() => {
    const scale = interpolate(pulseAnimation.value, [0, 1], [1, 1.5]);
    const opacity = interpolate(pulseAnimation.value, [0, 1], [0.3, 0]);

    return {
      transform: [{ scale }],
      opacity,
    };
  });

  const rotateStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateZ: `${rotateAnimation.value}deg` }],
    };
  });

  if (!isScanning) return null;

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.pulseRing, pulseStyle]} />
      <Animated.View style={[styles.innerRing, rotateStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  pulseRing: {
    position: "absolute",
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "rgba(52, 199, 89, 0.3)",
  },
  innerRing: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#34C759",
    borderTopColor: "transparent",
  },
});
