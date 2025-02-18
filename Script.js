document.addEventListener('DOMContentLoaded', function() {
    // Imprimir la URL completa en la página
    const urlDiv = document.createElement('div');
    urlDiv.style.padding = '10px';
    urlDiv.style.margin = '10px';
    urlDiv.style.border = '1px solid black';
    urlDiv.innerHTML = `<strong>URL actual:</strong> ${window.location.href}`;
    document.body.insertBefore(urlDiv, document.body.firstChild);

    // Obtener y mostrar todos los parámetros
    const params = new URLSearchParams(window.location.search);
    const paramsDiv = document.createElement('div');
    paramsDiv.style.padding = '10px';
    paramsDiv.style.margin = '10px';
    paramsDiv.style.border = '1px solid black';
    paramsDiv.innerHTML = '<strong>Parámetros recibidos:</strong><br>';
    
    // Mostrar cada parámetro
    params.forEach((value, key) => {
        paramsDiv.innerHTML += `${key}: ${value}<br>`;
        // Intentar establecer el valor en el elemento correspondiente
        const element = document.getElementById(key);
        if (element) {
            element.textContent = value;
        }
    });
    
    document.body.insertBefore(paramsDiv, document.body.firstChild);
});
