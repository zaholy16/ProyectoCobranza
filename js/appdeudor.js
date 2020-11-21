let database= JSON.parse(localStorage.getItem("bd"));
//-----------------------------------------------------------------------------
function indiceDeudor(){
    let propietarios= database.datos.length;
    let deudor= database.usr;
    for(let i=0;i<propietarios;i++){
        let usuario= database.datos[i].deudores.length;
        for(let j=0;j<usuario;j++){
            if(database.datos[i].deudores[j].celular==deudor){
                var posicion =j;
                return posicion; 
            }
        }
    }
}
function indicePropietario(){
    let propietarios= database.datos.length;
    let deudor= database.usr;
    for(let i=0;i<propietarios;i++){
        let usuario= database.datos[i].deudores.length;
        for(let j=0;j<usuario;j++){
            if(database.datos[i].deudores[j].celular==deudor){
                var posicion =i;
                return posicion; 
            }
        }
    }
}
const indice= indiceDeudor();
const prop= indicePropietario();

let textoEstado="";
textoEstado=` <div class="estado">
    <p>Deuda: ${database.datos[prop].deudores[indice].deuda+database.datos[prop].deudores[indice].pagado}</p>
    <p>Pagado: ${database.datos[prop].deudores[indice].pagado}</p>
    <p>Deuda restante: ${database.datos[prop].deudores[indice].deuda}</p>
    </div>
`;

let textoPagos="";
let mostrar= JSON.parse(localStorage.getItem("bd"));
textoPagos= "";
let histo= mostrar.datos[prop].deudores[indice].historial;
histo.forEach(element => {
    if(element.tipo=="Pago" || element.tipo=="pago"){
    textoPagos+=`
    <div class="pagos">
        <p>Tipo: ${element.tipo} </p>
        <p>Fecha: ${element.fecha} </p>
        <p>Cantidad: ${element.cantidad}</p>
    </div>
    `;
    }
});

let textocargo= "";
let histocargos= mostrar.datos[prop].deudores[indice].historial;
histocargos.forEach(element => {
    if(element.tipo=="cargo" || element.tipo=="Cargo"){
    textocargo+=`
    <div class="cargos">
        <p>Tipo: ${element.tipo} </p>
        <p>Fecha: ${element.fecha} </p>
        <p>Cantidad: ${element.cantidad}</p>
    </div>
    `;
    }
});

var estado=document.getElementById("estado");
var pagos= document.getElementById("pagos");
var cargos= document.getElementById("cargos");

document.getElementById("btnestado").addEventListener("click",()=>{
    estado.style.display="inline";
    pagos.style.display="none";
    cargos.style.display="none";
    document.getElementById("estado").innerHTML=textoEstado;
});

document.getElementById("btnpagos").addEventListener("click",()=>{
    estado.style.display="none";
    pagos.style.display="inline";
    cargos.style.display="none";
    document.getElementById("pagos").innerHTML=textoPagos;
});

document.getElementById("btncargos").addEventListener("click",()=>{
    estado.style.display="none";
    pagos.style.display="none";
    cargos.style.display="inline";
    document.getElementById("cargos").innerHTML=textocargo;
}); 

document.getElementById("cerrarSesion").addEventListener("click",()=>{
    database.usr=null;
    localStorage.clear();
    localStorage.setItem("bd",JSON.stringify(database)); 
    location.replace("home.html");
});