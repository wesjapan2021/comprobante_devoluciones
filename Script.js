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
        fechaDevolucion: formatDate(urlParams.get('fechaDevolucion')) || '',
        noComprobante: urlParams.get('noComprobante') || '',
        idCliente: urlParams.get('idCliente') || '',
        nombreCliente: urlParams.get('nombreCliente') || '',
        noVenta: urlParams.get('noVenta') || '',
        fechaVenta: formatDate(urlParams.get('fechaVenta')) || '',
        precio: urlParams.get('precioVenta') || '',
        codigoP: urlParams.get('codigoP') || '',
        descripcionP: urlParams.get('descripcionP') || '',
        cantidadDevuelta: urlParams.get('cantidadDevuelta') || '',
        Status: urlParams.get('status') || '',
        motivoDevolucion: urlParams.get('motivoDevolucion') || '',
        procedoA: urlParams.get('procedoA') || '',
        nombreAsesor: urlParams.get('nombreAsesor') || '',
        firmaAsesor: urlParams.get('firmaAsesor') || '',
        idFirmaAsesorImagen: urlParams.get('idFirmaAsesorImagen') || ''
    };

    // Decodificar todos los valores
    Object.keys(params).forEach(key => {
        try {
            params[key] = decodeURIComponent(params[key] || '');
            // Manejar casos especiales
            if (key === 'cantidadPagada' || key === 'totalVenta') {
                if (!params[key].startsWith('Q')) {
                    params[key] = 'Q' + params[key];
                }
            }
            if (key === 'pagoenEfectivo' && !params[key].startsWith(':')) {
                params[key] = ':' + params[key];
            }
        } catch (e) {
            console.error(`Error decodificando ${key}:`, e);
            params[key] = '';
        }
    });

    return params;
}

// Función para asignar valores a los elementos HTML
function setValues() {
    const params = getUrlParameters();
    
    // Asignar valores usando data-field
    Object.keys(params).forEach(key => {
        const elements = document.querySelectorAll(`[data-field="${key}"]`);
        elements.forEach(element => {
            element.textContent = sanitizeHTML(params[key]);
        });
    });

    // Manejar la imagen de la firma
    if (params.idFirmaAsesorImagen) {
        const firmaImg = document.querySelector('.signature img');
        if (firmaImg) {
            firmaImg.src = `https://drive.google.com/thumbnail?id=${params.idFirmaAsesorImagen}&sz=4000`;
        }
    }

    // Generar el código QR
    const qrImg = document.querySelector('.qr-code img');
    if (qrImg && params.noComprobante) {
        qrImg.src = `https://quickchart.io/qr?text=${params.noComprobante}&size=100`;
    }
}

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    try {
        setValues();
        // Imprimir automáticamente
        window.onload = function() {
            window.print();
        };
    } catch (error) {
        console.error('Error en la inicialización:', error);
        alert('Ocurrió un error al inicializar la página. Por favor, recargue la página.');
    }
}); 
