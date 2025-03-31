import React from 'react'
import Avatar from './Avatar';
import { IoClose } from "react-icons/io5";
const UserInfo = ({ dataUser, setUserInfo }) => {
  return (
    <div className="fixed bottom-0 right-0 top-0 z-40 bg-white transition-all duration-75 h-full w-72 py-8 outline outline-1 outline-[#9e9c9c9e] shadow-md">
      <div className='absolute right-0 px-4 top-4 scale-110 cursor-pointer' 
      onClick={()=>{setUserInfo(false)}}><IoClose /></div>
      <div className="flex flex-col gap-4 justify-center items-center">
        <Avatar
          width={96}
          height={96}
          imageUrl={dataUser?.profile_pic}
          name={dataUser?.name}
          userId={dataUser?._id}
        />
        <div className='text-justif flex justify-center items-center flex-col'>
          <h3 className="font-semibold text-md my-2 text-ellipsis ">
            {dataUser?.name}
          </h3>
          <h3 className=" text-sm my-0 text-gray-700 text-ellipsis ">
            +91{dataUser?.phone}
          </h3>
          <h3 className=" text-sm my-0 text-gray-700 text-ellipsis ">
            {dataUser?.email}
          </h3>
        </div>
      </div>
      <div className='w-[85%] mx-auto h-[1px] bg-slate-400 my-8'></div>
    </div>
  );
};

export default UserInfo