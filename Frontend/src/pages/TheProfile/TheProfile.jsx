import React from 'react';
import './_TheProfile.scss'
import { useNavigate } from 'react-router-dom';
import { useTheContext } from '../../TheProvider';
import secureLocalStorage from 'react-secure-storage';

export const TheProfile = () => {
    const { logged } = useTheContext()
    const navigate = useNavigate()
    return (
        <section className='py-5 d-flex justify-content-center'>            
            { logged ?
                <div className="grayContainer profile">
                    <div className='tuercaContainer profile'>
                        <i className="bi bi-hexagon-fill hexagon profile"></i>
                        <i className="bi bi-person-circle userLogo profile"></i>
                    </div>
                    <div className='userData'>
                        <div style={{fontSize: '2.025rem', fontWeight: 'bold', marginBottom: '20px'}}>
                            {JSON.parse(secureLocalStorage.getItem('userData'))['Ferreteria']}
                        </div>
                        <div className='subTit' style={{marginBottom: '20px'}}>
                            <strong>Encargado:</strong><br/>                            
                            {JSON.parse(secureLocalStorage.getItem('userData'))['Contacto']}
                        </div>
                        <div className='subTit' style={{marginBottom: '20px'}}>
                            <strong>e-mail:</strong><br/>
                            {JSON.parse(secureLocalStorage.getItem('userData'))['Email']}
                        </div>
                        <div className='subTit' style={{marginBottom: '20px'}}>
                            <strong>Asesor:</strong><br/>
                            {JSON.parse(secureLocalStorage.getItem('userData'))['Asesor']}
                        </div>
                        <div className='subTit' style={{marginBottom: '20px'}}>
                            <strong>Direccion:</strong><br/>
                            {JSON.parse(secureLocalStorage.getItem('userData'))['Direccion']}
                        </div>
                        <div className='subTit' style={{marginBottom: '20px'}}>
                            <strong>Numero:</strong><br/>
                            {JSON.parse(secureLocalStorage.getItem('userData'))['Telefono']}
                        </div>
                    </div>
                    <div className='btn-container1'>
                        <button className='btnStlGen profile' onClick={() => navigate('/perfil/seguridad')}>
                            Cambiar Contraseña
                        </button>
                        <button className='btnStlGen profile'>
                            Actualizar <br/>datos
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