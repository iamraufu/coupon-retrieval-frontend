import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import logo from '../images/logo.svg'

const Home = () => {

      const { register, handleSubmit, formState: { errors } } = useForm();
      const onSubmit = data => processSMS(data);
      const [data, setData] = useState()
      const [message, setMessage] = useState("")

      const processSMS = (formData) => {

            const btn = document.getElementById('btn_sms')
            btn.innerText = 'Sending SMS. Please wait...'
            btn.disabled = true

            const fetchData = async () => {

                  const data = {
                        phone: Number(`88${formData.phone}`)
                  }

                  try {

                        const requestOptions = {
                              method: "POST",
                              headers: {
                                    "Content-Type": "application/json"
                              },
                              body: JSON.stringify(data)
                        }

                        const response = await fetch(`http://localhost:8000/api/send-sms`, requestOptions)
                        const result = await response.json()

                        result.status && setData(result.data)
                        setMessage(result.message)
                        btn.innerText = 'Send SMS'
                        btn.disabled = false

                  } catch (error) {
                        console.log(error);
                  }
            };
            fetchData();
      }

      return (
            <div className="bg-image">
                  <div className="flex items-center gap-5 p-5 bg-violet-800 text-white">
                        <div className="flex gap-5">
                              <img src={logo} className='' alt="Shwapno Brand Logo" />
                              <h1 className='text-lg font-medium my-3 '>Customer Coupon Retrieval</h1>
                        </div>

                        {/* <div className="ms-auto">
                              <h2 className='capitalize'>{user.code} {user.name}</h2>
                        </div> */}

                        {/* <button onClick={() => logOut()} className='bg-[#d9c1ff] hover:bg-[#d9c1ff] py-2 rounded-md text-xs px-3 text-rose-800 font-bold'>Logout</button> */}
                  </div>


                  <div className="w-full flex justify-around items-center">
                        <div className="md:ml-20 px-5 flex items-center h-[75vh] flex-1">
                              <div className='w-full md:w-1/2 lg:w-1/3 p-3'>

                                    <div className="">
                                          <h2 className='text-left text-xl font-medium'>Customer Details</h2>
                                          <form onSubmit={handleSubmit(onSubmit)}>
                                                <div className="my-2">
                                                      <input id='input_phone' placeholder='Enter Customer Phone Number' autoComplete={`phone-number`} className='w-full p-2 border-2 border-violet-600 focus:outline-violet-800 rounded' min='0' type='number' {...register("phone", { required: true, pattern: /^01[3-9]\d{8}$/, maxLength: 11 })} />
                                                      <br />
                                                      {errors.phone && <span className='text-rose-500'>*Invalid Phone Number</span>}
                                                </div>

                                                {
                                                      message.length > 0 && <p className='py-2'>{message}</p>
                                                }

                                                {
                                                      data &&
                                                      <p className='py-2'>Your coupon code: <span className='bold text-green-700'>{data?.coupon}</span></p>
                                                }


                                                <button id='btn_sms' type="submit" className='bg-violet-700 hover:bg-violet-800 text-white w-[100%] py-2 rounded-md'>Send SMS</button>
                                          </form>
                                    </div>

                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default Home;