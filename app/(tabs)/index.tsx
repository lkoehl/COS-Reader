import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Pressable, StatusBar, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import BalanceCard from "@/components/BalanceCard";
import EnhancedBackground from "@/components/EnhancedBackground";
import ScanButton from "@/components/ScanButton";
import readCard, { CardData } from "@/helpers/readCard";

export default function CardReaderScreen() {
  const [cardData, setCardData] = useState<CardData>({
    balance: "0.00",
    lastTransaction: "0.00",
  });
  const [isScanning, setIsScanning] = useState(false);
  const [lastScanTime, setLastScanTime] = useState<Date | null>(null);

  useEffect(() => {
    // Start a scan on first load
    handleScan();
  }, []);

  const handleScan = async () => {
    try {
      setIsScanning(true);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

      // Read card via native NFC UI
      const data = await readCard();

      setCardData(data);
      setLastScanTime(new Date());
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (error) {
      console.error("Card reading error:", error);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert(
        "Fehler beim Scannen",
        "Die Karte konnte nicht gelesen werden. Bitte versuchen Sie es erneut.",
        [{ text: "OK" }]
      );
    } finally {
      setIsScanning(false);
    }
  };

  const handleSettingsPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <EnhancedBackground variant="primary">
        <SafeAreaView style={styles.safeArea}>
          {/* Header with settings button */}
          <View style={styles.header}>
            <Link href="/modal" asChild>
              <Pressable
                style={styles.settingsButton}
                onPress={handleSettingsPress}
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
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  settingsButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20, // Etwas mehr Abstand nach unten
  },
  balanceCard: {
    width: "100%",
    maxWidth: 350,
    // Move the card slightly higher on the screen
    marginTop: -128,
    marginBottom: 40, // Mehr Abstand zum Button
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 50, // Mehr Abstand vom unteren Rand
    alignItems: "center",
  },
});
