import {useState, useRef, React} from 'react';
import "./_Login.scss";
import { validateUser } from '../../api';
import { useNavigate } from 'react-router';
import secureLocalStorage from 'react-secure-storage';
import { resolve } from 'path-browserify';

export const Login = () => {
    const [userEmail, setUserEmail] = useState('')
    const [password, setPassword] = useState('')
    const passInput = useRef()

    const navigate = useNavigate()
    
    const LogIn = async () =>{
        /* validate if the userEmail and the ppassword matches with the information in the database*/
        // const userData = await validateUser({
        //     "EmailUser": userEmail,
        //     "Password": password
        // })
        /*
        Cel : "123456789"
        Cod : 493
        Contacto : "don prueba"
        Direccion : "123456789"
        Email : "pruebausuario1@gmail.com"
        Ferreteria : "prueba contraseña 2"
        Telefono : "123456789"
        */
       await new Promise(resolve => setTimeout(resolve, 5000))       
       const userData = JSON.parse('{"Cel" : "123456789", "Cod" : 493, "Contacto" : "don prueba", "Direccion" : "123456789", "Email" : "pruebausuario1@gmail.com", "Ferreteria" : "prueba contraseña 2", "Telefono" : "123456789"}')
       console.log((userData));
        try {
            if (userData.hasOwnProperty('Cod')){
                //autorizado
                console.log('authorized')
                secureLocalStorage.setItem('userData', JSON.stringify(userData))
                window.location.href = '/'
            } else if (userData.hasOwnProperty('error')){
                // no autorizado
                console.log('unauthorized')
                alert('unauthorized')
            }
        } catch (error) {
            alert('Se ha superado el tiempo de espera')
        }
    }

    const togglePass = () =>{
        if (passInput.current.type === "password") {
            passInput.current.type = "text";
        } else {
            passInput.current.type = "password";
        }
    }
    
    return (
        <section className='py-5 d-flex justify-content-center'>
            <div className="grayContainer">
                <div className='tuercaContainer'>
                    <i className="bi bi-hexagon-fill hexagon"></i>
                    <i className="bi bi-person-circle userLogo"></i>
                </div>
                <div>
                    <div className="userEmail">
                        <i className="bi bi-envelope-fill"></i>
                        <input type="text" className="theInput fw-bold" placeholder="Correo" 
                            aria-label="Campo para correo"
                            onChange={(e) => {
                                e.target.classList.remove('fw-bold')
                                setUserEmail(e.target.value)
                            }}
                            onBlur={(e) => {
                                if ((e.target.value) === ''){
                                    e.target.classList.add('fw-bold')
                                }                                
                            }}
                        />
                    </div>
                    <div className="userPass">
                        <i className="bi bi-lock-fill"></i>
                        <input type="password" className="theInput fw-bold" placeholder="Contraseña" ref={passInput}
                            aria-label="Campo para contraseña"
                            onChange={(e) => {
                                e.target.classList.remove('fw-bold')
                                setPassword(e.target.value)
                            }}
                            onBlur={(e) => {
                                if ((e.target.value) === ''){
                                    e.target.classList.add('fw-bold')
                                }                                
                            }}
                        />
                    </div>
                    <div className="mt-2">
                        <span className='fw-bold logText' role='button'
                            onClick={()=>alert('Si has olvidado la contraseña comunicate con administracion con el icono de whatsapp ubicado en la parte inferior derecha')}>
                            Olvid&eacute; mi contraseña
                        </span>
                    </div>                        
                </div>
                <div className="mt-5 w-100">
                    <div className='d-flex justify-content-between toDirCol'>
                        <div>
                            <input type='checkbox' className='theCheck' onChange={()=>{togglePass()}}/>
                            <span className='ms-3 logText'>Mostrar contraseña</span>
                        </div>
                        <a href='https://wa.me/573134237538?text=Cordial%20saludo%2C%20tengo%20interes%20en%20registrarme%20en%20sivar.com.co'
                            style={{textDecoration: 'none'}} target="_blank" rel="noreferrer">
                            <span className='logText'>
                                Registrarme
                            </span>
                        </a>
                    </div>
                    <button className='btnStlGen btnLogin' onClick={()=>{
                        LogIn()
                    }}>
                        Iniciar sesion
                    </button>
                </div>
            </div>            
        </section>
    );
}