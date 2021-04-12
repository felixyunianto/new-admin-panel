import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { useHistory, withRouter } from "react-router-dom";
import swal from "sweetalert";

import { getSquad, getTheories, deleteTheory } from "../../Services/";
import { BiChevronDown } from "react-icons/bi";

import TitlePage from '../Parts/TitlePage';
import LoadingPage from '../Parts/LoadingPage';
import ModalDeleteTheory from "./ChildTheory/ModalDeleteTheory";

const TheoryComponent = () => {
  const history = useHistory();
  const [refreshKey, setRefreshKey] = useState(0);
  const color = "gray";

  const [theories, setTheory] = useState([]);
  const [squads, setSquad] = useState([]);
  const [openTab, setOpenTab] = useState(0);

  const [theoryId, setTheoryId] = useState(0);
  const [show, setShow] = useState(false);

  const getDataTheories = (squadId) => {
    getTheories(squadId).then((data) => {
      setTheory(data.data.data);
    });
  };

  const handleCreateNewData = () => {
    history.push('/theory/create');
  }
  
  const handleDetail = (e) => {
    history.push({
      pathname: "/theory/pertemuan-ke-" + e.target.name,
      state: {
        Name: e.target.name,
        idTheory: e.target.id,
      },
    });
  };
  
  const handleEdit = (e) => {
    history.push({
      pathname: "/theory/edit/pertemuan-ke-" + e.target.name,
      state: {
        Name: e.target.name,
        idTheory: e.target.id,
      },
    });
  };
  
  const handleDelete = (e) => {
    deleteTheory(e.target.id)
      .then((data) => {
        if (data.status === 200) {
          swal("Success!", "Delete Data is Successful!", "success");
        }
        setRefreshKey((oldKey) => oldKey + 1);
        setShow(!show);
      })
      .catch((error) => {
        console.log("ERROR ", error);
      });
  };
  useEffect(() => {
    getSquad().then((data) => {
      setSquad(data.data.data);
      setOpenTab(data.data.data[0].id);
      getDataTheories(data.data.data[0].id);
    });
  }, [refreshKey, setOpenTab]);

  const columns = [
    {
      name: "Pertemuan",
      selector: "gathering",
      sortable: true,
      cell: (state) => "Pertemuan Ke-" + state.gathering,
    },
    {
      name: "Tanggal",
      selector: "date",
      sortable: true,
    },
    {
      name: "Opsi",
      selector: "id",
      cell: (state) => (
        <>
          <button
            onClick={handleDetail}
            id={state.id}
            name={state.gathering}
            className="font-medium bg-blue-400 px-3 py-2 rounded-lg mx-2"
          >
            Detail
          </button>

          <button
            onClick={handleEdit}
            id={state.id}
            name={state.gathering}
            className="font-medium bg-yellow-400 px-3 py-2 rounded-lg mx-2"
          >
            Edit
          </button>
          <button
            onClick={() => {
              setTheoryId(state.id);
              setShow(!show);
            }}
            className="font-medium text-white bg-red-400 px-3 py-2 rounded-lg mx-2"
          >
            Hapus
          </button>
        </>
      ),
    },
  ];

  return (
    <>
      {theories.length === 0 && openTab === 0 ? (
        <>
          <LoadingPage />
        </>
      ) : (
        <>
          <TitlePage title="theory" description="Theory Page"/>
          <div className="-mt-10 px-5">
            <div className="border bg-white rounded-md p-5 w-full h-auto">
              <button onClick={handleCreateNewData} className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700">Create New Theory</button>
              <div className="flex flex-wrap">
                <div className="w-full">
                  <ul
                    className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                    role="tablist"
                  >
                    {squads.map((data) => {
                      return (
                        <li
                          className="-mb-px mr-2 last:mr-0 flex-auto text-center"
                          key={data.id}
                        >
                          <a
                            className={
                              "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                              (openTab === data.id
                                ? "text-white bg-" + color + "-700"
                                : "text-" + color + "-700 bg-white")
                            }
                            onClick={(e) => {
                              e.preventDefault();
                              setOpenTab(data.id);
                              getDataTheories(data.id);
                            }}
                            data-toggle="tab"
                            href={"#" + data.squads_name.toLowerCase()}
                            role="tablist"
                          >
                            <i className="fas fa-space-shuttle text-base mr-1"></i>{" "}
                            {data.squads_name}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 -mt-5">
                    <div className="px-4 py-5 flex-auto">
                      <div className="tab-content tab-space">
                        {squads.map((data) => {
                          return (
                            <div
                              key={data.id}
                              className={
                                openTab === data.id ? "block" : "hidden"
                              }
                              id={"#" + data.squads_name.toLowerCase()}
                            >
                              <DataTable
                                columns={columns}
                                data={theories}
                                defaultSortField="squads_name"
                                sortIcon={<BiChevronDown />}
                                pagination
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {show ? (
            <ModalDeleteTheory
              handleDelete={handleDelete}
              id={theoryId}
              setShow={() => setShow(!show)}
            />
          ) : null}
        </>
      )}
    </>
  );
};

export default withRouter(TheoryComponent);
