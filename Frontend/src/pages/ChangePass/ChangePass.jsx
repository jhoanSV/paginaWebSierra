import React, { useState } from 'react';
import "./_ChangePass.scss";

export const ChangePass = () => {
    
    const [validateText, setValidateText] = useState('');

    const handlePassInput = (thePass) => {
        var number = /\d/.test(thePass);
        var letter = /\D/.test(thePass);
        let plbContainer = document.querySelector('#plbContainer')
        let passState = ''
        if(thePass.length === 0){
            passState = ''            
            plbContainer.classList.replace('passLvlBarContainer', 'd-none')
        }else if(thePass.length >= 8){
            //Acá hay un patrón que se repite, revisar y optimizar
            if(number && letter){                
                passState = 'upa la lupa, que buena contra'
                plbContainer.childNodes[0].classList.remove('passLvl1', 'passLvl2')
                plbContainer.childNodes[0].classList.add('passLvl3')
                plbContainer.childNodes[1].classList.remove('passLvl1', 'passLvl2')
                plbContainer.childNodes[1].classList.add('passLvl3')
                plbContainer.childNodes[2].classList.remove('passLvl1', 'passLvl2')
                plbContainer.childNodes[2].classList.add('passLvl3')
            }else if(number){
                passState = 'Debe tener mínimo una letra'
                plbContainer.childNodes[0].classList.remove('passLvl1', 'passLvl3')
                plbContainer.childNodes[0].classList.add('passLvl2')
                plbContainer.childNodes[1].classList.remove('passLvl1', 'passLvl3')
                plbContainer.childNodes[1].classList.add('passLvl2')
                plbContainer.childNodes[2].classList.remove('passLvl1', 'passLvl3')
            }else if(letter){
                passState = 'Debe tener mínimo un número'
                plbContainer.childNodes[0].classList.remove('passLvl1', 'passLvl3')
                plbContainer.childNodes[0].classList.add('passLvl2')
                plbContainer.childNodes[1].classList.remove('passLvl1', 'passLvl3')
                plbContainer.childNodes[1].classList.add('passLvl2')
                plbContainer.childNodes[2].classList.remove('passLvl1', 'passLvl3')
            }
        }else{
            plbContainer.classList.replace('d-none', 'passLvlBarContainer')
            passState = ('Debe tener mínimo 8 catarteres y un número')
            plbContainer.childNodes[0].classList.remove('passLvl2', 'passLvl3')
            plbContainer.childNodes[1].classList.remove('passLvl2', 'passLvl3')
            plbContainer.childNodes[2].classList.remove('passLvl2', 'passLvl3')
            plbContainer.childNodes[0].classList.add('passLvl1')
        }
        setValidateText(passState)
    }

    return (
        <section className='py-5 d-flex justify-content-center'>
            <div className='grayContainer'>
                <div className='tuercaContainer'>
                    <picture>
                        <source
                            type="image/avif"
                            srcSet={require("../../Assets/avif/tuercaUsuario2.avif")}
                        />
                        <img
                            src={require("../../Assets/png/tuercaUsuario2.png")}
                            width="180px"
                            height="206px"
                            alt="tuerca"
                            decoding="async"
                        />
                    </picture>
                </div>
                <div className="sec1">
                    <div className="userPass">
                        <input type="passWord" className="theInput fw-bold" placeholder="Contraseña actual" 
                            aria-label="Campo para correo"
                        />
                    </div>
                    <div className="userPass">
                        <i className="bi bi-key-fill keyIcon"></i>
                        <input type="password" className="theInput fw-bold" placeholder="Contraseña nueva" 
                            aria-label="Campo para contraseña"
                            onChange={(e) => {                                
                                handlePassInput(e.target.value)                                
                            }}
                        />
                    </div>
                    <span>{validateText}</span>
                    <div id='plbContainer' className='d-none'>
                        <span className='passLvlBar'/>
                        <span className='passLvlBar'/>
                        <span className='passLvlBar'/>
                    </div>
                    <div className="userPass">
                        <i className="bi bi-key-fill keyIcon"></i>
                        <input type="password" className="theInput fw-bold" placeholder="Confirmar" 
                            aria-label="Confirmar contraseña"
                        />
                    </div>
                </div>
                <div className="sec2 mt-5 w-100">
                    <button className='btnStlGen btnLogin'>
                        Iniciar sesion
                    </button>
                </div>
            </div>
        </section>
    );
}
