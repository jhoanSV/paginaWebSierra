import React from "react";
import "./_Products.scss";
import { ListItem } from "../../Componentes/Others";
import arJason from "../../Assets/png/Productos/productos.json";//prueba jsjs
import { useLocation } from "react-router-dom";

export function Products() {
  
  const location = useLocation()
  const proFilter = location.state.products
  let lista
  if (proFilter) {
    lista = JSON.parse(proFilter)
  }else{
    lista = arJason
  }
  if (Object.keys(lista).length === 0){
    console.log("aaaaa");
  }

  return (
    <>
      <section className='products'>
        <div className="productsContainer">
          { 
            lista.slice(0,lista.length).map((item, index) =>
              <ListItem
                key={index}
                llave = {index}//Para apuntar a cada modal
                codigo = {item.cod}
                descripcion = {item.Descripcion}
                descripcionComp={item.Detalle}
                unitPrice={item.PVenta}
                unitPaq={item.EsUnidadOpaquete}
                category={(item.Categoria).toLowerCase()}
                agotado={item.Agotado}
                lista={arJason}
              />
            )
          }
        </div>
      </section>
    </>
  );
}
