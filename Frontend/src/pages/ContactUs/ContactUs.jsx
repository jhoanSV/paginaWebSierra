import React from "react";
import "./_ContactUs.scss";

let source = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1406.0504614273996!2d-74.14007727913986!3d4.609903384101687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9ff5a9978939%3A0x9b8ad5e6002dd166!2sFerredistribuciones%20Sierra!5e0!3m2!1sen!2sco!4v1684385776029!5m2!1sen!2sco";

export function ContactUs() {
  return (
    <>
        <div className="ctnUs">
            <div className="titulo">
                <h1>Contactanos</h1>
            </div>
            <div className="row row-cols-2 gy-2">
                <div className="col montserratFont">
                    <p className="font-19 p-3">"!Contactanos para cualquier consulta! Si buscas oportunidades de colaboración,
                    trabajar con nosotros o ser cliente, envianos un mensaje. ¡Esperamos construir juntos
                    una alianza estrategica!"</p>

                    <iframe src={source}
                        id="mapaSierra"
                        title="mapa"
                        width="600"
                        height="600"
                        allowFullScreen="" 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                    />            
                </div>
                <div className="col">

                </div>
            </div>
        </div>

    
    </>
  )
}
