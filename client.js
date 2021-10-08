/**CLIENT */

const endpointClient = "https://g80562ffe15f25f-db202109271726.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client"

const ver = document.getElementById("verClient")
/** PETICION GET */

function getClient(){
    console.log("click")
    $.ajax({

        method: "GET",
        url: endpointClient,
        success:function(data){
            pintarRespuestacliente(data.items)
        },
        error:function(error){
            console.log("Error al consumir la API Oracle Cloud")
        }
    });
}

function pintarRespuestacliente(clientes) {
    const mostrar = document.getElementById("client") 
    
    let tablaClient = "<table >"
    tablaClient+="<tr>"
    tablaClient+="<th>"+"Código"+"</th>";
    tablaClient+="<th>"+"Nombre"+"</th>";
    tablaClient+="<th>"+"</th>";
    tablaClient+="</tr>";
    clientes.forEach(clientes => {

                tablaClient+="<tr>";
                tablaClient+="<td>"+clientes.id+"</td>";
                tablaClient+="<td>"+clientes.name+"</td>";
                tablaClient+="<td>"+"<details id='mainDetails'><summary>Detalles</summary>";
                tablaClient+="<p><label id='nomLabel"+clientes.id+"'>"+"Nombre: "+clientes.name+"<br></label>";
                tablaClient+="<label id='emLabel"+clientes.id+"'>"+"Email: "+clientes.email+"<br></label>";
                tablaClient+="<label id='AgeLabel"+clientes.id+"'>Edad: "+clientes.age+"</p></label>";
                tablaClient+="<button type='button' onclick='editarCliente("+JSON.stringify(clientes)+")' id='botEditar"+clientes.id;
                tablaClient+= "'>"+"Editar</button>";
                tablaClient+="<button onclick='deleteClient("+clientes.id+")'  id='botBorrar";
                tablaClient+= clientes.id+"'>"+"Borrar</button>";          
                tablaClient+="</details></td>";                              
                tablaClient+="</tr>";
    }
    );
    tablaClient+="</table>";


    mostrar.innerHTML = tablaClient
}

/** PETICION POST */

function postClient(){
    const data ={
        id:$("#idCli").val(), //PONER LOS NOMBRES EN LA TABLA EN EL HTML
        name:$("#nameCli").val(),
        email:$("#emCli").val(),
        age:$("#ageCli").val()
    }
    data.id= parseInt(data.id)
    data.age= parseInt(data.age)


    let datasend=JSON.stringify(data)
    console.log(datasend)

    $.ajax({
        method: "POST",
        url: endpointClient,
        data:datasend,
        dataType:"json",
        contentType:"application/json",
        complete:function(response){
            $("#idCli").val(""),
            $("#nameCli").val(""),
            $("#emCli").val(""),
            $("#ageCli").val(""),
            alert("Cliente Creado")
            getClient()

        },
        error:function(error){

        }
    })
}

/** PETICION PUT */

function putClient(id){

    const data ={
        id: id,
        name: document.getElementById("editNamcl"+id).value,
        email:document.getElementById("editEmcl"+id).value,
        age:document.getElementById("editAgecl"+id).value,
    }
    data.id= parseInt(data.id)
    data.age= parseInt(data.age)

    let datasend=JSON.stringify(data)

    $.ajax({
        method: "PUT",
        url: endpointClient,
        data:datasend,
        dataType:"json",
        contentType:"application/json",
        complete:function(response){
            console.log("Se Actualizo el Cliente")
            alert("Se actualizo Registro")
            getClient()

        },
        error:function(error){

        }
    });
}

/** PETICION DELETE */

function deleteClient(id){

    const data ={
        id: id
    }

    let datasend=JSON.stringify(data)

    $.ajax({
        method: "DELETE",
        url: endpointClient,
        data:datasend,
        dataType:"json",
        contentType:"application/json",
        complete:function(response){
            alert("Se elimino el cliente")
            getClient()
        },
        error:function(error){

        }
    });
}

//Funcion Mostrar cliente

function editarCliente(clientes){
    
            

    document.getElementById("nomLabel"+clientes.id).innerHTML = "<p><b>Nombre: <input id='editNamcl"+clientes.id+"'></input></p><br>";
    document.getElementById("editNamcl"+clientes.id).value = clientes.name;

    document.getElementById("emLabel"+clientes.id).innerHTML = "<p>Correo: <input id='editEmcl"+clientes.id+"'></input></p><br>";
    document.getElementById("editEmcl"+clientes.id).value = clientes.email;

    document.getElementById("AgeLabel"+clientes.id).innerHTML = "<p>Age: <input id='editAgecl"+clientes.id+"'></input></p><br>";
    document.getElementById("editAgecl"+clientes.id).value= clientes.age;

    document.getElementById("botEditar"+clientes.id).innerHTML= "<button type='submit' onclick='putClient("+clientes.id+")' id='botCambiar"+clientes.id+"'>Cambiar</button>";

}

