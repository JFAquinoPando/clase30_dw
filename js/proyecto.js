const btnObtener = $("#obtener");
const respuesta = $("#respuesta");
const respuestall = $("#respuestall")
const documento = $("#documento").val()
const cambios = $("#cambios")
const divisas = $("#divisas")
//5261219
btnObtener.on("click", function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        respuesta.text(
            "La Geolocalizacion no es soportada por este navegador!"
        );
    }
});

function showPosition(position) {
    respuesta.html(
        "Latitude: " +
            position.coords.latitude +
            "<br>Longitude: " +
            position.coords.longitude
    );
    obtenerDatos(position.coords.latitude,position.coords.longitude);
    obtenerPersona(documento);
}

function obtenerDatos(latitud,longitud){
    //https://api-geo.proyectosbeta.net/api/v1/paraguay/-57.537379/-25.361664
    const url = `https://api-geo.proyectosbeta.net/api/v1/paraguay/${longitud}/${latitud}`;
    /*
    {"success":true,"data":{"departamento_nombre":"Central","departamento_capital":"Areguá","distrito_nombre":"San Lorenzo","ciudad_nombre":"San Lorenzo","barrio_nombre":"Villa Del Agrónomo"}}
    */
    $.get( url, function(e) {
        alert( "success" );
        console.log(e);
        if (e.success == true) {
            respuestall.html(
                `<strong>departamento_nombre</strong>: ${e.data.departamento_nombre}<br />
                <strong>departamento_capital</strong>:${e.data.departamento_capital} <br />
                <strong>distrito_nombre</strong>: ${e.data.distrito_nombre}<br />
                <strong>ciudad_nombre</strong>:${e.data.ciudad_nombre} <br />
                <strong>barrio_nombre</strong>: ${e.data.barrio_nombre}<br />`
            );
            //alert(e.data.ciudad_nombre)
            
        }else{
            alert("La respuesta no es buena...")
        }
      })
}

function obtenerPersona(nroDcoumentoPy){
    //if (nroDcoumentoPy.length) {
        const urlDocumento = `https://tupi.com.py/inventiva/identidad.php?ci=${nroDcoumentoPy}`
        $.get( urlDocumento, function(e) {
            alert("Datos obtenidos del cliente")
            console.log(e);
        })
    //}
}

function getCambios(){
    /* compra, venta y updated */

    $.get('https://dolar.melizeche.com/api/1.0/', function(respuesta){
        console.log(respuesta);
        cambios.html(
            `
            <h3>Actualizado al: ${respuesta.updated}</h3>
            <div class="row">
                <div class="col-sm-4">
                    <img src='img/vision.jpg'>
                    <hr>
                    <span>Compra</span>: ${respuesta.dolarpy.vision.compra}<br/>
                    <span>Venta</span>: ${respuesta.dolarpy.vision.venta}<br/>
                </div>
                <div class="col-sm-4">
                    <img src='img/basa.png'>
                    <hr>
                    <span>Compra</span>: ${respuesta.dolarpy.amambay.compra}<br/>
                    <span>Venta</span>: ${respuesta.dolarpy.amambay.venta}<br/>
                </div>
                <div class="col-sm-4">
                    <img src='img/bcp.png'>
                    <hr>
                    <span>Compra</span>: ${parseInt(respuesta.dolarpy.bcp.compra)}<br/>
                    <span>Venta</span>: ${respuesta.dolarpy.bcp.venta}<br/>
                </div>
            </div>`
        )
    })
}

divisas.on("click", function(){
    getCambios();
})


getCambios();

setInterval(() => {
    getCambios()
}, 60000);