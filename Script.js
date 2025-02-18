document.addEventListener('DOMContentLoaded', function() {
    function getUrlParams() {
        const params = new URLSearchParams(window.location.search);
        const result = {};
        
        params.forEach((value, key) => {
            // Decodificar el valor correctamente
            result[key] = decodeURIComponent(value);
        });
        
        return result;
    }

    function formatPrice(price) {
        if (!price) return '';
        // Remover cualquier 'Q' existente y formatear
        const numericPrice = price.toString().replace('Q', '').replace(',', '');
        return `Q${parseFloat(numericPrice).toFixed(2)}`;
    }

    function formatDate(dateStr) {
        if (!dateStr) return '';
        // La fecha ya viene en formato DD/MM/YYYY, solo la retornamos
        return dateStr;
    }

    function populateForm() {
        const params = getUrlParams();
        console.log('Parámetros recibidos:', params);

        // Mapear cada parámetro a su elemento correspondiente
        const mappings = {
            'fechaDevolucion': 'fechaDevolucion',
            'noComprobante': 'noComprobante',
            'idCliente': 'idCliente',
            'nombreCliente': 'nombreCliente',
            'noVenta': 'noVenta',
            'fechaVenta': 'fechaVenta',
            'precioV': 'precioV',
            'codigoP': 'codigoP',
            'descripcionP': 'descripcionP',
            'cantidadDevuelta': 'cantidadDevuelta',
            'status': 'status',
            'motivoDevolucion': 'motivoDevolucion',
            'procedoA': 'procedoA',
            'nombreAsesor': 'nombreAsesor'
        };

        // Establecer cada valor en su elemento correspondiente
        for (const [paramName, elementId] of Object.entries(mappings)) {
            const element = document.getElementById(elementId);
            console.log(`Buscando elemento con ID ${elementId}:`, element);
            if (element && params[paramName]) {
                let value = params[paramName];
                console.log(`Valor recibido para ${paramName}:`, value);
                
                // Aplicar formato específico según el campo
                if (paramName === 'precioV') {
                    value = formatPrice(value);
                } else if (paramName === 'fechaDevolucion' || paramName === 'fechaVenta') {
                    value = formatDate(value);
                } else if (paramName === 'descripcionP') {
                    value = value.replace(':', '');
                }
                
                element.textContent = value;
            }
        }

        // Manejar la imagen de la firma
        const signatureImg = document.getElementById('firmaAsesor');
        if (signatureImg) {
            if (params.idFirmaAsesorImagen) {
                signatureImg.src = decodeURIComponent(params.idFirmaAsesorImagen);
            } else if (params.firmaAsesor) {
                signatureImg.src = decodeURIComponent(params.firmaAsesor);
            } else {
                signatureImg.style.display = 'none';
            }
        }
    }

    // Agregar funcionalidad de impresión
    const printButton = document.getElementById('printButton');
    if (printButton) {
        printButton.addEventListener('click', function() {
            window.print();
        });
    }

    // Inicializar el formulario
    populateForm();
});
