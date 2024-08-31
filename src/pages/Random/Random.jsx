import './Random.scss';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import Hero from '../../components/Hero/Hero';
import { Link } from 'react-router-dom';
import bannerImage from '../../assets/cocktail-home-image.webp';
import { AuthContext } from "../../context/AuthContext";

function Random() {
  const [cocktailData, setCocktailData] = useState({});
  const [activeCocktailId, setActiveCocktailId] = useState(null);
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    fetchRandomCocktail();
  }, []);

  function handleRandomCocktail(e) {
    setCocktailData({});
    e.preventDefault();
    fetchRandomCocktail();
  }

  async function fetchRandomCocktail() {
    try {
      const result = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php');
      setCocktailData(result.data);
    } catch (e) {
      console.error(e);
    }
  }

  function handleItemClick(id) {
    setActiveCocktailId(id);
  }

  return (
    <main>
      <Hero heroTitle='Random Cocktail' heroImageLink={bannerImage} />
      <div className='random-cocktail'>
        <div className='random-cocktail__inner'>
          <form className='randomsearchform' action="" onSubmit={handleRandomCocktail}>
            <button className='randomsearchform__button' type="submit">
              Surprise Me
            </button>
          </form>
          {cocktailData.drinks && cocktailData.drinks.map((cocktail) => (
            <div className='randomsearchgrid' key={cocktail.idDrink}>
              <div
                className='randomsearchgrid__item'
                onMouseEnter={() => handleItemClick(cocktail.idDrink)}
              >
                <p className='item-title'>{cocktail.strDrink}</p>
                <div className='item-image'>
                  <img className='item-image__image' src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
                </div>
                {cocktail.strTags && <span className='item-tags'>{cocktail.strTags.replace(",", ' - ')}</span>}
              </div>
              <div
                className={`randomsearchgrid__specs ${activeCocktailId === cocktail.idDrink ? 'mainsearchgrid__specs-active' : ''}`}
              >
                {isAuthenticated ?
                  <div className='text-holder'>
                    <p className='text-holder__title'>{cocktail.strDrink}</p>
                    {cocktail.strInstructions && <p className='text-holder__instructions'>{cocktail.strInstructions}</p>}
                    {cocktail.strIngredient1 && (
                      <ul className='ingredients'>
                        {Array.from({ length: 20 }, (_, i) => i + 1).map(num => (
                          cocktail[`strIngredient${num}`] && (
                            <li className='item-ingredient' key={num}>
                              <span>{cocktail[`strIngredient${num}`]}</span>
                              <span>{cocktail[`strMeasure${num}`]}</span>
                            </li>
                          )
                        ))}
                      </ul>
                    )}
                    {cocktail.strGlass && <p className='text-holder__glass'>Serve in a {cocktail.strGlass}</p>}
                    <Link className='text-holder__button' to={`/cocktail/${cocktail.idDrink}`}>View cocktail</Link>
                  </div>
                  :
                  // when user is not logged in, the following will be displayed
                  <div className='text-holder'>
                    <p className='text-holder__text-login'>Login to view more</p>
                    <Link className='text-holder__button text-holder__button-login' to='/login'>Login</Link>
                  </div>
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Random;
