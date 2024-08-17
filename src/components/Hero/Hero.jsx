import { useState, useEffect } from 'react';
import './Hero.scss';

function Hero({ heroTitle, heroImageLink }) {
  const [herostate, setHeroState] = useState(false);

  const handleScroll = () => {
    const triggerPoint = window.innerHeight / 25; // Adjust trigger point as needed
    setHeroState(window.scrollY > triggerPoint);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
  }, [heroTitle, heroImageLink]);

  return (
    <div className='hero-outer-container'>
      <div className='hero-outer-container__inner'>
        <img className='hero-image' src={heroImageLink} alt="Hero" />
        <div className={`text-holder ${herostate ? 'scrolled' : ''}`}>
          <h2 className={`text-holder__text ${herostate ? 'scrolled' : ''}`}>{heroTitle}</h2>
        </div>
      </div>
    </div>
  );
}

export default Hero;
