import React, {useContext} from 'react';
import {PaperProvider} from 'react-native-paper';
import {ThemeProvider, ThemeContext} from './src/context/ThemeContext';
import {AuthProvider} from './src/context/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';
import lightTheme from './src/theme/lightTheme';
import darkTheme from './src/theme/darkTheme';

const MainApp = () => {
  const theme = useContext(ThemeContext); // `theme` might be undefined
  return (
    <PaperProvider theme={theme?.isDarkTheme ? darkTheme : lightTheme}>
      <AppNavigator />
    </PaperProvider>
  );
};

const App = () => (
  <ThemeProvider>
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  </ThemeProvider>
);

export default App;
