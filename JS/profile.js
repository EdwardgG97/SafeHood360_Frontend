document.addEventListener('DOMContentLoaded', () => {
    // Obtener el username del localStorage (asumiendo que se guarda al login)
    const username = localStorage.getItem('username');
    if (!username) {
        alert('⚠️ No se ha iniciado sesión');
        window.location.href = '../index.html';
        return;
    }

    // Cargar datos del perfil
    loadProfileData(username);

    // Manejar actualización de perfil
    const updateBtn = document.getElementById('updateProfileBtn');
    if (updateBtn) {
        updateBtn.addEventListener('click', () => {
            updateProfile(username);
        });
    }
});

async function loadProfileData(username) {
    try {
        const response = await fetch(`http://localhost:8080/api/profile?username=${username}`);
        if (!response.ok) {
            throw new Error('Error al cargar el perfil');
        }
        
        const profile = await response.json();
        
        // Llenar campos del formulario
        document.getElementById('firstName').value = profile.firstName || '';
        document.getElementById('lastName').value = profile.lastName || '';
        document.getElementById('gender').value = profile.gender || '';
        document.getElementById('address').value = profile.address || '';
        document.getElementById('email').value = profile.email || '';
        document.getElementById('phone').value = profile.phone || '';
        document.getElementById('birthDate').value = profile.birthDate || '';
        
        // Si hay imagen de perfil, actualizar el avatar
        if (profile.profileImage) {
            const avatar = document.querySelector('.avatar');
            if (avatar) {
                avatar.style.backgroundImage = `url(${profile.profileImage})`;
            }
        }
    } catch (error) {
        alert('⚠️ Error al cargar los datos del perfil');
        console.error('Error:', error);
    }
}

async function updateProfile(username) {
    // Obtener valores del formulario
    const profileData = {
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        gender: document.getElementById('gender').value.trim(),
        address: document.getElementById('address').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        birthDate: document.getElementById('birthDate').value.trim()
    };

    // Validar campos requeridos
    if (!profileData.firstName || !profileData.lastName || !profileData.email) {
        alert('⚠️ Por favor, completa los campos requeridos');
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/api/profile?username=${username}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(profileData)
        });

        if (!response.ok) {
            throw new Error('Error al actualizar el perfil');
        }

        alert('✅ Perfil actualizado exitosamente');
    } catch (error) {
        alert('⚠️ Error al actualizar el perfil');
        console.error('Error:', error);
    }
}

// Manejar subida de imagen de perfil
const profileImageInput = document.getElementById('profileImage');
if (profileImageInput) {
    profileImageInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            // Aquí iría la lógica para subir la imagen al servidor
            // Por ahora, simulamos la subida
            const avatar = document.querySelector('.avatar');
            if (avatar) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    avatar.style.backgroundImage = `url(${e.target.result})`;
                };
                reader.readAsDataURL(file);
            }
        } catch (error) {
            alert('⚠️ Error al subir la imagen');
            console.error('Error:', error);
        }
    });
}
