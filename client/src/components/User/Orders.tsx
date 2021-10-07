import React, { useEffect, useState } from "react";
import CONSTANTS from "../../constants/constants";
// @ts-ignore
import Loading from "react-fullscreen-loading";
import { useHistory } from "react-router-dom";
import axios from "axios";
interface Order {
  companyId: string;
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
      <div className="w-100 min-h-screen bg-gray-100 ">
        <div className="w-100 flex  h-full min-h-screen flex-col   items-center  m-2 p-10 ">
          {loaded === true ? (
            <div>
              {Order.length > 0 ? (
                Order?.map((item: Order) => <div>{item.companyId}</div>)
              ) : (
                <div className="flex items-center items-center justify-self-center">
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
