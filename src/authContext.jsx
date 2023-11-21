import React, { useEffect, useReducer } from "react";
import MkdSDK from "./utils/MkdSDK";

export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  role: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        role: action.payload.role,
      };
      return {
        ...state,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

let sdk = new MkdSDK();

export const tokenExpireError = (dispatch, errorMessage) => {
  const role = localStorage.getItem("role");
  if (errorMessage === "TOKEN_EXPIRED") {
    dispatch({
      type: "Logout",
    });
    window.location.href = "/" + role + "/login";
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // Check localStorage for an authenticated user and token
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    const role = localStorage.getItem("role");

    if (token && user && role) {
      // Dispatch a login success action if credentials are found
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user,
          token,
          role,
        },
      });
    }
  }, []);

  const login = async (email, password, role) => {
    try {
      const response = await sdk.login(email, password, role);
      if (response && response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", email);
        localStorage.setItem("role", role);
        
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {
            user: email,
            token: response.token,
            role,
          },
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login failed:", error.message);
      return false;
    }
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
        login
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
