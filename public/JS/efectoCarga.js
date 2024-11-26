// Animacion de carga de la pagina
window.addEventListener("DOMContentLoaded", () => {
    showLoader();
})


window.addEventListener("load", () => {
    setTimeout(() => {
        hideLoader();
    }, 1000);
})

const loader = document.getElementById("loaderCharge");

const showLoader = () => {
  loader.classList.add("show-loader")
}

const hideLoader = () => {
    const loader = document.getElementById("loaderCharge");
    loader.classList.remove("show-loader")
}