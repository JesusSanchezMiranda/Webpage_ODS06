const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
let selectedDate;
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

const monthYear = document.getElementById("monthYear");
const calendarDates = document.getElementById("calendarDates");
const infoPanel = document.getElementById("infoContent");

const updateCalendar = () => {
    calendarDates.innerHTML = "";
    monthYear.textContent = `${monthNames[currentMonth]} ${currentYear}`;

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
        calendarDates.innerHTML += `<div></div>`;
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dateDiv = document.createElement("div");
        dateDiv.className = "date";
        dateDiv.textContent = day;
        dateDiv.addEventListener("click", () => selectDate(day));
        calendarDates.appendChild(dateDiv);
    }
};

const selectDate = (day) => {
    document.querySelectorAll(".date").forEach(date => date.classList.remove("selected"));
    selectedDate = day;
    document.querySelectorAll(".date")[day + new Date(currentYear, currentMonth, 1).getDay() - 1].classList.add("selected");
    infoPanel.textContent = `Día ${day} - ${getODS6Message(day)}`;
};

const getODS6Message = (day) => {
    const messages = [
        "Recuerda ahorrar agua en tu día a día.",
        "Evita tirar basura en los cuerpos de agua.",
        "Promueve el acceso al agua potable.",
        "Ahorra agua cerrando bien los grifos.",
        "Evita el uso de productos químicos.",
        "Educa a otros sobre la importancia del agua limpia.",
        "Contribuye a proyectos de saneamiento.",
        "Reduce el consumo de agua en el hogar.",
        "Recuerda el objetivo de agua limpia y saneamiento.",
        "Participa en campañas para mejorar el agua.",
    ];
    return messages[day % messages.length];
};

document.getElementById("prevMonth").addEventListener("click", () => {
    currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    currentYear = currentMonth === 11 ? currentYear - 1 : currentYear;
    updateCalendar();
});

document.getElementById("nextMonth").addEventListener("click", () => {
    currentMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    currentYear = currentMonth === 0 ? currentYear + 1 : currentYear;
    updateCalendar();
});

updateCalendar();
