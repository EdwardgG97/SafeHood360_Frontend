document.addEventListener('DOMContentLoaded', () => {
  // LOGIN
  const loginBtn = document.getElementById('loginBtn');
  if (loginBtn) {
    loginBtn.addEventListener('click', async () => {
      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value.trim();

      if (!username || !password) {
        alert('⚠️ Por favor, ingresa tu usuario y contraseña.');
        return;
      }

      try {
        // Solicitud al backend comentada para desarrollo local
        /*
        const response = await fetch('http://localhost:8080/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            password: password
          })
        });

        const data = await response.json();
        
        if (!data.success) {
          alert(`⚠️ Error: ${data.message}`);
          return;
        }
        */
        
        // Simulación de respuesta exitosa
        const data = { success: true, message: 'Inicio de sesión simulado' };

        // Login exitoso
        localStorage.setItem('username', username);
        alert('✅ Login exitoso');
        window.location.href = 'HTML/inicio.html';

      } catch (error) {
        alert('⚠️ Error al intentar iniciar sesión. Por favor, intenta de nuevo.');
        console.error('Error en el login:', error);
      }
    });
  }

  // RECUPERACIÓN DE CUENTA
  const sendBtn = document.getElementById('sendBtn');
  if (sendBtn) {
    sendBtn.addEventListener('click', () => {
      const input = document.getElementById('contact');
      const value = input?.value.trim() || '';

      if (!value) {
        alert('⚠️ Por favor, ingresa tu correo o número de teléfono.');
      } else {
        alert('✅ Enlace de recuperación enviado (simulado).');
      }
    });
  }

  // PQRS FORMULARIO
  const pqrsForm = document.getElementById("pqrsForm");
  if (pqrsForm) {
    pqrsForm.addEventListener("submit", function(event) {
      event.preventDefault();
      const successMsg = document.getElementById("successMessage");
      if (successMsg) {
        successMsg.style.display = "block";
      }
    });
  }

  // MENSAJES POR BARRIO
  const mensajesPorBarrio = {
    1: [
      "Juan Carlos: Quisiera reportar una persona sospechosa en la esquina, ¿alguien más puede notarlo?",
      "Carolina García: Sí vecino, yo pude notarlo antes de entrar a mi casa y al parecer está esperando los estudiantes.",
      "Danilo Romero: Esa persona fue vista anteriormente en el barrio siguiente, fue expulsado por la comunidad gracias a esta plataforma, pero ahora quiere dañar nuestro vecindario."
    ],
    2: [
      "Wilson Carrillo: Está frente a mi casa, está hablando con los estudiantes y parece que ofrece droga. Voy a reportarlo :/",
      "Eduard García: Vecina, yo ya hice el reporte con evidencia. Llamaré al cuadrante."
    ],
    3: [
      "¡Sin mensajes por ahora! Sé el primero en escribir una alerta o comentario."
    ]
  };

  function mostrarMensajes(barrio) {
    const contenedor = document.getElementById("mensajes");
    if (contenedor) {
      contenedor.innerHTML = "";
      mensajesPorBarrio[barrio].forEach(mensaje => {
        const p = document.createElement("p");
        p.textContent = mensaje;
        contenedor.appendChild(p);
      });
    }
  }

  // Cargar mensajes por defecto
  mostrarMensajes(1);
  window.mostrarMensajes = mostrarMensajes;

  // GRÁFICO
  const graficoCanvas = document.getElementById('grafico');
  if (graficoCanvas) {
    const ctx = graficoCanvas.getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre'],
        datasets: [{
          label: 'Incidentes',
          data: [20, 45, 30, 25, 15, 18, 22, 30, 55, 70],
          fill: false,
          borderColor: '#3498db',
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }
});

// FUNCIONES GLOBALES

function cerrarMensaje() {
  const msg = document.getElementById("successMessage");
  if (msg) {
    msg.style.display = "none";
  }
}

function abrirModal() {
  const modal = document.getElementById('modal');
  if (modal) modal.classList.remove('hidden');
}

function cerrarModal() {
  const modal = document.getElementById('modal');
  const exito = document.getElementById('exito');
  if (modal) modal.classList.add('hidden');
  if (exito) exito.classList.add('hidden');
}

function enviarReporte() {
  const textarea = document.querySelector('textarea');
  if (!textarea) return;

  const mensaje = textarea.value.trim();
  if (mensaje === "") {
    alert("Por favor describe lo sucedido.");
    return;
  }

  const exito = document.getElementById('exito');
  if (exito) {
    exito.classList.remove('hidden');

    setTimeout(() => {
      cerrarModal();
      textarea.value = '';
    }, 2500);
  }
}

// BUSCADOR DE CONTACTOS
function buscarContacto() {
  const input = document.getElementById('busqueda').value.toLowerCase();
  const contactos = document.querySelectorAll('#lista-contactos li');

  contactos.forEach(contacto => {
    const texto = contacto.textContent.toLowerCase();
    contacto.style.display = texto.includes(input) ? 'block' : 'none';
  });
}

// SIMULACIÓN DE LLAMADA
function simularLlamada() {
  const seleccionado = document.querySelector('input[name="telefono"]:checked');
  const icono = document.querySelector('.icono-llamada');
  const mensaje = document.getElementById('mensaje-llamada');

  if (seleccionado) {
    const numero = seleccionado.value;

    // Animar ícono y mostrar mensaje
    icono.classList.add('llamando');
    mensaje.classList.remove('oculto');

    // Esperar 2 segundos y hacer la llamada
    setTimeout(() => {
      icono.classList.remove('llamando');
      mensaje.classList.add('oculto');
      window.location.href = `tel:${numero}`;
    }, 2000);
  } else {
    alert("⚠️ Por favor, selecciona un número para llamar.");
  }
}
