import React, { useEffect, useState } from "react";
import "./_Products.scss";
import { ListItem } from "../../Componentes/Others";
import arJason from "../../Assets/png/Productos/productos.json";//prueba jsjs
import { useLocation } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

export function Products() {
  
  const [variable, setVariable] = useState(null);
  const location = useLocation()
  //const proFilter = location.state.products
  const text = location.state.theText
  let lista = arJason;  
  if (text) {
    //lista = JSON.parse(proFilter)
    console.log(text);
    //console.log(JSON.parse(secureLocalStorage.getItem('EveryPro')));
  }/*else{
    lista = arJason
  }*/
  /*if (Object.keys(lista).length === 0){
    console.log("aaaaa");
  }*/
  
  //const variable = (secureLocalStorage.getItem('EveryPro'))
  useEffect(() => {
    // Obtén el valor del localStorage
    const localStorageValue = secureLocalStorage.getItem('EveryPro');

    // Verifica si el valor existe y actualiza el estado
    if (localStorageValue) {
      setVariable(JSON.parse(localStorageValue));
    }
  }, []);

  return (
    <>
      <section className='products'>
        {variable && 
          <div>
            siks
            {console.log(variable)}
          </div>
        }
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
