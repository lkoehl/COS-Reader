import { Platform } from 'react-native';
import { APDUApplication, APDUBalance, APDULastTransaction } from './APDU';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';

export interface CardData {
  balance: string;
  lastTransaction: string;
}

const readCard = async (): Promise<CardData> => {
  try {
    // Initialize NFC if not already done
    await NfcManager.start();
    
    const tech: NfcTech = Platform.OS === 'ios' ? NfcTech.MifareIOS : NfcTech.NfcA;
    await requestTechnology(tech);

    let connection, balance, lastTransaction;

    connection = await sendCommand(APDUApplication);
    balance = await sendCommand(APDUBalance);
    lastTransaction = await sendCommand(APDULastTransaction);

    let balanceValue = '0.00';
    let lastTransactionValue = '0.00';

    if (balance && isValidResponse(balance)) {
      balanceValue = getValueFromBytes(balance.slice(0, 4).reverse()).toFixed(2);
    }

    if (lastTransaction && isValidResponse(lastTransaction)) {
      lastTransactionValue = getValueFromBytes(
        lastTransaction.slice(12, 14).reverse(),
      ).toFixed(2);
    }

    await dismiss(true);

    return { 
      balance: balanceValue, 
      lastTransaction: lastTransactionValue 
    };
  } catch (error) {
    await dismiss(false);
    throw error;
  }
};

const dismiss = async (success: boolean): Promise<void> => {
  try {
    await NfcManager.cancelTechnologyRequest();
    if (Platform.OS === 'ios') {
      NfcManager.setAlertMessageIOS(
        success ? 'Scannen erfolgreich' : 'Leider ist etwas schiefgegangen.',
      );
    }
  } catch (error) {
    // Ignore cleanup errors
  }
};

const requestTechnology = async (technology: NfcTech): Promise<void> => {
  await NfcManager.requestTechnology(technology, {
    alertMessage: 'MensaCard oben an das Handy halten.',
  });
};

const sendCommand = async (command: number[]): Promise<number[] | null> => {
  try {
    if (Platform.OS === 'ios') {
      return await NfcManager.sendMifareCommandIOS(command);
    } else {
      return await NfcManager.transceive(command);
    }
  } catch (error) {
    await dismiss(false);
    return null;
  }
};

const getValueFromBytes = (bytes: number[]): number => {
  let value = 0;
  for (let bit = 0; bit < bytes.length; ++bit) {
    value += bytes[bit];
    if (bit < bytes.length - 1) {
      value = value << 8;
    }
  }
  return value / 1000;
};

const isValidResponse = (response: number[] | null): boolean => {
  if (response && response.length >= 2) {
    return response[response.length - 2] === 145;
  }
  return false;
};

export default readCard;