const url = 'https://proyectofinalnode.onrender.com/api/producto'
const listarProducto = async () => {
    let body = document.getElementById('contenido');
    if (body) {
        let mensaje = '';

        fetch(url)
            .then(res => res.json())
            .then(data => {
                const productos = data.producto;
                productos.map((producto) => {
                    console.log(producto);

                    mensaje += `<tr><td>${producto.nombre}</td>` +
                        `<td>${producto.descripcion}</td>` +
                        `<td>${producto.precio}</td>` +
                        `<td>${producto.estado}</td>` +
                        

                        `<td>
                    <a class="waves-effect waves-light btn modal-trigger" href="#modal1" onclick='editar(${JSON.stringify(producto)})'>Editar</a>
                    <a class="waves-effect waves-light btn modal-trigger purple" href="#" onclick='eliminar("${producto._id}")'>Eliminar</a>
                 </td></tr>`;
                    body.innerHTML = mensaje;
                });

            })
    }
};
listarProducto();



const registrarProducto = async () => {
    let nombre = document.getElementById('nombre').value
    let descripcion = document.getElementById('descripcion').value
    let precio = document.getElementById('precio').value
    let estado = document.getElementById('estado').value


    let producto = {
        nombre: nombre,
        descripcion: descripcion,
        precio: precio,
        estado: estado
    };

    if (precio > 0) {
        const regExpName = /([A-Za-z0-9\s])/;
        if (!regExpName.test(nombre)) {
          alert('Ingresa nombre');
          return;
        }
        if (!regExpName.test(descripcion)) {
          alert('Ingresa descripción');
          return;
        }
        if (estado !== "Activo" && estado !== "Inactivo") {
          alert('Ingresa un estado correcto');
          return;
        }
        
        fetch(url, {
          method: 'POST',
          mode: 'cors',
          body: JSON.stringify(producto),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            alert('Se registró exitosamente');
            window.location.href = "listarProducto.html";
          });
      } else {
        alert('No se puede registrar');
      } 
};


    const editar = (producto) => {
        let _id = document.getElementById('_id').value = '';
        let nombre = document.getElementById('nombre').value = '';
        let descripcion = document.getElementById('descripcion').value = '';
        let precio = document.getElementById('precio').value = '';
        let estado = document.getElementById('estado').value = '';

        document.getElementById('_id').value = producto._id;
        document.getElementById('nombre').value = producto.nombre;
        document.getElementById('descripcion').value = producto.descripcion;
        document.getElementById('precio').value = producto.precio;
        document.getElementById('estado').value = producto.estado;
    }
    
    const actualizarProducto = async () => {
        let nombre = document.getElementById('nombre').value;
        let descripcion = document.getElementById('descripcion').value;
        let precio = parseFloat(document.getElementById('precio').value);
        let estado = document.getElementById('estado').value;
    
        let producto = {
            _id: document.getElementById('_id').value,
            nombre: nombre,
            descripcion: descripcion,
            precio: precio,
            estado: estado
        };
        
        if (precio > 0) {
            const regExpName = /([A-Za-z0-9\s])/;
            if (!regExpName.test(nombre)) {
              return;
            }
            if (!regExpName.test(descripcion)) {
              return;
            }
            if (estado !== "Activo" && estado !== "Inactivo") {
              alert('Ingresa un estado correcto');
              return;
            }
            
            fetch(url, {
              method: 'PUT',
              mode: 'cors',
              body: JSON.stringify(producto),
              headers: { "Content-type": "application/json; charset=UTF-8" }
            })
              .then(response => response.json())
              .then(json => {
                alert(json.mensaje);
                window.location.href = "listarProducto.html";
              });
          
          } else {
            alert('No se pudo realizar la modificación');
          }
};

const eliminar = (_id) => {
    if (confirm('¿Está seguro de realizar la eliminación?')) {
        const producto = { _id: _id };

        fetch(url, {
            method: 'DELETE',
            mode: 'cors',
            body: JSON.stringify(producto),
            headers: { "Content-Type": "application/json" }
        })
            .then(response => response.json())
            .then(data => {
                alert(data.producto);
                window.location.href = "listarProducto.html";
            })
    }
};



    if (document.querySelector('#btnRegistrar')) {
        document.querySelector('#btnRegistrar')
            .addEventListener('click', registrarProducto)

    }

    if (document.querySelector('#editar')) {
        document.querySelector('#editar')
            .addEventListener('click', editar)
        console.log(_id)

    }

    const editarButton = document.querySelector('#btnEditar');
    if (editarButton) {
        editarButton.addEventListener('click', actualizarProducto);
    }