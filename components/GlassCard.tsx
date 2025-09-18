import { useColorScheme } from "@/hooks/use-color-scheme";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Platform, StyleSheet, View } from "react-native";

interface GlassCardProps {
  children: React.ReactNode;
  style?: any;
  intensity?: number;
}

export default function GlassCard({
  children,
  style,
  intensity = 20,
}: GlassCardProps) {
  const colorScheme = useColorScheme();

  if (Platform.OS === "web") {
    // Fallback for web platform
    return (
      <View style={[styles.container, styles.webGlass, style]}>{children}</View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <BlurView intensity={intensity} style={styles.blur}>
        <LinearGradient
          colors={["rgba(255, 255, 255, 0.25)", "rgba(255, 255, 255, 0.1)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          {children}
        </LinearGradient>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    overflow: "hidden",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  blur: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  webGlass: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(10px)",
  },
});
