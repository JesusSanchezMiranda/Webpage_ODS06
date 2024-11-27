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