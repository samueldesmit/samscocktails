import './Footer.scss';

function Footer() {

  return (
    <div className='footer'>
      <div className='footer__inner'>
        <div className='footer-information-column'>
          <p>Sam's Cocktails  ©</p>
          <p>2024</p>
        </div>
        <div className='footer-information-column'>
          <p>Powered by</p>
          <a href='https://www.thecocktaildb.com/' target='_blank'>TheCocktailDB</a>
        </div>
        <div className='footer-information-column'>
          <p>Sepcial thanks to</p>
          <ul>
            <li>Rowan Plooij</li>
            <li>Sam Barnhoorn</li>
            <li>Nova Eeken</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
