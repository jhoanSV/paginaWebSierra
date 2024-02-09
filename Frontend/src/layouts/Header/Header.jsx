import {React, useEffect ,useState } from "react";
import "./_header.scss";
import { Link } from "react-router-dom";
import { products, Alias } from '../../api';

export function Header() {
    const [ pro , setpro ] = useState('');
    const [ alias , setAlias ] = useState('');
    const [ filteredProducts , setFilteredProducts ] = useState('');
    const [ category, setCategory] = useState('');
    const [ pCategory, setPCategory ] = useState('');
    const [ alCategory, setAlCategory ] = useState('');
    /*Funciones para mostrar o esconder caja de texto
      cuando se hace click o se pierde el focus de la caja
    */

    useEffect(() => {
        uploadProducts({
            "logged": false
        })
    }, [])

    const uploadProducts = async()=>{
        const productsList = await products({
            "logged": false
        })
        const aliasList = await Alias()
        setpro(productsList)
        setAlias(aliasList)
    }


    const productByCategory = (category) => {
        const proData = pro;
        const aliasData = alias;
        //const proCategory = proData.Categoria.toLowerCase().
        //const aliasCategory = aliasData.Categoria.
        setPCategory(proCategory)

    }

    const filterProduct = async (text) => {
        /*Searh the list of products that includes the text, either because it is in the "products" table or in the "alias" table */
        const proData = pCategory; //The whole table "products".
        const aliasData = alias; //The whole table "alias".
        // Define a case-insensitive text filter function
        const filterByText = (item) =>
          item.cod.toLowerCase().includes(text) ||
          item.Descripcion.toLowerCase().includes(text);
        // Filter products based on the text
        const TFiltro1 = proData.filter(filterByText);
        // Filter aliases based on the text
        const TFiltro2 = aliasData.filter((item) => item.Alias.toLowerCase().includes(text));
        // Extract unique cod values from aliasData
        const CodAlias = [...new Set(TFiltro2.map((item) => item.cod))];
        // Filter products based on unique cod values
        const aliasProducts = proData.filter((item) => CodAlias.includes(item.cod));
        // Extract unique cod values from aliasProducts
        const uniqueAliasProducts = [...new Set(aliasProducts.map((item) => item.cod))];
        // Combine the unique cod values from TFiltro1 and aliasProducts
        const filtro = [...new Set([...TFiltro1, ...uniqueAliasProducts])];
    
        // Convert the json into an array of objects to reorder by score
        const dataArray = filtro.map((value, key) => ({ key, ...value }));
    
        // Order the array deppending on the score
        dataArray.sort((a, b) => b.Score - a.Scote);
    
        // Convert the array into a json object
        const sortedJson = JSON.stringify(dataArray);
        setFilteredProducts(sortedJson);
        console.log(sortedJson)
      };
    
    const searchProduct = (text) => {
        if (text === ''){
            uploadProducts()
        } else {
            filterProduct(text)
            console.log(filteredProducts)
        }
    }

    return(
        <header>
            <div className="container-fluid px-4 g-0 cabecera">
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
                            <li><Link to={'productos'} type="button" className="dropdown-item" state={{ bookM: `INICIO`}}>
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
                                    searchProduct(e.target.value)
                                }}
                            />
                            <i className="bi bi-search"></i>
                        </div>
                    </div>

                    <div className="col user">
                        <Link to="/inicio_sesion" type="button">
                            <i className="bi bi-cart4"></i>
                        </Link>
                        <Link to="/inicio_sesion" type="button">
                            <div className='btnSignIn'>
                                <i className="bi bi-person-circle"></i>
                                <div>
                                    <span>Iniciar sesion</span>
                                </div>
                            </div>
                        </Link>
                    </div>

                </div>

                <div className="row">
                    <div className="col">
                        <div className="buscar mob" style={{height: 'min-content', position: 'relative'}}>
                            <input type='text' placeholder='Buscar producto'
                            />
                            <i className="bi bi-search"></i>
                        </div>
                        <div className="grupoBotones">
                            <div className="btn-group g1 flex-wrap">{/*Buttons group of the main view (computer)*/}
                                <Link to="/" type="button" className="btn btn-navBar btn-lg">Inicio</Link>
                                <Link to="productos" type="button" className="btn btn-navBar btn-lg" state={{ bookM: `INICIO`}}>
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
        </header>       
    );
}
