import {React, useEffect, useState } from "react";
import "./_header.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { products, Alias } from '../../api';
import { getGlobal } from "../../globals/globals";
import secureLocalStorage from "react-secure-storage";
import { useTheContext } from "../../TheProvider";

export function Header() {

    const location = useLocation()    
    // const [ pro , setpro ] = useState('');//products
    // const [ alias , setAlias ] = useState('');
    const [toProducts, setToProducts] = useState(location.pathname==='/productos' ? true : false);
    const navigate = useNavigate()
    const { queryEnded, setQueryEnded, setSBText } = useTheContext()
    let userName = null
    //let sortedJson2

    /*Funciones para mostrar o esconder caja de texto
      cuando se hace click o se pierde el focus de la caja
    */

    useEffect(() => {        
        uploadProducts({
            "logged": false
        })
        // eslint-disable-next-line
    }, [])

    useEffect(() => {        
        if (queryEnded && toProducts) {
            /*filterProduct(theText)
            navigate('/productos',{state:{products: sortedJson2}});*/
            navigate('/productos');
            console.log('query endedjsjs');
            setToProducts(false)
        }
        // eslint-disable-next-line
    }, [queryEnded]);

    const uploadProducts = async()=>{
        setQueryEnded(false)
        const productsList = await products({
            //"logged": false//getGlobal('isLogged')
            "CodUser": '493'
        })
        const aliasList = await Alias()
        //setpro(productsList)
        secureLocalStorage.setItem('productsList', JSON.stringify(productsList))
        secureLocalStorage.setItem('aliasList', JSON.stringify(aliasList))
        //setAlias(aliasList)
        setSBText('pruebajsjs1')
        setQueryEnded(true)
    }

    /*const filterProduct = async (text) => {
        //Searh the list of products that includes the text, either because it is in the "products" table or in the "alias" table        
        let proData = pro; //The whole table "products".        
        let aliasData = alias; //The whole table "alias".
        //If Category is different to empty then select only the productos with that category
        try {
            if (category !== '') {
                proData = pro.filter(item => item.Categoria.toLowerCase() === category.toLowerCase());
                aliasData = alias.filter(item => item.Categoria.toLowerCase() === category.toLowerCase());
            }
            // Define a case-insensitive text filter function
            const filterByText = (item) =>
            item.Cod.toLowerCase().includes(text) ||
            item.Descripcion.toLowerCase().includes(text);
            // Filter products based on the text
            const TFiltro1 = proData.filter(filterByText);
            // Filter aliases based on the text
            const TFiltro2 = aliasData.filter((item) => item.Alias.toLowerCase().includes(text));
            // Extract unique cod values from aliasData
            const CodAlias = [...new Set(TFiltro2.map((item) => item.Cod))];
            // Filter products based on unique cod values
            const aliasProducts = proData.filter((item) => CodAlias.includes(item.cod));
            // Extract unique cod values from aliasProducts
            //const uniqueAliasProducts = [...new Set(aliasProducts.map((item) => item.cod))];
            // Combine the unique cod values from TFiltro1 and aliasProducts
            const filtro = [...new Set([...TFiltro1, ...aliasProducts])];
            // Convert the json into an array of objects to reorder by score
            const dataArray = filtro.map((value, key) => ({ key, ...value }));
            // Order the array deppending on the score
            dataArray.sort((a, b) => b.Score - a.Scote);
            // Convert the array into a json object
            const sortedJson = JSON.stringify(dataArray);
            sortedJson2 = sortedJson
            //setFilteredProducts(sortedJson);
        } catch (error) {
            sortedJson2 = false                        
        }
    }*/
   
    if(getGlobal('isLogged')) userName = JSON.parse(secureLocalStorage.getItem('userData'))['Contacto']
    
    const searchProduct = (text) => {
        console.log(text);
        setSBText(text)
        if (text === ''){
            uploadProducts()
            // navigate('/productos',{state:{products: false}});
        }else if (text.length > 2 && queryEnded) {
            //filterProduct(text)
            //navigate('/productos',{state:{products: sortedJson2}});
            navigate('/productos');
            setToProducts(true)
        }
    }

    const handleLogOut = () =>{
        secureLocalStorage.removeItem('userData');
        window.location.href = '/'
    }

    return(
        <header style={{position: 'relative'}}>
            { (toProducts && (queryEnded === false)) ?
            <div style={{position: 'absolute', right: '0', top: '0', color: "white", backgroundColor: 'black', zIndex: '1'}}>
                cargando
            </div>
            : 
            <></>
            }            
            <div className="container-fluid px-4 g-0 cabecera">                
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
                            <li><Link to={'productos'} type="button" className="dropdown-item" onClick={()=>setToProducts(true)}>                            
                                    Productos
                                </Link>
                            </li>
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
                        { getGlobal('isLogged') ?
                            <>
                                <div className="Tit userNameHead">
                                    Bienvenido {userName}
                                </div>
                                <Link to="/carrito" type="button" className='btnCart'>
                                    <i className="bi bi-cart4"></i>
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
                                <Link type="button" className='btnCart' onClick={()=>{alert('Pailañero');}}>
                                    <i className="bi bi-cart4"></i>
                                </Link>
                                <Link to="/inicio_sesion" type="button" className='btnSignIn'>
                                    <i className="bi bi-person-circle"></i>
                                    <div>
                                        <span>Iniciar sesion</span>
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
                                <Link to="productos" type="button" className="btn btn-navBar btn-lg" onClick={()=>setToProducts(true)}>
                                    Productos
                                </Link>
                                <Link to="/catalogo/inicio" type="button" className="btn btn-navBar btn-lg">Catalogo</Link>
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
