import './No-inspiration.scss';
import sexOntheBeach from '../../assets/sex-on-the-beach-cocktail.jpg';
import { Link } from 'react-router-dom';

function NoInspiration() {

  return (
    <>
      <div className='noinpirationgrid'>
        <div className='image-holder'>
          <img className='image-holder__image' src={sexOntheBeach} alt="Two blue cocktails" />
        </div>
        <div className='text-holder'>
          <h2 className='text-holder__title'>Shake Up Your Party with the Random Cocktail Finder!</h2>
          <p className='text-holder__text'>One sunny afternoon, Sam faced a cocktail crisis. Hosting a barbecue, he had no inspiration for a new drink. Desperate, he went to Sams Cocktails and hit "Surprise Me."
            The app suggested the Dragon's Breath Elixir, a mix of tequila, pineapple juice, hot sauce, and cilantro. Skeptical but curious, Sam made it and took a sip. Whoa, this is actually good! he exclaimed.
            He proudly served it to his friends, who loved it. When asked about the recipe, Sam pointed to his phone and said, All thanks to the Random Cocktail Finder app! When in doubt, let the app figure it out.
            The barbecue was a hit, and Sam's cocktail crisis was averted. Cheers to random inspiration!</p>
          <Link className="text-holder__link" to='/random'>Find a random cocktail</Link>
        </div>
      </div>
    </>
  )
}

export default NoInspiration