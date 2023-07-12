import React , {useContext,useEffect,useState} from 'react'
import  '../Css/Registration.css';
import  '../Css/LogIn.css';
import 'react-toastify/dist/ReactToastify.css';
import { AppContext } from "../App";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import TextField from '@mui/material/TextField';
import Navbar from "./Navbar";
import axios from 'axios';


const LogIn = () => {
    const navigate = useNavigate();
    const { register,handleSubmit, formState: { errors } } = useForm();
    const { isUserLoggedIn, setUserLoggedin ,setUser,user} = useContext(AppContext);
    useEffect(() => {
      if (isUserLoggedIn == true) {
        navigate("/");
      }
  }, [isUserLoggedIn]);
    const onSubmit = async (data) => {
        try {
          console.log(data);
          const response = await axios.post("http://localhost:9000/users/login", data);
          console.log(response);
      
          if (response.status === 200) {
            toast.success('You are successfully logged in!');
            const userInformation = {
              first_name: response.data.first_name,
              last_name: response.data.lastname_name,
              mobile_no: response.data.mobile_no,
              profile_pic: response.data.profile_pic,
              admin: response.data.admin,
              token: response.data.authToken,
            };
            localStorage.setItem("user", JSON.stringify(userInformation));
            setUserLoggedin(true);
            setUser(userInformation);
            navigate('/');
          } else if (response.status === 401) {
            toast.error('Incorrect password');
          } else {
            toast.error('Incorrect credentials or the user does not exist');
          }
        } catch (error) {
          console.log(error);
          toast.error('Wrong Credentials');
        }
    };

  return (
    
    <>
    <Navbar/>
    <form onSubmit={handleSubmit(onSubmit)} >

        <div className='row form-main-wrapper login-main-wrapper' >
            <div className='col-3 '>
                <div className='row'>
                    <div className='col-12 form-text '>
                        Log In
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12 col-margin'>
                    <TextField 
                    className='form-inputs' 
                    id="outlined-basic" 
                    label="Mobile Number" 
                    variant="outlined" 
                    type="Number" 
                    error={!!errors.mobile_no}
                    helperText={errors.mobile_no?.message?.toString()}
                    {...register('mobile_no', {
                        required: {
                            value: true,
                            message: "Field can't be empty"
                        }
                    })}/>
                    
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12 col-margin'>
                        <TextField
                         className='form-inputs' id="outlined-basic" 
                         label="Password" 
                         variant="outlined" 
                         type="password" 
                         error={!!errors.password}
                         helperText={errors.password?.message?.toString()}
                         {...register('password', {
                            // onChange: (event) => {
                            //     setPassword(event.target.value)
                            // },
                            minLength: {
                              value: 8,
                              message: "Please enter a minimum of 8 characters"
                          },
                          required: {
                              value: true,
                              message: "Please enter your password"
                          }
                          })}/>

                    </div>
                </div>
                
                
                      
                     

                <div className='row'>
                    <div className='col-12 col-margin'>
                    <button type="submit" className="form-button">Log In</button>
                    </div>
                </div>

                <div className='row redirect-wrapper'>
                    <div className='col-9 redirect'>
                    
                        Don't have an account?<Link to={'/Registration'}>Sign Up</Link>
                    
                    </div>
                </div>
                
            </div>
        </div>

    </form>
    </>
  )
}

export default LogIn