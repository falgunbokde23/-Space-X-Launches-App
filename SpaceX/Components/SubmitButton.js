import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

export default function SubmitButton({ onPress, processing, buttonName }) {
  return (
    <TouchableOpacity
      style={[styles.button, { opacity: processing ? 0.6 : 1 }]}
      onPress={onPress}
      disabled={processing}
    >
      {/* Display loading indicator when processing */}
      {processing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="white" />
          <Text style={styles.loadingText}>Please wait</Text>
        </View>
      ) : (
        // Display button text when not processing
        <Text style={styles.buttonText}>{buttonName}</Text>
      )}
    </TouchableOpacity>
  );
}

// Styles for SubmitButton component
const styles = StyleSheet.create({
  button: {
    marginTop:4,
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
