import './Favorites.scss';
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import NoInspiration from '../../components/No Inspiration/No-inspiration';
import Hero from '../../components/Hero/Hero';
import bannerImage from '../../assets/cocktail-home-image.webp';

function Favorites() {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [userData, setUserData] = useState([]);
  const token = localStorage.getItem('token');
  const bearerToken = `Bearer ${token}`; <NoInspiration />


  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await axios.get(`https://api.datavortex.nl/samscocktails/users/${user.username}`, {
          headers: {
            Authorization: bearerToken,
            'X-Api-Key': 'samscocktails:QB5ihxHOKOYLzkrRD08o',
          },
        });
        setUserData(response.data.info.split(' ').filter(Boolean));
      } catch (e) {
        console.error(e);
      }
    }
    fetchUserData();
  }, [user, bearerToken]);

  useEffect(() => {
    async function fetchSoloCocktail() {
      if (userData.length === 0) return;

      try {
        const result = await Promise.all(
          userData.map(id =>
            axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
          )
        );
        const drinks = result.map(response => response.data.drinks);
        setFavorites(drinks);
      } catch (e) {
        console.error(e);
      }
    }
    fetchSoloCocktail();
  }, [userData]);

  return (
    <div className='favorites-page'>
            <Hero heroTitle='Favorites' heroImageLink={bannerImage}/>

      <div className='favorites-page__inner'>
        <div className='favorites-grid'>
          {favorites.map((drinkArray, index) => (
            <div className='favorites' key={index}>
              {drinkArray.map(drink => (
                <Link className='favorite' key={drink.idDrink} to={`/cocktail/${drink.idDrink}`}>
                  <div className='favorite-div'>
                    <span className='favorite-div__title-holder'>
                      <h5 className='title'>{drink.strDrink}</h5>
                    </span>
                    <img className='favorite-div__image' src={drink.strDrinkThumb} alt={drink.strDrink} />
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="cocktail__inner-other">
        <NoInspiration />
      </div>

    </div>
  );
}

export default Favorites;
