import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Alert,
  StatusBar,
  Pressable,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Link } from 'expo-router';

import BalanceDisplay from '@/components/BalanceDisplay';
import ScanButton from '@/components/ScanButton';
import CardInfo from '@/components/CardInfo';
import readCard, { CardData } from '@/helpers/readCard';
import { Gradients } from '@/constants/theme';

export default function CardReaderScreen() {
  const [cardData, setCardData] = useState<CardData>({ balance: '0.00', lastTransaction: '0.00' });
  const [isScanning, setIsScanning] = useState(false);
  const [lastScanTime, setLastScanTime] = useState<Date | null>(null);

  useEffect(() => {
    // Initialize with a demo scan on first load
    handleScan();
  }, []);

  const handleScan = async () => {
    try {
      setIsScanning(true);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      
      // For demo purposes, simulate card reading
      // In production, this would call: const data = await readCard();
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate scan time
      
      const data = {
        balance: '12.83',
        lastTransaction: '3.50'
      };
      
      setCardData(data);
      setLastScanTime(new Date());
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (error) {
      console.error('Card reading error:', error);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert(
        'Fehler beim Scannen',
        'Die Karte konnte nicht gelesen werden. Bitte versuchen Sie es erneut.',
        [{ text: 'OK' }]
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
      <LinearGradient
        colors={Gradients.primary as [string, string]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
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
            <View style={styles.balanceContainer}>
              <BalanceDisplay balance={cardData.balance} />
              <CardInfo 
                lastTransaction={cardData.lastTransaction}
                lastScanTime={lastScanTime || undefined}
                style={styles.cardInfo}
              />
            </View>
          </View>

          {/* Bottom scan button */}
          <View style={styles.footer}>
            <ScanButton 
              onPress={handleScan}
              isLoading={isScanning}
            />
          </View>
        </SafeAreaView>
      </LinearGradient>
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
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  settingsButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  balanceContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  cardInfo: {
    marginTop: 20,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
});