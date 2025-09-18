import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface CardInfoProps {
  lastTransaction?: string;
  lastScanTime?: Date;
  style?: any;
}

export default function CardInfo({
  lastTransaction,
  lastScanTime,
  style,
}: CardInfoProps) {
  const colorScheme = useColorScheme();

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString("de-DE", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatTransaction = (amount: string): string | null => {
    if (!amount || amount === "0.00") return null;
    return amount.replace(".", ",");
  };

  return (
    <View style={[styles.container, style]}>
      {lastScanTime && (
        <Text
          style={[
            styles.infoText,
            { color: Colors[colorScheme ?? "light"].textSecondary },
          ]}
        >
          Zuletzt gescannt: {formatTime(lastScanTime)}
        </Text>
      )}
      {lastTransaction && formatTransaction(lastTransaction) && (
        <Text
          style={[
            styles.infoText,
            { color: Colors[colorScheme ?? "light"].textSecondary },
          ]}
        >
          Letzte Transaktion: €{formatTransaction(lastTransaction)}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  infoText: {
    fontSize: 14,
    opacity: 0.8,
    textAlign: "center",
    marginVertical: 2,
  },
});
