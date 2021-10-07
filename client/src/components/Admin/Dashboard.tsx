import React, { useState } from "react";
import DatePicker from "react-multi-date-picker";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import constants from "../../constants/constants";
import axios, { AxiosResponse } from "axios";
type FormData = {
  companyName: string;
  toAddress: string;
  fromAddress: string;
  date: any;
  weight: number;
  price: number;
};
const Dashboard = () => {
  const [value, setValue] = useState<string | null>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let date: any;
  const dateData: any = () => {
    date = value?.split(" ");
  };
  console.log(dateData);
  const onSubmit = (data: FormData) => {
    const userOrder: FormData = {
      companyName: data.companyName,
      fromAddress: data.fromAddress,
      toAddress: data.toAddress,
      price: data.price,
      weight: data.weight,
      date: date,
    };
    console.log(userOrder);
    // axios.post(`${constants.BASE_URL}/admin/register`, userOrder);
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
          <span className="label-text">To </span>
        </label>

        <label className="label">
          <span className="label-text">Price</span>
        </label>
        <input
          type="text"
          className="input rounded-sm"
          {...register("price", { required: true })}
        />

        <DatePicker
          value={value}
          multiple={true}
          placeholder="SELECT DATE"
          id="date-picker"
          format="DD/MM/YYYY"
        />

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
        <button onClick={dateData()}>CALC</button>
      </form>
    </div>
    //   ) : (
    //     <Redirect to="/" />
    //   )}
    // </>
  );
};
export default Dashboard;
