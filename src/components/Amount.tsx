import * as React from 'react';
import {Text, StyleSheet, SafeAreaView} from 'react-native';
import PropTypes from 'prop-types';

const Amount = ({text, style}) => {
  const validateInput = (input: string) => {
    var regex = /^\d{0,3}\.\d{0,2}$/;
    return regex.test(input);
  };

  const formatText = (balance: string) => {
    if (!validateInput(balance)) {
      balance = '0.00';
    }

    return '12,83';
    return balance.replace(/\s/, '').replace('.', ',');
  };

  return (
    <SafeAreaView style={[styles.container, style]}>
      <Text style={styles.text} numberOfLines={1}>
        {formatText(text)}
      </Text>
    </SafeAreaView>
  );
};

Amount.defaultProps = {
  children: null,
  text: '0.00',
  style: {},
};

Amount.propTypes = {
  children: PropTypes.node,
  text: PropTypes.string,
  style: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },

  text: {
    margin: 16,
    letterSpacing: 2,
    fontSize: 96,
    fontWeight: '200',
    color: 'white',
    fontFamily: 'Symbol',
  },
});

export default Amount;
