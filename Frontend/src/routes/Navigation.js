import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, Products, About, Privacy, Categories} from "../pages";



export function /*LoggedNavigation*/Navigation() {
    return (
      <>
          <Routes>
              <Route path='/' element={ <Home /> } />
              <Route path='products' element={ <Products /> } />
              <Route path='about' element={ <About /> } />
              <Route path='privacy' element={ <Privacy /> } />
              <Route path='categories/:id'   />
          </Routes>
      </>
    );
}