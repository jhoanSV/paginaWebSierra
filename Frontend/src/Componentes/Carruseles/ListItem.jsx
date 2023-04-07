import React from "react";
import "./_ListItem.scss";

export const ListItem=({codigo, descripcion})=>{




    return(
        //src={require(`../../Assets/jpg/Promociones/${data[0].cod}.jpg`)}
        <>
            
            <div className="caja p-4" data-bs-toggle="modal" data-bs-target="#producto">
                
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
                                <div className="descFont montserratFont">{descripcion}</div>
                                <div className="codFont">Cod: {codigo}</div>
                            </div>

                        </div>                        
                    </div>
                </div>
                
            </div>

            <div class="modal fade" id="producto" tabindex="-1" aria-labelledby="productoLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="productolLabel">Descripción</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div>Precio:</div>
                            <div>$ 5800</div>
                            <div>cantidad: </div>
                            <div>-  1  +</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
        
    );
}