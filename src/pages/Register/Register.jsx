import './Register.scss'
import axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router-dom";

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
        <div>
          <h1>Welkom on the register page</h1>
          <form action="submit"
            onSubmit={handleSubmit}>
            <label htmlFor=""> username </label><input type="text"
              onChange={e => setUsername(e.target.value)}
            />
            <label htmlFor=""> email </label><input type="email" onChange={e => setEmail(e.target.value)} />
            <label htmlFor=""> password </label><input type="password"
              onChange={e => setPassword(e.target.value)} />
            <button
              type="submit"
            > Register
            </button>
          </form>
          {triggerError && <p>{error}</p>}
          <p>Email must contain an @ and password needs to be at
            least six characters long </p>
        </div>
      </main>
      {registerSucces && <Navigate to="/login" />}
    </>
  )
}

export default Register