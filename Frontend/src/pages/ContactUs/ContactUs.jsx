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
                <div className="montserratFont w-100">
                    <p className="font-19 p-3" id="mediaQ">"!Contactanos para cualquier consulta! Si buscas oportunidades de colaboración,
                        trabajar con nosotros o ser cliente, envianos un mensaje. ¡Esperamos construir juntos
                        una alianza estrategica!"</p>
                </div>

                <div className="col montserratFont">
                    <p className="font-19 p-3">"!Contactanos para cualquier consulta! Si buscas oportunidades de colaboración,
                    trabajar con nosotros o ser cliente, envianos un mensaje. ¡Esperamos construir juntos
                    una alianza estrategica!"</p>

                    <div className="iframeContainer">
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
                </div>
                
                <div className="col f100">
                    <form className="row g-3 my-3">
                        <div class="col-mb-12">
                            <label for="Nombre" className="form-label">Nombre completo:</label>
                            <input type="text" className="form-control" id="Nombre" placeholder="Nombre" required/>
                        </div>
                        <div className="col-mb-12">
                            <label for="correo" className="form-label">Correo Electrónico:</label>
                            <input type="email" className="form-control" id="correo" placeholder="Correo" />
                        </div>
                        <div className="col-mb-12">
                            <label for="celNum" className="form-label">Celular:</label>
                            <input type="number" className="form-control" id="celNum" placeholder="Celular" />
                        </div>
                        <div className="col-6">
                            <label for="soli" className="form-label">Tipo de solicitud:</label>
                            <select className="form-select" id="soli" required>
                                <option selected disabled value="Elige">...</option>
                                <option>Quiero ser cliente</option>
                                <option>Quiero ser proveedor</option>
                                <option>Trabaja con nosotros</option>
                            </select>
                        </div>
                        <div className="col-mb-12">
                            <label for="comentarios" class="form-label">Comentarios</label>
                            <textarea class="form-control" id="comentarios" rows="3"></textarea>
                        </div>

                        <div>
                            <a className="boton" id="btn-submit" href="comentarios">
                                <span className="font-19">Enviar</span>
                            </a>
                        </div>
                    </form>

                </div>
            </div>
        </div>

    
    </>
  )
}
