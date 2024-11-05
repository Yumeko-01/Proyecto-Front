// js/productos.jsprod
function mostrarBicicletas() {
    let request = sendRequest('bicicletas', 'GET', '');
    let table = document.getElementById('bicicletas-table');
    table.innerHTML = "";
    request.onload = function () {
        let data = request.response;
        data.forEach(element => {
            table.innerHTML += `  
            <tr>  
                <td>${element.marca}</td>  
                <td>${element.modelo}</td>  
                <td>${element.precio}</td>  
                <td>${element.tipo}</td>  
                <td>${element.color}</td>  
                <td>${element.año}</td>  
                <td>
                    <button type="button" class="btn btn-primary" onclick='window.location = "formBicicletas.html?id=${element._id}"'>Editar</button>
                    <button type="button" class="btn btn-danger" onclick='deleteBicicletas("${element._id}")'>Eliminar</button>
                </td>  
            </tr>
            `;
        });
    }
}

function deleteBicicletas(id) {
    let request = sendRequest('bicicletas/' + id, 'DELETE', '');
    request.onload = function () {
        mostrarBicicletas();
    }
}

function guardarBicicletas() {
    let marca = document.getElementById('marca').value;
    let modelo = document.getElementById('modelo').value;
    let precio = document.getElementById('precio').value;
    let tipo = document.getElementById('tipo').value;
    let color = document.getElementById('color').value;
    let año = document.getElementById('año').value;
    let data = {
        'marca': marca, 'modelo': modelo, 'precio': precio, 'tipo': tipo, 'color': color, 'año': año
    };
    sendRequest('bicicletas/', 'POST', data)
        .then(response => {
            window.location = 'bicicletas.html';
        })
        .catch(error => {
            alert('Error al guardar los datos: ' + error.message);
        });
}


function cargarDatos(id) {
    let request = sendRequest('bicicletas/' + id, 'GET', '');
    let marca = document.getElementById('marca');
    let modelo = document.getElementById('modelo');
    let precio = document.getElementById('precio');
    let tipo = document.getElementById('tipo');
    let color = document.getElementById('color');
    let año = document.getElementById('año');

    request.onload = function () {
        let data = request.response;
        console.log(data); // Agrega esta línea para verificar los datos
        if (data) {
            marca.value = data.marca;
            modelo.value = data.modelo;
            precio.value = data.precio;
            tipo.value = data.tipo;
            color.value = data.color;
            año.value = data.año;
        } else {
            console.error('No data received');
        }
    };    
    request.onerror = function () {
        alert("Error al cargar los datos");
    };
}

function modificarBicicletas(id) {
    let marca = document.getElementById('marca').value
    let modelo = document.getElementById('modelo').value
    let precio = document.getElementById('precio').value
    let tipo = document.getElementById('tipo').value
    let color = document.getElementById('color').value
    let año = document.getElementById('año').value
    let data = {
        'marca': marca, 'modelo': modelo, 'precio': precio, 'tipo': tipo, 'color': color, 'año': año
    }
    let request = sendRequest('bicicletas/' + id, 'PUT', data);
    request.onload = function () {
        window.location = 'bicicletas.html';
    }
    request.onerror = function () {
        console.log("Error al modificar los datos")
    }
}



        
