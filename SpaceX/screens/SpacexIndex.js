import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Toast from 'react-native-toast-message';
import Home from './Home';
import Signup from './Signup';
import Login from './Login';
import { useSelector } from 'react-redux';

const Stack = createStackNavigator();

export default function SpacexIndex() {
  // Fetching login success state from Redux store
  const loginSuccess = useSelector((state) => state.reducer.loginSuccess);
  // State to manage user authentication status
  const [userAuthenticated, setUserAuthenticated] = useState(loginSuccess);

  // Update user authentication status when loginSuccess changes
  useEffect(() => {
    setUserAuthenticated(loginSuccess);
  }, [loginSuccess]);

  return (
    <View style={styles.container}>
      {/* Navigation container for the app */}
      <NavigationContainer>
        {/* Stack navigator for managing navigation between screens */}
        <Stack.Navigator>
          {/* Conditional rendering of screens based on user authentication */}
          {userAuthenticated ? (
            <Stack.Screen name="Home" component={Home} />
          ) : (
            <Stack.Screen name="Signup" component={Signup} />
          )}
          {/* Login screen */}
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>

      {/* Toast component for displaying messages */}
      <Toast />
    </View>
  );
}

// Styles for the SpacexIndex component
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
