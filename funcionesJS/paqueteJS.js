const url = 'http://localhost:8282/api/paquete'
const listarPaquete = async () => {
    let body = document.getElementById('contenido');
    if (body) {
        let mensaje = '';

        fetch(url)
            .then(res => res.json())
            .then(data => {
                const paquete = data.paquete;
                paquete.map((paquete) => {
                    console.log(paquete);

                    mensaje += `<tr><td>${paquete.nombre}</td>` +
                        `<td>${paquete.descripcion}</td>` +
                        `<td>${paquete.precio}</td>` +
                        `<td>${paquete.estado}</td>` +
                        `<td>
                    <a class="waves-effect waves-light btn modal-trigger" href="#modal1" onclick='editar(${JSON.stringify(paquete)})'>Editar</a>
                    <a class="waves-effect waves-light btn modal-trigger red" href="#" onclick='eliminar("${paquete._id}")'>Eliminar</a>
                 </td></tr>`;
                    body.innerHTML = mensaje;
                });

            })
    }
};
listarPaquete();



const registrarPaquete = async () => {
    let nombre = document.getElementById('nombre').value
    let descripcion = document.getElementById('descripcion').value
    let precio = document.getElementById('precio').value
    let estado = document.getElementById('estado').value


    let paquete = {
        nombre: nombre,
        descripcion: descripcion,
        precio: precio,
        estado: estado
    };

    if (precio>=1000) {
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(paquete),
            headers: { "Content-type": "application/json; charset=UTF-8" },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                alert(data.paquete + ' Se realizo la modificación exitosamente');
                window.location.href = "listarPaquete.html";
            });
    } else {
        alert('No se puede registrar');
    }
};


const editar = (paquete) => {
    let _id = document.getElementById('_id').value = '';
    let nombre = document.getElementById('nombre').value = '';
    let descripcion = document.getElementById('descripcion').value = '';
    let precio = document.getElementById('precio').value = '';
    let estado = document.getElementById('estado').value = '';

    document.getElementById('_id').value = paquete._id;
    document.getElementById('nombre').value = paquete.nombre;
    document.getElementById('descripcion').value = paquete.descripcion;
    document.getElementById('precio').value = paquete.precio;
    document.getElementById('estado').value = paquete.estado;
}
const actualizarPaquete = async () => {
    let nombre = document.getElementById('nombre').value;
    let descripcion = document.getElementById('descripcion').value;
    let precio = document.getElementById('precio').value;
    let estado = document.getElementById('estado').value;

    let paquete = {
        _id: document.getElementById('_id').value,
        nombre: nombre,
        descripcion: descripcion,
        precio: precio,
        estado: estado

    };
    if (precio>=1000) {
        fetch(url, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(paquete),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then(response => response.json())
            .then(json => {
                
                alert(json.mensaje);
                window.location.href = "listarPaquete.html";
            })

    } else {
        alert('No se pudo realizar la modificación');
    }


};

const eliminar = (_id) => {
    if (confirm('¿Está seguro de realizar la eliminación?')) {
        const paquete = { _id: _id };

        fetch(url, {
            method: 'DELETE',
            mode: 'cors',
            body: JSON.stringify(paquete),
            headers: { "Content-Type": "application/json" }
        })
            .then(response => response.json())
            .then(data => {
                alert(data.paquete);
                window.location.href = "listarPaquete.html";
            })
    }
};





if (document.querySelector('#btnRegistrar')) {
    document.querySelector('#btnRegistrar')
        .addEventListener('click', registrarPaquete)

}



if (document.querySelector('#editar')) {
    document.querySelector('#editar')
        .addEventListener('click', editar)
    console.log(_id)

}


const editarButton = document.querySelector('#btnEditar');
if (editarButton) {
    editarButton.addEventListener('click', actualizarPaquete);
}