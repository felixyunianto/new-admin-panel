import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import {
  getAllUser,
  getAllUserMemberService,
  // deleteUserService,
  getDetailUserService,
  changePhotoProfile,
} from "../../Services/";
import { BiChevronDown, BiEdit, BiX } from "react-icons/bi";
import { withRouter, useHistory } from "react-router-dom";

import TitlePage from "../Parts/TitlePage";
import LoadingPage from "../Parts/LoadingPage";
import { createRef } from "react";

const UserComponent = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const fileInputRef = createRef();

  const [users, setUsers] = useState([]);
  const [members, setMembers] = useState([]);
  const [refreshKey] = useState(0);
  const [showPhotoProfile, setShowPhotoProfile] = useState(false);
  const [userDetail, setUserDetail] = useState({});
  const [statusSubmit, setStatusSubmit] = useState(false);
  const [previewProfileBeforeUpload, setPreviewProfileBeforeUpload] =
    useState("");
  const [photoUpload, setPhotoUpload] = useState();

  useEffect(() => {
    getAllUser()
      .then((data) => {
        setUsers(data.data.data);
        setLoading(true);
      })
      .catch((error) => {
        console.log(error);
      });
    getAllUserMemberService()
      .then((data) => {
        setMembers(data.data.data);
        setLoading(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [refreshKey]);

  const handleDetailUser = (e) => {
    history.push({
      pathname: "/user-detail",
      state: {
        userId: e.target.id,
      },
    });
  };

  const handleEditUser = (e) => {
    history.push({
      pathname: "/user-edit",
      state: {
        userId: e.target.id,
      },
    });
  };

  // const handleDelete = (e) => {
  //   deleteUserService(e.target.id)
  //     .then((data) => {
  //       if (data.data.status === 200) {
  //         history.push("/user");
  //         setRefreshKey((oldKey) => oldKey + 1);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       // swal("Error!", error.response.data.error, "error");
  //     });
  // };

  const handleShowPhotoProfile = (status, id) => {
    if (status && id) {
      getDetailUserService(id)
        .then((data) => {
          setUserDetail(data.data.data);
          setShowPhotoProfile(true);
        })
        .catch((error) => {
          alert("Something went wrong");
          console.log("Error ", error);
        });
    } else {
      setShowPhotoProfile(false);
      setUserDetail({});
    }
  };

  const fileInputChecked = (e) => {
    const file = e.target.files[0];

    setStatusSubmit(true);
    if (e.target.files.length > 0) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function (e) {
        setPreviewProfileBeforeUpload([reader.result]);
        setPhotoUpload(file);
        setStatusSubmit(true);
      };
    }
  };

  const handleFocusBack = () => {
    window.removeEventListener("focus", handleFocusBack);
    setStatusSubmit(false);
  };

  const clickedInput = () => {
    window.addEventListener("focus", handleFocusBack);
  };

  const openFileInput = () => {
    fileInputRef.current.click();
    setStatusSubmit(true);
  };

  const onSubmitPhotoProfile = () => {
    const formData = new FormData();
    formData.append("photo", photoUpload);

    changePhotoProfile(userDetail.id, formData)
      .then((res) => {
        const { status } = res.data;
        if (status === 200) {
          setStatusSubmit(false);
          getDetailUserService(userDetail.id)
            .then((data) => {
              setUserDetail(data.data.data);
              setShowPhotoProfile(true);
            })
            .catch((error) => {
              alert("Something went wrong");
              console.log("Error ", error);
            });
        }
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  };

  const columns = [
    {
      name: "Name",
      selector: "name",
      sortable: true,
    },
    {
      name: "Username",
      selector: "username",
      sortable: true,
    },
    {
      name: "Opsi",
      selector: "id",
      cell: (state) => (
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => handleShowPhotoProfile(true, state.id)}
            className="bg-green-300 font-bold py-2 px-4 rounded"
            id={state.id}
          >
            Change Photo Profile
          </button>
          <button
            onClick={handleDetailUser}
            className="bg-blue-300 font-bold py-2 px-4 rounded"
            id={state.id}
          >
            Detail
          </button>
          <button
            onClick={handleEditUser}
            className="bg-yellow-300 font-bold py-2 px-4 rounded"
            id={state.id}
          >
            Edit
          </button>
          {/* <button
            onClick={handleDelete}
            className="bg-red-500 font-bold py-2 px-4 rounded text-white"
            id={state.id}
          >
            Hapus
          </button> */}
        </div>
      ),
    },
  ];

  const handleCreateNewUser = () => {
    history.push("/user-create");
  };

  return (
    <>
      {loading === false ? (
        <LoadingPage />
      ) : (
        <>
          {showPhotoProfile && (
            <div
              className="w-full  top-0 left-0 h-screen fixed flex justify-center items-center"
              style={{ background: "rgba(0,0,0,0.5)", zIndex: 51 }}
            >
              <div className="w-1/4 bg-gray-50 p-4 flex flex-col rounded-md">
                <div className="w-full flex justify-between items-center">
                  <span className="font-bold text-base">
                    Change photo profile
                  </span>
                  <div className="cursor-pointer hover:text-gray-500" onClick={() => handleShowPhotoProfile(false)}>
                    <BiX />
                  </div>
                </div>
                <div className="py-2 w-full flex items-center justify-center">
                  {userDetail.photo || previewProfileBeforeUpload ? (
                    <div className="relative w-56 h-56 rounded-full group">
                      <img
                        src={
                          userDetail?.photo
                            ? userDetail.photo
                            : previewProfileBeforeUpload
                        }
                        alt="user-profile"
                        className="w-56 h-56 rounded-full"
                      />
                      <div
                        onClick={() => openFileInput()}
                        className="h-10 w-10 absolute bottom-2 right-5 rounded-full bg-gray-200 shadow-sm cursor-pointer hidden group-hover:flex hover:bg-gray-300 justify-center items-center"
                      >
                        <BiEdit className="text-xl" />
                      </div>
                    </div>
                  ) : (
                    <div className="w-56 h-56 rounded-full object-stretch bg-yellow-500 relative group cursor-pointer">
                      <div className="flex justify-center items-center h-full">
                        <label className="text-white font-bold text-5xl">
                          {userDetail?.name?.charAt(0)}
                        </label>
                      </div>
                      <div
                        onClick={() => openFileInput()}
                        className="h-10 w-10 absolute bottom-2 right-5 rounded-full bg-gray-200 shadow-sm cursor-pointer hidden group-hover:flex hover:bg-gray-300 justify-center items-center"
                      >
                        <BiEdit className="text-xl" />
                      </div>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onClick={clickedInput}
                  onChange={(e) => fileInputChecked(e)}
                  className="hidden"
                  accept="image/png, image/gif, image/jpeg"
                />
                {statusSubmit && (
                  <button
                    onClick={() => onSubmitPhotoProfile()}
                    className="px-3 py-2 rounded-md bg-blue-500 text-white"
                  >
                    Simpan
                  </button>
                )}
              </div>
            </div>
          )}
          <TitlePage title="User" description="User Page" />
          <div className="-mt-10 px-5">
            <button
              onClick={handleCreateNewUser}
              className="bg-blue-500 text-white py-2 px-2 rounded hover:bg-blue-700 w-full"
            >
              Create New User
            </button>
          </div>

          <div className="mt-5 px-5">
            <div className="border bg-white rounded-md p-5 w-full h-auto shadow-md">
              <DataTable
                title="Committee Data"
                columns={columns}
                data={users}
                noDataComponent="No Available Data"
                defaultSortField="squads_name"
                sortIcon={<BiChevronDown />}
                pagination
                customStyles={customStyles}
                className="border-2 rounded shadow"
              />
            </div>
          </div>
          <div className="px-5 mt-5">
            <div className="border bg-white rounded-md p-5 w-full h-auto shadow-md">
              <DataTable
                title="Member Data"
                columns={columns}
                data={members}
                noDataComponent="No Available Data"
                defaultSortField="name"
                sortIcon={<BiChevronDown />}
                pagination
                customStyles={customStyles}
                className="border-2 rounded shadow"
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

const customStyles = {
  headCells: {
    style: {
      fontWeigth: "bold",
      fontSize: "16px",
      textAlign: "center",
      textTransform: "uppercase",
      background: "#F9FAFB",
      paddingLeft: "8px", // override the cell padding for head cells
      paddingRight: "8px",
    },
  },
  cells: {
    style: {
      paddingLeft: "8px", // override the cell padding for data cells
      paddingRight: "8px",
    },
  },
};

export default withRouter(UserComponent);
