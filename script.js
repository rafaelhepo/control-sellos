// Función para establecer la fecha mínima y máxima en el campo de fecha
        document.addEventListener("DOMContentLoaded", function() {
            var fechaInput = document.getElementById("fecha");

            // Obtener la fecha actual en formato YYYY-MM-DD
            var hoy = new Date();
            var dia = String(hoy.getDate()).padStart(2, '0');
            var mes = String(hoy.getMonth() + 1).padStart(2, '0'); // Los meses comienzan desde 0
            var anio = hoy.getFullYear();

            var fechaActual = `${anio}-${mes}-${dia}`;

            // Establecer el valor mínimo y máximo como la fecha actual
            fechaInput.min = fechaActual;
            fechaInput.max = fechaActual;
        });



/*document.querySelector('button[type="submit"]').addEventListener('click', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente
    alert('Te deben quedar 100 sellos utilizables');
});*/
