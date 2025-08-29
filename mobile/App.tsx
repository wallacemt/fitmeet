import React from 'react';
import { StatusBar } from 'react-native';
import AppRoutes from './src/routes/AppRoutes';
import { AppStateProvider } from './src/contexts/Auth/AuthState';
import Toast from 'react-native-toast-message';

function App() {
  return (
    <>
       <AppStateProvider>
        <StatusBar barStyle="dark-content" />
        <AppRoutes />
        <Toast autoHide={true}  visibilityTime={4000}/>
      </AppStateProvider>
    </>
  );
}

export default App;
