import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Link } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import NfcManager, { NfcEvents } from "react-native-nfc-manager";
import { SafeAreaView } from "react-native-safe-area-context";

import BalanceCard from "@/components/BalanceCard";
import EnhancedBackground from "@/components/EnhancedBackground";
import ScanButton from "@/components/ScanButton";
import { addScan } from "@/helpers/history";
import readCard, { CardData } from "@/helpers/readCard";

export default function CardReaderScreen() {
  const [cardData, setCardData] = useState<CardData>({
    balance: "0.00",
    lastTransaction: "0.00",
  });
  const [isScanning, setIsScanning] = useState(false);
  const [lastScanTime, setLastScanTime] = useState<Date | null>(null);
  const scanInProgress = useRef(false);

  const handleScan = async () => {
    if (scanInProgress.current) {
      return;
    }
    scanInProgress.current = true;
    try {
      setIsScanning(true);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

      // Read card via native NFC UI
      const data = await readCard();

      setCardData(data);
      setLastScanTime(new Date());
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      await addScan({
        balance: data.balance,
        lastTransaction: data.lastTransaction,
      });
    } catch (error) {
      console.error("Card reading error:", error);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert(
        "Fehler beim Scannen",
        "Die Karte konnte nicht gelesen werden. Bitte versuchen Sie es erneut.",
        [{ text: "OK" }]
      );
    } finally {
      scanInProgress.current = false;
      setIsScanning(false);
    }
  };

  useEffect(() => {
    // Start a scan shortly after first load. On Android this also covers a
    // cold start triggered by holding the card against the phone: the card is
    // still present, so the scan picks it up immediately.
    const timer = setTimeout(handleScan, 0);

    // Android: card tapped while the app is already running (delivered via
    // onNewIntent instead of the launch intent)
    if (Platform.OS === "android") {
      NfcManager.setEventListener(NfcEvents.DiscoverBackgroundTag, () => {
        handleScan();
      });
    }

    return () => {
      clearTimeout(timer);
      if (Platform.OS === "android") {
        NfcManager.setEventListener(NfcEvents.DiscoverBackgroundTag, null);
      }
    };
  }, []);

  const handleHeaderButtonPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <EnhancedBackground variant="primary">
        <SafeAreaView style={styles.safeArea}>
          {/* Header with history and settings buttons */}
          <View style={styles.header}>
            <Link href="/history" asChild>
              <Pressable
                style={styles.headerButton}
                onPress={handleHeaderButtonPress}
              >
                <Ionicons name="time-outline" size={24} color="white" />
              </Pressable>
            </Link>
            <Link href="/modal" asChild>
              <Pressable
                style={styles.headerButton}
                onPress={handleHeaderButtonPress}
              >
                <Ionicons name="settings-outline" size={24} color="white" />
              </Pressable>
            </Link>
          </View>

          {/* Main content */}
          <View style={styles.content}>
            <BalanceCard
              balance={cardData.balance}
              lastTransaction={cardData.lastTransaction}
              lastScanTime={lastScanTime || undefined}
              isScanning={isScanning}
              style={styles.balanceCard}
            />
          </View>

          {/* Bottom scan button */}
          <View style={styles.footer}>
            <ScanButton onPress={handleScan} isLoading={isScanning} />
          </View>
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
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  headerButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  balanceCard: {
    width: "100%",
    maxWidth: 350,
    // Move the card slightly higher on the screen
    marginTop: -128,
    marginBottom: 40,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 50,
    alignItems: "center",
  },
});
