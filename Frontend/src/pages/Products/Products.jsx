import React from "react";
import "./_Products.scss";
import { ListItem } from "../../Componentes/Carruseles/ListItem";
import arJason from "../../Assets/png/Productos/productos.json";//prueba jsjs

export function Products() {
  return (
    <>
      <section className='products'>
        <div className="productsContainer">
          {
            arJason.slice(0,arJason.length).map((item, index) =>
              <>
                <ListItem
                    key={index}
                    llave = {item.id}//Para apuntar a cada modal
                    codigo = {item.cod}
                    descripcion = {item.descripcion}
                    descripcionComp={item.descripcionCompleta}
                    logged={true}
                />
              </>
            )
          }
        </div>
      </section>
    </>
  );
}
