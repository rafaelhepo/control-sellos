// script.js
document.querySelector('button[type="submit"]').addEventListener('click', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente
    alert('Te deben quedar 100 sellos utilizables');
});
