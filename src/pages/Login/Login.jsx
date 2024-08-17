import './Login.scss'
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from 'react-router-dom';
import axios from "axios";

function Login() {

  const { toggleInlog } = useContext(AuthContext);
  const [username, setUsername] = useState({});
  const [password, setPassword] = useState({});
  const [error, setError] = useState({});
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': 'samscocktails:QB5ihxHOKOYLzkrRD08o'
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const login = await axios.post('https://api.datavortex.nl/samscocktails/users/authenticate',
        {
          "username": `${username}`,
          "password": `${password}`
        }, config);
      toggleInlog(login.data.jwt)
    } catch (e) {
      console.error(e);
      setError(e.response)
    }
  }


  return (
    <>
      <div className='login-page '>
        <form
          onSubmit={handleSubmit}>
          <label htmlFor=""> username <input type="text" onChange={e => setUsername(e.target.value)}
          /></label>
          <label htmlFor=""> password <input type="password"
            onChange={e => setPassword(e.target.value)} /></label>
          <button type="submit"> login</button>
        </form>
        {Object.keys(error).length > 0 && <p>username and or password incorrect</p>}
        <Link to='/register'>no account yet? click here to register! </Link>
      </div>
    </>
  );
}

export default Login