

let db = new PouchDB("bdMensajes");

function guardarMensaje( mensaje ){

    mensaje._id = new Date().toISOString();

    db.put( mensaje ).then( () =>{
        console.log("Se guardo con el pouch db");
    } )
    .catch(error => {
        console.log(" Falla al guardar en pouch db");
    });
}