import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import uploadFile from '../helpers/uploadFile';
import axios from 'axios'
import toast from 'react-hot-toast';
import logo from "../assets/logo.png";

const RegisterPage = () => {
  const [data,setData] = useState({
    name : "",
    email : "",
    phone : "",
    profile_pic : ""
  })
  const [uploadPhoto,setUploadPhoto] = useState("")
  const navigate = useNavigate()

  const handleOnChange = (e)=>{
    const { name, value} = e.target

    setData((preve)=>{
      return{
          ...preve,
          [name] : value
      }
    })
  }

  const handleUploadPhoto = async(e)=>{
    const file = e.target.files[0]

    const uploadPhoto = await uploadFile(file)
  //  console.log(uploadPhoto);
    setUploadPhoto(file)
    // console.log(uploadPhoto?.url);
    setData((preve)=>{
      return{
        ...preve,
        profile_pic : uploadPhoto?.url
      }
    })
  }
  const handleClearUploadPhoto = (e)=>{
    e.stopPropagation()
    e.preventDefault()
    setUploadPhoto(null)
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    e.stopPropagation()

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/register`
    console.log(URL)
    try {
        const response = await axios.post(URL,data)
        console.log("response",response)

        toast.success(response.data.message)

        if(response.data.success){
            setData({
              name : "",
              email : "",
              phone : "",
              profile_pic : ""
            })

            navigate('/sign')

        }
    } catch (error) {
        // toast.error(error?.response?.data?.message)
        toast.error("User not registered try again..");
    }
    console.log('data',data)
  }


  return (
    <div className="w-[100%] h-[100vh] bg-[#8babd8]  flex flex-col justify-center items-center">
      <div className="h-fit min-w-[25vw] w-[80%] sm:w-[55%] md:w-[40%] lg:w-[35%] xl:w-[25%] shadow-xl bg-white rounded-2xl  flex flex-col  gap-2  py-8 px-6 justify-evenly">
        <div className="w-full h-min relative">
          <img src={logo} className="w-[8rem] mx-auto scale-125" alt="" />
        </div>

        <form className="grid gap-4 mt-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="enter your name"
              className="outline outline-1 rounded-md outline-[#6e80a445] px-2  focus:outline-[#6E80A4]  min-w-full py-2 mx-auto"
              value={data.name}
              onChange={handleOnChange}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="enter your email"
              className="outline outline-1 rounded-md outline-[#6e80a445] px-2  focus:outline-[#6E80A4]  min-w-full py-2 mx-auto"
              value={data.email}
              onChange={handleOnChange}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="enter your phone"
              className="outline outline-1 rounded-md outline-[#6e80a445] px-2  focus:outline-[#6E80A4]  min-w-full py-2 mx-auto"
              value={data.password}
              onChange={handleOnChange}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="profile_pic">
              <div className="h-14 bg-slate-200 flex justify-center items-center border rounded cursor-pointer">
                <p className="text-sm max-w-[300px] text-ellipsis line-clamp-1">
                  {uploadPhoto?.name
                    ? uploadPhoto?.name
                    : "Upload profile photo"}
                </p>

                {uploadPhoto?.name && (
                  <button
                    className="text-lg ml-2 hover:text-red-600"
                    onClick={handleClearUploadPhoto}
                  >
                    <IoClose />
                  </button>
                )}
              </div>
            </label>

            <input
              type="file"
              id="profile_pic"
              name="profile_pic"
              className="bg-slate-100 px-2 py-1 focus:outline-primary hidden"
              onChange={handleUploadPhoto}
            />
          </div>

          <button className="mx-auto bg-[#6E80A4] hover:bg-[#677799] duration-400 text-white w-[100%] py-3 mt-6 font-semibold text-md rounded-lg">
            Register
          </button>
        </form>
        <p className="my-3 text-center">
          Already have account ?{" "}
          <Link to={"/sign"} className="hover:text-[#8babd8] font-semibold">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage
