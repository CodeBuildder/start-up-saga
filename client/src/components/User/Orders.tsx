import React, { useEffect, useState } from "react";
import CONSTANTS from "../../constants/constants";
// @ts-ignore
import Loading from "react-fullscreen-loading";
import { useHistory } from "react-router-dom";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import axios from "axios";
interface Order {
  adminId: { companyName: String; email: string };
  fromAddress: string;
  toAddress: string;
  price: Number;
  date: Date;
}
const Orders = () => {
  const history = useHistory();
  const [loaded, setLoaded] = useState(false);
  const [Order, setOrder] = useState<Order[]>([]);
  useEffect(() => {
    let getData;
    const fetchMyOrders = async () => {
      getData = await axios.get(`${CONSTANTS.BASE_URL}/user/order`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      getData = getData.data;
      console.log(getData);
      setOrder(getData);
    };
    fetchMyOrders();

    setLoaded(true);
  }, []);
  return (
    <div>
      <div className="navbar  shadow-lg bg-purple-700 text-neutral-content h-18">
        <div className="flex-1 px-2 mx-2">
          <span className="text-lg font-bold">Start.exe</span>
        </div>
      </div>

      {/*Maiin page */}
      <div className="w-100 min-h-screen text-black  bg-gray-400 ">
        <div className="w-100 flex h-full min-h-screen flex-col items-center m-2 p-10 ">
          {loaded === true ? (
            <div className="w-full min-h-screen m-5 bg-gray-400">
              {Order.length > 0 ? (
                Order?.map((item: Order) => (
                  <>
                    <div className="jusitfy-between p-7 w-3/5 h-full">
                      <div className="bg-gray-200 m-5 p-5 h-full rounded-md shadow-lg text-purple-800">
                        <div className="flex flex-row text-xl">
                          <span className="mt-5 font-main">
                            {item.adminId.companyName}
                          </span>
                        </div>
                        <span className="mt-5 font-main">
                          <b>Contact:</b> {item.adminId.email}
                        </span>

                        <div className="flex flex-row ">
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
                      </div>
                    </div>
                  </>
                ))
              ) : (
                <div className="flex items-center justify-self-center">
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
