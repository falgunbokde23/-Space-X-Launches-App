import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

export default function CustomPasswordInput({ labelText, placeHolderText, onChangeText }) {
  // State to handle password visibility toggle
  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <View style={styles.view}>
      {/* Text label for the password input */}
      <Text style={styles.text}>{labelText}</Text>
      <View style={styles.inputContainer}>
        {/* Password input field */}
        <TextInput
          style={styles.input}
          placeholder={placeHolderText}
          secureTextEntry={!showPassword}
          onChangeText={onChangeText}
        />
        {/* Icon to toggle password visibility */}
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconContainer}>
          <Ionicons
            name={showPassword ? 'eye-off' : 'eye'}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Styles for the CustomPasswordInput component
const styles = StyleSheet.create({
  view: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    backgroundColor: 'white',
    padding: 6,
    marginTop: 4,
  },
  input: {
    flex: 1,
    borderWidth: 0, 
    outlineWidth: 0, 
    outlineColor: 'transparent',
  },
  text: {
    fontWeight: 'bold', 
  },
  iconContainer: {
    paddingLeft: 8,
  },
});
