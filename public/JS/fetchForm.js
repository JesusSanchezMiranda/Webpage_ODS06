function enviarFormulario() {
    const form = document.getElementById("donationForm");
    const formData = new FormData(form);
  
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
  
    fetch("/submit-donation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("No se pudo registrar la donación.");
        }
        return response.json();
      })
      .then(() => {
        Swal.fire({
          title: "¡Gracias por tu donación!",
          text: "Tu contribución ha sido registrada exitosamente.",
          icon: "success",  
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#0f8bc1",
        });
      })
  }