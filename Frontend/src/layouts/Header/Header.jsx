import {React, useEffect, useRef } from "react";
import "./_header.scss";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { products, Alias } from '../../api';
import secureLocalStorage from "react-secure-storage";
import { useTheContext } from "../../TheProvider";

export function Header() {
    const cabecera = useRef()
    const userNameHead = useRef()
    const navigate = useNavigate()
    const { setQueryEnded, setSBText, logged, nItemsCart } = useTheContext()
    const location = useLocation()
    let userName = null

    /*Funciones para mostrar o esconder caja de texto
      cuando se hace click o se pierde el focus de la caja
    */    

    const uploadProducts = async()=>{

        let theCodeUser = ''

        if(secureLocalStorage.getItem('userData')){
            theCodeUser = JSON.parse(secureLocalStorage.getItem('userData'))['Cod']
        }

        const productsList = await products({
            "CodUser": theCodeUser
        })
        const aliasList = await Alias()
        secureLocalStorage.setItem('productsList', JSON.stringify(productsList))
        secureLocalStorage.setItem('aliasList', JSON.stringify(aliasList))
        setQueryEnded(true)
    }
   
    if(logged) userName = JSON.parse(secureLocalStorage.getItem('userData'))['Ferreteria']
    
    const searchProduct = (text) => {
        //console.log(text);
        setSBText(text)        
        if (text === ''){
            setQueryEnded(false)
            uploadProducts()
        }else{
            navigate('/productos');
        }
    }

    const handleLogOut = () =>{
        secureLocalStorage.removeItem('userData');
        window.location.href = '/'
    }

    window.onscroll = function() {
        if (location.pathname==='/productos') {
            if (window.scrollY > (cabecera.current.offsetHeight)) {
                cabecera.current.classList.add('sticky')
                document.querySelector('.products').style.paddingTop = (cabecera.current.offsetHeight * 2) + 'px'
                return
            } else {
                cabecera.current.classList.remove('sticky')
                document.querySelector('.products').style.paddingTop = ''
                return
            }
        }else{
            cabecera.current.classList.remove('sticky')
        }
        if((location.pathname==='/carrito') && window.innerWidth < 900){
            if (window.scrollY > (cabecera.current.offsetHeight)) {
                cabecera.current.classList.add('sticky')
                document.querySelector('.theCart').style.paddingTop = (cabecera.current.offsetHeight * 2) + 'px'
            } else {
                cabecera.current.classList.remove('sticky')
                document.querySelector('.theCart').style.paddingTop = ''
            }            
        }else{
            cabecera.current.classList.remove('sticky')            
        }
    };

    useEffect(() => {
        uploadProducts()
        // eslint-disable-next-line
    }, [])
    
    useEffect(() => {
        if(logged && ((11 + (userName.length)) > (userNameHead.current.clientWidth / 10))){
            //console.log('se desborda');
        }
        // eslint-disable-next-line
    }, [logged]);
    
    //if(location.pathname ===)

    return(
        <header style={{position: 'relative'}}>
            <div id='theHeader' className="container-fluid px-4 g-0 cabecera" ref={cabecera}>
                <picture>
                    <source
                        type="image/avif"
                        srcSet={require("../../Assets/avif/HeaderPrincipal.avif")}
                        />
                    <img
                        src={require("../../Assets/png/HeaderPrincipal.png")}
                        alt="header"
                        decoding="async"
                        className='backImg'
                        />
                </picture>
                <div className="row position-relative">
                    <div className="col g2">{/*Buttons group of the mobile*/}
                        <button className="menuNav" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="bi bi-list"></i>
                        </button>
                        <div className="logo mob">
                            <Link to="/" type="button">
                                <picture>
                                    <source
                                        type="image/avif"
                                        srcSet={require("../../Assets/avif/LogoSivar.avif")}
                                        />
                                    <img
                                        src={require("../../Assets/png/LogoSivar.png")}
                                        width="2207px"
                                        height="839px"
                                        alt="LogoSierra"
                                        decoding="async"
                                        />
                                </picture>
                            </Link>
                        </div>
                        <ul className="dropdown-menu">
                            <li><Link to="/" type="button" className="dropdown-item">Inicio</Link></li>
                            <li><Link to={'productos'} type="button" className="dropdown-item">
                                    Productos
                                </Link>
                            </li>
                            <li><Link to="/catalogo/1" type="button" className="dropdown-item">Catalogo</Link></li>
                            <li><Link to="/nosotros" type="button" className="dropdown-item">Quienes somos</Link></li>
                            <li><Link to="/contactanos" type="button" className="dropdown-item">Contactanos</Link></li>
                        </ul>
                    </div>

                    <div className="col logo">
                        <Link to="/" type="button">
                            <picture>
                                <source
                                    type="image/avif"
                                    srcSet={require("../../Assets/avif/LogoSivar.avif")}
                                />
                                <img
                                    src={require("../../Assets/png/LogoSivar.png")}
                                    width="2207px"
                                    height="839px"
                                    alt="LogoSierra"
                                    decoding="async"
                                />
                            </picture>
                        </Link>
                    </div>

                    <div className="col buscar">
                        <div style={{height: 'min-content', position: 'relative'}}>
                            <input type='text' 
                                placeholder='Buscar producto'
                                onChange={(e) => {
                                    searchProduct((e.target.value).toLowerCase())
                                }}
                            />
                            <i className="bi bi-search"></i>
                        </div>
                    </div>

                    <div className="col user">
                        { logged ?
                            <>
                                <div className="userNameHead" ref={userNameHead}>
                                    <label>
                                        Bienvenido {userName}
                                    </label>
                                </div>
                                <Link to="/carrito" type="button" className='btnCart'>
                                    <i className="bi bi-cart4"></i>
                                    
                                    { (nItemsCart!==0) &&
                                        <span className='floatingNumber'>{nItemsCart}</span>
                                    }
                                </Link>
                                <div type="button" className='userIcon' data-bs-toggle="dropdown">
                                    <i className="bi bi-hexagon-fill userHex"></i>
                                    <div className="userText">
                                        <span>{userName[0].toUpperCase()}</span>
                                    </div>
                                </div>
                                <ul className="dropdown-menu">
                                    <li><Link to="/perfil" type="button" className="dropdown-item">Perfil</Link></li>
                                    <li><div type="button" className="dropdown-item" data-bs-toggle="modal" data-bs-target='#VerifyLogOut'>Cerrar sesion</div></li>
                                </ul>
                            </>
                            :
                            <>
                                <Link to="/carrito" type="button" className='btnCart'>
                                    <i className="bi bi-cart4"></i>
                                </Link>
                                <Link to="/inicio_sesion" type="button" className='btnSignIn'>
                                    <i className="bi bi-person-circle"></i>
                                    <div>
                                        <span className="SignInSpan">Iniciar sesion</span>
                                    </div>
                                </Link>
                            </>
                        }
                    </div>

                </div>

                <div className="row">
                    <div className="col">
                        <div className="buscar mob" style={{height: 'min-content', position: 'relative'}}>
                            <input type='text' placeholder='Buscar producto'
                                onChange={(e) => {
                                    searchProduct((e.target.value).toLowerCase())
                                }}
                            />
                            <i className="bi bi-search"></i>
                        </div>
                        <div className="grupoBotones">
                            <div className="btn-group g1 flex-wrap">{/*Buttons group of the main view (computer)*/}
                                <Link to="/" type="button" className="btn btn-navBar btn-lg">Inicio</Link>
                                <Link to="productos" type="button" className="btn btn-navBar btn-lg">
                                    Productos
                                </Link>
                                <Link to="/catalogo/1" type="button" className="btn btn-navBar btn-lg">Catalogo</Link>
                                <Link to="/nosotros" type="button" className="btn btn-navBar btn-lg">Quienes somos</Link>
                                <Link to="/contactanos" type="button" className="btn btn-navBar btn-lg">Contactanos</Link>
                            </div>
                        </div>                        
                    </div>
                </div>
            </div>
            <div className="modal fade" id='VerifyLogOut' tabIndex="-1" aria-labelledby="veriLogout" aria-hidden="true">
                <div className="modal-dialog modal-sm">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">¿Desea cerrar sesi&oacute;n?</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-primary"
                                data-bs-dismiss="modal"
                                onClick={handleLogOut}
                            >Aceptar</button>
                        </div>
                    </div>
                </div>
            </div>
        </header>       
    );
}
