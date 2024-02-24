import React from 'react';
import './_TheProfile.scss'
import { useNavigate } from 'react-router-dom';

export const TheProfile = () => {
    const navigate = useNavigate()
    return (
        <section className='py-5 d-flex justify-content-center'>
            <div className="grayContainer profile">
                <div className='tuercaContainer profile'>
                    <i className="bi bi-hexagon-fill hexagon profile"></i>
                    <i className="bi bi-person-circle userLogo profile"></i>
                </div>
                <div className='userData'>
                    <div className='Tit' style={{marginBottom: '20px'}}>
                        {/*HardwareStore name*/}Deposito de vainas y Ferreteria El Emperador
                    </div>
                    <div className='subTit' style={{marginBottom: '20px'}}>
                        <strong>Encargado:</strong><br/>
                        {/*Onwers name*/}Clementino Arnulfo Kaka Lopera II
                    </div>
                    <div className='subTit' style={{marginBottom: '20px'}}>
                        <strong>e-mail:</strong><br/>
                        {/*email*/}cadolfokl2do@gmail.com
                    </div>
                    <div className='subTit' style={{marginBottom: '20px'}}>
                        <strong>Asesor:</strong><br/>
                        {/*Seller*/}Derwin Morales
                    </div>
                    <div className='subTit' style={{marginBottom: '20px'}}>
                        <strong>Direccion:</strong><br/>
                        {/*Adress*/}Cra. 77 # 11-11 Barrio Egipto
                    </div>
                    <div className='subTit' style={{marginBottom: '20px'}}>
                        <strong>Numero:</strong><br/>
                        {/*Number*/}3197777777
                    </div>
                </div>
                <div className='btn-container1'>
                    <button className='btnStlGen profile' onClick={() => navigate('/configuracion/seguridad')}>
                        Cambiar Contraseña
                    </button>
                    <button className='btnStlGen profile'>
                        Actualizar <br/>datos
                    </button>
                </div>
            </div>
        </section>
    );
}