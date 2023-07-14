import React, { useContext } from 'react';
import '../Css/Registration.css';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Navbar from './Navbar';
import axios from 'axios';

const Registration = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const formData = new FormData();
      formData.append('first_name', data.first_name);
      formData.append('last_name', data.last_name);
      formData.append('mobile_no', data.mobile_no);
      formData.append('password', data.password);
      formData.append('file', data.file[0]); // Use 'profile_pic' instead of 'file'
      formData.append('admin', data.admin);
      console.log(formData);
      const response = await axios.post(' http://localhost:9000/users/signup', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);
      if (response.status === 200) {
        toast.success('You are successfully registered');
        navigate('/LogIn');
      }
    } catch (error) {
      console.log(error);
      toast.error('Unexpected error');
    }
  };

  const handleMobileNoChange = (event) => {
    const value = event.target.value.replace(/\D/g, '').slice(0, 10); // Remove non-digits and limit to 10 characters
    event.target.value = value;
  };

  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="row form-main-wrapper">
          <div className="col-3">
            <div className="row">
              <div className="col-12 form-text">Sign up</div>
            </div>
            <div className="row">
              <div className="col-12 col-margin">
                <TextField
                  className="form-inputs"
                  id="outlined-basic"
                  label={
                    <>
                      First Name<span className="required-field">*</span>
                    </>
                  }
                  variant="outlined"
                  type="text"
                  error={!!errors.first_name}
                  helperText={errors.first_name?.message?.toString()}
                  {...register('first_name', {
                    required: {
                      value: true,
                      message: "Field can't be empty",
                    },
                  })}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-margin">
                <TextField
                  className="form-inputs"
                  id="outlined-basic"
                  label={
                    <>
                      Last Name<span className="required-field">*</span>
                    </>
                  }
                  variant="outlined"
                  type="text"
                  error={!!errors.last_name}
                  helperText={errors.last_name?.message?.toString()}
                  {...register('last_name', {
                    required: {
                      value: true,
                      message: "Field can't be empty",
                    },
                  })}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-margin">
                <TextField
                  className="form-inputs"
                  id="outlined-basic"
                  label={
                    <>
                      Mobile Number<span className="required-field">*</span>
                    </>
                  }
                  variant="outlined"
                  error={!!errors.mobile_no}
                  helperText={errors.mobile_no?.message?.toString()}
                  {...register('mobile_no', {
                    required: {
                      value: true,
                      message: "Field can't be empty",
                    },
                    minLength: {
                      value: 10,
                      message: 'Mobile number should be 10 digits',
                    },
                    maxLength: {
                      value: 10,
                      message: 'Mobile number should be 10 digits',
                    },
                  })}
                  onChange={handleMobileNoChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-margin">
                <TextField
                  className="form-inputs"
                  id="outlined-basic"
                  label={
                    <>
                      Password<span className="required-field">*</span>
                    </>
                  }
                  variant="outlined"
                  type="password"
                  error={!!errors.password}
                  helperText={errors.password?.message?.toString()}
                  {...register('password', {
                    minLength: {
                      value: 8,
                      message: 'Please enter a minimum of 8 characters',
                    },
                    required: {
                      value: true,
                      message: 'Please enter your password',
                    },
                  })}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-margin">
                <TextField
                  type="file"
                  accept="image/*"
                  error={!!errors.file}
                  helperText={errors.file?.message?.toString()}
                  {...register('file', {
                    required: {
                      value: true,
                      message: 'Please Upload Your Profile Picture',
                    },
                  })}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-margin">
                <input className="form-checkbox" type="checkbox" {...register('admin')} />
                <label className="form-label">Register as Admin</label>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-margin">
                <button type="submit" className="form-button">
                  Sign up
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-margin form-terms-conditions">
                By signing up, you agree to our <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>
              </div>
            </div>
            <div className="row redirect-wrapper">
              <div className="col-9 redirect">
                Already have an account?<Link to={'/LogIn'}> Log in</Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Registration;
