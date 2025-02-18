document.addEventListener('DOMContentLoaded', function() {
    // Function to get URL parameters
    function getUrlParams() {
        const params = new URLSearchParams(window.location.search);
        // Log de la URL completa para debugging
        console.log('URL completa:', window.location.href);
        console.log('Parámetros:', params.toString());
        
        // Decodificar los parámetros correctamente
        return {
            fechaDevolucion: decodeURIComponent(params.get('fechaDevolucion') || ''),
            noComprobante: decodeURIComponent(params.get('noComprobante') || ''),
            idCliente: decodeURIComponent(params.get('idCliente') || ''),
            nombreCliente: decodeURIComponent(params.get('nombreCliente') || ''),
            noVenta: decodeURIComponent(params.get('noVenta') || ''),
            fechaVenta: decodeURIComponent(params.get('fechaVenta') || ''),
            precioV: decodeURIComponent(params.get('precioV') || ''),
            codigoP: decodeURIComponent(params.get('codigoP') || ''),
            descripcionP: decodeURIComponent(params.get('descripcionP') || ''),
            cantidadDevuelta: decodeURIComponent(params.get('cantidadDevuelta') || ''),
            status: decodeURIComponent(params.get('status') || ''),
            motivoDevolucion: decodeURIComponent(params.get('motivoDevolucion') || ''),
            procedoA: decodeURIComponent(params.get('procedoA') || ''),
            nombreAsesor: decodeURIComponent(params.get('nombreAsesor') || ''),
            firmaAsesor: decodeURIComponent(params.get('firmaAsesor') || ''),
            idFirmaAsesorImagen: decodeURIComponent(params.get('idFirmaAsesorImagen') || '')
        };
    }

    // Function to format price
    function formatPrice(price) {
        if (!price) return '';
        // Remover 'Q' si ya existe en el precio
        price = price.toString().replace('Q', '');
        return `Q${parseFloat(price).toFixed(2)}`;
    }

    // Function to format date
    function formatDate(dateStr) {
        if (!dateStr) return '';
        try {
            // Intentar varios formatos de fecha
            let date;
            if (dateStr.includes('/')) {
                const [day, month, year] = dateStr.split('/');
                date = new Date(year, month - 1, day);
            } else {
                date = new Date(dateStr);
            }
            
            if (isNaN(date.getTime())) {
                return dateStr; // Si no se puede parsear, devolver la fecha original
            }
            
            return date.toLocaleDateString('es-GT', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
        } catch (e) {
            console.error('Error al formatear fecha:', e);
            return dateStr;
        }
    }

    // Function to populate the form
    function populateForm() {
        try {
            const params = getUrlParams();
            console.log('Parámetros procesados:', params);

            // Función auxiliar para establecer el contenido de texto
            function setElementText(id, value) {
                const element = document.getElementById(id);
                if (element) {
                    element.textContent = value;
                    console.log(`Estableciendo ${id}:`, value);
                } else {
                    console.error(`Elemento no encontrado: ${id}`);
                }
            }

            // Establecer valores
            setElementText('fechaDevolucion', formatDate(params.fechaDevolucion));
            setElementText('noComprobante', params.noComprobante);
            setElementText('idCliente', params.idCliente);
            setElementText('nombreCliente', params.nombreCliente);
            setElementText('noVenta', params.noVenta);
            setElementText('fechaVenta', formatDate(params.fechaVenta));
            setElementText('precioV', formatPrice(params.precioV));
            setElementText('codigoP', params.codigoP);
            setElementText('descripcionP', params.descripcionP?.replace(':', '') || '');
            setElementText('cantidadDevuelta', params.cantidadDevuelta);
            setElementText('status', params.status);
            setElementText('motivoDevolucion', params.motivoDevolucion);
            setElementText('procedoA', params.procedoA);
            setElementText('nombreAsesor', params.nombreAsesor);

            // Manejar la firma
            const signatureImg = document.getElementById('firmaAsesor');
            if (signatureImg) {
                if (params.idFirmaAsesorImagen) {
                    signatureImg.src = params.idFirmaAsesorImagen;
                    console.log('Firma establecida con idFirmaAsesorImagen');
                } else if (params.firmaAsesor) {
                    signatureImg.src = params.firmaAsesor;
                    console.log('Firma establecida con firmaAsesor');
                } else {
                    signatureImg.style.display = 'none';
                    console.log('No se encontró imagen de firma');
                }
            }
        } catch (error) {
            console.error('Error al popular el formulario:', error);
        }
    }

    // Add print functionality
    const printButton = document.getElementById('printButton');
    if (printButton) {
        printButton.addEventListener('click', function() {
            window.print();
        });
    }

    // Initialize the form
    populateForm();
});
