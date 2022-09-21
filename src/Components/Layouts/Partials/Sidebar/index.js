import React, { useState } from "react";
import {
  BiTachometer,
  BiGroup,
  BiBookOpen,
  BiUser,
  BiChevronDown,
  BiChevronUp,
  BiGitBranch,
  BiCalendarEvent,
  BiEdit,
  BiMoney,
} from "react-icons/bi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const SidebarComponent = (props) => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [dropdownEvent, setDropdownEvent] = useState(false);
  const [dropdownOrganization, setDropdownOrganization] = useState(false);
  const [dropdownMoney, setDropdownMoney] = useState(false);

  const handleDropdownEvents = () => {
    setDropdownEvent(!dropdownEvent);
    setDropdownOrganization(false);
    setDropdownMoney(false);

    return <div className="bg-blue-700 w-full absolute">FELIX</div>;
  };

  const handleDropdownOrganization = () => {
    setDropdownEvent(false);
    setDropdownOrganization(!dropdownOrganization);
    setDropdownMoney(false);
  };

  const handleDropdownMoney = () => {
    setDropdownEvent(false);
    setDropdownOrganization(false);
    setDropdownMoney(!dropdownMoney);
  };

  return (
    <>
      <div
        className={
          (props.toggle === false ? "w-60" : "w-20") +
          " z-50 top-16 bottom-0 mt-0 fixed shadow "
        }
      >
        <div
          className="h-full rounded-br-xl overflow-y-scroll scrollbar-hide"
          style={{ background: "#27333a", scrollbarWidth: "none" }}
        >
          <div className="pt-2.5 pb-7">
            <ul>
              <li className="py-3 px-5 text-gray-400 block">Menu</li>
              <li className="block">
                <Link
                  to="/"
                  className="text-gray-400 py-2 px-7 font-regular font-poppins flex items-center gap-4 hover:text-white hover:text-white focus:text-white"
                >
                  <div className="">
                    <span>
                      <BiTachometer style={{ fontSize: 18 }} />
                    </span>
                  </div>
                  <span
                    style={{ display: props.toggle === false ? "" : "none" }}
                    className="inline-block relative"
                  >
                    Dashboard
                  </span>
                </Link>
              </li>
              {currentUser !== null && (currentUser.roles === "Admin" || currentUser.roles === "Mentor")  && (
              <li className="block flex">
                <div className="w-full">
                  <div
                    className="py-2 px-7 font-regular font-poppins flex items-center gap-4 flex text-gray-400 cursor-pointer hover:text-white focus:text-white"
                    onClick={handleDropdownOrganization}
                  >
                    <span>
                      <BiGroup style={{ fontSize: 18 }} />
                    </span>
                    <span
                      style={{
                        display: props.toggle === false ? "" : "none",
                      }}
                      className="inline-block relative"
                    >
                      Organization
                    </span>
                    <div
                      style={{
                        display: props.toggle === false ? "" : "none",
                      }}
                      className="inline-block relative ml-auto"
                    >
                      {dropdownOrganization ? (
                        <BiChevronUp />
                      ) : (
                        <BiChevronDown />
                      )}
                    </div>
                  </div>
                  <ul
                    className={
                      dropdownOrganization && !props.toggle ? "block" : "hidden"
                    }
                  >
                    {currentUser !== null && currentUser.roles === "Admin" && (
                      <li className="block">
                        <Link
                          to="/squad"
                          className="text-gray-400 py-2 px-7 font-regular font-poppins flex items-center gap-4 hover:text-white focus:text-white"
                        >
                          <div className="">
                            <span>
                              <BiGroup
                                style={{ fontSize: 18 }}
                                className="opacity-0"
                              />
                            </span>
                          </div>
                          <span
                            style={{
                              display: props.toggle === false ? "" : "none",
                            }}
                            className="inline-block relative"
                          >
                            Squad
                          </span>
                        </Link>
                      </li>
                    )}
                    <li className="block">
                      <Link
                        to="/theory"
                        className="text-gray-400 py-2 px-7 font-regular font-poppins flex items-center gap-4 hover:text-white hover:text-white focus:text-white"
                      >
                        <div className="">
                          <span>
                            <BiBookOpen
                              style={{ fontSize: 18 }}
                              className="opacity-0"
                            />
                          </span>
                        </div>
                        <span
                          style={{
                            display: props.toggle === false ? "" : "none",
                          }}
                          className="inline-block relative"
                        >
                          Theory
                        </span>
                      </Link>
                    </li>
                    {currentUser !== null && currentUser.roles === "Admin" && (
                    <li className="block">
                      <Link
                        to="/batch"
                        className="text-gray-400 py-2 px-7 font-regular font-poppins flex items-center gap-4 hover:text-white hover:text-white focus:text-white"
                      >
                        <div className="">
                          <span>
                            <BiGitBranch
                              style={{ fontSize: 18 }}
                              className="opacity-0"
                            />
                          </span>
                        </div>
                        <span
                          style={{
                            display: props.toggle === false ? "" : "none",
                          }}
                          className="inline-block relative"
                        >
                          Batch
                        </span>
                      </Link>
                    </li>
                    )}
                  </ul>
                </div>
                <div
                  className={
                    dropdownOrganization && props.toggle ? "" : "hidden"
                  }
                >
                  <div
                    className="absolute py-2 rounded-r-lg"
                    style={{ background: "#27333a" }}
                  >
                    <ul className="w-36">
                    {currentUser !== null && currentUser.roles === "Admin" && (
                      <li className="block">
                        <Link
                          to="/squad"
                          className="text-gray-400 py-2 px-3 font-regular font-poppins flex items-center gap-4 hover:text-white hover:text-white focus:text-white"
                        >
                          <span className="inline-block relative">Squad</span>
                        </Link>
                      </li>
                    )}
                      <li className="block">
                        <Link
                          to="/theory"
                          className="text-gray-400 py-2 px-3 font-regular font-poppins flex items-center gap-4 hover:text-white hover:text-white focus:text-white"
                        >
                          <span className="inline-block relative">Theory</span>
                        </Link>
                      </li>
                      {currentUser !== null && currentUser.roles === "Admin" && (
                      <li className="block">
                        <Link
                          to="/batch"
                          className="text-gray-400 py-2 px-3 font-regular font-poppins flex items-center gap-4 hover:text-white hover:text-white focus:text-white"
                        >
                          <span className="inline-block relative">Batch</span>
                        </Link>
                      </li>
                      )}
                    </ul>
                  </div>
                </div>
              </li>
              )}
              {currentUser !== null && currentUser.roles === "Admin" && (
              <li className="block flex">
                <div className="w-full">
                  <div
                    className="py-2 px-7 font-regular font-poppins flex items-center gap-4 flex text-gray-400 cursor-pointer hover:text-white focus:text-white"
                    onClick={handleDropdownEvents}
                  >
                    <span>
                      <BiCalendarEvent style={{ fontSize: 18 }} />
                    </span>
                    <span
                      style={{
                        display: props.toggle === false ? "" : "none",
                      }}
                      className="inline-block relative"
                    >
                      Events
                    </span>
                    <div
                      style={{
                        display: props.toggle === false ? "" : "none",
                      }}
                      className="inline-block relative ml-auto"
                    >
                      {dropdownEvent ? <BiChevronUp /> : <BiChevronDown />}
                    </div>
                  </div>
                  <ul
                    className={
                      dropdownEvent && !props.toggle ? "block" : "hidden"
                    }
                  >
                    <li className="block">
                      <Link
                        to="/category-event"
                        className="text-gray-400 py-2 px-7 font-regular font-poppins flex items-center gap-4 hover:text-white hover:text-white focus:text-white"
                      >
                        <span>
                          <BiCalendarEvent
                            style={{ fontSize: 18 }}
                            className="opacity-0"
                          />
                        </span>
                        <span
                          style={{
                            display: props.toggle === false ? "" : "none",
                          }}
                          className="inline-block relative"
                        >
                          Category Event
                        </span>
                      </Link>
                    </li>
                    <li className="block">
                      <Link
                        to="/event"
                        className="text-gray-400 py-2 px-7 font-regular font-poppins flex items-center gap-4 hover:text-white hover:text-white focus:text-white"
                      >
                        <span>
                          <BiCalendarEvent
                            style={{ fontSize: 18 }}
                            className="opacity-0"
                          />
                        </span>
                        <span
                          style={{
                            display: props.toggle === false ? "" : "none",
                          }}
                          className="inline-block relative"
                        >
                          Event
                        </span>
                      </Link>
                    </li>
                    <li className="block">
                      <Link
                          to="/oprec"
                          className="text-gray-400 py-2 px-7 font-regular font-poppins flex items-center gap-4 hover:text-white hover:text-white focus:text-white"
                      >
                        <span>
                          <BiCalendarEvent
                              style={{ fontSize: 18 }}
                              className="opacity-0"
                          />
                        </span>
                        <span
                            style={{
                              display: props.toggle === false ? "" : "none",
                            }}
                            className="inline-block relative"
                        >
                          Open Recruitment
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className={dropdownEvent && props.toggle ? "" : "hidden"}>
                  <div
                    className="absolute py-2 rounded-r-lg"
                    style={{ background: "#27333a" }}
                  >
                    <ul className="w-40">
                      <li className="block">
                        <Link
                          to="/category-event"
                          className="text-gray-400 py-2 px-3 font-regular font-poppins flex items-center gap-4 hover:text-white hover:text-white focus:text-white"
                        >
                          <span className="inline-block relative">
                            Category Event
                          </span>
                        </Link>
                      </li>
                      <li className="block">
                        <Link
                          to="/event"
                          className="text-gray-400 py-2 px-3 font-regular font-poppins flex items-center gap-4 hover:text-white hover:text-white focus:text-white"
                        >
                          <span className="inline-block relative">Event</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              )}
              <li className="block flex">
                <div className="w-full">
                  <div
                    className="py-2 px-7 font-regular font-poppins flex items-center gap-4 flex text-gray-400 cursor-pointer hover:text-white focus:text-white"
                    onClick={handleDropdownMoney}
                  >
                    <span>
                      <BiMoney style={{ fontSize: 18 }} />
                    </span>
                    <span
                      style={{
                        display: props.toggle === false ? "" : "none",
                      }}
                      className="inline-block relative"
                    >
                      Money
                    </span>
                    <div
                      style={{
                        display: props.toggle === false ? "" : "none",
                      }}
                      className="inline-block relative ml-auto"
                    >
                      {dropdownMoney ? <BiChevronUp /> : <BiChevronDown />}
                    </div>
                  </div>
                  <ul
                    className={
                      dropdownMoney && !props.toggle ? "block" : "hidden"
                    }
                  >
                    <li className="block">
                      <Link
                        to="/cash"
                        className="text-gray-400 py-2 px-7 font-regular font-poppins flex items-center gap-4 hover:text-white hover:text-white focus:text-white"
                      >
                        <div className="">
                          <span>
                            <BiEdit
                              style={{ fontSize: 18 }}
                              className="opacity-0"
                            />
                          </span>
                        </div>
                        <span
                          style={{
                            display: props.toggle === false ? "" : "none",
                          }}
                          className="inline-block relative"
                        >
                          Cash
                        </span>
                      </Link>
                    </li>
                    {currentUser !== null && (currentUser.roles === "Admin" || currentUser.roles === "Bendahara") && (
                      <li className="block">
                        <Link
                          to="/money"
                          className="text-gray-400 py-2 px-7 font-regular font-poppins flex items-center gap-4 hover:text-white hover:text-white focus:text-white"
                        >
                          <div className="">
                            <span>
                              <BiMoney
                                style={{ fontSize: 18 }}
                                className="opacity-0"
                              />
                            </span>
                          </div>
                          <span
                            style={{
                              display: props.toggle === false ? "" : "none",
                            }}
                            className="inline-block relative"
                          >
                            Money
                          </span>
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>
                <div className={dropdownMoney && props.toggle ? "" : "hidden"}>
                  <div
                    className="absolute py-2 rounded-r-lg"
                    style={{ background: "#27333a" }}
                  >
                    <ul className="w-40">
                      <li className="block">
                        <Link
                          to="/cash"
                          className="text-gray-400 py-2 px-3 font-regular font-poppins flex items-center gap-4 hover:text-white hover:text-white focus:text-white"
                        >
                          <span className="inline-block relative">Cash</span>
                        </Link>
                      </li>
                      {currentUser !== null && (currentUser.roles === "Admin" || currentUser.roles) === "Bendahara" && (
                      <li className="block">
                        <Link
                          to="/money"
                          className="text-gray-400 py-2 px-3 font-regular font-poppins flex items-center gap-4 hover:text-white hover:text-white focus:text-white"
                        >
                          <span className="inline-block relative">Money</span>
                        </Link>
                      </li>
                      )}
                    </ul>
                  </div>
                </div>
              </li>

              {currentUser !== null && currentUser.roles === "Admin" && (
                <>
                  <li className="block">
                    <Link
                      to="/user"
                      className="text-gray-400 py-2 px-7 font-regular font-poppins flex items-center gap-4 hover:text-white hover:text-white focus:text-white"
                    >
                      <div className="">
                        <span>
                          <BiUser style={{ fontSize: 18 }} />
                        </span>
                      </div>
                      <span
                        style={{
                          display: props.toggle === false ? "" : "none",
                        }}
                        className="inline-block relative"
                      >
                        User
                      </span>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarComponent;
