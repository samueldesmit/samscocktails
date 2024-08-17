import './Register.scss'
import axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Hero from '../../components/Hero/Hero';
import bannerImage from '../../assets/cocktail-home-image.webp';
function Register() {

  function handleSubmit(e) {
    e.preventDefault();
    registerUser();
  }

  const [email, setEmail] = useState({});
  const [username, setUsername] = useState({});
  const [password, setPassword] = useState({});
  const [registerSucces, setRegisterSucces] = useState(false);
  const [triggerError, setTriggerError] = useState(false);
  const [error, setError] = useState({});
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': 'samscocktails:QB5ihxHOKOYLzkrRD08o'
    }
  };

  async function registerUser() {
    try {
      await axios.post('https://api.datavortex.nl/samscocktails/users',
        {
          "username": `${username}`,
          "email": `${email}`,
          "password": `${password}`,
          "info": "11728",
          authorities: [{ authority: 'USER' }],
        }, config);
      setRegisterSucces(true);
    } catch (e) {
      console.error(e);
      setError(e.response.data.message);
      setTriggerError(true);
    }
  }

  return (
    <>
      <main className='register-page'>
        <Hero heroTitle='Register' heroImageLink={bannerImage} />
        <div className='register-page__inner'>
          <form className='register-form' action="submit"
            onSubmit={handleSubmit}>
            <label htmlFor=""> Username </label><input type="text"
              onChange={e => setUsername(e.target.value)} required
            />
            <label htmlFor=""> Email </label><input type="email" onChange={e => setEmail(e.target.value)} required/>
            <label htmlFor=""> Password </label><input type="password"
              onChange={e => setPassword(e.target.value)} required/>
            <button
              type="submit"
            > Register
            </button>
            {triggerError && <p>{error}</p>}
          </form>
          <div className='image-holder'>
            <img className='hero-image' src={bannerImage} alt="Hero" />
          </div>
        </div>
      </main>
      {registerSucces && <Navigate to="/login" />}
    </>
  )
}

export default Register