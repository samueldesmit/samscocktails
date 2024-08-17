import Home from "./pages/Home/Home"
import Nav from "./components/Nav/Nav"
import NotFoundPage from "./pages/Notfound/NotFoundPage"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import Random from "./pages/Random/Random"
import Profile from "./pages/Profile/Profile"
import Cocktail from "./pages/Cocktail/Cocktail"
import Favorites from "./pages/Favorites/Favorites"
import { Navigate, Routes, Route } from 'react-router-dom'
import {AuthContext} from "./context/AuthContext";
import {useContext} from "react";

function App() {

  const { isAuthenticated } = useContext(AuthContext);

  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={ isAuthenticated ? <Profile/> : <Navigate to="/login"/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/random" element={<Random />} />
        <Route path="/cocktail/:id" element={<Cocktail />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="*" element={<NotFoundPage />} />

      </Routes>
    </>
  )
}

export default App
