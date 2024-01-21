import React, { useState, useEffect } from 'react';
import "./_ChangePass.scss";

export const ChangePass = () => {

    const [validateText, setValidateText] = useState('');
    const [variableText, setVariableText] = useState('');
    const [allOk, setAllOk] = useState([false, false, false]);

    //* function to check if all values are true
    const checkAllTrue = () => {
        return allOk.every(value => value === true);
    };

    //* this effect execute when allOk changes
    useEffect(() => {        
        if (checkAllTrue()) {
            document.querySelector('.btnChPass2').removeAttribute('disabled');
        }else{
            document.querySelector('.btnChPass2').setAttribute('disabled', true);
        }
        // eslint-disable-next-line
    }, [allOk]);

    
    const thePattern = (classRev1, classRev2, classAdd) =>{//*function with repeated pattern
        let c = document.querySelector('#plbContainer')
        c.childNodes[0].classList.remove(classRev1, classRev2)
        c.childNodes[0].classList.add(classAdd)
        c.childNodes[1].classList.remove(classRev1, classRev2)
        c.childNodes[1].classList.add(classAdd)
        c.childNodes[2].classList.remove(classRev1, classRev2)
    }
    /*
    *The function below validate the password's lvl security. It changes the state passState to
    *show a message in function of the requirements. For the styles just add or remove
    *style classes. The function above is just to avoid a repeated pattern
    *the variables number and letter are boleans, validate if in thePass is at least one number
    *or letter respectively(respectivamente para los que no saben ingles jsjs)
    */    
    const handlePassInput = (thePass) => {
        var number = /\d/.test(thePass);
        var letter = /\D/.test(thePass);
        let plbContainer = document.querySelector('#plbContainer')
        let passState = ''
        if(thePass.length === 0){
            passState = ''            
            plbContainer.classList.replace('passLvlBarContainer', 'd-none')
        }else if(thePass.length >= 8){            
            if(number && letter){                
                passState = 'Contraseña segura'
                thePattern('passLvl1','passLvl2', 'passLvl3')
                plbContainer.childNodes[2].classList.add('passLvl3')
                setAllOk(prevState => [true, prevState[1], prevState[2]]);
            }else if(number){
                passState = 'Debe tener mínimo una letra'
                thePattern('passLvl1','passLvl3', 'passLvl2')
            }else if(letter){
                passState = 'Debe tener mínimo un número'
                thePattern('passLvl1','passLvl3', 'passLvl2')
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

    const handlePassMatch = () =>{
        let text = 'La contraseña no coincide'
        const theInputs = document.querySelectorAll('.chPassInput')
        if(theInputs[0].value===theInputs[1].value){
            text = ''
            setAllOk(prevState => [prevState[0], true, prevState[2]]);
        }else{
            console.log("aja")
            setAllOk(prevState => [prevState[0], false, prevState[2]]);
        }
        setVariableText(text)
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
                <div>
                    <div className="userPass">
                        <input type="passWord" className="theInput fw-bold" placeholder="Contraseña actual" 
                            aria-label="Campo para correo"
                            onChange={(e)=>{
                                if(e.target.value !== ''){
                                    setAllOk(prevState => [prevState[0], prevState[1], true]);
                                }else{
                                    setAllOk(prevState => [prevState[0], prevState[1], false]);
                                }
                            }}
                        />
                    </div>
                    <div className="userPass">
                        <i className="bi bi-key-fill keyIcon"></i>
                        <input type="password" className="chPassInput theInput fw-bold" placeholder="Contraseña nueva" 
                            aria-label="Campo para contraseña"
                            onChange={(e) => {                                
                                handlePassInput(e.target.value)
                                if (document.querySelector('#pass2').value!==''){
                                    handlePassMatch()
                                }
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
                        <input id='pass2' type="password" className="chPassInput theInput fw-bold" placeholder="Confirmar" 
                            aria-label="Confirmar contraseña"
                            onChange={(e) => {
                                if (e.target.value===''){
                                    setVariableText('')
                                }else{
                                    handlePassMatch()
                                }
                            }}
                        />
                    </div>
                    <span className='noMatch'>{variableText}</span>
                </div>
                <div className="sec2 mt-5 w-100">
                    <button className='btnChPass'>
                        Cancelar
                    </button>
                    <button className='btnChPass2' disabled>
                        Cambiar Contraseña
                    </button>
                </div>
            </div>
        </section>
    );
}
