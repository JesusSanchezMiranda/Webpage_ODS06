// Funcionlaidad del menu hamburguesa
const menuBtn = document.querySelector(".menu_btn");
const navigation = document.querySelector(".navegacion");

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    navigation.classList.toggle('active');
});




function mostrarFechaActual() {
    const hoy = new Date();
    const fechaFormateada = hoy.toLocaleDateString('es-ES', {
        day: 'numeric', month: 'long', year: 'numeric'
    });
    document.getElementById("fechaActual").textContent = fechaFormateada;
}

mostrarFechaActual(); // Llamamos a la función