import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'

// Custom text input component
export default function CustomTextInput({ placeHolderText, labelText, onChangeText  }) {
  return (
    <View style={style.view}>
      {/* Label text */}
      <Text style={style.text}>{labelText}</Text>
      {/* TextInput */}
      <TextInput onChangeText={onChangeText} style={style.input} placeholder={placeHolderText} />
    </View>
  )
}

// Styles for the component
const style = StyleSheet.create({
  view: {
    width: '100%',
  },

  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    backgroundColor: 'white',
    padding: 10,
  },

  text: {
    marginBottom: 4,
    fontWeight: 'bold', 
  },
})
