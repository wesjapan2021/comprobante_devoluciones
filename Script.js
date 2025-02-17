// Función para sanitizar el HTML
function sanitizeHTML(str) {
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
}

// Función para formatear fecha a dd/mm/yyyy
function formatDate(dateStr) {
    if (!dateStr) return '';
    try {
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return dateStr;
        
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        
        return `${day}/${month}/${year}`;
    } catch (e) {
        console.error('Error formateando fecha:', e);
        return dateStr;
    }
}

// Función para obtener y decodificar parámetros de la URL
function getUrlParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const params = {
        fechaDevolucion: formatDate(decodeURIComponent(urlParams.get('fechaDevolucion') || '')),
        noComprobante: decodeURIComponent(urlParams.get('noComprobante') || ''),
        idCliente: decodeURIComponent(urlParams.get('idCliente') || ''),
        nombreCliente: decodeURIComponent(urlParams.get('nombreCliente') || ''),
        noVenta: decodeURIComponent(urlParams.get('noVenta') || ''),
        fechaVenta: formatDate(decodeURIComponent(urlParams.get('fechaVenta') || '')),
        precioV: decodeURIComponent(urlParams.get('precioV') || ''),
        codigoP: decodeURIComponent(urlParams.get('codigoP') || ''),
        descripcionP: decodeURIComponent(urlParams.get('descripcionP') || ''),
        cantidadDevuelta: decodeURIComponent(urlParams.get('cantidadDevuelta') || ''),
        status: decodeURIComponent(urlParams.get('status') || ''),
        motivoDevolucion: decodeURIComponent(urlParams.get('motivoDevolucion') || ''),
        procedoA: decodeURIComponent(urlParams.get('procedoA') || ''),
        nombreAsesor: decodeURIComponent(urlParams.get('nombreAsesor') || ''),
        firmaAsesor: decodeURIComponent(urlParams.get('firmaAsesor') || ''),
        idFirmaAsesorImagen: decodeURIComponent(urlParams.get('idFirmaAsesorImagen') || '')
    };

    return params;
}

// Función para asignar valores a los elementos HTML
function setValues() {
    const params = getUrlParameters();
    
    // Asignar valores usando data-field
    Object.keys(params).forEach(key => {
        const elements = document.querySelectorAll(`[data-field="${key}"]`);
        elements.forEach(element => {
            // Si es un campo de precio, formatear como moneda
            if (key === 'precioV') {
                const price = parseFloat(params[key]);
                if (!isNaN(price)) {
                    element.textContent = price.toLocaleString('es-GT', {
                        style: 'currency',
                        currency: 'GTQ'
                    });
                } else {
                    element.textContent = sanitizeHTML(params[key]);
                }
            } else {
                element.textContent = sanitizeHTML(params[key]);
            }
        });
    });

    // Manejar la imagen de la firma
    if (params.idFirmaAsesorImagen) {
        const firmaImg = document.querySelector('.signature img');
        if (firmaImg) {
            firmaImg.src = `https://drive.google.com/thumbnail?id=${params.idFirmaAsesorImagen}&sz=4000`;
            firmaImg.alt = `Firma de ${params.nombreAsesor}`;
        }
    }

    // Generar el código QR si existe noComprobante
    const qrImg = document.querySelector('.qr-code img');
    if (qrImg && params.noComprobante) {
        qrImg.src = `https://quickchart.io/qr?text=${params.noComprobante}&size=100`;
        qrImg.alt = `QR Comprobante ${params.noComprobante}`;
    }
}

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    try {
        setValues();
        // Imprimir automáticamente cuando todos los recursos (imágenes) se hayan cargado
        window.onload = function() {
            // Pequeño retraso para asegurar que las imágenes se hayan renderizado completamente
            setTimeout(() => {
                window.print();
            }, 1000);
        };
    } catch (error) {
        console.error('Error en la inicialización:', error);
        alert('Ocurrió un error al inicializar la página. Por favor, recargue la página.');
    }
});
