const url = 'http://localhost:8282/api/servicio'
const listarServicio = async () => {
    let body = document.getElementById('contenido');
    if (body) {
        let mensaje = '';

        fetch(url)
            .then(res => res.json())
            .then(data => {
                const servicio = data.servicio;
                servicio.map((servicio) => {
                    console.log(servicio);

                    mensaje += `<tr><td>${servicio.nombre}</td>` +
                        `<td>${servicio.descripcion}</td>` +
                        `<td>${servicio.precio}</td>` +
                        `<td>${servicio.estado}</td>` +
                        `<td>
                    <a class="waves-effect waves-light btn modal-trigger" href="#modal1" onclick='editar(${JSON.stringify(servicio)})'>Editar</a>
                    <a class="waves-effect waves-light btn modal-trigger purple" href="#" onclick='eliminar("${servicio._id}")'>Eliminar</a>
                 </td></tr>`;
                    body.innerHTML = mensaje;
                });

            })
    }
};
listarServicio();



const registrarServicio = async () => {
    let nombre = document.getElementById('nombre').value
    let descripcion = document.getElementById('descripcion').value
    let precio = document.getElementById('precio').value
    let estado = document.getElementById('estado').value


    let servicio = {
        nombre: nombre,
        descripcion: descripcion,
        precio: precio,
        estado: estado
    };

    // function validarNombre(nombre) {
    //     var regex = /^[a-zA-Z]+$/;
    //     return regex.test(nombre);
    //   }

    if (precio>0) {
        const regExpName = /([A-Za-z0-9\s])/;
        if(!regExpName.test(nombre)){
            alert('Ingresa nombre')
            return
        }
        if(!regExpName.test(descripcion)){
            alert('Ingresa descripción')
            return
        }
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(servicio),
            headers: { "Content-type": "application/json; charset=UTF-8" },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                alert(data.servicio + ' Se registro exitosamente');
                window.location.href = "listarServicio.html";
            });
    } else {
        alert('No se puede registrar');
    }
};


    const editar = (servicio) => {
        let _id = document.getElementById('_id').value = '';
        let nombre = document.getElementById('nombre').value = '';
        let descripcion = document.getElementById('descripcion').value = '';
        let precio = document.getElementById('precio').value = '';
        let estado = document.getElementById('estado').value = '';

        document.getElementById('_id').value = servicio._id;
        document.getElementById('nombre').value = servicio.nombre;
        document.getElementById('descripcion').value = servicio.descripcion;
        document.getElementById('precio').value = servicio.precio;
        document.getElementById('estado').value = servicio.estado;
    }
    const actualizarServicio = async () => {
        let nombre = document.getElementById('nombre').value;
        let descripcion = document.getElementById('descripcion').value;
        let precio = document.getElementById('precio').value;
        let estado = document.getElementById('estado').value;

        let servicio = {
            _id: document.getElementById('_id').value,
            nombre: nombre,
            descripcion: descripcion,
            precio: precio,
            estado: estado

    };

    if (precio>0) {
        const regExpName = /([A-Za-z0-9\s])/;
        if(!regExpName.test(nombre)){
            return
        }
        if(!regExpName.test(descripcion)){
            return
        }
        fetch(url, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(servicio),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then(response => response.json())
            .then(json => {
                alert(json.mensaje);
                alert("Se editó correctamente");
                window.location.href = "listarServicio.html";
            })

    } else {
        alert('No se pudo realizar la modificación');
    }
};

const eliminar = (_id) => {
    if (confirm('¿Está seguro de realizar la eliminación?')) {
        const servicio = { _id: _id };

        fetch(url, {
            method: 'DELETE',
            mode: 'cors',
            body: JSON.stringify(servicio),
            headers: { "Content-Type": "application/json" }
        })
            .then(response => response.json())
            .then(data => {
                alert(data.servicio);
                window.location.href = "listarServicio.html";
            })
    }
};



    if (document.querySelector('#btnRegistrar')) {
        document.querySelector('#btnRegistrar')
            .addEventListener('click', registrarServicio)

    }

    if (document.querySelector('#editar')) {
        document.querySelector('#editar')
            .addEventListener('click', editar)
        console.log(_id)

    }

    const editarButton = document.querySelector('#btnEditar');
    if (editarButton) {
        editarButton.addEventListener('click', actualizarServicio);
    }