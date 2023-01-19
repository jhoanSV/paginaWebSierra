import React , { useState } from "react";
import { Navigation } from "./routes";
import { Header } from "./layouts";
import { Home } from "./pages";


import './App.scss';

export default function App() {
  
  function reDireccion (){
    alert(
      "Ahora cómo hago para que cambie a inicio jjdjdjd"
    )
    
  }

  return (
      <>
        <Header reDireccion={reDireccion}></Header>
        <body>Holippro</body>
      </>
      
  );
}

