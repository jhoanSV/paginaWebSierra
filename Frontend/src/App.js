import secureLocalStorage from "react-secure-storage";
import { useEffect, useState } from "react";
import { Header, Footer } from "./layouts";
import { Navigation } from "./routes";
import { CategMenuMobile } from "./Componentes/Menus";
import { setGlobal } from "./globals/globals";
import './_App.scss';
import { useNavigate } from "react-router-dom";
import { TheProvider } from "./TheProvider";

export default function App() {
  let ud = secureLocalStorage.getItem('userData')
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const navigate = useNavigate()
  
  secureLocalStorage.removeItem('EveryPro')
  secureLocalStorage.removeItem('alias')
  if(!localStorage.getItem('cart')) localStorage.setItem('cart', JSON.stringify([]))
  useEffect(() => {
    //Here defines how to show the page, if is logged or not
    if(ud){
      setGlobal({ isLogged:true })
      console.log('a?');
    }else if(localStorage.getItem('@secure.s.userData')){
      alert('Su sesion ha expirado, por favor vuelva a ingresar');
      navigate('/')
      localStorage.removeItem('@secure.s.userData')
    }    
  
    const img = new Image();
    img.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A='
    img.onload = () => {
        //setAvifSupported(true);
        console.log('AVIF supported');        
        setGlobal({ AVIF:true })
    };
    img.onerror = () => {
        //setAvifSupported(false);
        setGlobal({ AVIF:false })
        console.log('AVIF not supported');
    };
  }, []);
  

  return (
    <TheProvider>   
          {/*Borrar el siguiente div*/}
          <div style={{position: 'absolute', color: 'black', backgroundColor: 'white', zIndex: '10'}} onResize={(e)=>{setScreenWidth(e.target.innerWidth)}}>
            {screenWidth}
          </div>
          <a href="https://api.whatsapp.com/send/?phone=573134237538&text&type=phone_number&app_absent=0" className="btn-wapp" 
            target="_blank" rel="noreferrer">
              <picture>
                <source
                  type="image/avif"
                  srcSet={require("./Assets/avif/WappIcon.avif")}
                />              
                <img
                    src={require("./Assets/png/WappIcon.png")}
                    width="479px"
                    height="480"
                    alt="iconWapp"
                    />
              </picture>
          </a>

          <CategMenuMobile/>

          <Header></Header>

          <Navigation></Navigation>

          <Footer></Footer>        
      </TheProvider>
  );
}
