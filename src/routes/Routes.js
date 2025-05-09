import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext } from 'react';
import { PaperProvider } from 'react-native-paper';
import { ThemeContext } from '../context/ThemeContext';
import DashboardScreen from "../screens/DashboardScreen";
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import TermsAndConditionsScreen from '../screens/TermsAndConditions';
import darkTheme from '../theme/darkTheme';
import lightTheme from '../theme/lightTheme';

const Stack = createStackNavigator();

const Routes = () => {
  const theme = useContext(ThemeContext); 

  return (
    <PaperProvider theme={theme?.isDarkTheme ? darkTheme : lightTheme}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="TermsAndConditions" component={TermsAndConditionsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default Routes;
