import { Typography } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AnimatedScanningIndicator from "./AnimatedScanningIndicator";
import GlassCard from "./GlassCard";

interface BalanceCardProps {
  balance: string;
  lastTransaction?: string;
  lastScanTime?: Date;
  isScanning?: boolean;
  style?: any;
}

export default function BalanceCard({
  balance,
  lastTransaction,
  lastScanTime,
  isScanning = false,
  style,
}: BalanceCardProps) {
  const colorScheme = useColorScheme();

  const formatBalance = (balance: string): string => {
    const regex = /^\d{0,3}\.\d{0,2}$/;
    if (!regex.test(balance)) {
      return "0,00";
    }
    return balance.replace(".", ",");
  };

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
    <GlassCard style={[styles.container, style]} intensity={30}>
      <View style={styles.content}>
        {/* Card Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Ionicons
              name="card-outline"
              size={24}
              color="rgba(255, 255, 255, 0.9)"
            />
            <Text style={styles.cardTitle}>Mensa Card</Text>
          </View>
          <View style={styles.statusContainer}>
            {isScanning ? (
              <AnimatedScanningIndicator isScanning={isScanning} />
            ) : (
              <Ionicons name="checkmark-circle" size={20} color="#34C759" />
            )}
          </View>
        </View>

        {/* Balance Display */}
        <View style={styles.balanceSection}>
          <Text style={styles.balanceLabel}>Aktuelles Guthaben</Text>
          <View style={styles.balanceContainer}>
            <Text style={styles.currency}>€</Text>
            <Text style={styles.amount} numberOfLines={1} adjustsFontSizeToFit>
              {formatBalance(balance)}
            </Text>
          </View>
        </View>

        {/* Card Footer */}
        <View style={styles.footer}>
          {lastScanTime && (
            <View style={styles.infoRow}>
              <Ionicons
                name="time-outline"
                size={14}
                color="rgba(255, 255, 255, 0.7)"
              />
              <Text style={styles.infoText}>{formatTime(lastScanTime)}</Text>
            </View>
          )}
          {lastTransaction && formatTransaction(lastTransaction) && (
            <View style={styles.infoRow}>
              <Ionicons
                name="arrow-down-outline"
                size={14}
                color="rgba(255, 255, 255, 0.7)"
              />
              <Text style={styles.infoText}>
                €{formatTransaction(lastTransaction)}
              </Text>
            </View>
          )}
        </View>
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 220,
    marginHorizontal: 20,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardTitle: {
    color: "rgba(255, 255, 255, 0.9)",
    ...Typography.title,
    marginLeft: 8,
  },
  statusContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  balanceSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  balanceLabel: {
    color: "rgba(255, 255, 255, 0.8)",
    ...Typography.caption,
    marginBottom: 12,
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  balanceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  currency: {
    ...Typography.currency,
    color: "white",
    marginRight: 6,
    marginTop: -12,
  },
  amount: {
    ...Typography.balance,
    color: "white",
    textAlign: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoText: {
    color: "rgba(255, 255, 255, 0.7)",
    ...Typography.caption,
    marginLeft: 4,
  },
});
