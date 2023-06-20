import React from "react";
import "./_ListItem.scss";
import { Link } from "react-router-dom";

export const ListItem=({llave, codigo, descripcion, descripcionComp})=>{




    return(
        //src={require(`../../Assets/jpg/Promociones/${data[0].cod}.jpg`)}
        <>
            
            <div className="caja" data-bs-toggle="modal" data-bs-target={`#producto${llave}`}>
                
                <div className="row">
                    <div className="col h-100">
                        <div className="row row-cols-1 g-0">

                            <div className="col imgProducto">
                                <img
                                    src={require(`../../Assets/jpg/productosJpg/${codigo}.png`)}
                                    alt="img de producto"
                                />
                            </div>

                            <div className="col">
                                <div className="descFont titleFont">{descripcion}</div>
                                <div className="codFont">{codigo}</div>
                            </div>

                        </div>                        
                    </div>
                </div>
                
            </div>

            <div className="modal fade" id={`producto${llave}`} tabIndex="-1" aria-labelledby="productoLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 d-block" id="productolLabel">
                                {descripcion}<br/>
                                <span className="codigo">Cod: {codigo}</span>
                            </h1>                            
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="imgModal">
                                <img
                                    src={require(`../../Assets/jpg/productosJpg/${codigo}.png`)}
                                    alt="img de producto"
                                />
                            </div>
                            <div className="genFont">
                                <strong>Descripcion:</strong><br/>
                                {descripcionComp}.
                                <br/>
                                <div class="modal-footer" data-bs-dismiss="modal">
                                    <Link to={'catalogo'} state={{ bookM: `INICIO`}}>
                                        Mas productos
                                    </Link>
                                </div>
                            </div>                            
                        </div>
                    </div>
                </div>
            </div>
        </>
        
    );
}