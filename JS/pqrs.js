document.addEventListener('DOMContentLoaded', function() {
    // Obtener el formulario
    const form = document.getElementById('pqrsForm');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Obtener los valores del formulario
            const email = document.querySelector('input[type="email"]').value;
            const message = document.querySelector('textarea').value;

            // Validar campos
            if (!email || !message) {
                alert('Por favor, completa todos los campos');
                return;
            }

            try {
                // Obtener el username del localStorage
                const username = localStorage.getItem('username');
                if (!username) {
                    alert('No estás logueado');
                    return;
                }

                // Preparar los datos para enviar
                const data = {
                    email: email,
                    message: message
                };

                // Petición al backend comentada para desarrollo local
                /*
                const response = await fetch(`http://localhost:8080/api/pqrs?username=${username}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                */

                // Simulación de respuesta exitosa
                const response = { ok: true };
                
                // Mostrar mensaje de éxito
                const successMessage = document.getElementById('successMessage');
                if (successMessage) {
                    successMessage.style.display = 'block';
                    // Limpiar el formulario
                    form.reset();
                }
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error al enviar el PQRS');
            }
        });
    }

    // Función para cerrar el mensaje de éxito
    function cerrarMensaje() {
        const successMessage = document.getElementById('successMessage');
        if (successMessage) {
            successMessage.style.display = 'none';
        }
    }
});
