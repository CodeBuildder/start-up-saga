import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import constants from "../../constants/constants";
import { ToastContainer, toast } from "react-toastify";

export default function Modal(props: any) {
  const [showModal, setShowModal] = React.useState(false);
  const [day, setDay] = useState<any>();
  var today = new Date();
  const bookSlot = async (data: any) => {
    const postData = {
      weight: props.weight.value,
      price: parseInt(props.weight.value) * data.price,
      fromAddress: data.fromAddress,
      toAddress: data.toAddress,
      adminId: data.adminId._id,
      date: `${today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + day}`,
    };
    //   let response = await axios.post(
    //     `${constants.BASE_URL}/user/order`,
    //     postData,
    //     {
    //       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    //     }
    //   );
    //   if (response.status === 200)
    //     toast.success("Your order has been successfully booked !");
    console.log(postData);
  };

  return (
    <>
      <button
        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Open regular modal
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-200 text-black outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Modal Title</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="form-control py-5 px-5 text-black">
                  <label>Preffered Payment</label>
                  <div className="flex flex-row space-x-5">
                    <span className="label-text">UPI</span>
                    <input
                      type="radio"
                      name="upi"
                      className="radio radio-primary"
                    />
                    <span className="label-text pl-10">Net Banking</span>
                    <input
                      type="radio"
                      name="netbanking"
                      className="radio radio-primary"
                    />
                  </div>
                </div>
                <div className="w-full p-10 text-black">
                  Terms & Condition
                  <li className="pt-5">
                    Duis mollis, est non commodo luctus, nisi erat porttitor
                    ligula.
                  </li>
                  <li>
                    Duis mollis, est non commodo luctus, nisi erat porttitor
                    ligula.
                  </li>
                  <li>
                    Duis mollis, est non commodo luctus, nisi erat porttitor
                    ligula.
                  </li>
                  <li>
                    Duis mollis, est non commodo luctus, nisi erat porttitor
                    ligula.
                  </li>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-green-900  active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => bookSlot(props)}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
