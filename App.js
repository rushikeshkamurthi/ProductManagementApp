import React from 'react';
import { PaperProvider } from 'react-native-paper';
import { AuthProvider } from './src/context/AuthContext';
import { ThemeProvider } from './src/context/ThemeContext';
import Routes from './src/routes/Routes';
import lightTheme from './src/theme/lightTheme';

const App = () => (
  <ThemeProvider>
    <AuthProvider>
      <PaperProvider theme={lightTheme}>
        <Routes /> 
      </PaperProvider>
    </AuthProvider>
  </ThemeProvider>
);

export default App;
