document.addEventListener("DOMContentLoaded", () => {
    const donationForm = document.getElementById("donationForm");
  
    // Función para mostrar mensajes de error
    function showError(elementId, message) {
      const errorElement = document.getElementById(elementId);
      errorElement.textContent = message;
      errorElement.style.display = "block";
    }
  
    // Función para ocultar mensajes de error
    function hideError(elementId) {
      const errorElement = document.getElementById(elementId);
      errorElement.style.display = "none";
    }
  
    // Validación del formulario al enviar
    donationForm.addEventListener("submit", (e) => {
      e.preventDefault(); // Prevenir el envío del formulario para validarlo primero
  
      let isValid = true;
  
      // Validación del nombre
      const name = document.getElementById("name").value.trim();
      const namePattern = /^[a-zA-ZÁÉÍÓÚáéíóúñÑ\s]+$/; // Regex para permitir solo letras y espacios
      if (name === "") {
        showError("nameError", "El nombre es obligatorio.");
        isValid = false;
      } else if (!namePattern.test(name)) {
        showError("nameError", "El nombre no puede contener números ni caracteres especiales.");
        isValid = false;
      } else {
        hideError("nameError");
      }
  
      // Validación del correo electrónico
      const email = document.getElementById("email").value.trim();
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(email)) {
        showError("emailError", "Por favor ingresa un correo electrónico válido.");
        isValid = false;
      } else {
        hideError("emailError");
      }
  
      // Validación del teléfono
      const phone = document.getElementById("cellphone").value.trim();
      const phonePattern = /^9\d{8}$/;
      if (!phonePattern.test(phone)) {
        showError("cellphoneError", "El teléfono debe comenzar con 9 y tener 9 dígitos.");
        isValid = false;
      } else {
        hideError("cellphoneError");
      }
  
      // Validación del monto de la donación
      const amount = document.getElementById("amount").value;
      if (!amount) {
        showError("amountError", "Selecciona un monto de donación.");
        isValid = false;
      } else {
        hideError("amountError");
      }
  
      // Validación de tipo de tarjeta
      const cardType = document.getElementById("card_type").value;
      if (cardType === "") {
        showError("cardTypeError", "Selecciona el tipo de tarjeta.");
        isValid = false;
      } else {
        hideError("cardTypeError");
      }
  
      // Validación del número de tarjeta
      const cardNumber = document.getElementById("card_number").value.trim();
      const cardNumberPattern = /^\d{16}$/;
      if (!cardNumberPattern.test(cardNumber)) {
        showError("cardNumberError", "El número de tarjeta debe tener 16 dígitos.");
        isValid = false;
      } else {
        hideError("cardNumberError");
      }
  
      // Validación del CVC
      const cvc = document.getElementById("cvc").value.trim();
      const cvcPattern = /^\d{3}$/;
      if (!cvcPattern.test(cvc)) {
        showError("cvcError", "El CVC debe tener 3 dígitos.");
        isValid = false;
      } else {
        hideError("cvcError");
      }
  
      // Validación de la fecha de expiración
      const expirationDate = document.getElementById("expiration_date").value.trim();
      const expirationDatePattern = /^(0[1-9]|1[0-2])\/\d{2}$/; // Formato MM/YY
      if (!expirationDatePattern.test(expirationDate)) {
        showError("expirationDateError", "La fecha de expiración debe tener el formato MM/YY.");
        isValid = false;
      } else {
        hideError("expirationDateError");
      }
  
      // Si el formulario es válido, enviar los datos
      if (isValid) {
        enviarFormulario();
      }
    });
  
    // Funcionalidad de los botones de monto
    const amountButtons = document.querySelectorAll(".amount-button");
    amountButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Remover la clase 'selected' de todos los botones
        amountButtons.forEach((btn) => btn.classList.remove("selected"));
  
        // Agregar la clase 'selected' al botón que fue clickeado
        button.classList.add("selected");
  
        // Establecer el valor del monto en el campo oculto
        const amount = button.getAttribute("data-amount");
        document.getElementById("amount").value = amount;
        hideError("amountError");
      });
    });
  });