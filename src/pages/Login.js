import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useEffect } from 'react';
import logo from '../images/logo.svg'
import users from '../data/user.json'

const Login = () => {

      let navigate = useNavigate();
      let location = useLocation();
      let from = location.state?.from?.pathname || "/";
      const { user, setUser } = useAuth();

      // Added later for error debugging
      useEffect(() => {
            user?.username && navigate(from, { replace: true })
      }, [from, navigate, user?.username])

      const { register, handleSubmit, formState: { errors } } = useForm();
      const onSubmit = data => processLogin(data);
      const [loginError, setLoginError] = useState('');

      const processLogin = (data) => {
            console.log(data);
            // const outlet = outlets.find(outlet => outlet.code.toLowerCase() === data.site.toLowerCase().trim() && outlet.code.toLowerCase() === data.password.toLowerCase().trim())
            // const isOutletExist = Boolean(outlet)

            // !isOutletExist && setLoginError("Username and Password Doesn't Match!")
            // isOutletExist && setLoginError("")
            // isOutletExist && setUser(outlet)
            // isOutletExist && localStorage.setItem("code", outlet.code.toLowerCase().trim())
            const user = users.find(user => user.username.toLowerCase().trim() === data.username.toLowerCase().trim() && user.password.toLowerCase().trim() === data.password.toLowerCase().trim())
            const isUserExist = Boolean(user)
            isUserExist && setUser(user)
      }

      return (
            <div className="bg-image">
                  <div className="flex items-center gap-5 p-5 bg-violet-800 text-white">
                        <div className="flex gap-5">
                              <img src={logo} className='' alt="Shwapno Brand Logo" />
                              <h1 className='text-lg font-medium my-3 '>Customer Coupon Retrieval</h1>
                        </div>
                  </div>

                  <div className="w-full flex justify-around items-center">
                        <div className="ml-20 flex items-center h-[75vh] flex-1">
                              <div className='w-1/3 p-3 text-center'>

                                    <div className="">
                                          <h2 className='text-left text-xl font-medium'>Login</h2>
                                          <form onSubmit={handleSubmit(onSubmit)}>
                                                <div className="my-2">
                                                      <input placeholder='Enter Username' autoComplete={`username`} className='w-full p-2 border-2 border-violet-600 focus:outline-violet-800 rounded' type='text' {...register("username", { required: true })} />
                                                      <br />
                                                      {errors.username && <span className='text-rose-500'>*Username required</span>}
                                                </div>

                                                <div className="my-2">
                                                      <input placeholder='Enter Password' autoComplete={`current-password`} className='w-full p-2 border-2 border-violet-600 focus:outline-violet-800 rounded' type='password' {...register("password", { required: true })} />
                                                      <br />
                                                      {errors.password && <span className='text-rose-500'>*Password required</span>}
                                                </div>

                                                <input type="submit" className='bg-violet-700 hover:bg-violet-800 text-white w-[100%] py-2 rounded-md' value='Login' />
                                          </form>
                                          <p className='my-2 text-left'>{loginError}</p>
                                    </div>

                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default Login;