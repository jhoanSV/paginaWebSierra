import React from 'react';
import { Routes, Route } from 'react-router-dom';
//Remember remove the below comment
// eslint-disable-next-line
import { Home, Products, About, Privacy, Catalogo, ContactUs, Specials, SpecialCat} from "../pages";

export function /*LoggedNavigation*/Navigation() {
    return (
      <>
          <Routes>
              <Route exact path='/' element={ <Home /> } />
              {/*<Route path='productos' element={ <Products /> } />*/}
              <Route path='about' element={ <About /> } />
              <Route path='privacy' element={ <Privacy /> } />
              <Route path='contactUs' element={ <ContactUs /> } />
              {/*<Route path='catalogo' element={ <Catalogo /> } />*/}
              <Route path='catalogo/:cat' element={ <Catalogo /> } />
              <Route path='productos/especiales' element={ <Specials/> }/>
              <Route path=':espId' element={ <SpecialCat/> }/>
          </Routes>
      </>
    );
}