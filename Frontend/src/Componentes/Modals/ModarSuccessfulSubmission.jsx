import CargadoConExito from '../../Assets/gif/CargadoConExito.png'

export const ModarSuccessfulSubmission = () => {
    return(
        <div
            className='theModalContainer'
            style={{
                display: 'flex',
                justifyContent: 'center', // Centra horizontalmente
                alignItems: 'center',    // Centra verticalmente
                height: '100vh',         // Ocupa toda la altura de la ventana
                backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente (opcional)
                zIndex: '1060'
              }}>
            <div className='theModal-content' style={{width: '400px', height: '400px', position: 'relative'}}>
                <div className='theModal-body' style={{display: 'flex',  flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <img 
                        src={CargadoConExito}
                        style={{
                            width: '80%',
                            height: 'auto', // Mantiene la proporción de la imagen
                          }}
                        alt="CargadoConExito"/>
                </div>
            </div>
        </div>
    )
}