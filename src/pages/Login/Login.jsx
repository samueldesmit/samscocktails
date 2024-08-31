import './Login.scss'
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from 'react-router-dom';
import axios from "axios";
import inlogImage from '../../assets/cocktail-home-image.webp';
import Hero from '../../components/Hero/Hero';
import bannerImage from '../../assets/cocktail-home-image.webp';

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
      <div className='login-page'>
      <Hero heroTitle='Login' heroImageLink={bannerImage}/>
        <div className='login-page__inner'>
        <form className='login-form'
          onSubmit={handleSubmit}>
          <label htmlFor="username">Username </label> <input type="text" onChange={e => setUsername(e.target.value)} required
          />
          <label htmlFor="password">Password </label> <input type="password"
            onChange={e => setPassword(e.target.value)} required/>
          <button type="submit"> login</button>
          {Object.keys(error).length > 0 && <p>username and or password incorrect</p>}
          <Link className='to-register' to='/register'>no account yet? click here to register! </Link>
        </form>
        <div className='image-holder'> 
        <img className='hero-image' src={inlogImage} alt="Hero" />
        </div>
        </div>
      </div>
    </>
  );
}

export default Login