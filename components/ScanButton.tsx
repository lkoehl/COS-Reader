import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

interface ScanButtonProps {
  onPress: () => void;
  isLoading?: boolean;
  style?: any;
}

export default function ScanButton({
  onPress,
  isLoading = false,
  style,
}: ScanButtonProps) {
  const scaleValue = useSharedValue(1);
  const pulseValue = useSharedValue(0);

  useEffect(() => {
    if (isLoading) {
      pulseValue.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 800, easing: Easing.ease }),
          withTiming(0, { duration: 800, easing: Easing.ease })
        ),
        -1,
        false
      );
    } else {
      pulseValue.value = withTiming(0, { duration: 300 });
    }
  }, [isLoading, pulseValue]);

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    scaleValue.value = withSequence(
      withTiming(0.95, { duration: 100 }),
      withTiming(1, { duration: 100 })
    );
    onPress();
  };

  const animatedStyle = useAnimatedStyle(() => {
    const scale = scaleValue.value;
    const opacity = interpolate(pulseValue.value, [0, 1], [1, 0.7]);

    return {
      transform: [{ scale }],
      opacity,
    };
  });

  return (
    <Animated.View style={[animatedStyle, style]}>
      <Pressable
        style={({ pressed }) => [styles.container, pressed && styles.pressed]}
        onPress={handlePress}
        disabled={isLoading}
      >
        <LinearGradient
          colors={
            isLoading
              ? ["rgba(255, 255, 255, 0.2)", "rgba(255, 255, 255, 0.1)"]
              : ["rgba(255, 255, 255, 0.25)", "rgba(255, 255, 255, 0.15)"]
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          {isLoading && (
            <Ionicons name="wifi" size={20} color="white" style={styles.icon} />
          )}
          <Text style={[styles.text, isLoading && styles.textWithIcon]}>
            {isLoading ? "Wird gescannt..." : "Karte scannen"}
          </Text>
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 32,
    overflow: "hidden",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  pressed: {
    transform: [{ scale: 0.98 }],
  },
  gradient: {
    paddingHorizontal: 50,
    paddingVertical: 22,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 260,
    height: 64,
    flexDirection: "row",
  },
  icon: {
    marginRight: 8,
    marginLeft: -4, // Kompensiert für bessere Zentrierung
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    flex: 1, // Nimmt verfügbaren Platz für bessere Zentrierung
  },
  textWithIcon: {
    flex: 0, // Keine Flex wenn Icon vorhanden ist
  },
});
