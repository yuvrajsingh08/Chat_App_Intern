import React from 'react'
import { PiUserCircle } from "react-icons/pi";
import { useSelector } from 'react-redux';

const Avatar = ({userId,name,imageUrl,width,height}) => {
    const onlineUser = useSelector(state => state?.user?.onlineUser)

    let avatarName = ""

    if(name){
      const trimName = name.trim();
      const splitName = trimName?.split(" ")

      if(splitName.length > 1){
        avatarName = splitName[0][0]+splitName[1][0]
      }else{
        avatarName = splitName[0][0]
      }
    }

    const isOnline = onlineUser.includes(userId)
  return (
    <div
      className={`text-slate-800  rounded-full font-bold relative  object-cover`}
      style={{ width: width + "px", height: height + "px" }}
    >
      <div
        className={`text-slate-800  rounded-full font-bold relative overflow-hidden object-cover`}
        style={{ width: width + "px", height: height + "px" }}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            width={width}
            height={height}
            alt={name}
            className="overflow-hidden rounded-full"
          />
        ) : name ? (
          <div
            style={{ width: width + "px", height: height + "px" }}
            className="overflow-hidden rounded-full flex justify-center items-center text-lg bg-[#abbcd3]"
          >
            {avatarName}
          </div>
        ) : (
          <PiUserCircle size={width} />
        )}
      </div>
      {isOnline && (
        <div className="bg-green-600 p-1 absolute bottom-2 -right-0 z-10 rounded-full"></div>
      )}
    </div>
  );
}

export default Avatar
