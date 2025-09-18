import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

interface BalanceDisplayProps {
  balance: string;
  style?: any;
}

export default function BalanceDisplay({ balance, style }: BalanceDisplayProps) {
  const colorScheme = useColorScheme();
  
  const formatBalance = (balance: string): string => {
    // Validate and format the balance
    const regex = /^\d{0,3}\.\d{0,2}$/;
    if (!regex.test(balance)) {
      return '0,00';
    }
    return balance.replace('.', ',');
  };

  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.currency, { color: Colors[colorScheme ?? 'light'].textPrimary }]}>
        €
      </Text>
      <Text 
        style={[
          styles.amount, 
          { color: Colors[colorScheme ?? 'light'].textPrimary }
        ]} 
        numberOfLines={1}
        adjustsFontSizeToFit
      >
        {formatBalance(balance)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  currency: {
    fontSize: 32,
    fontWeight: '300',
    marginRight: 8,
    marginTop: -20, // Align with top of amount
  },
  amount: {
    fontSize: 72,
    fontWeight: '200',
    letterSpacing: 2,
    textAlign: 'center',
  },
});