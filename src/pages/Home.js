import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import logo from '../images/logo.svg'
import checked from '../images/checked.png'
import failed from '../images/remove.png'

const Home = () => {

      const { register, handleSubmit, formState: { errors } } = useForm();
      const onSubmit = data => processSMS(data);
      const [isSmsSent, setIsSmsSent] = useState(false)
      const [isOtpSent, setIsOtpSent] = useState(false)
      const [isPromoSent, setIsPromoSent] = useState(false)
      const [isOtpVerified, setIsOtpVerified] = useState(false)
      const [data, setData] = useState({})
      const [message, setMessage] = useState("")

      const processSMS = (formData) => {
            setIsSmsSent(true)
            setMessage("")

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

                        const response = await fetch(`https://coupon-tfk5.onrender.com/api/send-sms`, requestOptions)
                        const result = await response.json()

                        if (result.status) {
                              setIsOtpSent(true)
                              setData(result)
                        }
                        setMessage(result.message)
                        setIsSmsSent(false)
                  } catch (error) {
                        console.log(error);
                  }
            };
            fetchData();
      }

      const handleOTPChange = async (inputOtp) => {
            if (Number(inputOtp) === data.data.otp) {
                  setIsOtpVerified(true)
            }
            else {
                  setIsOtpVerified(false)
            }
      }
      
      const sendPromo = async () => {

            if (isOtpVerified) {
                  const requestOptions = {
                        method: "POST",
                        headers: {
                              "Content-Type": "application/json"
                        },
                        body: JSON.stringify(data.data)
                  }

                  const response = await fetch(`https://coupon-tfk5.onrender.com/api/send-sms/promo`, requestOptions)
                  const result = await response.json()
                  console.log("Promo SMS Response", result);

                  if (result.status) {
                        setIsPromoSent(true)
                        setMessage('Coupon Code Sent')
                  }
            }
            else {
                  setMessage("Invalid OTP")
            }
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
                                    {/* <h2 className='text-lg font-medium mb-5'>Welcome to Shwapno.
                                          <br />
                                          Please Enter your phone number to retrieve the coupon code</h2> */}
                                    <h2 className='text-sm'>Customer Phone Number</h2>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                          <div className="my-2">
                                                <input
                                                      disabled={(isOtpSent || isPromoSent)? true : false}
                                                      placeholder='Enter Phone Number' autoComplete={`phone-number`} className='disabled:bg-white w-full p-2 border-2 border-violet-600 focus:outline-violet-800 rounded' min='0' type='number' {...register("phone", { required: true, pattern: /^01[3-9]\d{8}$/, maxLength: 11 })} />
                                                <br />
                                                {errors.phone && <span className='text-rose-500'>*Invalid Phone Number</span>}
                                          </div>

                                          {
                                                message.length > 0 &&
                                                <div className="flex content-center py-2">
                                                      {
                                                            data.status ?
                                                                  <img className='w-6 h-6 mr-2' src={checked} alt="icon" />
                                                                  :
                                                                  <img className='w-6 h-6 mr-2' src={failed} alt="icon" />

                                                      }
                                                      <p>{message}</p>
                                                </div>
                                          }

                                          {
                                                isOtpSent &&
                                                !isPromoSent &&
                                                <div className="my-2">
                                                      <input
                                                            min={0}
                                                            onChange={(e) => handleOTPChange(e.target.value)}
                                                            placeholder='Enter OTP' className='mx-auto block w-full p-2 border-2 border-violet-600 focus:outline-violet-800 rounded' type='number' />
                                                </div>
                                          }

                                          {
                                                isSmsSent ?
                                                      <button className='bg-violet-700 hover:bg-violet-800 text-white w-[100%] py-2 rounded-md flex items-center'>
                                                            <div role="status">
                                                                  <svg aria-hidden="true" className="w-6 h-6 mx-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                                  </svg>
                                                                  <span className="sr-only">Loading...</span>
                                                            </div>
                                                            Sending OTP. Please wait...
                                                      </button>
                                                      :
                                                      !isOtpSent &&
                                                      <button
                                                            disabled={isSmsSent ? true : false}
                                                            type="submit" className='bg-violet-700 hover:bg-violet-800 text-white w-[100%] py-2 rounded-md'> Verify</button>
                                          }
                                    </form>

                                    {
                                          isOtpSent &&
                                          !isPromoSent &&
                                          <button
                                                onClick={() => sendPromo()}
                                                disabled={isOtpSent ? false : true}
                                                type="submit" className='bg-violet-700 hover:bg-violet-800 text-white w-[100%] py-2 rounded-md'>Get Coupon</button>
                                    }
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default Home;