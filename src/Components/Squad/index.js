import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { BiChevronDown } from "react-icons/bi";
import { FaCircleNotch } from "react-icons/fa";
import swal from "sweetalert";
import { useFormik } from "formik";
import * as Yup from "yup";

import { getSquad, postSquad, updateSquad, deleteSquad } from "../../Services/";

import TitlePage from "../Parts/TitlePage";
import FormInput from "./ChildSquad/FormInput";
import ModalDelete from "./ChildSquad/ModalDelete";

const SquadComponent = () => {
  const [filePath, setFilePath] = useState(null);
  // eslint-disable-next-line
  
  const initialValues = {
    id: "",
    squads_name: "",
    description: "",
  };

  const onSubmit = (values, { resetForm }) => {
    if (!values.id) {
      const squadData = new FormData();
      squadData.append('squads_name', values.squads_name)
      squadData.append('description', values.description)
      squadData.append('image', filePath !== null ? filePath[0] : null)

      postSquad(squadData)
        .then((data) => {
          if (data.status === 200) {
            setRefreshKey((oldKey) => oldKey + 1);
            swal("Success!", "Create New Data is Successful!", "success");
            formik.values.id = "";
            formik.values.squads_name = "";
            formik.values.description = "";
            setFilePath(null)
          }
        })
        .catch((error) => {
          console.log("Error ", error);
        });
    } else {

      const squadData = new FormData();
      squadData.append('squads_name', values.squads_name)
      squadData.append('description', values.description)
      squadData.append('image', filePath !== null ? filePath[0] : null)

      updateSquad(values.id, squadData).then((data) => {
        if (data.status === 200) {
          setRefreshKey((oldKey) => oldKey + 1);
          swal("Success!", "Update Data is Successful!", "success");
          formik.values.id = "";
          formik.values.squads_name = "";
          formik.values.description = "";
          setFilePath(null)
        }
      });
    }
  };

  const validationSchema = Yup.object({
    squads_name: Yup.string().required("Required!"),
    description: Yup.string().required("Required!"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  const [show, setShow] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const [squads, setSquads] = useState([]);
  const [squadId, setSquadId] = useState("");

  useEffect(() => {
    getSquad().then((data) => {
      setSquads(data.data.data);
      setLoading(true);
    });
  }, [refreshKey]);

  const handleDelete = (state) => {
    deleteSquad(state).then((data) => {
      if (data.status === 200) {
        swal("Success!", "Delete Data is Successful!", "success");
      }
      setRefreshKey((oldKey) => oldKey + 1);
      setShow(!show);
    });
  };

  const columns = [
    {
      name: "Image",
      selector: "iamge",
      sortable: false,
      maxWidth: "150px",
      cell : (state) => (
        <div className="w-full flex justify-center items-center p-2">
          <img src={state.image != null ? state.image : "https://res.cloudinary.com/plugin007/image/upload/v1603734215/logoPLUGIN_qsovpm.png"} className="object-fill w-24 h-12" alt="squad"/>
        </div>
      )
    },
    {
      name: "Squad Name",
      selector: "squads_name",
      sortable: true,
      maxWidth: "150px",
    },
    {
      name: "Description",
      selector: "description",
      sortable: true,
      maxWidth: "300px",
    },
    {
      name: "Action",
      selector: "id",
      cell: (state) => (
        <div>
          <button
            onClick={(e) => {
              formik.resetForm();
              formik.values.id = state.id;
              formik.values.squads_name = state.squads_name;
              formik.values.description = state.description;
            }}
            className="font-medium bg-yellow-300 px-3 py-2 rounded-lg mx-2"
          >
            Edit
          </button>
          <button
            onClick={() => {
              setSquadId(state.id);
              setShow(!show);
            }}
            className="font-medium text-white bg-red-400 px-3 py-2 rounded-lg mx-2"
          >
            Hapus
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      {loading === false ? (
        <>
          <div className="w-10/12 h-full fixed bg-white text-center flex justify-center items-center flex-col">
            <span className="">
              <FaCircleNotch
                className="animate-spin -mt-16 text-5xl"
                style={{ color: "#27333a" }}
              />
            </span>
            Please Wait ...
          </div>
        </>
      ) : (
        <>
          <TitlePage title="Squad" description="Squad Page" />
          <div className="-mt-10 px-5">
            <div className="flex gap-5">
              <div className="border bg-white rounded-md p-5 w-4/12">
                <FormInput formik={formik} filePath={filePath} setFilePath={setFilePath}/>
              </div>
              <div className="border bg-white rounded-md p-5 w-8/12">
                <DataTable
                  title="Squad Data"
                  striped={true}
                  noDataComponent="No available Data"
                  columns={columns}
                  data={squads}
                  defaultSortField="squads_name"
                  sortIcon={<BiChevronDown />}
                  pagination
                  customStyles={customStyles}
                  className="border-2 rounded shadow"
                />
              </div>
            </div>
          </div>
          {show ? (
            <ModalDelete
              handleDelete={() => handleDelete(squadId)}
              setShow={() => setShow(!show)}
            />
          ) : null}
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

export default SquadComponent;
