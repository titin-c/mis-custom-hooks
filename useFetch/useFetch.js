import { useEffect, useState, useRef } from "react"


export const useFetch = ( url ) => {
    
    //para evitar hacer peticiones si el componente está desmontado
    const isMounted  = useRef(true);
   
    //creamos el estado con un objeto y los valores que vasmos a necesitar
    const [state, setState] = useState({data: null, loading: true, error: null});

    useEffect(() => {

        return ()=>{
            isMounted.current = false;
        }
      
    }, []);

    useEffect(() => {

        //cambiamos los valores cada vez que se cargue la url para la recarga
        setState({ data: null, loading: true, error:null })
        // cargamos la url
        fetch(url)
        .then( resp => resp.json() )
        .then( data => {
                //si el componente no está desmontado se carga
                if( isMounted.current){
                    //una vez cargamos data cambiamos los valores para mostrar contenidos
                    setState({
                        loading: false,
                        error: null,
                        data
                    })
                }
                else{ console.log('setState no se llamó')}
        });


    }, [ url ])

    return state;
    
}
 