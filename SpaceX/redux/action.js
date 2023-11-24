import axios from "axios"
import * as types from "./actionType"


// Signup function
const signupFunction = (data) => (dispatch) => {
  dispatch({ type: types.SIGNUP_PROCESSING });

  // Simulate signup by storing user data in localStorage
  localStorage.setItem('userData', JSON.stringify(data));
  dispatch({ type: types.SIGNUP_SUCCESS, payload: data });
};



// Login function
const loginFunction = (data) => (dispatch) => {
  dispatch({ type: types.LOGIN_PROCESSING });

  // login by retrieving user data from localStorage
  const savedUserData = localStorage.getItem('userData');
  const userData = JSON.parse(savedUserData);

  // Successful login
  if (userData && userData.email === data.email && userData.password === data.password) {
    dispatch({ type: types.LOGIN_SUCCESS, payload: userData });
  } 
  else { // Invalid credentials
    dispatch({ type: types.LOGIN_FAIL, payload: "Invalid credentials" });
  }
};


// Logout function
const logoutFunction = () => (dispatch) => {

  dispatch({ type: types.LOGOUT_PROCESSING });

  // localStorage.removeItem('userData');

    // logout success
    dispatch({ type: types.LOGOUT_SUCCESS });
};


// apply filters
const getLaunchessData = (rocket_name, launch_year, launch_success) => async (dispatch) => {
  // when we process
  dispatch({ type: types.GET_LAUNCHES_DATA_PROCESSING });

  try {
    // make get request
    const res = await axios.get(
      `https://api.spacexdata.com/v3/launches/past?launch_success=${launch_success}&rocket_name=${rocket_name}&launch_year=${launch_year}`
    );

    // dispatch if request success
    dispatch({ type: types.GET_LAUNCHES_DATA_SUCCESS, payload: res.data,});
  } 
  catch (err) {
    // dispatch if request failed
    dispatch({ type: types.GET_LAUNCHES_DATA_FAIL,  payload: "Somthing Went Wront"});
  }
};

export { signupFunction, loginFunction, getLaunchessData, logoutFunction }