import EnhancedBackground from "@/components/EnhancedBackground";
import { Colors } from "@/constants/theme";
import { clearHistory, getHistory, ScanEntry } from "@/helpers/history";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const formatDate = (timestamp: number): string => {
  return new Date(timestamp).toLocaleString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatDelta = (current: string, previous: string): number => {
  return parseFloat(current) - parseFloat(previous);
};

export default function HistoryModal() {
  const [history, setHistory] = useState<ScanEntry[]>([]);

  useEffect(() => {
    getHistory().then(setHistory);
  }, []);

  const handleClosePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  const handleClearPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert(
      "Verlauf löschen",
      "Möchtest du den gesamten Scan-Verlauf löschen?",
      [
        { text: "Abbrechen", style: "cancel" },
        {
          text: "Löschen",
          style: "destructive",
          onPress: async () => {
            await clearHistory();
            setHistory([]);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          },
        },
      ]
    );
  };

  const renderEntry = ({
    item,
    index,
  }: {
    item: ScanEntry;
    index: number;
  }) => {
    const previous = history[index + 1];
    const delta = previous ? formatDelta(item.balance, previous.balance) : null;

    return (
      <View style={styles.entry}>
        <View style={styles.entryLeft}>
          <Text style={styles.entryDate}>{formatDate(item.timestamp)}</Text>
          {delta !== null && Math.abs(delta) >= 0.005 && (
            <Text
              style={[
                styles.entryDelta,
                { color: delta > 0 ? Colors.success : Colors.error },
              ]}
            >
              {delta > 0 ? "+" : ""}
              {delta.toFixed(2)} €
            </Text>
          )}
        </View>
        <Text style={styles.entryBalance}>{item.balance} €</Text>
      </View>
    );
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <EnhancedBackground variant="cosmic">
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <View style={styles.swipeIndicator} />
            <View style={styles.headerContent}>
              <Text style={styles.headerTitle}>Verlauf</Text>
              <View style={styles.headerButtons}>
                {history.length > 0 && (
                  <Pressable
                    style={styles.headerButton}
                    onPress={handleClearPress}
                    android_ripple={{ color: "transparent" }}
                  >
                    <Ionicons name="trash-outline" size={22} color="white" />
                  </Pressable>
                )}
                <Pressable
                  style={styles.headerButton}
                  onPress={handleClosePress}
                  android_ripple={{ color: "transparent" }}
                >
                  <Ionicons name="close" size={26} color="white" />
                </Pressable>
              </View>
            </View>
          </View>

          {history.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons
                name="time-outline"
                size={48}
                color="rgba(255, 255, 255, 0.5)"
              />
              <Text style={styles.emptyTitle}>Noch keine Scans</Text>
              <Text style={styles.emptyText}>
                Scanne deine Mensa-Karte, um hier den Guthaben-Verlauf zu sehen.
              </Text>
            </View>
          ) : (
            <FlatList
              data={history}
              keyExtractor={(item) => String(item.timestamp)}
              renderItem={renderEntry}
              contentContainerStyle={styles.list}
              showsVerticalScrollIndicator={false}
            />
          )}
        </SafeAreaView>
      </EnhancedBackground>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
  swipeIndicator: {
    width: 36,
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 16,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "white",
  },
  headerButtons: {
    flexDirection: "row",
    gap: 12,
  },
  headerButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    gap: 12,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
    paddingBottom: 80,
    gap: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
  emptyText: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
    textAlign: "center",
    lineHeight: 20,
  },
  entry: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
  },
  entryLeft: {
    gap: 2,
  },
  entryDate: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.85)",
  },
  entryDelta: {
    fontSize: 13,
    fontWeight: "600",
  },
  entryBalance: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
  },
});
