import React, { useState, useEffect } from 'react';
import "./_ChangePass.scss";
import { Changepassword } from '../../api';
import { useTheContext } from '../../TheProvider';
import { useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';

export const ChangePass = () => {

    const [validateText, setValidateText] = useState('');
    const [variableText, setVariableText] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [allOk, setAllOk] = useState([false, false, false]);
    const [btnDis3, setBtnDis3] = useState(true);
    const { logged } = useTheContext()
    const navigate = useNavigate()

    //* function to check if all values are true
    const checkAllTrue = () => {
        return allOk.every(value => value === true);
    };    

    const toChangePassword = async() =>{
        /*Funtion to check if the user is alowed to change the password*/
        const dataChangePassword = await Changepassword({
            "CodUser": JSON.parse(secureLocalStorage.getItem('userData'))['Cod'],
            "Password": currentPassword,
            "NewPassword": newPassword
        })
        //console.log(dataChangePassword);
        if (dataChangePassword.hasOwnProperty('authorization') && dataChangePassword.authorization === 'Authorized'){
            //password changed
            //console.log('authorized', dataChangePassword)
            alert('Contraseña modificada correctamente')
            secureLocalStorage.removeItem('userData')
            window.location.href = '/inicio_sesion'
        } else if (dataChangePassword.hasOwnProperty('error') && dataChangePassword.error === 'Unauthorized'){
            //password not changed
            //console.log('unauthorized', dataChangePassword)
            alert('No se pudo cambiar la contraseña, intente de nuevo más tarde');
        }
    }


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
            setAllOk(prevState => [prevState[0], false, prevState[2]]);
        }
        setVariableText(text)
    }

    //* this effect execute when allOk changes
    useEffect(() => {
        if (checkAllTrue()) {
            setBtnDis3(false)
        }else if (logged){
            setBtnDis3(true)
        }
        // eslint-disable-next-line
    }, [allOk]);

    return (
        <section className='py-5 d-flex justify-content-center'>
            { logged ?
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
                                        setCurrentPassword(e.target.value);
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
                                    setNewPassword(e.target.value);
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
                        <button className='btnChPass2' disabled={btnDis3} onClick={()=>{toChangePassword()}}>
                            Cambiar Contraseña
                        </button>
                    </div>
                </div>
            :
                <div className='goLogin'>
                    <div style={{fontSize: '2rem', fontWeight: '600', textAlign: 'center'}}>
                        Inicia sesi&oacute;n para usar esta carater&iacute;stica
                    </div>
                    <div className='hexContainer'>
                        <i className="bi bi-hexagon-fill hexagon"></i>
                        <i className="bi bi-question-circle userLogo"></i>
                    </div>
                    <button className="goLoginBtn boton" onClick={() => {navigate('/inicio_sesion')}}>
                        Iniciar sesion
                    </button>
                </div>
            }
        </section>
    );
}
