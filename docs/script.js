document.addEventListener('DOMContentLoaded', function() {
    // Referencias a los elementos HTML del DOM
    const inputMesas = document.getElementById('inputMesas');
    const inputUbicacion = document.getElementById('inputUbicacion');
    const inputPollos = document.getElementById('inputPollos');
    const selectEvento = document.getElementById('selectEvento');
    const resultadoMeseros = document.getElementById('resultadoMeseros');
    const boxPolloSubtotal = document.getElementById('boxPolloSubtotal');
    const txtPolloResumen = document.getElementById('txtPolloResumen');
    const btnCotizarWhatsApp = document.getElementById('btnCotizarWhatsApp');

    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    // Alternar la visibilidad del menú desplegable para móviles
    if(mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('flex');
        });
    }

    // Cerrar el menú móvil automáticamente al presionar cualquier enlace
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('flex');
        });
    });

    // Función para calcular automáticamente la cantidad de meseros y subtotales
    function calcularMeseros() {
        let mesas = parseInt(inputMesas.value) || 0;
        if (mesas < 1) mesas = 1;

        // Cálculo: 1 mesero por cada 3 mesas (redondeado hacia arriba)
        let meserosRequeridos = Math.ceil(mesas / 3);
        resultadoMeseros.textContent = `${meserosRequeridos}`;

        // Cálculo del precio del servicio de pollo
        let numPollos = parseInt(inputPollos.value) || 0;
        if (numPollos > 0) {
            let totalPollo = numPollos * 80;
            txtPolloResumen.textContent = `${numPollos} pollo(s) = $${totalPollo} MXN`;
            boxPolloSubtotal.classList.remove('hidden');
        } else {
            boxPolloSubtotal.classList.add('hidden');
        }
    }

    // Eventos para actualizar la calculadora dinámicamente al escribir o cambiar opciones
    inputMesas.addEventListener('input', calcularMeseros);
    inputPollos.addEventListener('input', calcularMeseros);
    selectEvento.addEventListener('change', calcularMeseros);

    // Generación de la plantilla de mensaje predefinido para WhatsApp mediante el botón de cotización
    btnCotizarWhatsApp.addEventListener('click', function() {
        const mesas = inputMesas.value;
        const evento = selectEvento.value;
        const meseros = resultadoMeseros.textContent;
        const ubicacion = inputUbicacion.value.trim() || 'Ixtlahuaca / Zona Conurbada';
        const pollos = parseInt(inputPollos.value) || 0;

        let textoPollo = '';
        if (pollos > 0) {
            const totalPollo = pollos * 80;
            textoPollo = `%0A• *Pollo en Barbacoa:* ${pollos} pollo(s) ($${totalPollo} MXN)`;
        }

        const mensaje = `Hola *Servicio de Meseros Luna*, me gustaría solicitar una cotización para un evento:%0A%0A` +
                        `1️⃣ *COTIZACIÓN DE MESEROS:*%0A` +
                        `• *Número de Mesas:* ${mesas}%0A` +
                        `• *Meseros Requeridos:* ${meseros} mesero(s) (1 por c/ 3 mesas)%0A` +
                        `• *Tipo de Evento:* ${evento}%0A` +
                        `• *Ubicación del Evento:* ${ubicacion}%0A%0A` +
                        `2️⃣ *BANQUETE:*` + (pollos > 0 ? textoPollo : `%0A• Sin servicio de pollo en barbacoa`) + `%0A%0A` +
                        `Quedo a la espera de su cotización formal. ¡Gracias!`;

        // Abrir la API de WhatsApp en una pestaña nueva al presionar el botón
        window.open(`https://wa.me/527621068212?text=${mensaje}`, '_blank');
    });

    // Ejecución inicial de la calculadora al cargar el archivo
    calcularMeseros();
});