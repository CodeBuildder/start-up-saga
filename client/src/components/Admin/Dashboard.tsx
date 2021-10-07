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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="label">
          <span className="label-text">Company Name</span>
        </label>
        <input
          type="text"
          className="input rounded-sm"
          {...register("companyName", { required: true })}
        />
        <label className="label">
          <span className="label-text">From </span>
        </label>
        <input
          type="text"
          className="input rounded-sm"
          {...register("fromAddress", { required: true })}
        />
        <label className="label">
          <span className="label-text">To Address</span>
        </label>
        <input
          type="text"
          className="input rounded-sm"
          {...register("toAddress", { required: true })}
        />
        <label className="label">
          <span className="label-text">Price</span>
        </label>
        <input
          type="text"
          className="input rounded-sm"
          {...register("price", { required: true })}
        />
        {calendarView === false ? (
          <h1 onClick={() => setCalendarView(true)}>SELECT DATE</h1>
        ) : (
          <DatePicker
            value={value}
            multiple={true}
            placeholder="SELECT DATE"
            id="date-picker"
            format="DD/MM/YYYY"
            className="rmdp-input"
          />
        )}
        <button
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
        <button type="submit">Post</button>
      </form>
    </div>
  );
};
export default Dashboard;
