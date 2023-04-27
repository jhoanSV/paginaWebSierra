//import React , { useState } from "react";
//import { Navigation } from "./routes";
import { Routes, Route } from "react-router-dom"
import { Header } from "./layouts";
import { Footer } from "./layouts";
import { Home, Products, About, Privacy } from "./pages";

import './_App.scss';

export default function App() {

  return (
      <>
        <a href="https://api.whatsapp.com/send/?phone=573134237538&text&type=phone_number&app_absent=0" className="btn-wapp" 
        target="_blank" rel="noreferrer">
            <img
                src={require("./Assets/png/WappIcon.png")}
                width="479px"
                height="480"
                alt="iconWapp"              
            />
        </a>

        <Header></Header>

        <div className="App">
          <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="productos" element={ <Products /> } />
            <Route path='/about' element={ <About /> } />
            <Route path='/privacy' element={ <Privacy /> } />
          </Routes>
        </div>

        <Footer></Footer>
      </>
      
  );
}

