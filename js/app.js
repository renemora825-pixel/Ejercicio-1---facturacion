function agregarFila() {
    const tbody = document.getElementById('productosBody');
    const row = document.createElement('tr');
    row.className = 'product-row';
    row.innerHTML = `
        <td><input type="text" class="descripcion" required></td>
        <td><input type="number" class="cantidad" min="1" value="1" required></td>
        <td><input type="number" class="precio" step="0.01" required></td>
        <td><input type="number" class="subtotal" readonly></td>
        <td><button type="button" onclick="eliminarFila(this)">Eliminar</button></td>
    `;
    tbody.appendChild(row);
    agregarEventos(row);
}

function eliminarFila(button) {
    button.closest('tr').remove();
    calcularTotales();
}

function agregarEventos(row) {
    const cantidadInput = row.querySelector('.cantidad');
    const precioInput = row.querySelector('.precio');
    const subtotalInput = row.querySelector('.subtotal');

    cantidadInput.addEventListener('input', () => calcularSubtotal(row));
    precioInput.addEventListener('input', () => calcularSubtotal(row));
}

function calcularSubtotal(row) {
    const cantidad = parseFloat(row.querySelector('.cantidad').value) || 0;
    const precio = parseFloat(row.querySelector('.precio').value) || 0;
    const subtotal = cantidad * precio;
    row.querySelector('.subtotal').value = subtotal.toFixed(2);
    calcularTotales();
}

function calcularTotales() {
    const rows = document.querySelectorAll('.product-row');
    let subtotalGeneral = 0;
    rows.forEach(row => {
        const subtotal = parseFloat(row.querySelector('.subtotal').value) || 0;
        subtotalGeneral += subtotal;
    });
    const iva = subtotalGeneral * 0.10;
    const total = subtotalGeneral + iva;

    // Si hay elementos de totales, actualizarlos, pero como están en la factura, quizás no aquí.
    // Para la vista previa, no calcular hasta generar.
}

// Agregar eventos a la fila inicial
document.addEventListener('DOMContentLoaded', () => {
    const initialRow = document.querySelector('.product-row');
    agregarEventos(initialRow);
});

function generarFactura() {
    const empresa = document.getElementById('empresa').value;
    const cliente = document.getElementById('cliente').value;
    const rucCliente = document.getElementById('rucCliente').value;
    const fecha = document.getElementById('fecha').value;

    document.getElementById('empresaFactura').textContent = empresa;
    document.getElementById('clienteFactura').textContent = cliente;
    document.getElementById('rucClienteFactura').textContent = rucCliente;
    document.getElementById('fechaFactura').textContent = fecha;
    document.getElementById('numeroFactura').textContent = 'F-' + Date.now();

    const productos = document.querySelectorAll('.product-row');
    const tbody = document.getElementById('productosFactura');
    tbody.innerHTML = '';
    let subtotalGeneral = 0;

    productos.forEach(product => {
        const descripcion = product.querySelector('.descripcion').value;
        const cantidad = parseInt(product.querySelector('.cantidad').value);
        const precio = parseFloat(product.querySelector('.precio').value);
        const subtotal = parseFloat(product.querySelector('.subtotal').value);

        subtotalGeneral += subtotal;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${descripcion}</td>
            <td>${cantidad}</td>
            <td>₲${precio.toFixed(2)}</td>
            <td>₲${subtotal.toFixed(2)}</td>
        `;
        tbody.appendChild(row);
    });

    const iva = subtotalGeneral * 0.10;
    const total = subtotalGeneral + iva;

    document.getElementById('subtotalFactura').textContent = subtotalGeneral.toFixed(2);
    document.getElementById('ivaFactura').textContent = iva.toFixed(2);
    document.getElementById('totalFactura').textContent = total.toFixed(2);
    document.getElementById('factura').style.display = 'block';
}

function imprimirFactura() {
    window.print();
}