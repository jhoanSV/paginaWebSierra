import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Home, Products, About, Privacy, Catalogo, ContactUs, Login,
    ChangePass,
    TheProfile,
    TheCart,
    Specials,
    SpecialCat
} from "../pages";
import { ModalProductDesk/*, ModalProductMob*/, ModarSuccessfulSubmission } from '../Componentes/Modals';
import ReactGA from 'react-ga4'; // Usa react-ga4 en lugar de react-ga

const GA_TRACKING_ID = "G-X11YSX874T"; // Reemplaza con tu ID de medición de GA4

export function Navigation() {
  const location = useLocation();

  useEffect(() => {
      ReactGA.initialize(GA_TRACKING_ID);
  }, []);

  useEffect(() => {
      ReactGA.send({ hitType: "pageview", page: location.pathname });
  }, [location]);

    return (
      <>
          <Routes>
              <Route path='/' element={ <Home /> } />
              <Route path='productos' element={<Products />}>
                <Route path=':id' element={<ModalProductDesk />} />
              </Route>
              <Route path='especiales' element={<Specials/>} />
              <Route path='nosotros' element={ <About /> } />
              <Route path='politicas_privacidad' element={ <Privacy /> } />
              <Route path='contactanos' element={ <ContactUs /> } />
              <Route path='catalogo' element={ <Catalogo /> }>
                <Route path=':pag' element={<Catalogo />} />
              </Route>
              <Route path=':espId' element={ <SpecialCat/> }/>
              <Route path='inicio_sesion' element={ <Login/> }/>
              <Route path='perfil' element={ <TheProfile/> }/>
              <Route path='/perfil/seguridad' element={ <ChangePass />}/>
              <Route path='carrito' element={ <TheCart/>}>
                <Route path='sended' element={ <ModarSuccessfulSubmission/> }/>
              </Route>
          </Routes>
      </>
    );
}