let database= JSON.parse(localStorage.getItem("bd"));

function indicePropietario(){
    let propietarios= database.datos.length;
    let deudor= database.usr;
    for(let i=0;i<propietarios;i++){
        if(database.datos[i].celular==deudor){
            var posicion =i;
            return posicion; 
        }
    }
}
const indice=indicePropietario();

function buscar(nombres){
    let total= database.datos[indice].deudores.length;
    for(let i=0;i<total;i++){
        let name= database.datos[indice].deudores[i].nombres+" "+database.datos[indice].deudores[i].apellidos;
        if(name==nombres)
        return i; 
    }
}

function seleccionDeudoresPago(){
    var deudores=database.datos[indice].deudores;
    var select=document.getElementById("registrarpago");
    for(let i=0; i<deudores.length;i++){
        var option= document.createElement('option');
        option.innerHTML=deudores[i].nombres+" "+deudores[i].apellidos;
        select.appendChild(option); 
    }
}
seleccionDeudoresPago();

function seleccionDeudoresCargo(){
    var deudores=database.datos[indice].deudores;
    var select=document.getElementById("registrarcargo");
    for(let i=0; i<deudores.length;i++){
        var option= document.createElement('option');
        option.innerHTML=deudores[i].nombres+" "+deudores[i].apellidos;
        select.appendChild(option); 
    }
}
seleccionDeudoresCargo();

function validacionExisteDeudores(nombres,apellidos,telefono){
    let existentes= database.datos[indice].deudores.length;
    for(let i=0;i<existentes;i++){
        if(database.datos[indice].deudores[i].nombres==nombres && 
            database.datos[indice].deudores[i].apellidos==apellidos || 
            database.datos[indice].deudores[i].celular==telefono)
        return true;
    }
};

function mostrarEstado(){
    var deudores=database.datos[indice].deudores;
    var select=document.getElementById("deudor");
    for(let i=0; i<deudores.length;i++){
        var option= document.createElement('option');
        option.innerHTML=deudores[i].nombres+" "+deudores[i].apellidos;
        select.appendChild(option); 
    }
}
mostrarEstado();

function mostrarPorFecha(){
    var deudores=database.datos[indice].deudores;
    var select=document.getElementById("movimientoDeudor");
    for(let i=0; i<deudores.length;i++){
        var option= document.createElement('option');
        option.innerHTML=deudores[i].nombres+" "+deudores[i].apellidos;
        select.appendChild(option); 
    }
}
mostrarPorFecha();

document.getElementById("btnagregar").addEventListener("click",()=>{
    let nombres= document.getElementById("nombres").value;
    let apellidos=document.getElementById("apellidos").value;
    let celular= document.getElementById("celular").value;
    let correo= document.getElementById("correo").value;
    let password= document.getElementById("password").value;
    if(validacionExisteDeudores(nombres,apellidos,celular)==true){
        alert("El deudor ya existe");
        location.reload(); 
    }else{
        let usuario= new Deudor(nombres,apellidos,celular,correo,password,[],0,0,0,"deudor");
        database.datos[indice].deudores.push(usuario);
        localStorage.setItem("bd",JSON.stringify(database));
        alert("Deudor registrado correctamente");
        location.reload();
    }
});

document.getElementById("btncargo").addEventListener("click",()=>{
    let deudor= document.getElementById("registrarcargo").value;
    let cargo= parseInt(document.getElementById("cargo").value);
    let position= buscar(deudor);
    let fecha= document.getElementById("fechacargo").value;
    let hist= new historial("cargo",fecha,cargo); 
    database.datos[indice].deudores[position].cobros=cargo;
    database.datos[indice].deudores[position].deuda+=cargo;
    database.datos[indice].deudores[position].historial.push(hist); 
    localStorage.clear();
    localStorage.setItem("bd",JSON.stringify(database));
    alert("Cargo aplicado");
    //location.reload();
});

document.getElementById("btnpago").addEventListener("click",()=>{
    let deudor= document.getElementById("registrarpago").value;
    let cantidad= parseInt(document.getElementById("cantidadpago").value);
    let fecha= document.getElementById("fechapago").value;
    let position= buscar(deudor);
    let his= new historial("Pago",fecha,cantidad);
    database.datos[indice].deudores[position].pagado+=cantidad;
    database.datos[indice].deudores[position].deuda-=cantidad;
    database.datos[indice].deudores[position].historial.push(his);
    database.datos[indice].deudores[position].cobros=0;
    if(database.datos[indice].deudores[position].deuda==0)
    database.datos[indice].deudores[position].pagado=0;
    localStorage.clear();
    localStorage.setItem("bd",JSON.stringify(database));
    alert("Pago realizado");
    //location.reload();
});

document.getElementById("btncargoTodos").addEventListener("click",()=>{
    let cantidad= parseInt(document.getElementById("cargotodos").value);
    let total= database.datos[indice].deudores.length;
    let fecha= document.getElementById("fechatodos").value; 
    let his= new historial("cargo",fecha,cantidad)
    for(let i=0; i<total;i++){
        database.datos[indice].deudores[i].cobros=cantidad;
        database.datos[indice].deudores[i].deuda+=cantidad;
        database.datos[indice].deudores[i].historial.push(his);
    }
    localStorage.clear();
    localStorage.setItem("bd",JSON.stringify(database)); 
    alert("Cargo aplicado");
    //location.reload();
});

document.getElementById("btnestado").addEventListener("click",()=>{
    let deudor= document.getElementById("deudor").value;
    let posicion= buscar(deudor);
    let texto="";
    texto+=`<div class="estado">
    <p>Deuda: ${database.datos[indice].deudores[posicion].deuda+database.datos[indice].deudores[posicion].pagado}</p>
    <p>Pagado: ${database.datos[indice].deudores[posicion].pagado}</p>
    <p>Deuda restante: ${database.datos[indice].deudores[posicion].deuda}</p>
    </div>
    `;
    document.getElementById("estado").innerHTML+=texto;
});

document.getElementById("btnmovimiento").addEventListener("click",()=>{
    let deudor= document.getElementById("movimientoDeudor").value;
    let fecha= document.getElementById("fechamovimiento").value;
    let texto="";
    let posicion= buscar(deudor);
    let histoTotal= database.datos[indice].deudores[posicion].historial.length; 
    let histo= database.datos[indice].deudores[posicion].historial;
    for(let i=0;i<histoTotal;i++){
       if(histo[i].fecha==fecha){
           texto+=`<div class="movimiento">
           <p>Tipo: ${histo[i].tipo}</p>
           <p>Fecha: ${histo[i].fecha}</p>
           <p>Cantidad: ${histo[i].cantidad}</p>
           </div>
           `;
       }
    }
    document.getElementById("movimiento").innerHTML+=texto;
});

let user= document.getElementById("formRegU");
let pago= document.getElementById("registroPago");
let cargo= document.getElementById("aplicarCargo");
let todos= document.getElementById("cargoAtodos");
let estado= document.getElementById("estado");
let movimiento= document.getElementById("movimiento");
document.getElementById("registrarU").addEventListener("click",()=>{
    user.style.display="inline";
    pago.style.display="none";
    cargo.style.display="none";
    todos.style.display="none";
    estado.style.display="none";
    movimiento.style.display="none";
});

document.getElementById("pago").addEventListener("click",()=>{
    pago.style.display="inline";
    user.style.display="none";
    cargo.style.display="none";
    todos.style.display="none";
    estado.style.display="none";
    movimiento.style.display="none";
});

document.getElementById("regcargo").addEventListener("click",()=>{
    user.style.display="none";
    pago.style.display="none";
    cargo.style.display="inline";
    todos.style.display="none";
    estado.style.display="none";
    movimiento.style.display="none";
});

document.getElementById("regAtodos").addEventListener("click",()=>{
    user.style.display="none";
    pago.style.display="none";
    cargo.style.display="none";
    todos.style.display="inline";
    estado.style.display="none";
    movimiento.style.display="none";
});

document.getElementById("verestado").addEventListener("click",()=>{
    user.style.display="none";
    pago.style.display="none";
    cargo.style.display="none";
    todos.style.display="none";
    estado.style.display="inline";
    movimiento.style.display="none";
});

document.getElementById("vermovimiento").addEventListener("click",()=>{
    user.style.display="none";
    pago.style.display="none";
    cargo.style.display="none";
    todos.style.display="none";
    estado.style.display="none";
    movimiento.style.display="inline";
});

document.getElementById("cerrar").addEventListener("click",()=>{
    database.usr=null; 
    localStorage.setItem("bd",JSON.stringify(database));
    location.replace("home.html");
});
