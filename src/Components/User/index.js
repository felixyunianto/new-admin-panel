import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { getAllUser, getAllMember } from "../../Services/";
import { BiChevronDown } from "react-icons/bi";
import { useHistory } from "react-router-dom";

import TitlePage from "../Parts/TitlePage";

const UserComponent = () => {
  const history = useHistory();

  const [users, setUsers] = useState([]);
  const [members, setMember] = useState([]);

  useEffect(() => {
    getAllUser()
      .then((data) => {
        setUsers(data.data.data);
      })
      .catch((error) => {
        console.log(error);
      });

    getAllMember()
      .then((data) => {
        setMember(data.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
      name: "Email",
      selector: "email",
      sortable: true,
    },
    {
      name: "QRCODE",
      selector: "qrcode",
      sortable: true,
    },
    {
      name: "Squad ID",
      selector: "squad_id",
      sortable: true,
    },
    {
      name: "Roles",
      selector: "roles",
      sortable: true,
    },
  ];

  const columnMembers = [
    {
      name: "Member Code",
      selector: "member_code",
      sortable: true,
    },
    {
      name: "Name",
      selector: "name",
      sortable: true,
    },
  ];

  const handleCreateNewUser = () => {
    history.push("/user-create");
  };

  const handleCreateNewMember = () => {
    history.push("/member-create");
  };

  return (
    <>
      <TitlePage title="User" description="User Page" />
      <div className="-mt-10 px-5">
        <div className="border bg-white rounded-md p-5 w-full h-auto shadow-md">
          <button
            onClick={handleCreateNewUser}
            className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-700"
          >
            Create New User
          </button>
          <DataTable
            title="User Data"
            columns={columns}
            data={users}
            noDataComponent="No Available Data"
            defaultSortField="squads_name"
            sortIcon={<BiChevronDown />}
            pagination
          />
        </div>
        <div className="border bg-white rounded-md p-5 w-full h-auto mt-2 shadow-md">
          <button
            onClick={handleCreateNewMember}
            className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-700"
          >
            Create New Member
          </button>
          <DataTable
            title="Member Data"
            columns={columnMembers}
            data={members}
            noDataComponent="No Available Data"
            defaultSortField="squads_name"
            sortIcon={<BiChevronDown />}
            pagination
          />
        </div>
      </div>
    </>
    //   )}
    // </>
  );
};

export default UserComponent;
