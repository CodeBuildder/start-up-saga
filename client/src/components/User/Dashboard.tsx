import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { GoPackage } from "react-icons/go";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Dashboard = () => {
  const [value, onChange] = useState(new Date());
  const [fromLocation, setFromLocation] = useState<string>("");
  const [toLocation, setToLocation] = useState<string>("");
  const [search, setSearch] = useState<boolean>(false);
  // const sample={'from':"chennai",to:"banglore",}
  const [displayCalendar, setDisplayCalender] = useState<boolean>(false);
  const history = useHistory();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (displayCalendar && ref.current && !ref.current.contains(e.target)) {
        setDisplayCalender(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [displayCalendar]);
  return (
    <div className="w-100 min-h-screen bg-gray-100 ">
      {/* Navigation Bar */}
      <div className="navbar  shadow-lg bg-purple-700 text-neutral-content h-18">
        <div className="flex-1 px-2 mx-2">
          <span className="text-lg font-bold">Start.exe</span>
        </div>
        <div
          className="btn btn-ghost btn-md rounded-btn flex  content-center "
          onClick={() => history.push("myorders")}
        >
          <IconContext.Provider value={{ size: "32px" }}>
            <GoPackage />
          </IconContext.Provider>
          <pre> </pre>
          MY ORDERS
        </div>
      </div>
      {/* Main page*/}
      <div className="w-100 flex  h-full min-h-screen flex-col items-center  m-2 p-2  ">
        <div className=" flex items-center  justify-around w-2/3 bg-white h-40 mt-2 rounded-xl pb-6">
          <div className="flex  flex-col justify-start">
            <label className="label">
              <span className="label-text">FROM</span>
            </label>
            <input
              type={fromLocation}
              className="input rounded-sm input-bordered"
              onChange={(e) => setFromLocation(e.target.value)}
            />
          </div>

          <div className="pt-10">
            <IconContext.Provider value={{ size: "40px" }}>
              <BsFillArrowRightCircleFill />
            </IconContext.Provider>
          </div>
          <div>
            <label className="label">
              <span className="label-text">TO</span>
            </label>
            <input
              value={toLocation}
              type="text"
              className="input rounded-sm input-bordered"
              onChange={(e) => setToLocation(e.target.value)}
            />
          </div>
          <div ref={ref}>
            <div
              className="flex content-center"
              onClick={() => setDisplayCalender(true)}
            >
              {displayCalendar === false ? (
                <div>
                  <h1>SELECT DATE</h1>
                  <h3>{value.toDateString()}</h3>
                </div>
              ) : (
                <div className="z-10 w-64 h-44">
                  <Calendar onChange={onChange} value={value} />
                </div>
              )}
            </div>
          </div>
          <div className="pt-6" onClick={() => setSearch(true)}>
            <button className="btn btn-outline btn-accent w-28 h-8">
              SEARCH
            </button>
          </div>
        </div>
        {search === true ? (
          <div className="w-full  mt-8  h-full flex justify-items-start mx-10 ">
            <div className="w-1/6 h-80 bg-white mr-4">SIDEBAR</div>
            <div className="jusitfy-between p-7 w-2/3 h-66 bg-white mr-4 rounded-md  shadow-lg text-purple-400">
                <div className="flex flex-row text-6xl">
                  Company : FedEx
                  <div className="w-1/3">
                        <img className="object-right-top" src="https://www.pymnts.com/wp-content/uploads/2021/07/FedEx-Express-India-Delhivery-shipping.jpg" alt="FedEx" />
                  </div>
                </div>

                <div className="flex flex-row">
                  <div className="text-2xl pt-5 pl-2 text-left">
                  From :
                    <div className="text-4xl pl-4">
                      Chennai
                    </div>
                  </div>
                  <div className="pt-10 px-10">
                  <IconContext.Provider value={{ size: "35px" }}>
                    <BsFillArrowRightCircleFill />
                  </IconContext.Provider>
                  </div>
                  <div className="text-2xl pt-5 text-left">
                    To : 
                      <div className="text-4xl pl-4">
                        Bangalore
                      </div>
                  </div>
                </div>
              <div className="flex flex-row pt-5">
                <div className="text-2xl pl-2 pt-5 pr-48">Price/kg :</div>
                <div className="text-2xl pt-5">Dates Available :</div>
              </div>
              <div className="flex flex-row w-1/1 space-x-56">
                <div className="text-3xl pl-10 span">50/-</div>
                <div className="text-3xl">1 2 3 4 5</div>
              </div>
              <div className="-mt-10"><button className="btn btn-outline btn-primary w-48 h-14 float-right">Book a slot</button></div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
