import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, Products, About, Privacy, Catalogo, ContactUs, Login,
    ChangePass
} from "../pages";

export function Navigation() {
    return (
      <>
          <Routes>
              <Route path='/' element={ <Home /> } />
              <Route path='productos' element={ <Products /> } />
              <Route path='nosotros' element={ <About /> } />
              <Route path='politicas_privacidad' element={ <Privacy /> } />
              <Route path='contactanos' element={ <ContactUs /> } />
              {/*<Route path='catalogo' element={ <Catalogo /> } />*/}
              <Route path='catalogo/:cat' element={ <Catalogo /> } />
              <Route path='inicio_sesion' element={ <Login/> }/>
              <Route path='/configuracion/seguridad' element={ <ChangePass />}/>
          </Routes>
      </>
    );
}