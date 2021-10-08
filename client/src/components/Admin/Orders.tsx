import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import CONSTANTS from "../../constants/constants";
// @ts-ignore
import Loading from "react-fullscreen-loading";
import { IconContext } from "react-icons";
import { BiMessageAdd } from "react-icons/bi";
import { BiLogOut } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
interface companyOrder {
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
      console.log(getData);
      setOrder(getData);
    };
    fetchCompanyOrders();

    setLoaded(true);
  }, []);
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

      {/*Maiin page */}
      <div className="w-100 min-h-screen text-black bg-gray-100 ">
        <div className="w-100 flex  h-full min-h-screen flex-col   items-center  m-2 p-10 ">
          {loaded === true ? (
            <div>
              {Order.length > 0 ? (
                Order?.map((item: companyOrder) => (
                  <>
                    <span>{item.userId.username}</span>
                    <span>{item.userId.email}</span>
                    <span>{item.userId.phone}</span>
                    <span>{item.toAddress}</span>
                    <span>{item.fromAddress}</span>
                    <span>{item.weight}</span>
                    <span>{item.price}</span>
                  </>
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
