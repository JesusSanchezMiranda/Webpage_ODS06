// Función para verificar si un elemento está en la vista
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Obtener todos los eventos
const events = document.querySelectorAll('.event');

// Función para mostrar eventos cuando entren en la vista
function showEvents() {
    events.forEach(event => {
        if (isInViewport(event)) {
            event.classList.add('show');
        }
    });
}

// Escuchar el evento de scroll y cargar eventos cuando estén en vista
window.addEventListener('scroll', showEvents);
window.addEventListener('load', showEvents);