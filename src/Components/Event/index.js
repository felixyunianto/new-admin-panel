import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import DataTable from "react-data-table-component";
import swal from "sweetalert";
import { getAllEventService, deleteEventService } from "../../Services";
import { BiChevronDown } from "react-icons/bi";

import TitlePage from "../Parts/TitlePage";
import LoadingPage from "../Parts/LoadingPage";
import ModalDeleteEvent from "./ChildEvent/ModalDeleteEvent";

const EventComponent = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [show, setShow] = useState(false);
  const [eventId, setEventId] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  const getAllEvent = () => {
    getAllEventService()
      .then((data) => {
        setEvents(data.data.data);
        setLoading(true);
      })
      .then((error) => {
        console.log("Error " + error);
      });
  };

  const handleCreateNewDataEvent = () => {
    history.push("/event-create");
  };

  const handleEditEvent = (e) => {
    history.push({
      pathname: "/event-edit",
      state: {
        eventId: e.target.id,
      },
    });
  };

  const handleDeleteEvent = (state) => {
    deleteEventService(state).then((data) => {
      if (data.status === 200) {
        swal("Success!", "Delete Data is Successful!", "success");
      }
      setRefreshKey((oldKey) => oldKey + 1);
      setShow(!show);
    })
    .catch((error) => {
      swal("Error!", error.response.data.message, "error");
    })
  };

  useEffect(() => {
    getAllEvent();
  }, [loading, refreshKey]);

  const columns = [
    {
      name: "Event Name",
      selector: "event_name",
    },
    {
      name: "Location",
      selector: "location",
    },
    {
      name: "Price",
      selector: "price",
      cell: (state) =>
        new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(state.price),
    },
    {
      name: "Action",
      selector: "id",
      cell: (state) => (
        <div className="flex gap-2">
          <button
            id={state.id}
            className="bg-yellow-500 text-white py-2 px-3 rounded"
            onClick={handleEditEvent}
          >
            Edit
          </button>
          <button
            onClick={() => {
              setEventId(state.id);
              setShow(!show);
            }}
            className="bg-red-500 text-white py-2 px-3 rounded"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      {loading === false ? (
        <LoadingPage />
      ) : (
        <>
          <TitlePage title="Event" description="Event Page" />
          <div className="-mt-10 px-5">
            <div className="border bg-white rounded-md p-5 w-full h-auto">
              <div className="my-2">
                <button
                  onClick={handleCreateNewDataEvent}
                  className="bg-blue-500 px-3 py-2 rounded text-white"
                >
                  Create New Data
                </button>
              </div>
              <DataTable
                title="Event Data"
                striped={true}
                noDataComponent="No available Data"
                columns={columns}
                data={events}
                defaultSortField="squads_name"
                sortIcon={<BiChevronDown />}
                className="border-2 rounded shadow"
                pagination
                customStyles={customStyles}
              />
            </div>
          </div>
          {show ? (
            <ModalDeleteEvent
              handleDelete={() => handleDeleteEvent(eventId)}
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

export default EventComponent;