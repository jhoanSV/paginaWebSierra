import {useState, React} from 'react';
import "./_Login.scss";
import { validateUser } from '../../api';

export const Login = () => {
    const [userEmail, setUserEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const LogIn = async () =>{
        /* validate if the userEmail and the ppassword matches with the information in the database*/
        const userData = await validateUser({
            "EmailUser": userEmail,
            "Password": password
        })
        console.log(userData)
        if (userData.hasOwnProperty('Cod')){
            //autorizado
            console.log('authorized', userData)
        } else if (userData.hasOwnProperty('error')){
            // no autorizado
            console.log('unauthorized')
            console.log(userData)
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
                                console.log(e)
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
                        <input type="password" className="theInput fw-bold" placeholder="Contraseña" 
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
                        <span className='fw-bold'>Olvidé mi contraseña</span>
                    </div>                        
                </div>
                <div className="mt-5 w-100">
                    <div className='d-flex justify-content-between toDirCol'>
                        <div>
                            <input type='checkbox' className='theCheck'
                            />
                            <span className='ms-3'>Recordar datos</span>
                        </div>
                        <span>Registrarme</span>
                    </div>
                    <button className='btnStlGen btnLogin' onClick={()=>{
                        localStorage.NoSeXD = 'alguien ayudemeeee duh'
                    }}>
                        Iniciar sesion
                    </button>
                </div>
            </div>            
        </section>
    );
}