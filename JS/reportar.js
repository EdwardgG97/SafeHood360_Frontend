// Manejo del modal
function abrirModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('hidden');
}

function cerrarModal() {
    const modal = document.getElementById('modal');
    modal.classList.add('hidden');
    // Limpiar el modal
    const textarea = modal.querySelector('textarea');
    const exito = modal.querySelector('#exito');
    const fileInput = modal.querySelector('input[type="file"]');
    
    if (textarea) textarea.value = '';
    if (exito) exito.classList.add('hidden');
    if (fileInput) fileInput.value = '';
}

// Manejo de carga de archivos
document.addEventListener('DOMContentLoaded', function() {
    const cargarEvidencia = document.querySelector('.cargar-evidencia');
    if (cargarEvidencia) {
        const fileInput = cargarEvidencia.querySelector('input[type="file"]');
        
        if (fileInput) {
            cargarEvidencia.addEventListener('click', function(e) {
                if (e.target !== fileInput) {
                    fileInput.click();
                }
            });

            fileInput.addEventListener('change', function(e) {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        // Aquí podríamos mostrar una vista previa de la imagen
                        console.log('Archivo seleccionado:', file.name);
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
    }
});

// Manejo de envío de reporte
function enviarReporte() {
    const modal = document.getElementById('modal');
    const textarea = modal.querySelector('textarea');
    const fileInput = modal.querySelector('input[type="file"]');
    const exito = modal.querySelector('#exito');
    const loadingMessage = document.createElement('p');
    loadingMessage.textContent = 'Enviando...';
    loadingMessage.style.color = '#4CAF50';

    // Validar campos
    if (!textarea.value.trim()) {
        alert('⚠️ Por favor, describe lo que sucedió');
        return;
    }

    // Obtener el username del localStorage
    const username = localStorage.getItem('username');
    if (!username) {
        alert('⚠️ No estás logueado');
        return;
    }

    // Preparar datos
    const data = {
        username: username,
        description: textarea.value.trim(),
        latitude: 4.5446,  // Coordenadas de Soacha
        longitude: -74.0997
    };

    // Si hay archivo, convertir a base64
    if (fileInput && fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            data.evidence = e.target.result;
            enviarDatos(data);
        };
        reader.readAsDataURL(file);
    } else {
        enviarDatos(data);
    }
}

function enviarDatos(data) {
    // Petición al backend comentada para desarrollo local
    /*
    fetch('http://localhost:8080/api/reports', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            mostrarExito();
        } else {
            throw new Error('Error en la respuesta del servidor');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('❌ Error al enviar el reporte');
    });
    */
    
    // Simulación de envío exitoso
    console.log('Datos del reporte simulado:', data);
    mostrarExito();
}

function mostrarExito() {
    const exito = document.getElementById('exito');
    if (exito) {
        exito.classList.remove('hidden');
        setTimeout(cerrarModal, 2000);
    }
}
