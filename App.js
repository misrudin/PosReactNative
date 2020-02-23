import React from 'react'
import MainNavigators from './src/Publics/Navigators/MainNavigators'

import { Provider } from 'react-redux'
import store from './src/Publics/Redux/store'

const App = () => {
  return (
    <Provider store={store}>
      <MainNavigators />
    </Provider>
  )
}

export default App
