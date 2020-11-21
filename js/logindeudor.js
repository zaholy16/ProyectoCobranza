let database= JSON.parse(localStorage.getItem("bd"));

function ingresar(telefono,contraseña){
    let existe= database.datos.length;
    for(let i=0;i<existe;i++){
        let deudor= database.datos[i].deudores.length;
        for(let j=0;j<deudor;j++){
            if(database.datos[i].deudores[j].celular==telefono && database.datos[i].deudores[j].password==contraseña){
                database.login= true;
                database.usr=telefono;
                return true; 
            }
        }
    }
}

document.getElementById("btningresar").addEventListener("click",()=>{
    let tel= document.getElementById("tel").value;
    let contraseña= document.getElementById("pass").value;
    let verdad= ingresar(tel,contraseña);
    if(verdad!=true){
        alert("No te han registrado");
    }else{
        localStorage.clear();
        localStorage.setItem("bd",JSON.stringify(database));
        location.replace("deudor.html");
    }
});