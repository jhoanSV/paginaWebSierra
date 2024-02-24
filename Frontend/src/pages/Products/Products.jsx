import React from "react";
import "./_Products.scss";
import { ListItem } from "../../Componentes/Others";
import arJason from "../../Assets/png/Productos/productos.json";//prueba jsjs

export function Products() {
  return (
    <>
      <section className='products'>
        <div className="productsContainer">
          {
            arJason.slice(0,arJason.length).map((item, index) =>
              <ListItem
                key={index}
                llave = {index}//Para apuntar a cada modal
                codigo = {item.Cod}
                descripcion = {item.Descripcion}
                descripcionComp={item.Detalle}
                unitPrice={item.Pventa}
                unitPaq={item.EsUnidadOpaquete}
                category={(item.Categoria).toLowerCase()}
                agotado={item.Agotado}
              />
            )
          }
        </div>
      </section>
    </>
  );
}
