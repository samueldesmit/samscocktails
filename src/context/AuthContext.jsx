import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
export const AuthContext = createContext({});

function CustomProvider({ children }) {
  const [isAuth, setIsAuth] = useState({
    isAuthenticated: false,
    user: null,
    status: 'pending',
  });

  function toggleInlog(token) {
    localStorage.setItem('token', token);
    const username = jwtDecode(token).sub;
    const bearerToken = `Bearer ${token}`;
    fetchUserData(username, bearerToken);
  }

  function toggleLogout() {
    localStorage.removeItem('token')
    setIsAuth({
      isAuthenticated: false,
      user: null,
      status: 'done',
    });
    navigate("/login")
  }


  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      const username = jwtDecode(token).sub;
      const bearerToken = `Bearer ${token}`;
      void fetchUserData(username, bearerToken);
    } else {
      setIsAuth({
        ...isAuth,
        status: 'done',
      })
    }
  }, [])

  const navigate = useNavigate();

  async function fetchUserData(username, token) {
    try {
      const response = await axios.get(`https://api.datavortex.nl/samscocktails/users/${username}`,
        {
          headers: {
            Authorization: token,
            'X-Api-Key': 'samscocktails:QB5ihxHOKOYLzkrRD08o',
          },
        });
      setIsAuth({
        isAuthenticated: true,
        user: {
          username: response.data.username,
          email: response.data.email,
          info: response.data.info
        },
        status: 'done',
      });
      navigate("/")

    } catch (e) {
      setIsAuth({
        ...isAuth,
        status: 'done',
      })
      console.error(e)
    }
  }

  const data = {
    ...isAuth,
    toggleInlog: toggleInlog,
    toggleLogout: toggleLogout,
  }

  return (<AuthContext.Provider value={{ data }, data}>
    {isAuth.status === 'done' ? children : <p>loading...</p>}
  </AuthContext.Provider>)
}

export default CustomProvider
