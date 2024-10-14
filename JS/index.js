
/**Desafios */
document.addEventListener('DOMContentLoaded', function () {
    const desafios = document.querySelectorAll('.desafio');

    desafios.forEach(desafio => {
        desafio.addEventListener('click', () => {
            desafio.classList.toggle('expandido');
        });
    });
});

/**Proyectos exitosos */
document.addEventListener('DOMContentLoaded', function () {
    const proyectos = document.querySelectorAll('.proyecto');

    proyectos.forEach(proyecto => {
        const leerMasBtn = proyecto.querySelector('.leer-mas');
        const detalles = proyecto.querySelector('.detalles');

        leerMasBtn.addEventListener('click', () => {
            if (detalles.style.display === 'none' || detalles.style.display === '') {
                detalles.style.display = 'block';
                detalles.style.animation = 'fadeIn 0.5s ease';
                leerMasBtn.textContent = 'Leer menos';
            } else {
                detalles.style.display = 'none';
                leerMasBtn.textContent = 'Leer más';
            }
        });
    });

    // Animación de entrada para los proyectos
    proyectos.forEach((proyecto, index) => {
        proyecto.style.opacity = '0';
        proyecto.style.animation = `fadeIn 0.5s ease ${index * 0.2}s forwards`;
    });
});

/**Acciones */
document.addEventListener('DOMContentLoaded', function () {
    const acciones = document.querySelectorAll('.accion');

    acciones.forEach((accion, index) => {
        accion.style.opacity = '0';
        accion.style.animation = `fadeInUp 0.5s ease ${index * 0.3}s forwards`;

        const items = accion.querySelectorAll('li');
        items.forEach((item, itemIndex) => {
            item.style.opacity = '0';
            item.style.animation = `fadeInUp 0.5s ease ${(index * 0.3 + itemIndex * 0.1 + 0.5)}s forwards`;
        });
    });

    // Efecto de hover con información adicional
    const listaItems = document.querySelectorAll('.lista-acciones li');
    listaItems.forEach(item => {
        const originalText = item.querySelector('span').textContent;
        const additionalInfo = getAdditionalInfo(originalText);

        item.addEventListener('mouseenter', () => {
            item.querySelector('span').textContent = additionalInfo;
        });

        item.addEventListener('mouseleave', () => {
            item.querySelector('span').textContent = originalText;
        });
    });
});

function getAdditionalInfo(text) {
    const infoMap = {
        "Reducir el consumo de agua en casa": "Ahorra hasta 200L/día con grifos eficientes",
        "Reciclar y reducir la contaminación del agua": "El reciclaje reduce en un 35% la contaminación del agua",
        "Educarse sobre el uso sostenible del agua": "Conocer más puede reducir tu consumo hasta un 25%",
        "Participar en proyectos comunitarios de agua": "Las iniciativas locales mejoran el acceso al agua en un 40%",
        "Abogar por políticas de agua y saneamiento": "Las políticas efectivas pueden beneficiar a millones",
        "Apoyar organizaciones dedicadas al agua limpia": "Pequeñas donaciones pueden proporcionar agua a comunidades enteras"
    };
    return infoMap[text] || text;
}

/**Relación */

document.addEventListener('DOMContentLoaded', function() {
    const odsItems = document.querySelectorAll('.ods-item');
    const descripcion = document.getElementById('relacion-descripcion');
    const instruccionTitulo = document.getElementById('instruccion-titulo');

    odsItems.forEach(item => {
        item.addEventListener('click', () => {
            const odsNum = item.getAttribute('data-ods');
            const relacion = getRelacion(odsNum);
            
            descripcion.style.opacity = '0';
            instruccionTitulo.style.opacity = '0';
            
            setTimeout(() => {
                instruccionTitulo.textContent = "Relación con el ODS " + odsNum;
                descripcion.textContent = relacion;
                descripcion.style.animation = 'fadeIn 0.5s ease forwards';
                instruccionTitulo.style.animation = 'fadeIn 0.5s ease forwards';
            }, 300);
        });
    });

    function getRelacion(odsNum) {
        const relaciones = {
            "1": "El acceso al agua limpia y saneamiento es crucial para reducir la pobreza, ya que mejora la salud, permite el ahorro en gastos médicos y aumenta la productividad.",
            "3": "El agua limpia y el saneamiento adecuado son fundamentales para prevenir enfermedades y mejorar la salud pública general.",
            "11": "Las infraestructuras de agua y saneamiento son esenciales para el desarrollo de ciudades sostenibles y resilientes.",
            "13": "La gestión sostenible del agua es clave para la adaptación al cambio climático y la mitigación de sus efectos.",
            "14": "Reducir la contaminación del agua y mejorar el saneamiento tiene un impacto directo en la salud de los ecosistemas marinos."
        };
        return relaciones[odsNum];
    }

    // Animación inicial
    odsItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.animation = `fadeIn 0.5s ease ${index * 0.1}s forwards`;
    });
});


// Animacion de carga de la pagina
window.addEventListener("DOMContentLoaded", () => {
    showLoader();
})


window.addEventListener("load", () => {
    setTimeout(() => {
        hideLoader();
    }, 2000);
})

const loader = document.getElementById("loaderCharge");

const showLoader = () => {
  loader.classList.add("show-loader")
}

const hideLoader = () => {
    const loader = document.getElementById("loaderCharge");
    loader.classList.remove("show-loader")
} 