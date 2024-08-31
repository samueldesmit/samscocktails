import './Profile.scss';
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import NoInspiration from '../../components/No Inspiration/No-inspiration';
import Hero from '../../components/Hero/Hero';
import bannerImage from '../../assets/cocktail-home-image.webp';

function Profile() {
  const { user, toggleLogout } = useContext(AuthContext);

  return (
    <>
      <div className='profile-page'>
      <Hero heroTitle='Welcome' heroImageLink={bannerImage} />
        <div className='profile-page__inner'>
          <div className='text-holder'>
            <h3 className='text-holder__welcome-user'>Hej {user.username}!</h3>
            <p className='text-holder__introduction'>Welcome to Sams Cocktails!
              We're thrilled to have you here, where every sip is an adventure waiting to happen. Now that you're part of our fabulous community, you’ve unlocked the secret superpower: the Favorite button! 🌟🍹
              Think of it as your personal vault for all the cocktails that make you say, "I need another one of those!" Found a mojito that makes your heart sing? A margarita that dances on your taste buds? Just hit that Favorite button and voilà, it’s saved for your next happy hour.
              Dive into our ocean of cocktails and let the mixology magic begin. Whether you're in the mood for a zesty daiquiri, a classic gin and tonic, or a funky new concoction, we've got a recipe that’ll shake up your routine.
              Cheers to new flavors, endless fun, and your soon-to-be overflowing favorites list!
              🍸🥳🥃🍸</p>
            <p className='text-holder__introduction-extra'> P.S. Don’t be afraid to get a little shaken and stirred along the way.</p>
            <p className='text-holder__email'>You've have used <em>{user.email}</em>  as your email address</p>
            <a
              className='logout-button'
              type="button"
              onClick={toggleLogout}>
              log out
            </a>
          </div>
          <NoInspiration />
        </div>
      </div>
    </>
  );
}

export default Profile;
