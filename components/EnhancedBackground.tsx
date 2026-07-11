import { BackgroundGradients, BackgroundVariant } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet } from "react-native";
import AnimatedBackground from "./AnimatedBackground";

interface EnhancedBackgroundProps {
  variant?: BackgroundVariant;
  children: React.ReactNode;
}

export default function EnhancedBackground({
  variant = "primary",
  children,
}: EnhancedBackgroundProps) {
  const colorScheme = useColorScheme();
  const gradients =
    BackgroundGradients[colorScheme === "dark" ? "dark" : "light"];

  return (
    <LinearGradient
      colors={gradients[variant] as unknown as [string, string, ...string[]]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <AnimatedBackground />
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
