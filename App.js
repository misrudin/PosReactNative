import React from 'react';
import MainNavigators from './src/Publics/Navigators/MainNavigators';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';

import {Provider} from 'react-redux';
import store from './src/Publics/Redux/store';
console.disableYellowBox = true;

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#fff"
        translucent={false}
        networkActivityIndicatorVisible={true}
      />
      <NavigationContainer>
        <MainNavigators />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
