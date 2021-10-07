import React, { useState, useRef } from "react";
import DatePicker from "react-multi-date-picker";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";
import constants from "../../constants/constants";
import axios, { AxiosResponse } from "axios";
type FormData = {
  companyName: string;
  toAddress: string;
  fromAddress: string;
  date: any;
  price: number;
};
const Dashboard = () => {
  const [value, setValue] = useState<string | null>("");
  const [calendarView, setCalendarView] = useState(false);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: FormData) => {
    const userOrder: FormData = {
      companyName: data.companyName,
      fromAddress: data.fromAddress,
      toAddress: data.toAddress,
      price: data.price,
      date: value?.split(" "),
    };
    console.log(userOrder);
    axios.post(`${constants.BASE_URL}/admin/register`, userOrder);
  };
  return (
    <div className="w-100 min-h-screen bg-gray-100 ">
      {/* Navigation Bar */}
      <div className="navbar  shadow-lg bg-purple-700 text-neutral-content h-18">
        <div className="flex-1 px-2 mx-2">
          <span className="text-lg font-bold">Start.exe</span>
        </div>
      </div>
    
      {/* Main Page */}
      <div className="w-100 flex  h-full min-h-screen flex-col items-center  m-2 p-10 ">
      <div className="shadow-lg justify-around w-100 bg-white h-2/3 mt-5 rounded-xl p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="text-purple-800 flex flex-col justify-start">
        <label className="label">
          <span className="label-text-black">Company Name</span>
        </label>
        <input
          type="text"
          className="input rounded-sm"
          {...register("companyName", { required: true })}
        />
        <div className="flex-row py-3">
          <p className="">From </p>
          <p className="">To Address</p>
        </div>
        <div className="flex-row space-x-24">
        <input
          type="text"
          className="input rounded-sm"
          {...register("fromAddress", { required: true })}
        />

        <input
          type="text"
          className="input rounded-sm"
          {...register("toAddress", { required: true })}
        />          
        </div>

        <label className="label">
          <span className="label-text-black">Price</span>
        </label>
        <input
          type="text"
          className="input rounded-sm"
          {...register("price", { required: true })}
        />
        <br /> 
        <div className="flex-row pl-12 space-x-20">
        {calendarView === false ? (
          <button onClick={() => setCalendarView(true)} className="btn btn-outline btn-primary w-44 h-12">Select Dates</button>
        ) : (
          <DatePicker
            value={value}
            multiple={true}
            placeholder="Select Dates"
            id="date-picker"
            format="DD/MM/YYYY"
            className="rmdp-input"
          />
        )}
        
        <button
        className="btn btn-outline btn-primary w-44 h-12 "
          onClick={() =>
            setValue(
              document
                .getElementsByClassName("rmdp-input")[0]
                .getAttribute("value")
            )
          }
        >
          SAVE DATES
        </button>
        <br /> <br />
        <div className="pl-20"><button className="btn btn-outline btn-primary w-28 h-14" type="submit">Post
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 ml-2 stroke-current">  
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>                        
        </svg>
        </button></div>
        </div>
      </form>
      </div>
    </div>
    </div>
  );
};
export default Dashboard;
