
import React, { useEffect } from 'react';
import Router from './src/navigation/mainRouter';
import { Provider } from 'react-redux';
import { store } from './src/redux/store/configureStore';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import { getUserLocation } from './src/service/locationService';
//import { getUserLocation } from './src/service/locationService';
function App() {
  SystemNavigationBar.navigationHide();
  
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export default App;
