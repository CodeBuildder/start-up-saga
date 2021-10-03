import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div>

      {/* Navigation Bar */}
      <div className="navbar  shadow-lg bg-purple-700 text-neutral-content ">
        <div className="flex-1 px-2 mx-2">
          <span className="text-lg font-bold">
                  Start.exe
                </span>
        </div> 
        <div className="flex-none hidden px-2 mx-2 lg:flex">
          <div className="flex items-stretch"> 
            <a className="btn btn-ghost btn-sm rounded-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3"/><circle cx="12" cy="10" r="3"/><circle cx="12" cy="12" r="10"/>
             </svg><pre> </pre>
                   Login
                  
            </a> 
            <a className="btn btn-ghost btn-sm rounded-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg><pre> </pre>
                   SignUp
                  
            </a>
          </div>
        </div> 
        <div className="flex-none">
          <button className="btn btn-square btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">           
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>               
            </svg>
          </button>
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
      <div className="hero min-h-screen w-100  bg-base-200">
        <div className="flex flex-row justify-items-center items-center min-w-full ">
          {" "}
          <div className="w-1/2 flex ">
            <h1 className="">Change content</h1>
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
      <footer className="p-10 footer bg-base-400 text-base-content">
        <div>
          <svg width="50" height="50" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" className="fill-current">
            <path d=""></path>
          </svg> 
          <p>Start.exe Ltd.
            <br/>Company you can rely on
          </p>
        </div> 
        <div>
          <span className="footer-title">Services</span> 
          <a className="link link-hover">Branding</a> 
          <a className="link link-hover">Design</a> 
          <a className="link link-hover">Marketing</a> 
          <a className="link link-hover">Advertisement</a>
        </div> 
        <div>
          <span className="footer-title">Company</span> 
          <a className="link link-hover">About us</a> 
          <a className="link link-hover">Contact</a> 
          <a className="link link-hover">Jobs</a> 
          <a className="link link-hover">Press kit</a>
        </div> 
        <div>
          <span className="footer-title">Legal</span> 
          <a className="link link-hover">Terms of use</a> 
          <a className="link link-hover">Privacy policy</a> 
          <a className="link link-hover">Cookie policy</a>
        </div>
        <div>
        <a>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
        </svg>
      </a> 
      <a>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
        </svg>
      </a> 
      <a>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
        </svg>
      </a>
        </div>
      </footer>
  </div>
  );
};
export default Hero;
