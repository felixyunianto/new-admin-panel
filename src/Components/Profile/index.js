import React, { useState, useEffect } from "react";
import { withRouter, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  changePhotoProfile,
  getDetailUserService,
  updateUserService,
} from "../../Services";

import TitlePage from "../Parts/TitlePage";
import { BiEdit } from "react-icons/bi";
import { createRef } from "react";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { changeProfileRedux } from "../../Redux/actions/auth";

const Profile = () => {
  const location = useLocation();
  const refPhoto = createRef();
  const userId = location.state.userId;
  const dispatch = useDispatch()

  const { user: currentUser } = useSelector((state) => state.auth);

  const [userDetail, setUserDetail] = useState("");
  const [edit, setEdit] = useState(false);

  const initialValues = {
    name: userDetail.name,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Nama harus diisi"),
  });

  const onSubmit = (values) => {
    updateUserService(userId, values)
      .then((res) => {
        const { data, status } = res.data;
        if (status === 200) {
          let tempCurrent = currentUser;
          tempCurrent.name = data.name
          
          setEdit(false);
          swal("Success!", "Profile is updated", "success");
          dispatch(changeProfileRedux(tempCurrent));
        }
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit,
  });

  const openFileInput = () => {
    refPhoto.current.click();
  };

  const fileChangeInput = (e) => {
    if (e.target.files.length > 0) {
      let file = e.target.files[0];

      let formData = new FormData();
      formData.append("photo", file);

      changePhotoProfile(userId, formData).then((res) => {
        const { data, status } = res.data;
        let dataChangeProfile = data
        if (status === 200) {
          getDetailUserService(userId)
            .then((data) => {
              setUserDetail(data.data.data);
              swal("Success!", "Photo Profile is updated", "success");
              let tempCurrent = currentUser;
              tempCurrent.photo = dataChangeProfile.photo
              dispatch(changeProfileRedux(tempCurrent));
            })
            .catch((error) => {
              alert("Something went wrong");
              console.log("Error ", error);
            });
        }
      });
    }
  };

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

  const handleEdit = (status) => {
    setEdit(status);
  };

  return (
    <>
      <TitlePage title="User" description="My Profile" />
      <div className="w-full -mt-10 px-5 flex items-center justify-center">
        <div
          className="w-full rounded p-4 flex flex-col items-center"
          style={{ maxWidth: "600px" }}
        >
          <div className=" w-full flex justify-center items-center z-10">
            <input
              type="file"
              onChange={(e) => fileChangeInput(e)}
              ref={refPhoto}
              className="hidden"
            />
            {userDetail.photo !== null ? (
              <div className="w-40 h-40 relative group cursor-pointer bg-gray-100 rounded-full">
                <img
                  src={userDetail.photo}
                  alt="user-profile"
                  className="w-40 h-40 rounded-full"
                />
                <div
                  onClick={() => openFileInput()}
                  className="h-10 w-10 absolute bottom-2 right-2 rounded-full bg-gray-200 shadow-sm cursor-pointer hidden group-hover:flex hover:bg-gray-300 justify-center items-center"
                >
                  <BiEdit className="text-xl" />
                </div>
              </div>
            ) : (
              <div className="w-40 h-40 rounded-full object-stretch bg-yellow-500 relative group">
                <div className="flex justify-center items-center h-full">
                  <label className="text-white font-bold text-5xl">
                    {userDetail.name.charAt(0)}
                  </label>
                </div>
                <div
                  onClick={() => openFileInput()}
                  className="h-10 w-10 absolute bottom-2 right-2 rounded-full bg-gray-200 shadow-sm cursor-pointer hidden group-hover:flex hover:bg-gray-300 justify-center items-center"
                >
                  <BiEdit className="text-xl" />
                </div>
              </div>
            )}
          </div>
          <div className="bg-white shadow-md rounded-lg pt-20 -mt-14 w-full px-4 pb-4 flex flex-col gap-2">
            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col gap-2"
            >
              <div className="w-full flex flex-col ">
                <span className="font-bold text-base">Nama Lengkap</span>
                {edit ? (
                  <>
                    <input
                      className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colosr duration-200 ease-in-out"
                      name="name"
                      id="name"
                      type="text"
                      placeholder="Fullname"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.name && formik.errors.name ? (
                      <span className="text-sm text-red-500">
                        {formik.errors.name}
                      </span>
                    ) : null}
                  </>
                ) : (
                  <span className="text-gray-500 text-xl">
                    {userDetail.name}
                  </span>
                )}
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
                <span className="text-gray-500 text-xl">
                  {userDetail.email}
                </span>
              </div>
              <div className="w-full flex flex-col ">
                <span className="font-bold text-base">Barcode</span>
                <img
                  className="w-40 h-40 rounded object-stretch border-double border-8 border-gray-700"
                  src={userDetail.qrcode}
                  alt="profil-user"
                />
              </div>
              {edit ? (
                <>
                  <button
                    type="submit"
                    className="mt-2 py-2 px-3 bg-blue-400 rounded-md text-white"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleEdit(false)}
                    className="mt-1 py-2 px-3 bg-red-500 rounded-md text-white"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => handleEdit(true)}
                  className="mt-2 py-2 px-3 bg-yellow-400 rounded-md text-white"
                >
                  Edit
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(Profile);
