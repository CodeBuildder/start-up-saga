import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useHistory } from "react-router-dom";
import CONSTANTS from "../../constants/constants";
// @ts-ignore
import Loading from "react-fullscreen-loading";
import { IconContext } from "react-icons";
import { BiMessageAdd } from "react-icons/bi";
import { BiLogOut } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
interface companyOrder {
  _id: any;
  userId: { username: String; email: string; phone: Number };
  toAddress: string;
  fromAddress: string;
  date: Date;
  weight: Number;
  price: Number;
}

const Orders = () => {
  const [loaded, setLoaded] = useState(false);
  const [Order, setOrder] = useState<companyOrder[]>([]);

  useEffect(() => {
    let getData;
    const fetchCompanyOrders = async () => {
      getData = await axios.get(`${CONSTANTS.BASE_URL}/admin/order`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      getData = getData.data;
      //console.log(getData);
      setOrder(getData);
    };
    fetchCompanyOrders();

    setLoaded(true);
  }, []);

  const closeOrder = async (id: any) => {
    const orderId = {
      orderId: id,
    };
    console.log(orderId);
    try {
      const orderClose: AxiosResponse = await axios.post(
        `http://localhost:5000/api/userorder/close`,
        orderId,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      console.log(orderClose);
    } catch (err: any) {
      if (err.response) {
        if (err.response.status === 401) {
          toast.warn("Order Invalid");
        }
      }
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    toast.warn("Logging out !");
    setTimeout(() => {
      history.push("login");
    }, 2000);
  };

  const history = useHistory();
  return (
    <div>
      {/* Navigation Bar */}
      <ToastContainer />
      <div className="navbar  shadow-lg bg-purple-700 text-neutral-content h-18">
        <div className="flex-1 px-2 mx-2">
          <span className="text-lg font-bold">Start.exe</span>
        </div>
        <div
          className="btn btn-ghost btn-md rounded-btn flex  content-center "
          onClick={() => history.push("dashboard")}
        >
          <div className="mt-1">
            <IconContext.Provider value={{ size: "27px" }}>
              <BiMessageAdd />
            </IconContext.Provider>
          </div>
          <pre> </pre>
          ADD LISTING
        </div>
        <a
          className="btn btn-ghost btn-md rounded-btn flex  content-center"
          onClick={logoutHandler}
        >
          <IconContext.Provider value={{ size: "26px" }}>
            <BiLogOut />
          </IconContext.Provider>
          <pre> </pre>
          SIGN OUT
        </a>
      </div>

      {/*Main page */}
      <div className="w-100 min-h-screen text-black bg-gray-100">
        <div className="w-100 flex h-full min-h-screen flex-col items-center p-10 ">
          {loaded === true ? (
            <div className="">
              {Order.length > 0 ? (
                Order?.map((item: companyOrder) => (
                  <div className="jusitfy-between p-7 w-1/1 h-full">
                    <div className="bg-gray-100 m-5 p-5 h-full rounded-md shadow-lg text-purple-800 w-1/1">
                      <div className="flex flex-row text-xl">
                        <span className="mt-5 font-main text-2xl">
                          {item.userId.username}
                        </span>
                      </div>
                      <div className="flex flex-row space-x-10">
                        <span className="mt-5 font-main">
                          <b>Contact:</b> {item.userId.email}
                        </span>
                        <span className="mt-5 font-main">
                          <b>Phone:</b> {item.userId.phone}
                        </span>
                      </div>

                      <div className="flex flex-row py-3">
                        <p className="text-2xl font-bold font-main">
                          {item.fromAddress}
                        </p>
                        <div className="px-8">
                          <IconContext.Provider value={{ size: "35px" }}>
                            <BsFillArrowRightCircleFill />
                          </IconContext.Provider>
                        </div>
                        <p className="text-2xl font-bold font-main">
                          {item.toAddress}
                        </p>
                      </div>
                      <div className="contents flex-row space-between w-16 pt-5">
                        <p className="text-2xl font-bold font-main">
                          ₹{item.price}/Kg
                        </p>
                      </div>
                      <button
                        className="p-5 bg-white border-2"
                        onClick={() => {
                          closeOrder(item._id);
                        }}
                      >
                        close order
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center text-red-900 justify-self-center">
                  NO ORDERS PLACED
                </div>
              )}
            </div>
          ) : (
            <Loading loading background="#D3D3D3" loaderColor="#f2ff00" />
          )}
        </div>
      </div>
    </div>
  );
};
export default Orders;
