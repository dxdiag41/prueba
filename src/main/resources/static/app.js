const API_URL = '/api';

document.getElementById('producto-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const id = document.getElementById('producto-id').value;
    const sku = document.getElementById('producto-sku').value;
    const nombre = document.getElementById('producto-nombre').value;
    const descripcion = document.getElementById('producto-descripcion').value;
    const precio = document.getElementById('producto-precio').value;

    if (id) {
        actualizarProducto(id, { sku, nombre, descripcion, precio });
    } else {
        agregarProducto({ sku, nombre, descripcion, precio });
    }
});

document.getElementById('plazo-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const id = document.getElementById('plazo-id').value;
    const semanas = document.getElementById('plazo-semanas').value;
    const tasaNormal = document.getElementById('plazo-tasa-normal').value;
    const tasaPuntual = document.getElementById('plazo-tasa-puntual').value;

    if (id) {
        actualizarPlazo(id, { semanas, tasaNormal, tasaPuntual });
    } else {
        agregarPlazo({ semanas, tasaNormal, tasaPuntual });
    }
});

document.getElementById('cotizacion-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const sku = document.getElementById('cotizacion-sku').value;
    const plazoId = document.getElementById('cotizacion-plazo').value;
    cotizarCredito(sku, plazoId);
});

function agregarProducto(producto) {
    fetch(`${API_URL}/productos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(producto)
    })
        .then(response => response.json())
        .then(producto => {
            mostrarProducto(producto);
            limpiarFormularioProducto();
        })
        .catch(error => console.error('Error al agregar producto:', error));
}

function actualizarProducto(id, producto) {
    fetch(`${API_URL}/productos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(producto)
    })
        .then(response => response.json())
        .then(producto => {
            document.getElementById(`producto-${id}`).innerHTML = `
            SKU: ${producto.sku}, Nombre: ${producto.nombre}, Descripción: ${producto.descripcion}, Precio: ${producto.precio}
            <button onclick="cargarProductoParaEdicion(${id})">Editar</button>
            <button onclick="eliminarProducto(${id})">Eliminar</button>
        `;
            limpiarFormularioProducto();
        })
        .catch(error => console.error('Error al actualizar producto:', error));
}

function eliminarProducto(id) {
    fetch(`${API_URL}/productos/${id}`, {
        method: 'DELETE'
    })
        .then(() => {
            document.querySelector(`#producto-${id}`).remove();
        })
        .catch(error => console.error('Error al eliminar producto:', error));
}

function mostrarProducto(producto) {
    const li = document.createElement('li');
    li.id = `producto-${producto.id}`;
    li.innerHTML = `
        SKU: ${producto.sku}, Nombre: ${producto.nombre}, Descripción: ${producto.descripcion}, Precio: ${producto.precio}
        <button onclick="cargarProductoParaEdicion(${producto.id})">Editar</button>
        <button onclick="eliminarProducto(${producto.id})">Eliminar</button>
    `;
    document.getElementById('productos-list').appendChild(li);
}

function limpiarFormularioProducto() {
    document.getElementById('producto-id').value = '';
    document.getElementById('producto-sku').value = '';
    document.getElementById('producto-nombre').value = '';
    document.getElementById('producto-descripcion').value = '';
    document.getElementById('producto-precio').value = '';
}

function cargarProductoParaEdicion(id) {
    fetch(`${API_URL}/productos/${id}`)
        .then(response => response.json())
        .then(producto => {
            document.getElementById('producto-id').value = producto.id;
            document.getElementById('producto-sku').value = producto.sku;
            document.getElementById('producto-nombre').value = producto.nombre;
            document.getElementById('producto-descripcion').value = producto.descripcion;
            document.getElementById('producto-precio').value = producto.precio;
        })
        .catch(error => console.error('Error al cargar producto para edición:', error));
}

function agregarPlazo(plazo) {
    fetch(`${API_URL}/plazos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(plazo)
    })
        .then(response => response.json())
        .then(plazo => {
            mostrarPlazo(plazo);
            limpiarFormularioPlazo();
        })
        .catch(error => console.error('Error al agregar plazo:', error));
}

function actualizarPlazo(id, plazo) {
    fetch(`${API_URL}/plazos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(plazo)
    })
        .then(response => response.json())
        .then(plazo => {
            document.getElementById(`plazo-${id}`).innerHTML = `
            Semanas: ${plazo.semanas}, Tasa Normal: ${plazo.tasaNormal}, Tasa Puntual: ${plazo.tasaPuntual}
            <button onclick="cargarPlazoParaEdicion(${id})">Editar</button>
            <button onclick="eliminarPlazo(${id})">Eliminar</button>
        `;
            limpiarFormularioPlazo();
        })
        .catch(error => console.error('Error al actualizar plazo:', error));
}

function eliminarPlazo(id) {
    fetch(`${API_URL}/plazos/${id}`, {
        method: 'DELETE'
    })
        .then(() => {
            document.querySelector(`#plazo-${id}`).remove();
        })
        .catch(error => console.error('Error al eliminar plazo:', error));
}

function mostrarPlazo(plazo) {
    const li = document.createElement('li');
    li.id = `plazo-${plazo.id}`;
    li.innerHTML = `
        Semanas: ${plazo.semanas}, Tasa Normal: ${plazo.tasaNormal}, Tasa Puntual: ${plazo.tasaPuntual}
        <button onclick="cargarPlazoParaEdicion(${plazo.id})">Editar</button>
        <button onclick="eliminarPlazo(${plazo.id})">Eliminar</button>
    `;
    document.getElementById('plazos-list').appendChild(li);
}

function limpiarFormularioPlazo() {
    document.getElementById('plazo-id').value = '';
    document.getElementById('plazo-semanas').value = '';
    document.getElementById('plazo-tasa-normal').value = '';
    document.getElementById('plazo-tasa-puntual').value = '';
}

function cargarPlazoParaEdicion(id) {
    fetch(`${API_URL}/plazos/${id}`)
        .then(response => response.json())
        .then(plazo => {
            document.getElementById('plazo-id').value = plazo.id;
            document.getElementById('plazo-semanas').value = plazo.semanas;
            document.getElementById('plazo-tasa-normal').value = plazo.tasaNormal;
            document.getElementById('plazo-tasa-puntual').value = plazo.tasaPuntual;
        })
        .catch(error => console.error('Error al cargar plazo para edición:', error));
}

function cotizarCredito(sku, plazoId) {
    fetch(`${API_URL}/productos?sku=${sku}`)
        .then(response => response.json())
        .then(productos => {
            if (productos.length > 0) {
                const producto = productos[0];
                fetch(`${API_URL}/plazos/${plazoId}`)
                    .then(response => response.json())
                    .then(plazo => {
                        const precio = producto.precio;
                        const abonoNormal = ((precio * plazo.tasaNormal) + precio) / plazo.semanas;
                        const abonoPuntual = ((precio * plazo.tasaPuntual) + precio) / plazo.semanas;
                        document.getElementById('cotizacion-result').innerHTML = `
                    <p>Abono Normal: ${abonoNormal.toFixed(2)}</p>
                    <p>Abono Puntual: ${abonoPuntual.toFixed(2)}</p>
                `;
                    })
                    .catch(error => console.error('Error al obtener plazo:', error));
            } else {
                document.getElementById('cotizacion-result').innerHTML = 'Producto no encontrado.';
            }
        })
        .catch(error => console.error('Error al obtener producto:', error));
}

window.onload = function() {
    cargarProductos();
    cargarPlazos();
}

function cargarProductos() {
    fetch(`${API_URL}/productos`)
        .then(response => response.json())
        .then(productos => {
            productos.forEach(producto => mostrarProducto(producto));
        })
        .catch(error => console.error('Error al cargar productos:', error));
}

function cargarPlazos() {
    fetch(`${API_URL}/plazos`)
        .then(response => response.json())
        .then(plazos => {
            plazos.forEach(plazo => mostrarPlazo(plazo));
            const plazoSelect = document.getElementById('cotizacion-plazo');
            plazos.forEach(plazo => {
                const option = document.createElement('option');
                option.value = plazo.id;
                option.textContent = `Plazo ${plazo.semanas} semanas`;
                plazoSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error al cargar plazos:', error));
}