import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";

import theoryService from "../../Services/theory.service";
import squadService from "../../Services/squad.service";
import { BiChevronDown } from "react-icons/bi";

const TheoryComponent = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const color = "pink";

  const [theories, setTheory] = useState([]);
  const [squads, setSquad] = useState([]);
  const [openTab, setOpenTab] = useState(1);
  
  const getDataTheories = (squadId) => {
    theoryService.getTheories(squadId).then((data) => {
      setTheory(data.data.data);
    });
  }

  useEffect(() => {
    squadService.getSquad().then((data) => {
      setSquad(data.data.data);
      setOpenTab(data.data.data[0].id);
    });
}, [refreshKey]);

  const columns = [
    {
      name: "Pertemuan",
      selector: "gathering",
      sortable: true,
      maxWidth: "150px",
    },
    {
      name: "Description",
      selector: "description",
      sortable: true,
      maxWidth: "400px",
    },
    {
      name: "Kontent",
      selector: "content",
      sortable: true,
      maxWidth: "400px",
    },
    {
      name: "Tanggal",
      selector: "date",
      sortable: true,
    },
  ];

  return (
    <>
      <div className="bg-gray-300 pt-6 pb-16 px-5 w-full">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-xl font-medium font-poppins mb-1">
                PLUG-IN
              </div>
              <div className="text-sm">Theory Page</div>
            </div>
            <div className="float right">
              <Link to="/theory-create">
                <button className="">Create New Data</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="-mt-10 px-5">
        <div className="border bg-white rounded-md p-5 w-full h-auto">
          <div className="flex flex-wrap">
            <div className="w-full">
              <ul
                className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                role="tablist"
              >
                {squads.map((data) => {
                  return (
                    <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                      <a
                        className={
                          "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                          (openTab === data.id
                            ? "text-white bg-" + color + "-600"
                            : "text-" + color + "-600 bg-white")
                        }
                        onClick={(e) => {
                          e.preventDefault();
                          setOpenTab(data.id);
                          getDataTheories(data.id)
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
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6">
                <div className="px-4 py-5 flex-auto">
                  <div className="tab-content tab-space">
                    {squads.map((data) => {
                      return (
                        <div
                          className={openTab === data.id ? "block" : "hidden"}
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
    </>
  );
};

export default TheoryComponent;