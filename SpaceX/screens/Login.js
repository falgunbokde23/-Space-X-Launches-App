import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomTextInput from '../Components/CustomTextInput'
import CustomPasswordInput from '../Components/CustomPasswordInput'
import SubmitButton from '../Components/SubmitButton'
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux'
import { loginFunction } from '../redux/action'
import { isEmail } from 'validator';


export default function Login() {
  // state variable
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const loginFail = useSelector((state) => state.reducer.loginFail)
  const loginSuccess = useSelector((state) => state.reducer.loginSuccess)
  const loginPrcessing = useSelector((state) => state.reducer.loginPrcessing)
  const loginMessage = useSelector((state) => state.reducer.loginMessage)
  const [userInput, setUserInput] = useState({ email: "", password: "" })

  // handel user input
  const handelUserInput = (name, text) => {
    setUserInput((previousData) => ({
      ...previousData,
      [name]: text.trim()
    }))
  }

  // handelLoginRedirect
  const handelLoginRedirect = () => {
    navigation.replace('Signup');
  }

  // handel submit
  const handelSubmitData = () => {

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

    // if all fields present
    dispatch(loginFunction(userInput))
  
  }

  // display toast message
  const showToast = (status, text) => {
    Toast.show({
      type: status,
      text1: text,
    });
  }


  useEffect(() => {

    // if user login success
    if ( loginSuccess && !loginPrcessing) {
      showToast("success", "Login success");
      navigation.replace('Signup');
    }

    // if user login fail
    if (loginFail  && !loginPrcessing) {
      showToast("error", loginMessage)
    }

  }, [loginFail, loginSuccess, loginPrcessing])


  return (
    <View style={style.container} >

      {/* title */}
      <Text style={style.title} > Login to continue </Text>

      {/* email input */}
      <CustomTextInput labelText={"Email"} placeHolderText={"Enter Your Email"} onChangeText={(text) => handelUserInput("email", text)} />

      {/* password input */}
      <CustomPasswordInput labelText={"Password"} placeHolderText={"Enter Your password"} onChangeText={(text) => handelUserInput("password", text)} />

      {/* submit button */}
      <SubmitButton processing={loginPrcessing} buttonName={"Login"} onPress={handelSubmitData} />

      {/* signup navigator text */}
      <View style={style.loginText}>
        <Text>Dont't have account. </Text>
        <TouchableOpacity onPress={handelLoginRedirect} >
          <Text style={style.loginLink}>Signup</Text>
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
    maxHeight: 350,
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