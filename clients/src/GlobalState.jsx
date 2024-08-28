import { Children, createContext, useEffect, useState } from "react";
import axios from "axios";
import ProductAPI from "./apis/ProductAPI";
import UserApi from "./apis/UserApi";
import CategoryApi from "./apis/CategoryApi";
export const GlobalState = createContext();
export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);
  const refreshtoken = async () => {
    const res = await axios('/users/refresh_token');
    setToken(res.data.accessToken);
  }
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('loggedIn');
    if (isLoggedIn) {
      refreshtoken();
    }
  }, [])
  const state = {
    productAPI: ProductAPI(),
    userApi: UserApi(token),
    token: [token, setToken],
    categoryAPI: CategoryApi()
  };
  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
