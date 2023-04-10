import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Inicio } from "../pages/Home";


export function LoggedNavigation() {
    return (
      <BrowserRouter>
          <Routes>
              <Route path='/' element={ <Inicio /> } />
          </Routes>
      </BrowserRouter>
    );
  }