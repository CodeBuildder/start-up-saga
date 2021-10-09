import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import CONSTANTS from "../constants/constants";
// @ts-ignore
import Loading from "react-fullscreen-loading";
const Hero = (props: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>();
  useEffect(() => {
    const getOrder = async () => {
      const getData: AxiosResponse = await axios.post(
        `${CONSTANTS.BASE_URL}/get/update`,
        {
          orderId: props.match.params.orderId,
        }
      );
      console.log(getData?.data);
      setData(getData.data);
      setLoading(true);
    };

    getOrder();
  }, []);
  return (
    <div>
      {loading === false ? (
        <Loading loading background="#D3D3D3" loaderColor="#f2ff00" />
      ) : (
        <div>
          <h1>ORDER PAGE</h1>
        </div>
      )}
    </div>
  );
};

export default Hero;
