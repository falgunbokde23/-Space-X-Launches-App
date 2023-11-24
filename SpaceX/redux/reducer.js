import * as types from "./actionType"

const initialState = {
    signupPrcessing: false,
    signupSuccess: false,
    signupFail: false,
    signupMessage: "",

    loginPrcessing: false,
    loginSuccess: false,
    loginFail: false,
    loginMessage: "",
    loginUser: {},

    logoutPrcessing: false,
    logoutSuccess: false,
    logoutFail: false,
    logoutMessage: "",

    getLaunchesDataProcessing: false,
    getLaunchesDataSuccess: false,
    getLaunchesDataFail: false,
    launchesData: [],

}


export const reducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case types.SIGNUP_PROCESSING:
            return {
                ...state,
                signupPrcessing: true,
                signupSuccess: false,
                signupFail: false,
                signupMessage: ""
            }
        case types.SIGNUP_SUCCESS:
            return {
                ...state,
                signupPrcessing: false,
                signupSuccess: true,
                signupFail: false,
                signupMessage: ""
            }
        case types.SIGNUP_FAIL:
            return {
                ...state,
                signupPrcessing: false,
                signupSuccess: false,
                signupFail: true,
                signupMessage: payload
            }

        case types.LOGIN_PROCESSING:
            return {
                ...state,
                loginPrcessing: true,
                loginSuccess: false,
                loginFail: false,
                loginMessage: ""
            }
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                loginPrcessing: false,
                loginSuccess: true,
                loginFail: false,
                loginMessage: "",
                loginUser: payload
            }
        case types.LOGIN_FAIL:
            return {
                ...state,
                loginPrcessing: false,
                loginSuccess: false,
                loginFail: true,
                loginMessage: payload
            }

        case types.LOGOUT_PROCESSING:
            return {
                ...state,
                logoutPrcessing: true,
                logoutSuccess: false,
                logoutFail: false,
                logoutMessage: "",
            }
        case types.LOGOUT_SUCCESS:
            return {
                ...state,
                logoutPrcessing: false,
                logoutSuccess: true,
                logoutFail: false,
                logoutMessage: "User Successfull Logout.",
                loginPrcessing: false,
                loginSuccess: false,
                loginFail: false,
                loginMessage: "",
                loginUser: {},

            }
        case types.LOGOUT_FAIL:
            return {
                ...state,
                logoutPrcessing: false,
                logoutSuccess: false,
                logoutFail: true,
                logoutMessage: "Logout Failed",
            }


        case types.GET_LAUNCHES_DATA_PROCESSING:
            return {
                ...state,
                getLaunchesDataProcessing: true,
                getLaunchesDataSuccess: false,
                getLaunchesDataFail: false,
                launchesData: [],
            }

        case types.GET_LAUNCHES_DATA_SUCCESS:
            return {
                ...state,
                getLaunchesDataProcessing: false,
                getLaunchesDataSuccess: true,
                getLaunchesDataFail: false,
                launchesData: payload,
            }

        case types.GET_LAUNCHES_DATA_FAIL:
            return {
                ...state,
                getLaunchesDataProcessing: false,
                getLaunchesDataSuccess: false,
                getLaunchesDataFail: true,
                launchesData: [],
            }

        default:
            return state;
    }

}