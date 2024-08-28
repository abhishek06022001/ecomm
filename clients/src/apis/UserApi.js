import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

const UserApi = (token) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setisAdmin] = useState(false);
  const [user, setUser] = useState({});
  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios("/users/information", {
            headers: { Authorization: token },
          });
          setIsLogged(true);
          setUser(res.data);
          res.data.role === 1 ? setisAdmin(true) : setisAdmin(false);
        } catch (error) {
          console.log(error.response.data.msg);
        }
      };
      getUser();
    }
  }, [token]);
  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setisAdmin],
    user: user,
  };
};
export default UserApi;
