/*INICIO | Funcion para poder ver la imagen en la pantalla*/
document.querySelectorAll(".img_box img").forEach(image =>{
    image.onclick = () => {
        document.querySelector(".popup_image").style.display = 'block'
        document.querySelector(".popup_image img").src = image.getAttribute("src")
    }
});

document.querySelector(".popup_image span").onclick = () => {
     document.querySelector(".popup_image").style.display = 'none'
}
/*FIN | Funcion para poder ver la imagen en la pantalla*/


/*INCIO | Funcion desplegar las demas imagenes cuando la pantalla tenga un maximo de 780px*/
const bontonVerMas = document.getElementById("bonto_vermas");
const botonOcultar = document.getElementById("ocultar");

bontonVerMas.addEventListener('click', configuracion);

function configuracion(){
    botonOcultar.classList.toggle('mostrar')
    if(botonOcultar.classList.contains("mostrar")){
        bontonVerMas.innerHTML = "Ver menos";
    }else{
        bontonVerMas.innerHTML = "Ver mas"
    }
}
/*FIN | Funcion desplegar las demas imagenes cuando la pantalla tenga un maximo de 780px*/