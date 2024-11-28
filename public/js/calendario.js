const calendarDates = document.getElementById("calendarDates");
const monthYear = document.getElementById("monthYear");
const prevMonth = document.getElementById("prevMonth");
const nextMonth = document.getElementById("nextMonth");
const infoContent = document.getElementById("infoContent");

let currentDate = new Date();
const apiURL = "http://localhost:3000/evento"; // Endpoint para obtener el evento de la fecha, colocar la IP de tu instancia en el localhost

function renderCalendar() {
    calendarDates.innerHTML = ""; // Limpiar el calendario previo

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    monthYear.textContent = currentDate.toLocaleString("default", {
        month: "long",
        year: "numeric",
    });

    // Agregar los días en el calendario
    for (let i = 0; i < firstDay; i++) {
        const emptyDiv = document.createElement("div");
        calendarDates.appendChild(emptyDiv); // Espacios vacíos antes del primer día del mes
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dateDiv = document.createElement("div");
        dateDiv.classList.add("date");
        dateDiv.textContent = day;

        // Al hacer clic en un día del calendario
        dateDiv.addEventListener("click", () => {
            // Resaltar el día seleccionado
            document.querySelectorAll(".date").forEach((d) => d.classList.remove("selected"));
            dateDiv.classList.add("selected");

            const selectedDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

            // Realizar la solicitud para obtener el evento de la fecha seleccionada
            fetch(`${apiURL}?fecha=${selectedDate}`)
                .then((response) => response.json())
                .then((data) => {
                    // Mostrar el evento si existe, o un mensaje si no hay evento para esa fecha
                    infoContent.textContent = data.evento || "No hay eventos para esta fecha.";
                })
                .catch(() => {
                    infoContent.textContent = "Error al obtener los eventos.";
                });
        });

        calendarDates.appendChild(dateDiv);
    }
}

prevMonth.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextMonth.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

renderCalendar();
