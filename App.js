import React from 'react';
import MainNavigators from './src/Publics/Navigators/MainNavigators';
import {NavigationContainer} from '@react-navigation/native';

import {Provider} from 'react-redux';
import store from './src/Publics/Redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainNavigators />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
