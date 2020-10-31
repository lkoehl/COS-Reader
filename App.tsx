import React from 'react';
import {View, StatusBar} from 'react-native';
import Balance from './src/screens/Balance';

const App = () => {
  return (
    <View style={{flexGrow: 1}}>
      <StatusBar barStyle={'light-content'} />
      <Balance />
    </View>
  );
};

//export {default} from './storybook';
export default App;
