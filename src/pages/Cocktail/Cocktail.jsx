import "./Cocktail.scss";
import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import Hero from "../../components/Hero/Hero";
import NoInspiration from '../../components/No Inspiration/No-inspiration';
import axios from 'axios';
import { AuthContext } from "../../context/AuthContext";
import IconHeartFilled from '../../components/Icons/FilledHeart';
import IconHeartOutline from '../../components/Icons/EmptyHeart';

function Cocktail() {
  const { user } = useContext(AuthContext);
  const [soloCocktailData, setSoloCocktailData] = useState({});
  const [infoList, setInfoList] = useState(user.info || '');
  const { id } = useParams();
  const token = localStorage.getItem('token');
  const bearerToken = `Bearer ${token}`;

  useEffect(() => {
    async function fetchSoloCocktail() {
      try {
        const result = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        setSoloCocktailData(result.data.drinks[0]);
      } catch (e) {
        console.error(e);
      }
    }
    fetchSoloCocktail();
  }, [id]);

  const makeArray = infoList.split(/[\s,!.]+/).filter(Boolean);

  function handleFavorite(e) {
    e.preventDefault();
    let updatedInfoList;
    if (makeArray.includes(id)) {
      updatedInfoList = makeArray.filter(item => item !== id).join(' ');
    } else {
      updatedInfoList = [...makeArray, id].join(' ');
    }
    setInfoList(updatedInfoList);
    addFavorite(updatedInfoList);
  }

  async function addFavorite(updatedInfoList) {
    try {
      await axios.put(`https://api.datavortex.nl/samscocktails/users/${user.username}`, {
        "info": updatedInfoList,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': bearerToken,
          'X-Api-Key': 'samscocktails:QB5ihxHOKOYLzkrRD08o',
        },
      });
    } catch (e) {
      console.error(e);
    }
  }

  if (!soloCocktailData) return null;

  const ingredients = Array.from({ length: 15 }, (_, i) => ({
    ingredient: soloCocktailData[`strIngredient${i + 1}`],
    measure: soloCocktailData[`strMeasure${i + 1}`],
  })).filter(item => item.ingredient);

  return (
    <>
      {soloCocktailData && (
        <Hero heroTitle={soloCocktailData.strDrink} heroImageLink={soloCocktailData.strDrinkThumb} />
      )}
      <section className='cocktail'>
        <div className="cocktail__inner">
          <div className="image-holder">
            {soloCocktailData && (
              <img className="image-holder__image" src={soloCocktailData.strDrinkThumb} alt="" />
            )}
          </div>
          <div className="text-holder">
            <div className="text-holder__title-holder">
              <h2 className="title"> {soloCocktailData.strDrink}</h2>
              <span className="favorite-heart">
                <span type="button" value={id} onClick={handleFavorite}> {makeArray.includes(id) ? <IconHeartFilled value={id} onClick={handleFavorite} /> : <IconHeartOutline value={id} onClick={handleFavorite} />}</span>
              </span>
              <p className="instructions">{soloCocktailData.strInstructions}</p>
            </div>
            <div className="ingredients-holder">
              <h3 className="ingredients-holder__title">Ingredients:</h3>
              <ul className="ingredients-holder__list">
                {ingredients.map((item, index) => (
                  <li className="list-item" key={index}>
                    <span>{item.ingredient} {item.measure}</span>
                    <img src={`https://www.thecocktaildb.com/images/ingredients/${item.ingredient}-Medium.png`} alt="" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="cocktail__inner-other">
          <NoInspiration />
        </div>
      </section>
    </>
  );
}

export default Cocktail;
