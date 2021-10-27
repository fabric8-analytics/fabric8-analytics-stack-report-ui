import { useReducer } from "react";
import { RegisterUser } from "../utils/apiCalls";

const initialState = {
  APIData: {},
  Loading: true,
  LoadingSpinner: false,
  IsRegUser: false,
  UUID: null,
  Error: false,
  ErrorData: {},
  Companion: [],
};

const reducer = (state: any, action: { type: any, data: any }) => {
  switch (action.type) {
    case "APIData":
      return {
        ...state,
        APIData: action.data,
        IsRegUser: action.data?.registration_status === "REGISTERED",
        UUID: action.data?.uuid,
        Companion: action.data.recommendation.companion,
      };
    case "Loading":
      return {
        ...state,
        Loading: action.data,
      };
    case "Error":
      return {
        ...state,
        Error: action.data,
      };
    case "ErrorData":
      return {
        ...state,
        ErrorData: action.data,
      };
    case "UUID":
      return {
        ...state,
        UUID: action.data,
      };
    default: {
      return state;
    }
  }
};

const useGlobalState = () => {
  const [globalState, globalDispatch] = useReducer(reducer, initialState);
  return { globalState, globalDispatch };
};

export default useGlobalState;
