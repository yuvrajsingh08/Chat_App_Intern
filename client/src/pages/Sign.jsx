import React, { useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { setToken } from '../redux/userSlice';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png"

const Sign = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: ""
  });
  
    const navigate = useNavigate();
    const dispatch = useDispatch();

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/login`;

    try {
     const response = await axios({
       method: "post",
       url: URL,
       data: {
         name: data.name,
         email: data.email,
         phone: data.phone
       },
       withCredentials: true,
     });

      toast.success(response.data.message);

        if (response.data.success) {
          dispatch(setToken(response?.data?.token));
          localStorage.setItem("token", response?.data?.token);

          setData({
            name: "",
            email: "",
            phone: "",
          });
          navigate("/");
        }
    } catch (error) {
      // toast.error(error?.response?.data?.message);
      toast.error('invalid credentials');
    }
  };

  return (
    <div className="w-[100%] h-[100vh] bg-[#8babd8] flex flex-col justify-center items-center">
      <div className="h-[60%] min-w-[25vw] w-[80%] sm:w-[55%] md:w-[40%] lg:w-[35%] xl:w-[25%] shadow-xl bg-white rounded-xl  flex flex-col  gap-2  py-8 px-6 justify-evenly">
        {/* <h1 className="font-bold text-4xl text-[#41C9E2] mb-8 ">Connect..</h1> */}
        <div className="w-full h-min relative">
          <img src={logo} className="w-[8rem] mx-auto scale-125" alt="" />
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="name"
            name="name"
            value={data.name}
            onChange={handleOnChange}
            placeholder="Name"
            className="outline outline-1 rounded-md outline-[#6e80a445] px-2  focus:outline-[#6E80A4]  min-w-full my-2 py-2 mx-auto"
            required
          />
          <br />

          <input
            type="email"
            id="email"
            name="email"
            value={data.email}
            onChange={handleOnChange}
            placeholder="Email"
            className="outline outline-1 rounded-md outline-[#6e80a445] px-2  focus:outline-[#6E80A4]  min-w-full my-2 py-2 mx-auto"
            required
          />
          <br />

          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="Phone Number"
            className="outline outline-1 rounded-md outline-[#6e80a445] px-2  focus:outline-[#6E80A4]  min-w-full my-2 py-2 mx-auto"
            value={data.phone}
            onChange={handleOnChange}
            required
          />
          <button className="mx-auto bg-[#6E80A4] hover:bg-[#677799] duration-400 text-white w-[100%] py-3 mt-6 font-semibold text-md rounded-lg">
            Sign Up
          </button>
          <p className="my-3 text-center">
            Don't have account ?{" "}
            <Link
              to={"/Register"}
              className="hover:text-[#8babd8] font-semibold"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Sign
