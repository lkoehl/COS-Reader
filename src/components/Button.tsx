import * as React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

const Button = ({text, onPress, style}) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

Button.defaultProps = {
  children: null,
  text: 'Scannen',
  onPress: () => {},
  style: {},
};

Button.propTypes = {
  children: PropTypes.node,
  text: PropTypes.string,
  onPress: PropTypes.func,
  style: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    height: 60,
    width: 222,
    backgroundColor: '#546080',
  },
  text: {
    color: 'white',
    fontSize: 24,
  },
});

export default Button;
