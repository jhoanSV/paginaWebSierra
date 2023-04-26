import React, { useEffect } from 'react';
import "./_About.scss";

export function About() {

    useEffect(() => {

        const qSomosDiv = document.querySelector(".qSomos");
        qSomosDiv.classList.add("anima-Entrada");

    }, []);

    return (
        <>
            <div className="about">
                <div className="row">
                    <div className="col">
                        
                        <div>
                            <div className="col log-anima d-flex justify-content-center">

                                <video 
                                    width="100%"
                                    height="auto"
                                    src={require("../../Assets/mp4/ArtemisUjuu.mp4")}
                                    autoPlay
                                    muted
                                />

                            </div>
                        </div>

                        <div className="qSomos montserratFont">
                            
                                <h1>¿Quienes Somos?</h1>
                                <p className="font-19">Somos una empresa colombiana con más de 6 Años de experiencia en la
                                 industria ferretera con el objetivo de impulsar, fomentar y apoyar al sector ferretero desde la industria nacional
                                  e internacional comercializando productos y servicios basándonos en su calidad, respaldo y eficiencia.<br/><br/>
                                Convirtiéndonos en Aliados estratégicos desde la innovación tecnológica y logística buscando que el sector ferretero 
                                impulse su proceso de desarrollo empresarial y transformación digital.</p>

                        </div>

                    </div>
                </div>
            </div>

        </>
    );
}
