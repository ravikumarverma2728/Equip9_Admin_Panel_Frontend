import React, { useEffect, useState, useContext } from 'react';
import Navbar from './Navbar';
import image1 from '../Images/leadership-amico.svg';
import '../Css/HomePage.css';
import { AppContext } from "../App";
import { capitalizeFirstLetter } from '../Utils/utils';

const HomePage = () => {
  const [greeting, setGreeting] = useState('');
  const { isUserLoggedIn, setUserLoggedin,user} = useContext(AppContext);

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour >= 0 && currentHour < 12) {
      setGreeting('Good Morning');
    } else if (currentHour >= 12 && currentHour < 16) {
      setGreeting('Good Afternoon');
    } else if (currentHour >= 16 && currentHour < 19) {
      setGreeting('Good Evening');
    } else {
      setGreeting('Good Night');
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className='row home-page-content-wrapper'>
        <div className='col-8 home-page-card'>
          <div className='row'>
            <div className='col-6'>
              <img className='equip9-welcome-image' src={image1} alt='equip9_welcome_image' />
            </div>
            <div className='col-6 home-page-welcome-content-wrapper'>
              <div className='home-page-welcome-content'>{greeting}</div>
              {isUserLoggedIn?
                <div className='home-page-welcome-conditional-content'>{capitalizeFirstLetter(user?.first_name)}</div>:
                <div className='home-page-welcome-conditional-content'>User</div>
              }
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
