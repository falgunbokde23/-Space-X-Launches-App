import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomTextInput from '../Components/CustomTextInput'
import CustomPasswordInput from '../Components/CustomPasswordInput'
import SubmitButton from '../Components/SubmitButton'
import Login from './Login'
import Toast from 'react-native-toast-message';
import { isEmail } from 'validator';

import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux'
import { signupFunction } from '../redux/action'


export default function Signup() {
  // state variable
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const signupFail = useSelector((state) => state.reducer.signupFail)
  const signupSuccess = useSelector((state) => state.reducer.signupSuccess)
  const signupPrcessing = useSelector((state) => state.reducer.signupPrcessing)
  const signupMessage = useSelector((state) => state.reducer.signupMessage)
  const [userInput, setUserInput] = useState({ name: "", email: "", password: "" })

  // handel user input
  const handelUserInput = (name, text) => {
    setUserInput((previousData) => ({
      ...previousData,
      [name]: text.trim()
    }))
  }

  // handelLoginRedirect
  const handelLoginRedirect = () => {
    navigation.replace('Login');
  }

  // handel submit
  const handelSubmitData = () => {

    // Validate name
    if (!userInput.name) {
      showToast("error", "Please enter your name.");
      return;
    }

  
    // Validate email
    if (!userInput.email || !isEmail(userInput.email)) {
      showToast("error", "Please enter a valid email address.");
      return;
    }

    // Validate password
    if (!userInput.password) {
      showToast("error", "Please enter your password.");
      return; // Return early if password is blank
    }

    // Validate password min length
    if (userInput.password.length<4) {
      showToast("error", "minimum password length is 4.");
      return; 
    }

    // if all fields present
    dispatch(signupFunction(userInput));
  }

  // show toast message
  const showToast = (status, text) => {
    Toast.show({
      type: status,
      text1: text,
    });
  }


  useEffect(() => {

    // signup success
    if (!signupFail && signupSuccess && !signupPrcessing) {
      showToast("success", "signup Success, Please Login To Continue!")

      // Reset form values after successful signup
      setUserInput({ name: "", email: "", password: "" });
    }

    // signup fail
    if (signupFail && !signupSuccess && !signupPrcessing) {
      showToast("error", signupMessage)
    }

  }, [signupFail, signupSuccess, signupPrcessing])

  
  return (
    <View style={style.container} >

      {/* title */}
      <Text style={style.title} > Signup to continue </Text>

      {/* name input */}
      <CustomTextInput labelText={"Name"} placeHolderText={"Enter Your Name"} onChangeText={(text) => handelUserInput("name", text)} />

      {/* email input */}
      <CustomTextInput labelText={"Email"} placeHolderText={"Enter Your Email"} onChangeText={(text) => handelUserInput("email", text)} />

      {/* password input */}
      <CustomPasswordInput labelText={"Password"} placeHolderText={"Enter Your password"} onChangeText={(text) => handelUserInput("password", text)} />

      {/* submit button */}
      <SubmitButton processing={signupPrcessing} buttonName={"Signup"} onPress={handelSubmitData} />

      {/* login navigator text */}
      <View style={style.loginText}>
        <Text>Already have an account. </Text>
        <TouchableOpacity onPress={handelLoginRedirect} >
          <Text style={style.loginLink}>Login</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

//  css styling
const style = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    margin: 'auto',
    maxWidth: 400,
    maxHeight: 450,
    gap: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.35,
    shadowRadius: 15,
    elevation: 5, // This is for Android shadow
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },

  loginText: {
    display: 'flex',
    backgroundColor: "red"
  },

  loginText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginLink: {
    fontWeight: 'bold',
    color: 'blue',
  },

})