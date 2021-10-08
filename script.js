/**
 * endpoint donde se va consumir la api rest
 */
const endpoint = "https://gb889a79b8713d4-db202109242140.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/games/games"
const etp = document.getElementById("Games")
const btnnuevo = document.getElementById("Crear")
const btnver = document.getElementById("ver")



/**
 * consumiento metodo get la Api de Cloud para visualizar en el cliente 
 */

function peticionGet() {

    $.ajax({

        method: "GET",
        url: endpoint,
        success: function (data) {
            getProducto(data.items)

        },
        error: function (error) {
            console.log("Error al Consumir Api Oracle Cloud ")
        }
    });

}


function getProducto(Games) {

    
    let tabla = "<table >"
    tabla+="<tr>"
    tabla+="<th>"+"Codigo"+"</th>";
    tabla+="<th>"+"Nombre"+"</th>";
    tabla+="<th>"+"</th>";
    tabla+="</tr>";
    Games.forEach(game => {

                tabla+="<tr>";
                tabla+="<td>"+game.id+"</td>";
                tabla+="<td>"+game.name+"</td>";
                tabla+="<td>"+"<details id='mainDetails'><summary>Detalles</summary>";
                tabla+="<p><label id='nomLabel"+game.id+"'><b>Nombre: </b>"+game.name+"<br></label>";
                tabla+="<label id='devLabel"+game.id+"'><b>Developer: </b>"+game.developer+"<br></label>";
                tabla+="<label id='minLabel"+game.id+"'><b>Minage: </b>"+game.minage+"<br></label>";
                tabla+="<label id='catLabel"+game.id+"'><b>CategoryID: </b>"+game.category_id+"</p></label>";
                tabla+="<button type='button' onclick='editarJuego("+JSON.stringify(game)+")' id='botEditar"+game.id;
                tabla+= "'>"+"Editar</button>&nbsp &nbsp";
                tabla+="<button onclick='peticionDelete("+game.id+")' id='botBorrar";
                tabla+= game.id+"'>"+"Borrar</button>";
                tabla+="</details></td>";
                tabla+="</tr>";
    }
    );
    tabla+="</table>";


    etp.innerHTML = tabla
}






/**funcion para peticion post */
function peticionPost() {

    let data={id:$("#idCG").val(),
        developer:$("#developerCG").val(),
        minage:$("#minageCG").val(),
        category_id:$("#category_idCG").val(),
        name:$("#nameCG").val(),
    };
    let datasend = JSON.stringify(data)

    $.ajax({

        method: "POST",
        url: endpoint,
        data: datasend,
        dataType: 'json',
        contentType: "application/json",
        complete: function (response) {
            alert("Entrada creada")
            peticionGet()
        },
        error: function (error) {

        }
    });

}
/**peticion put */

function peticionPut(id) {

    const data = {
        id: id,
        developer: document.getElementById("editInDev"+id).value,
        minage: document.getElementById("editInMin"+id).value,
        category_id: document.getElementById("editInCat"+id).value,
        name: document.getElementById("editInNom"+id).value
    }

    let datasend = JSON.stringify(data)

    $.ajax({

        method: "PUT",
        url: endpoint,
        data: datasend,
        dataType: 'json',
        contentType: "application/json",
        complete: function (response) {
            console.log("Actualizo Registro!!!")
            alert("Actualizo Registro!!!")
            peticionGet()

        },
        error: function (error) {

        }
    });
}


/**funcion delete */
function peticionDelete(id) {

    const data = {
        id: id
    }
    let datasend = JSON.stringify(data)
    $.ajax({

        method: "DELETE",
        url: endpoint,
        data: datasend,
        dataType: 'json',
        contentType: "application/json",
        complete: function (response) {
            alert("Elimino Registro!!")
            peticionGet()
        },
        error: function (error) {

        }
    });
}


function editarJuego(game){
    
            

            document.getElementById("nomLabel"+game.id).innerHTML = "<p><b>Nombre: <input id='editInNom"+game.id+"'></input></p><br>";
            document.getElementById("editInNom"+game.id).value = game.name;

            document.getElementById("devLabel"+game.id).innerHTML = "<p>Developer: <input id='editInDev"+game.id+"'></input></p><br>";
            document.getElementById("editInDev"+game.id).value = game.developer;

            document.getElementById("minLabel"+game.id).innerHTML = "<p>Minage: <input id='editInMin"+game.id+"'></input></p><br>";
            document.getElementById("editInMin"+game.id).value= game.minage;

            document.getElementById("catLabel"+game.id).innerHTML = "<p>CategoryID: <input id='editInCat"+game.id+"'></input></p><br>";
            document.getElementById("editInCat"+game.id).value= game.category_id;

            document.getElementById("botEditar"+game.id).innerHTML= "<button type='submit' onclick='peticionPut("+game.id+")' id='botCambiar"+game.id+"'>Cambiar</button>";

        }


btnnuevo.addEventListener("click", (e) => {

    peticionPost()
})

btnver.addEventListener("click", (e) => {
    e.preventDefault()
    peticionGet()
})