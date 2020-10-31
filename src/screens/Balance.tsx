import React, {useEffect, useState} from 'react';
import {
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Modal,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Settings from './Settings';
import readCard from '../helpers/readCard';
import Amount from '../components/Amount';
import Button from '../components/Button';

const Balance = () => {
  const windowHeight = Dimensions.get('window').height;

  const [cardBalance, setCardBalance] = useState('0.00');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    read();
  }, []);

  const read = () => {
    readCard().then((card) => {
      setCardBalance(card.balance);
    });
  };

  const infoPressed = () => {
    setShowModal(true);
  };

  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      colors={['#3f2b96', '#a8c0ff']}
      style={styles.container}>
      <View style={styles.container}>
        <Modal
          animationType="slide"
          visible={showModal}
          presentationStyle="pageSheet">
          <Settings setVisibility={setShowModal} />
        </Modal>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={infoPressed}>
              <Image
                style={styles.image}
                source={require('../assets/info.png')}
              />
            </TouchableOpacity>
          </View>
          <Amount style={{marginTop: windowHeight * 0.12}} text={cardBalance} />
          <Button style={styles.button} text={'Scannen'} onPress={read} />
        </SafeAreaView>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  safeArea: {
    flexGrow: 1,
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    alignItems: 'flex-end',
    paddingRight: 16,
    paddingTop: 8,
  },
  image: {
    width: 24,
    height: 24,
  },
  button: {
    position: 'absolute',
    bottom: 64,
  },
});

export default Balance;
