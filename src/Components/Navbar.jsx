import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../Css/Navbar.css';
import image from '../Images/logo2min.jpg';
import { AppContext } from '../App';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { capitalizeFirstLetter } from '../Utils/utils';
import { Button } from '@mui/material';

const Navbar = () => {
  const navigate = useNavigate();
  const { isUserLoggedIn, setUserLoggedin, user } = useContext(AppContext);

  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#333',
      color: '#fff',
      maxWidth: 300,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #ccc',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    [`& .${tooltipClasses.arrow}`]: {
      color: '#333',
    },
  }));

  const logoutUser = () => {
    localStorage.removeItem('user');
    setUserLoggedin(false);
    toast.success('You are successfully Logged Out');
    navigate('/');
  };

  return (
    <>
      <nav className="navbar-main">
        <div>
          <NavLink to="/">
            <img className="nav-equip9-image" src={image} alt="equip9_image" />
          </NavLink>
        </div>

        {isUserLoggedIn ? (
          <div className="d-flex">
            {user.admin === 1 ? (
              <div>
                <NavLink className="navbar-links" to="/Crud">
                  CRUD
                </NavLink>
              </div>
            ) : null}

            <div className="avatar-div">
              <HtmlTooltip
                title={
                  <>
                    <div className="d-flex avatar-hover-container">
                      <div>
                        <div className="avatar-hover-container-username">{capitalizeFirstLetter(user?.first_name)}</div>
                      </div>
                    </div>

                    <div className="avatar-hover-container-logout-wrapper">
                      <Button onClick={logoutUser}><span className="avatar-hover-container-logout">Log out</span></Button>
                    </div>
                  </>
                }
                arrow
                placement="bottom"
              >
                <Avatar sx={{ bgcolor: 'blue' }}>{user?.first_name[0]}</Avatar>
              </HtmlTooltip>
            </div>
          </div>
        ) : (
          <div className="d-flex">
            <div>
              <NavLink className="navbar-links" to="/Registration">
                Sign Up
              </NavLink>
            </div>
            <div>
              <NavLink className="navbar-links" to="/LogIn">
                Log In
              </NavLink>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
