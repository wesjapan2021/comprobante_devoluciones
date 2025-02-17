function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

window.onload = function() {
    document.getElementById('fechaDevolucion').textContent = getUrlParameter('fechaDevolucion');
    document.getElementById('noComprobante').textContent = getUrlParameter('noComprobante');
    document.getElementById('idCliente').textContent = getUrlParameter('idCliente');
    document.getElementById('nombreCliente').textContent = getUrlParameter('nombreCliente');
    document.getElementById('noVenta').textContent = getUrlParameter('noVenta');
    document.getElementById('fechaVenta').textContent = getUrlParameter('fechaVenta');
    document.getElementById('precioV').textContent = getUrlParameter('precioV');
    document.getElementById('codigoP').textContent = getUrlParameter('codigoP');
    document.getElementById('descripcionP').textContent = getUrlParameter('descripcionP');
    document.getElementById('cantidadDevuelta').textContent = getUrlParameter('cantidadDevuelta');
    document.getElementById('status').textContent = getUrlParameter('status');
    document.getElementById('motivoDevolucion').textContent = getUrlParameter('motivoDevolucion');
    document.getElementById('procedoA').textContent = getUrlParameter('procedoA');
    document.getElementById('nombreAsesor').textContent = getUrlParameter('nombreAsesor');
    
    // Para la firma, asumiendo que es una URL de imagen
    let firmaUrl = getUrlParameter('firmaAsesor');
    if (firmaUrl) {
        document.getElementById('firmaAsesor').src = firmaUrl;
    }
}
