const url = 'http://localhost:8282/api/detallePaquete'
const listarDetalle = async () => {
    let body = document.getElementById('contenido');
    if (body) {
        let mensaje = '';

        fetch(url)
            .then(res => res.json())
            .then(data => {
                const detalles = data.detalle;
                detalles.map((detalle) => {
                    console.log(detalle);

                    mensaje += `<tr><td>${detalle.idPaquete}</td>` +
                        `<td>${detalle.tipo}</td>` +
                        `<td>${detalle.cantidad}</td>` +
                        `<td>
                    <a class="waves-effect waves-light btn modal-trigger" href="#modal1" onclick='editar(${JSON.stringify(detalle)})'>Editar</a>
                    <a class="waves-effect waves-light btn modal-trigger purple" href="#" onclick='eliminar("${detalle._id}")'>Eliminar</a>
                 </td></tr>`;  
                });
                body.innerHTML = mensaje;
            })
    }
};
listarDetalle();



const registrarDetalle= async () => {
    let idPaquete = document.getElementById('idPaquete').value
    let tipo = document.getElementById('tipo').value
    let cantidad = document.getElementById('cantidad').value


    let detalle = {
        idPaquete: idPaquete,
        tipo: tipo,
        cantidad: cantidad
    };

    if (cantidad>0) {
        const regExpName = /([A-Za-z0-9\s])/;
        if(!regExpName.test(tipo)){
            alert('Ingresa el tipo')
            return
        }
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(detalle),
            headers: { "Content-type": "application/json; charset=UTF-8" },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                alert('Detalle registrado exitosamente');
                window.location.href = "listarDetalle.html";
            });
    } else {
        alert('No se puede registrar');
    }
};


const editar = (detalle) => {
    let _id = document.getElementById('_id').value = '';
    let idPaquete = document.getElementById('idPaquete').value = '';
    let tipo = document.getElementById('tipo').value = '';
    let cantidad = document.getElementById('cantidad').value = '';

    document.getElementById('_id').value = detalle._id;
    document.getElementById('idPaquete').value = detalle.idPaquete;
    document.getElementById('tipo').value = detalle.tipo;
    document.getElementById('cantidad').value = detalle.cantidad;
}
const actualizarDetalle = async () => {
    let idPaquete = document.getElementById('idPaquete').value;
    let tipo = document.getElementById('tipo').value;
    let cantidad = document.getElementById('cantidad').value;

    let detalle = {
        _id: document.getElementById('_id').value,
        idPaquete: idPaquete,
        tipo: tipo,
        cantidad: cantidad,

    };
    if (cantidad>0) {
        fetch(url, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(detalle),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then(response => response.json())
            .then(json => {
                
                alert(json.mensaje);    
                alert('Detalle modificado exitosamente');
                window.location.href = "listarDetalle.html";
            })

    } else {
        alert('No se pudo realizar la modificación');
    }


};

const eliminar = (_id) => {
    if (confirm('¿Está seguro de realizar la eliminación?')) {
        const detalle = { _id: _id };

        fetch(url, {
            method: 'DELETE',
            mode: 'cors',
            body: JSON.stringify(detalle),
            headers: { "Content-Type": "application/json" }
        })
            .then(response => response.json())
            .then(data => {
                alert(data.detalle);
                window.location.href = "listarDetalle.html";
            })
    }
};





if (document.querySelector('#btnRegistrar')) {
    document.querySelector('#btnRegistrar')
        .addEventListener('click', registrarDetalle)

}



if (document.querySelector('#editar')) {
    document.querySelector('#editar')
        .addEventListener('click', editar)
    console.log(_id)

}


const editarButton = document.querySelector('#btnEditar');
if (editarButton) {
    editarButton.addEventListener('click', actualizarDetalle);
}