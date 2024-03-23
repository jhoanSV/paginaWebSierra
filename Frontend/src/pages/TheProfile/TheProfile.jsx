import React from 'react';
import './_TheProfile.scss'
import { useNavigate } from 'react-router-dom';
import { getGlobal } from '../../globals/globals';
import secureLocalStorage from 'react-secure-storage';

export const TheProfile = () => {
    const navigate = useNavigate()
    return (
        <section className='py-5 d-flex justify-content-center'>            
            { getGlobal('isLogged') ?
                <div className="grayContainer profile">
                    <div className='tuercaContainer profile'>
                        <i className="bi bi-hexagon-fill hexagon profile"></i>
                        <i className="bi bi-person-circle userLogo profile"></i>
                    </div>
                    <div className='userData'>
                        <div className='Tit' style={{marginBottom: '20px'}}>
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
                <>No hay nada que ver ac&aacute; jsjs</>
            }
        </section>
    );
}