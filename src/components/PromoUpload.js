import React, { useState } from 'react';
import logo from '../images/logo.svg'
import { FileUploader } from "react-drag-drop-files";
import * as CSV from 'xlsx';
let valid

const PromoUpload = () => {

      const fileTypes = ["CSV", "XLSX"];

      const [fileUploadError, setFileUploadError] = useState("")
      // eslint-disable-next-line
      const [file, setFile] = useState()
      const [fileName, setFileName] = useState("")
      const [fileSize, setFileSize] = useState("")
      const [data, setData] = useState([])

      const handleChange = (file) => {
            document.getElementById('coupon-loading-spinner').style.display = 'block'
            setFileUploadError("")
            setFile(file);
            setFileName(file.name)
            setFileSize(bytesToSize(file.size))
            document.getElementById('coupon-uploaded-container').style.display = 'block'
            document.getElementById('coupon-upload-container').style.display = 'none'

            const reader = new FileReader()
            reader.onload = (e) => {
                  const workbook = CSV.read(e.target.result)
                  const sheetName = workbook.SheetNames[0]
                  const worksheet = workbook.Sheets[sheetName]
                  const json = CSV.utils.sheet_to_json(worksheet)
                  // eslint-disable-next-line no-sequences
                  const trimmedData = json.map(obj => Object.keys(obj).reduce((acc, key) => (acc[key.trim()] = obj[key], acc), {}));

                  const couponData = trimmedData.map(obj => (
                        {
                              phone: obj['MSISDN'],
                              coupon: obj['Coupon'],
                        }
                  ));

                  const filteredArray = couponData.filter((obj) => Object.values(obj).every((val) => val !== undefined));

                  setData(filteredArray)

                  const labels = ['phone', 'coupon']
                  const dataLabel = filteredArray.length > 0 ? Object.keys(filteredArray[0]) : valid = false

                  valid = labels.every((item, index) => (item === dataLabel[index]) ? true : false)
                  if (!valid) {
                        document.getElementById('coupon-loading-spinner').style.display = 'none'
                        setFileUploadError("File format is not correct. Please Kindly check again and upload")
                        document.getElementById('coupon-upload-container').style.display = 'block'
                  }
            }
            reader.readAsArrayBuffer(file)
      };

      const bytesToSize = bytes => {
            const KB = 1024;
            const MB = KB * KB;

            if (bytes < KB) {
                  return bytes + " bytes";
            } else if (bytes < MB) {
                  return (bytes / KB).toFixed(2) + " KB";
            } else {
                  return (bytes / MB).toFixed(2) + " MB";
            }
      }

      const handleUndo = () => {
            setFile(null)
            setData([])
            document.getElementById('coupon-uploaded-container').style.display = 'none'
            document.getElementById('coupon-upload-container').style.display = 'block'
      }

      console.log("Data----------------->")
      console.table(data);

      const uploadPromoCode = async () => {

            const btn = document.getElementById('btn-promo-submit')
            btn.innerText = 'Uploading...'
            btn.disabled = true

            const requestOptions = {
                  method: 'POST',
                  headers: {
                        'Content-Type': 'application/json',
                        // 'Authorization': `Bearer ${user.token}`
                  },
                  body: JSON.stringify(data)
            };

            try {
                  const request = await fetch('https://coupon-tfk5.onrender.com/api/promo', requestOptions);
                  const response = await request.json();
                  console.log(response);
            }
            catch (error) {
                  console.error('Error:', error);
            }
            btn.innerText = 'Upload Promo Code'
            btn.disabled = false
            handleUndo()
      }

      return (
            <div className="bg-image">
                  <div className="flex items-center gap-5 p-5 bg-violet-800 text-white">
                        <div className="flex gap-5">
                              <img src={logo} className='' alt="Shwapno Brand Logo" />
                              <h1 className='text-lg font-medium my-3 '>Customer Coupon Retrieval</h1>
                        </div>

                        <div className="ms-auto">
                              {/* <h2 className='capitalize'>{user.code} {user.name}</h2> */}
                        </div>

                        {/* <button onClick={() => logOut()} className='bg-[#d9c1ff] hover:bg-[#d9c1ff] py-2 rounded-md text-xs px-3 text-rose-800 font-bold'>Logout</button> */}
                  </div>


                  <div className="w-full flex justify-around items-center">
                        <div className="md:ml-20 px-5 flex items-center h-[75vh] flex-1">
                              <div className='w-full md:w-1/2 lg:w-1/3 p-3'>
                                    <h2 className='text-left text-xl font-medium'>Upload Coupon & SMS Design Sheet</h2>

                                    <div id="coupon-upload-container" className='mt-5'>
                                          <FileUploader
                                                children={
                                                      <div className="mx-auto block p-5">
                                                            <p className='text-center text-sm'>Click here to browse <br /> or drag and drop file here</p>
                                                      </div>
                                                }
                                                onTypeError={(err) => setFileUploadError(err)}
                                                classes='flex content-center items-center border border-dashed border-black rounded'
                                                multiple={false}
                                                handleChange={handleChange}
                                                name="file"
                                                types={fileTypes} />
                                    </div>

                                    <div style={{ display: 'none' }} id="coupon-uploaded-container">
                                          {
                                                fileUploadError && <p className='bold py-2 text-sm text-rose-700'>{fileUploadError}</p>
                                          }
                                          <p className='bold text-xs py-2'>{fileName}</p>
                                          <div className="flex content-between items-center">
                                                <p className='text-xs bold rounded px-1 border border-gray-600'>{fileSize}</p>
                                                <p onClick={() => handleUndo()} className='text-sm cursor-pointer text-rose-800 ms-5'>undo</p>
                                          </div>
                                    </div>

                                    {
                                          !data.length > 0 &&
                                          // <ViewPickerListData pickerData={data} />
                                          <div style={{ display: 'none' }} id='coupon-loading-spinner'>
                                                <p className=''>Converting the file...</p>
                                          </div>
                                    }

                                    <div className="pt-5">
                                          {
                                                data.length > 0 &&
                                                <button onClick={uploadPromoCode} id='btn-promo-submit' className='bg-violet-800 hover:bg-violet-900 text-white text-sm px-5 py-2 rounded shadow-md'>Upload Promo Code</button>
                                          }
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default PromoUpload;