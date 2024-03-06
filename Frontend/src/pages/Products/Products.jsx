import React from "react";
import "./_Products.scss";
import { ListItem } from "../../Componentes/Others";
//import arJason from "../../Assets/png/Productos/productos.json";//prueba jsjs
import { useLocation } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

export function Products() {
  
  const location = useLocation()
  let theProducts
  let limit//mientras

  if(location.state.products){
    theProducts = JSON.parse(location.state.products)
    limit = theProducts.length
  }else{
    theProducts = JSON.parse(secureLocalStorage.getItem('productsList'))
    limit = 10
  }
  let lista = theProducts;
  console.log(limit);
  if (Object.keys(lista).length === 0){
    console.log("aaaaa");
  }

  return (
    <>
      <section className='products'>
        <div className="productsContainer">
          { 
            lista.slice(0,limit).map((item, index) =>
              <ListItem
                key={index}
                llave = {index}//Para apuntar a cada modal
                codigo = {item.Cod}
                descripcion = {item.Descripcion}
                descripcionComp={item.Detalle}
                unitPrice={item.PVenta}
                unitPaq={item.EsUnidadOpaquete}
                category={(item.Categoria).toLowerCase()}
                agotado={item.Agotado}
                lista={lista}
              />
            )
          }
        </div>        
      </section>
    </>
  );
}
