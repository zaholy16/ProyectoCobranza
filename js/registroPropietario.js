let database= JSON.parse(localStorage.getItem("bd"));
if(!database || database==undefined){
    database= {login: false, usr:"", datos: []}
} 
document.getElementById("btnclick").addEventListener("click",()=>{
    let div= document.getElementById("registro");
    div.style.display="inline";
})
function validacionExiste(telefono,contraseña){
    let existentes= database.datos.length;
    for(let i=0;i<existentes;i++){
        if(database.datos[i].celular==telefono && database.datos[i].password==contraseña){
            return true; 
        }
    }
}

function validacionExisteRegistro(nombres,apellidos){
    let existentes= database.datos.length;
    for(let i=0;i<existentes;i++){
        if(database.datos[i].nombres==nombres && database.datos[i].apellidos==apellidos)
        return true; 
    }
}


document.getElementById("btnRegistrar").addEventListener("click",()=>{
    let nombres= document.getElementById("nombre").value;
    let apellidos= document.getElementById("apellido").value;
    let celular= document.getElementById("telefono").value;
    let correo= document.getElementById("mail").value;
    let password= document.getElementById("Password").value;
    if(validacionExisteRegistro(nombres,apellidos)==true){
        alert("El propietario ya existe");
    }else{
        let prop= new propietario(nombres,apellidos,correo,celular,password,"propietario",[]);
        database.datos.push(prop);
        localStorage.setItem("bd",JSON.stringify(database));
        location.reload();
        alert("Creado correctamente");
    }
});
document.getElementById("btnlogin").addEventListener("click",()=>{
    let telefono= document.getElementById("telefonoL").value;
    let pass=document.getElementById("passwordL").value;
    if(validacionExiste(telefono,pass)==true){
        location.replace("propietario.html");
        database.login=true;
        database.usr=telefono;
        localStorage.clear();
        localStorage.setItem("bd",JSON.stringify(database));
    }else{
        alert("No estas registrado");
    }
});
