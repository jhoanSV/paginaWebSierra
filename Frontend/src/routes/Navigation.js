import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, Products, About, Privacy, Catalogo, ContactUs, Login,
    ChangePass,
    TheProfile,
    TheCart
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
              <Route path='catalogo/:cat' element={ <Catalogo /> } />
              <Route path='inicio_sesion' element={ <Login/> }/>
              <Route path='perfil' element={ <TheProfile/> }/>
              <Route path='/configuracion/seguridad' element={ <ChangePass />}/>
              <Route path='carrito' element={ <TheCart/>}/>
          </Routes>
      </>
    );
}