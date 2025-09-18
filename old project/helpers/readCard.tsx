import {Platform} from 'react-native';
import {APDUApplication, APDUBalance, APDULastTransaction} from './APDU';
import NfcManager, {NfcTech} from 'react-native-nfc-manager';

const readCard = async () => {
  const tech: NfcTech =
    Platform.OS === 'ios' ? NfcTech.MifareIOS : NfcTech.NfcA;
  await requestTechnology(tech);

  let connection, balance, lastTransaction;

  connection = await sendCommand(APDUApplication);
  balance = await sendCommand(APDUBalance);
  lastTransaction = await sendCommand(APDULastTransaction);

  if (balance && isValidResponse(balance)) {
    balance = getValueFromBytes(balance.slice(0, 4).reverse()).toString();
  } else {
    balance = '0.00';
  }

  if (lastTransaction && isValidResponse(lastTransaction)) {
    lastTransaction = getValueFromBytes(
      lastTransaction.slice(12, 14).reverse(),
    ).toString();
  } else {
    lastTransaction = '0.00';
  }

  dismiss(true);

  return {balance: balance, lastTransaction: lastTransaction};
};

const dismiss = async (success: boolean) => {
  NfcManager.cancelTechnologyRequest().catch(() => 0);
  NfcManager.setAlertMessageIOS(
    success ? 'Scannen erfolgreich' : 'Leider ist etwas schiefgegangen.',
  );
};

const requestTechnology = async (technology: NfcTech) => {
  await NfcManager.requestTechnology(technology, {
    alertMessage: 'MensaCard oben an das Handy halten.',
  });
};

const sendCommand = async (command: number[]) => {
  try {
    if (Platform.OS === 'ios') {
      return await NfcManager.sendMifareCommandIOS(command);
    } else {
      return await NfcManager.transceive(command);
    }
  } catch (error) {
    dismiss(false);
  }
};

const getValueFromBytes = (bytes) => {
  let value = 0;
  for (let bit = 0; bit < bytes.length; ++bit) {
    value += bytes[bit];
    if (bit < bytes.length - 1) {
      value = value << 8;
    }
  }
  return value / 1000;
};

const isValidResponse = (response) => {
  if (response) {
    return response.length >= 2 && response[response.length - 2] === 145;
  }
  return false;
};

export {readCard, readCard as default};
