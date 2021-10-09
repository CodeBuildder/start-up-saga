import React, { useEffect, useState } from "react";
import CONSTANTS from "../../constants/constants";
// @ts-ignore
import Loading from "react-fullscreen-loading";
import { useHistory } from "react-router-dom";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import moment from "moment";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
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
  const [rating, setRating] = useState<any>(null);
  useEffect(() => {
    let getData;
    const fetchMyOrders = async () => {
      getData = await axios.get(`${CONSTANTS.BASE_URL}/user/order`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      getData = getData.data;
      console.log(getData);

      //var fomatted_date = moment(photo.date_published).format('YYYY-MM-DD');
      setOrder(getData);
    };
    fetchMyOrders();

    setLoaded(true);
  }, []);
  type updateRatingType = { orderId: string; adminId: string };
  const updateRating = async (data: updateRatingType) => {
    try {
      const postData = {
        orderId: data.orderId,
        rating: rating,
        adminId: data.adminId,
      };
      console.log(postData);
      const postRating = await axios.post(
        `${CONSTANTS.BASE_URL}/userorder/rating`,
        postData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (postRating.status === 200) {
        toast.success("You rating has been recorded !");
        window.location.reload();
      }
    } catch (err) {
      toast.warn("Oops something went wrong !");
    }
  };
  return (
    <div>
      {" "}
      <ToastContainer />
      <div className="navbar  shadow-lg bg-purple-700 text-neutral-content h-18">
        <div className="flex-1 px-2 mx-2">
          <span className="text-lg font-bold">Start.exe</span>
        </div>
      </div>

      {/*Main page */}
      <div className="w-100 min-h-screen text-black bg-gray-100 ">
        <div className="w-100 flex h-full min-h-screen flex-col items-center justify-center">
          {loaded === true ? (
            <div className="w-full min-h-screen m-5 ">
              {Order.length > 0 ? (
                Order?.map((item: any) => (
                  <>
                    <div className="jusitfy-between p-7 w-3/6 h-full">
                      <div className=" m-5 p-5 h-full rounded-md shadow-lg text-black font-light">
                        <div className="flex flex-row space-x-4 text-lg font-bold">
                          <div className="text-xl">{item.fromAddress}</div>
                          <div className="pt-1">
                            <IconContext.Provider value={{ size: "24px" }}>
                              <BsFillArrowRightCircleFill />
                            </IconContext.Provider>
                          </div>
                          <div>{item.toAddress}</div>
                          <div className="flex flex-col pl-10 ">
                            <div className="">{item.weight} Kg(s)</div>
                          </div>
                        </div>
                        <div className="flex flex-row text-lg pb-1 pt-1">
                          <div className="pl-80 ml-2">
                            <b>₹{item.price}/-</b>
                          </div>
                          <div>
                            Date Ordered:{" "}
                            <b>{moment(item.date).format("DD-MM-YYYY")}</b>
                          </div>
                          <div className="pl-80 ml-2"></div>
                        </div>

                        <div className="flex flex-row text-lg space-x-28">
                          <div className="flex flex-col">
                            <div>
                              Expected Delivery: <b>21/11</b>
                            </div>
                            <div>
                              {
                                item.transactionOver === false ? (
                                  <div>IN TRANSIST</div>
                                ) : (
                                  <div>
                                    {item.gaveRating === false ? (
                                      <div>
                                        <p>Rate your experience with us</p>
                                        <input
                                          type="number"
                                          onChange={(e: any) =>
                                            setRating(e.target.value)
                                          }
                                        />
                                        <button
                                          onClick={() =>
                                            updateRating({
                                              adminId: item.adminId._id,
                                              orderId: item._id,
                                            })
                                          }
                                        >
                                          RATING: RATE
                                        </button>
                                      </div>
                                    ) : (
                                      <div>{item.rating}</div>
                                    )}
                                  </div>
                                )
                                // item.gaveRating === false ? (
                                //   <div>
                                //     <p> Rate your experience!</p>
                                //     <input
                                //       type="number"
                                //       onChange={(e: any) =>
                                //         setRating(e.target.value)
                                //       }
                                //     />
                                //     <button>RATE</button>
                                //   </div>
                                // ) : (
                                //   <div></div>
                                // )
                              }
                            </div>
                            <div></div>
                          </div>
                          <div className="flex flex-col">
                            <div>
                              Payment Method: <b>Net Banking</b>
                            </div>
                            <div className="pb-2">
                              Provider : <b>{item.adminId.companyName}</b>
                            </div>
                            <div className="btn btn-outline btn-accent -m-1">
                              View Updates
                            </div>
                          </div>
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
