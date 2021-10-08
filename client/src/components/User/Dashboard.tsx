import React, { useState, useEffect, useRef } from "react";
import axios, { AxiosResponse } from "axios";
import { useHistory } from "react-router-dom";
import { GoPackage } from "react-icons/go";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import { IconContext } from "react-icons";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import constants from "../../constants/constants";
import Select from "react-select";
import { cityData } from "../../constants/cities";
import { useAuth } from "../../userContext/context";
import { BiLogOut } from "react-icons/bi";
const Dashboard = () => {
  const myOptions = cityData;
  const [value, onChange] = useState(new Date());
  const [fromLocation, setFromLocation] = useState<any>({
    label: "",
    value: "",
  });
  const [toLocation, setToLocation] = useState<any>({ label: "", value: "" });
  const { setLoggedIn } = useAuth();
  const [post, setPost] = useState<any>([]);
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

  const searchCompany = async () => {
    let date = JSON.stringify(value);
    date = date.slice(1, 11);
    const data = {
      fromAddress: fromLocation.value,
      toAddress: toLocation.value,
      date,
    };

    console.log(data);
    let searchCompanies: AxiosResponse = await axios.post(
      `${constants.BASE_URL}/admin/company/filter`,
      data,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    console.log(searchCompanies.data["result"]);
    searchCompanies = searchCompanies.data["result"];
    // console.log(searchCompanies.data);
    setPost(searchCompanies);
    // console.log(post.length);
  };

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
        <a
          className="btn btn-ghost btn-md rounded-btn flex  content-center"
          onClick={() => {
            history.push("/");
          }}
        >
          <IconContext.Provider value={{ size: "26px" }}>
            <BiLogOut />
          </IconContext.Provider>
          <pre> </pre>
          SIGN OUT
        </a>
      </div>
      {/* Main page*/}
      <div className="w-100 flex  h-full min-h-screen flex-col items-center  m-2 p-2  ">
        <div className=" flex items-center  justify-around w-2/3 bg-white h-40 mt-2 rounded-xl pb-6">
          <Select
            value={fromLocation}
            options={myOptions}
            onChange={(fromLocation) => {
              setFromLocation(fromLocation);
            }}
            openMenuOnClick={false}
            placeholder="From"
            className="w-56 py-2 h-12"
          />
          {/* <div className="flex  flex-col justify-start">
            <label className="label">
              <span className="label-text">FROM</span>
            </label>
            <input
              value={fromLocation}
              className="input rounded-sm input-bordered"
              onChange={fetchFromLocation}
            />
          </div> */}

          <div className="pt-10">
            <IconContext.Provider value={{ size: "40px" }}>
              <BsFillArrowRightCircleFill />
            </IconContext.Provider>
          </div>
          <Select
            value={toLocation}
            options={myOptions}
            onChange={(toLocation) => {
              setToLocation(toLocation);
            }}
            openMenuOnClick={false}
            className="w-56 py-2 h-12"
          />
          {/* <div>
            <label className="label">
              <span className="label-text">TO</span>
            </label>
            <input
              value={toLocation}
              type="text"
              className="input rounded-sm input-bordered"
              onChange={(e) => setToLocation(e.target.value)}
            />
          </div> */}
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
          <div className="pt-6" onClick={() => setPost(["hellp", "hi"])}>
            <button className="btn btn-outline btn-accent w-28 h-8 ">
              SEARCH
            </button>
          </div>
        </div>
        {post.length > 0 ? (
          <div className="w-full  mt-8  h-full flex justify-items-start mx-10 ">
            <div className="w-1/6 h-80 bg-white mr-4">SIDEBAR</div>
            {/* {post.map((item: any) => (
              <div>{item.price}</div>
            ))} */}
            <div className="jusitfy-between p-7 w-2/3 h-66 bg-white rounded-md shadow-lg text-purple-400">
              <div className="flex flex-row text-6xl">
                <div className="w-1/4">
                  <img
                    className="rounded-full h-40 w-40 ml-6"
                    src="https://www.pymnts.com/wp-content/uploads/2021/07/FedEx-Express-India-Delhivery-shipping.jpg"
                    alt="FedEx"
                  />
                </div>
                <div className="flex flex-row"></div>
                <div className="mt-8">FedEx</div>
              </div>

              <div className="flex flex-row ">
                <div className="container w-12 h-8 ml-20 mt-4 bg-green-500 text-white rounded">
                  <div className="flex pt-1 gap-1 justify-items-center">
                    <div className="pt-1">
                      <IconContext.Provider value={{ size: "17px" }}>
                        <AiFillStar />
                      </IconContext.Provider>
                    </div>
                    <div>4.5</div>
                  </div>
                </div>
                <div className="text-4xl pl-28">Chennai</div>
                <div className="pt-2 px-8">
                  <IconContext.Provider value={{ size: "35px" }}>
                    <BsFillArrowRightCircleFill />
                  </IconContext.Provider>
                </div>
                <div className="text-4xl">Bangalore</div>
              </div>
              <div className="flex flex-row w-1/1 pt-5">
                <div className="text-2xl pl-16 span">₹ 50/kg</div>
                <div className="">
                  <button className="btn btn-outline btn-accent w-48 h-14 float-right">
                    Book a slot
                  </button>
                </div>
              </div>
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
