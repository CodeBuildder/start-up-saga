import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div>
      <div className="w-100 h-16 bg-blue-500"></div>
      <div className="hero min-h-screen  bg-base-200">
        <div className="flex-col hero-content lg:flex-row-reverse">
          <img
            src="https://picsum.photos/id/1005/600/600"
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
            <p className="mb-5">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
      <div className="hero min-h-screen w-100  bg-base-200">
        <div className="flex flex-row justify-items-center items-center min-w-full ">
          {" "}
          <div className="w-1/2 flex ">
            <h1 className="">CHange content</h1>
          </div>
          <div className="flex-col w-1/2  flex-col">
            <div className="w-50 h-50 flex flex-row justify-items-center items-stretch">
              <div className="w-72 h-48  m-5 border-4 border-gray-600"></div>
              <div className="w-72 h-48   m-5 border-4 border-gray-600"></div>
            </div>
            <div className="w-50 h-50 flex flex-row justify-items-center items-stretch">
              <div className="w-72 h-48  m-5 border-4 border-gray-600"></div>
              <div className="w-72 h-48   m-5 border-4 border-gray-600"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="hero min-h-screen  bg-base-200">
        <div className="flex-col hero-content lg:flex-row-reverse">
          <img
            src="https://picsum.photos/id/1005/600/600"
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
            <p className="mb-5">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Hero;
