document.addEventListener('DOMContentLoaded', function() {
    // Obtener el formulario
    const form = document.querySelector('.registro-form');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Obtener todos los campos del formulario
            const nombres = document.getElementById('nombres').value.trim();
            const apellidos = document.getElementById('apellidos').value.trim();
            const correo = document.getElementById('correo').value.trim();
            const contrasena = document.getElementById('contrasena').value.trim();
            const direccion = document.getElementById('direccion').value.trim();
            const celular = document.getElementById('celular').value.trim();
            const nacimiento = document.getElementById('nacimiento').value;
            const sexo = document.getElementById('sexo').value.trim();
            const barrio1 = document.getElementById('barrio1').value.trim();
            const barrio2 = document.getElementById('barrio2').value.trim();
            const barrio3 = document.getElementById('barrio3').value.trim();

            // Validar campos requeridos
            if (!nombres || !apellidos || !correo || !contrasena) {
                alert('⚠️ Por favor, completa todos los campos requeridos');
                return;
            }

            try {
                // Preparar los datos para enviar
                const data = {
                    firstName: nombres,
                    lastName: apellidos,
                    email: correo,
                    password: contrasena,
                    address: direccion,
                    phone: celular,
                    birthDate: nacimiento,
                    gender: sexo,
                    barrio1: barrio1,
                    barrio2: barrio2,
                    barrio3: barrio3
                };

                // Petición al backend comentada para desarrollo local
                /*
                const response = await fetch('http://localhost:8080/api/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.text();
                */

                // Simulación de registro exitoso
                console.log('Datos simulados del registro:', data);
                alert('✅ Registro simulado exitoso');
                // Redirigir al login
                window.location.href = '../index.html';
            } catch (error) {
                console.error('Error:', error);
                alert('❌ Error al registrar');
            }
        });
    }
});
