
import { Link } from 'react-router-dom';
import "./NotFoundPage.scss";
import bannerImage from '../../assets/cocktail-home-image.webp';
import Hero from '../../components/Hero/Hero';

function NotFoundPage() {
    return (
        <>
            <section className='notfound-page'>
                <Hero heroTitle='404' heroImageLink={bannerImage} />
                <div className='notfound-page__inner'>
                    <div className='text-holder'>
                        <h2 className='text-holder__title'>One does not simply find the Mithril Martini!</h2>
                        <p className='text-holder__text'> In a cozy Shire tavern, Frodo Baggins embarked on a quest for the legendary Mithril Martini, a cocktail so rare it shimmered like precious metal. One does not simply find the Mithril Martini, warned Gandalf, chuckling.  Frodo and Sam scoured every pub from Bree to Rivendell, but the elusive drink remained hidden.  Finally, Gollum whispered, Precioussss cocktail, we knows where it hides. Following Gollum to a hidden speakeasy beneath the Misty Mountains, Frodo found the menu. There, at the bottom, was the fabled drink.  But the bartender sighed, We ran out of Mithril flakes centuries ago. With a shrug, Frodo raised a pint of Dwarven Ale and toasted, To the greatest cocktail never found! </p>
                        <Link className="text-holder__link" to='/'>Continue your quest</Link>
                    </div>
                    <div className='image-holder'>
                        <img className='image-holder__image' src={bannerImage} alt="Two blue cocktails" />
                    </div>
                </div>
            </section>
        </>
    );
}

export default NotFoundPage