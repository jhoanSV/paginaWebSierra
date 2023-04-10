//import React , { useState } from "react";
//import { Navigation } from "./routes";
import { Header } from "./layouts";
import { Footer } from "./layouts";
import { Home } from "./pages";


import './_App.scss';

export default function App() {
  
  function reDireccion (){
    alert(
      "Ahora cómo hago para que cambie a inicio jjdjdjd"
    )
    
  }

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
        <Header reDireccion={reDireccion}></Header>
        <Home></Home>
        <Footer></Footer>
      </>
      
  );
}

