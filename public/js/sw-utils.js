

// Actualizar recursos en el cache
function actualizaCache( cacheName, req, res ) {

    if ( res.ok ) {
        return caches.open( cacheName ).then( cache => {
            cache.put( req, res.clone() );
            return res.clone();
        });
    } else {
        return res;
    }
}

// Cache with network update
function verificarCache( staticCache, req, APP_SHELL_INMUTABLE ) {


    if ( APP_SHELL_INMUTABLE.includes(req.url) ) {
        // No hace falta actualizar el inmutable       
    } else {       
        return fetch( req )
                .then( res => {
                    return actualizaCache( staticCache, req, res );
                });
    }
}



function manejaPeticionesApi(nombreCache, req){

    if( req.clone().method === "POST" ){

        req.clone().text().then(datos => {
             console.log( "Datos", datos );

             const obj = JSON.parse( datos );
             guardarMensaje( obj );
        }); 

        return fetch( req );

    }else{

        return fetch( req )
            .then( res => {
                if(res.ok){
                    actualizaCache(nombreCache, req, res.clone() );
                    return res.clone();
                }else{
                    return caches.match( req ); //se manda lo que se tiene en cache
                }
            })
            .catch(err => {
                return caches.match( req ); //se manda lo que se tiene en cache
            });

    }

}

