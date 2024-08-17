import './Home.scss';
import axios from 'axios';
import { useState, useContext } from 'react';
import Hero from '../../components/Hero/Hero';
import NoInspiration from '../../components/No Inspiration/No-inspiration';
import cocktailStockPhoto from '../../assets/cocktails-with-friends.jpg';
import { Link } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";
import bannerImage from '../../assets/cocktail-home-image.webp';


function Home() {
  const [inputValueDish, setInputValueDish] = useState('');
  const [cocktailData, setCocktailData] = useState({});
  const [activeCocktailId, setActiveCocktailId] = useState(null);
  const [showErrorPopup, setShowErrorPopup] = useState(false); // State for managing the error popup visibility

  function handleSubmit(e) {
    e.preventDefault();
    fetchCocktail();
  }

  async function fetchCocktail() {
    try {
      const result = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputValueDish}`);
      if (result.data.drinks) {
        setCocktailData(result);
        setShowErrorPopup(false); // Hide the error popup if cocktails are found
      } else {
        setCocktailData({});
        setShowErrorPopup(true); // Show the error popup if no cocktails are found
      }
    } catch (e) {
      console.error(e);
      setShowErrorPopup(true); // Show the error popup if there is an error fetching cocktails
    }
  }

  function handleItemClick(id) {
    setActiveCocktailId(id);
  }

  function disableItemClick() {
    setActiveCocktailId(null);
  }

  return (
    <main>
      <Hero heroTitle='C O C K T A I L S' heroImageLink={bannerImage} />


      <div className='mainsearch'>
        <div className='mainsearch__inner'>
          {showErrorPopup && <span className='nothing-found-message' onClick={() => setShowErrorPopup(false)}> <p>
            No cocktails found with <span>{inputValueDish}</span> Please try again.</p>
          </span>}
          <form
            className='mainsearchform'
            action=""
            onSubmit={handleSubmit}
          >
            <input
              className='mainsearchform__input'
              type="text"
              placeholder="search with main ingredients"
              onChange={e => {
                setInputValueDish(e.target.value);
                setShowErrorPopup(false); 
              }}/>
            <button className='mainsearchform__button' type="submit">
              Fetch cocktail!
            </button>
          </form>
          <div className='mainsearchgrid'>
            {cocktailData.data && cocktailData.data.drinks && (
              cocktailData.data.drinks.map((cocktail) => {
                return (
                  <div
                    className='mainsearchgrid__item'
                    key={cocktail.idDrink}
                    onMouseEnter={() => handleItemClick(cocktail.idDrink)}
                  >
                    <p className='item-title'>{cocktail.strDrink}</p>
                    <div className='item-image'>
                      <img className='item-image__image' src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
                    </div>
                    <div
                      className={`mainsearchgrid__specs ${activeCocktailId === cocktail.idDrink ? 'mainsearchgrid__specs-active' : ''}`}
                      key={cocktail.idDrink}
                      onMouseLeave={disableItemClick}
                    >
                      <div className='text-holder'>
                        <p className='text-holder__title'>{cocktail.strDrink}</p>
                        {cocktail.strInstructions &&
                          <p className='text-holder__instructions'>{cocktail.strInstructions}</p>}
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
                        <Link className='text-holder__button' to={`/cocktail/${cocktail.idDrink}`}>View cocktail
                        </Link>
                        {cocktail.strGlass && <p className='text-holder__glass'>Serve in a {cocktail.strGlass}</p>}
                      </div>
                    </div>
                    {cocktail.strTags && <span className='item-tags'>{cocktail.strTags.replace(",", ' - ')}</span>}
                  </div>
                );
              })
            )}
          </div>
          {(!cocktailData.data || !cocktailData.data.drinks) && (
            <div className='nosearchgrid'>
              <div className='text-holder'>
                <h2 className='text-holder__title'>Search for the perfect cocktail!</h2>
                <p className='text-holder__text'>Discover your favorite cocktails by simply typing in the name or ingredients. Hover over the search results to reveal the recipe and ingredients list, so you can impress your friends with your mixology skills. Cheers to finding your perfect drink with just a few clicks!</p>
              </div>
              <div className='image-holder'>
                <img className='image-holder__image' src={cocktailStockPhoto} alt="Two blue cocktails" />
              </div>
            </div>
          )}
          <NoInspiration />
        </div>
      </div>
    </main >
  );
}

export default Home;
