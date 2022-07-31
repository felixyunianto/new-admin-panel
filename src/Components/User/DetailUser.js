import React, { useState, useEffect } from "react";
import { withRouter, useLocation } from "react-router-dom";

import { getDetailUserService } from "../../Services";

import TitlePage from "../Parts/TitlePage";

const DetailUser = () => {
  const location = useLocation();
  const userId = location.state.userId;

  const [userDetail, setUserDetail] = useState("");

  useEffect(() => {
    const getDetailUser = () => {
      getDetailUserService(userId)
        .then((data) => {
          setUserDetail(data.data.data);
        })
        .catch((error) => {
          alert("Something went wrong");
          console.log("Error ", error);
        });
    };
    getDetailUser();
  }, [userId]);

  

  return (
    <>
      <TitlePage title="User" description="Detail User" />
      <div className="w-full -mt-10 px-5 flex items-center justify-center">
        <div
          className="w-full rounded p-4 flex flex-col items-center"
          style={{ maxWidth: "600px" }}
        >
          <div className=" w-full flex justify-center items-center z-10">
            {userDetail.photo !== null ? (
              <div className="">
                <img src={userDetail.photo} alt="user-profile" className="w-40 h-40"/>
              </div>
            ) : (
              <div className="w-40 h-40 rounded-full object-stretch bg-yellow-500">
                <div className="flex justify-center items-center h-full">
                  <label className="text-white font-bold text-5xl">
                    {userDetail.name.charAt(0)}
                  </label>
                </div>
              </div>
            )}
          </div>
          <div className="bg-white shadow-md rounded-lg pt-20 -mt-14 w-full px-4 pb-4 flex flex-col gap-2">
            <div className="w-full flex flex-col ">
              <span className="font-bold text-base">Nama Lengkap</span>
              <span className="text-gray-500 text-xl">{userDetail.name}</span>
            </div>
            <div className="w-full flex flex-col ">
              <span className="font-bold text-base">User ID</span>
              <span className="text-gray-500 text-xl">
                {userDetail.user_code}
              </span>
            </div>
            <div className="w-full flex flex-col ">
              <span className="font-bold text-base">Username</span>
              <span className="text-gray-500 text-xl">
                {userDetail.username}
              </span>
            </div>
            <div className="w-full flex flex-col ">
              <span className="font-bold text-base">Email</span>
              <span className="text-gray-500 text-xl">{userDetail.email}</span>
            </div>
            <div className="w-full flex flex-col ">
              <span className="font-bold text-base">Barcode</span>
              <img
                className="w-40 h-40 rounded object-stretch border-double border-8 border-gray-700"
                src={userDetail.qrcode}
                alt="profil-user"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(DetailUser);
