const USUARIO_VALIDO = 'umg';
const CONTRASENA_VALIDA = 'admin';

function cambiarEstilo(archivoCSS) {
    const hojaEstilos = document.getElementById('hoja-estilos');
    hojaEstilos.setAttribute('href', archivoCSS);

    localStorage.setItem('estilo-seleccionado', archivoCSS);
}

function sinEstilos() {
    const hojaEstilos = document.getElementById('hoja-estilos');
    hojaEstilos.setAttribute('href', '');

    localStorage.removeItem('estilo-seleccionado');
}

function mostrarMensaje(texto, tipo) {
    const contenedorMensaje = document.getElementById('mensaje-resultado');

    contenedorMensaje.className = 'mensaje-oculto';

    if (tipo === 'exito') {
        contenedorMensaje.classList.add('mensaje-exito');
    } else if (tipo === 'error') {
        contenedorMensaje.classList.add('mensaje-error');
    }

    contenedorMensaje.textContent = texto;
    contenedorMensaje.style.display = 'block';

    setTimeout(() => {
        contenedorMensaje.style.display = 'none';
    }, 5000);
}

function validarLogin(evento) {
    evento.preventDefault();

    const usuario = document.getElementById('usuario').value.trim();
    const contrasena = document.getElementById('contrasena').value;

    if (usuario === '' || contrasena === '') {
        mostrarMensaje('Por favor, complete todos los campos.', 'error');
        return false;
    }

    if (usuario === USUARIO_VALIDO && contrasena === CONTRASENA_VALIDA) {
        mostrarMensaje('¡Login exitoso! Bienvenido al sistema.', 'exito');

        setTimeout(() => {
            document.getElementById('formulario-login').reset();
        }, 1000);

    } else {
        mostrarMensaje('Usuario o contraseña incorrectos. Intente nuevamente.', 'error');

        document.getElementById('contrasena').value = '';
    }

    return false;
}

// Función para cargar estilo guardado
function cargarEstiloGuardado() {
    const estiloGuardado = localStorage.getItem('estilo-seleccionado');
    if (estiloGuardado && estiloGuardado !== '') {
        cambiarEstilo(estiloGuardado);
    }
}


function agregarEventosTeclado() {
    document.addEventListener('keypress', function (evento) {
        if (evento.key === 'Enter') {
            const formulario = document.getElementById('formulario-login');
            if (document.activeElement.tagName === 'INPUT') {
                evento.preventDefault();
                validarLogin(evento);
            }
        }
    });
}

function inicializar() {
    cargarEstiloGuardado();

    const formulario = document.getElementById('formulario-login');
    formulario.addEventListener('submit', validarLogin);

    agregarEventosTeclado();

    document.getElementById('usuario').focus();

    console.log('Sistema de login inicializado correctamente');
    console.log('Credenciales de prueba: usuario="umg", contraseña="admin"');
}

document.addEventListener('DOMContentLoaded', inicializar);

function limpiarFormulario() {
    document.getElementById('formulario-login').reset();
    document.getElementById('mensaje-resultado').style.display = 'none';
}

function validarEntrada() {
    const campoUsuario = document.getElementById('usuario');
    const campoContrasena = document.getElementById('contrasena');

    // Validar longitud mínima mientras el usuario escribe
    campoUsuario.addEventListener('input', function () {
        if (this.value.length > 0 && this.value.length < 3) {
            this.style.borderColor = '#f39c12';
        } else if (this.value.length >= 3) {
            this.style.borderColor = '#27ae60';
        }
    });

    campoContrasena.addEventListener('input', function () {
        if (this.value.length > 0 && this.value.length < 4) {
            this.style.borderColor = '#f39c12';
        } else if (this.value.length >= 4) {
            this.style.borderColor = '#27ae60';
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    setTimeout(validarEntrada, 500);
});
