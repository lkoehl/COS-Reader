import { Gradients } from "@/constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet } from "react-native";
import AnimatedBackground from "./AnimatedBackground";

interface EnhancedBackgroundProps {
  variant?: "primary" | "cosmic" | "aurora" | "ocean";
  children: React.ReactNode;
}

export default function EnhancedBackground({
  variant = "primary",
  children,
}: EnhancedBackgroundProps) {
  const getGradientColors = () => {
    switch (variant) {
      case "cosmic":
        return Gradients.cosmic;
      case "aurora":
        return Gradients.aurora;
      case "ocean":
        return Gradients.ocean;
      default:
        return Gradients.primary;
    }
  };

  return (
    <LinearGradient
      colors={getGradientColors() as [string, string, ...string[]]}
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
