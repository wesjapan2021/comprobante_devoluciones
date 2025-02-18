script.js

document.addEventListener('DOMContentLoaded', function() {
    // Function to get URL parameters
    function getUrlParams() {
        const params = new URLSearchParams(window.location.search);
        return {
            fechaDevolucion: params.get('fechaDevolucion'),
            noComprobante: params.get('noComprobante'),
            idCliente: params.get('idCliente'),
            nombreCliente: params.get('nombreCliente'),
            noVenta: params.get('noVenta'),
            fechaVenta: params.get('fechaVenta'),
            precioV: params.get('precioV'),
            codigoP: params.get('codigoP'),
            descripcionP: params.get('descripcionP'),
            cantidadDevuelta: params.get('cantidadDevuelta'),
            status: params.get('status'),
            motivoDevolucion: params.get('motivoDevolucion'),
            procedoA: params.get('procedoA'),
            nombreAsesor: params.get('nombreAsesor'),
            firmaAsesor: params.get('firmaAsesor'),
            idFirmaAsesorImagen: params.get('idFirmaAsesorImagen')
        };
    }

    // Function to format price
    function formatPrice(price) {
        if (!price) return '';
        return `Q${parseFloat(price).toFixed(2)}`;
    }

    // Function to format date
    function formatDate(dateStr) {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('es-GT', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }

    // Function to populate the form
    function populateForm() {
        const params = getUrlParams();
        
        // Set text content for each field
        document.getElementById('fechaDevolucion').textContent = formatDate(params.fechaDevolucion);
        document.getElementById('noComprobante').textContent = params.noComprobante;
        document.getElementById('idCliente').textContent = params.idCliente;
        document.getElementById('nombreCliente').textContent = params.nombreCliente;
        document.getElementById('noVenta').textContent = params.noVenta;
        document.getElementById('fechaVenta').textContent = formatDate(params.fechaVenta);
        document.getElementById('precioV').textContent = formatPrice(params.precioV);
        document.getElementById('codigoP').textContent = params.codigoP;
        document.getElementById('descripcionP').textContent = params.descripcionP?.replace(':', '') || '';
        document.getElementById('cantidadDevuelta').textContent = params.cantidadDevuelta;
        document.getElementById('status').textContent = params.status;
        document.getElementById('motivoDevolucion').textContent = params.motivoDevolucion;
        document.getElementById('procedoA').textContent = params.procedoA;
        document.getElementById('nombreAsesor').textContent = params.nombreAsesor;

        // Handle signature image
        const signatureImg = document.getElementById('firmaAsesor');
        if (params.idFirmaAsesorImagen) {
            signatureImg.src = params.idFirmaAsesorImagen;
        } else if (params.firmaAsesor) {
            signatureImg.src = params.firmaAsesor;
        } else {
            signatureImg.style.display = 'none';
        }
    }

    // Add print functionality
    document.getElementById('printButton').addEventListener('click', function() {
        window.print();
    });

    // Initialize the form
    populateForm();
});
