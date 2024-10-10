document.addEventListener("DOMContentLoaded", function() {
    var fechaInput = document.getElementById("fecha");
    var formulario = document.querySelector("form");
    var inputs = formulario.querySelectorAll("input, select, button");

    // Obtener la fecha actual en formato YYYY-MM-DD
    var hoy = new Date();
    var dia = String(hoy.getDate()).padStart(2, '0');
    var mes = String(hoy.getMonth() + 1).padStart(2, '0'); // Los meses comienzan desde 0
    var anio = hoy.getFullYear();

    var fechaActual = `${anio}-${mes}-${dia}`;

    // Establecer el valor mínimo y máximo como la fecha actual
    fechaInput.min = fechaActual;
    fechaInput.max = fechaActual;

    // Función para verificar si la fecha ingresada es la actual
    fechaInput.addEventListener('input', function() {
        if (fechaInput.value !== fechaActual) {
            // Deshabilitar todos los campos si la fecha no es la actual
            inputs.forEach(function(input) {
                if (input !== fechaInput) {
                    input.disabled = true;
                }
            });
            alert("La fecha ingresada no es la fecha actual. El formulario ha sido deshabilitado.");
        } else {
            // Habilitar todos los campos si la fecha es la actual
            inputs.forEach(function(input) {
                input.disabled = false;
            });
        }
    });

    // Deshabilitar inicialmente los campos si la fecha no está seleccionada
    inputs.forEach(function(input) {
        if (input !== fechaInput) {
            input.disabled = true;
        }
    });

    // Habilitar los campos si la fecha es correcta cuando se carga la página
    if (fechaInput.value === fechaActual) {
        inputs.forEach(function(input) {
            input.disabled = false;
        });
    }
});

// Función para capturar los valores de Saldo y Dotación y realizar operaciones
function calcular() {
    // Obtener los valores de los campos "Saldo" y "Dotación"
    let saldo = parseFloat(document.getElementById('saldo').value);
    let dotacion = parseFloat(document.getElementById('dotacion').value);
    console.log('saldo', saldo);
    console.log('dotacion', dotacion);

    // Verificar si los valores son válidos
    if (isNaN(saldo) || isNaN(dotacion)) {
        alert('Por favor, ingrese valores válidos en Saldo y Dotación.');
        return;
    }
    //Este es el total de sellos para empezar el dia
    var totalSellos = saldo + dotacion;
    console.log('total sellos', totalSellos);

    let cargasPlata = parseFloat(document.getElementById('cargas-np300-plata').value);
    let quedaronPlata = parseFloat(document.getElementById('ultimos-np300-plata').value);
    console.log('cargas de la plata', cargasPlata);
    console.log('quedaron de la plata', quedaronPlata);

    let cargasBlanca = parseFloat(document.getElementById('cargas-np300-blanca').value);
    let quedaronBlanca = parseFloat(document.getElementById('ultimos-np300-blanca').value);
    console.log('cargas de la blanca', cargasBlanca);
    console.log('quedaron de la blanca', quedaronBlanca);

    let cargasGris = parseFloat(document.getElementById('cargas-gris').value);
    let quedaronGris = parseFloat(document.getElementById('ultimos-gris').value);
    console.log('cargas de la gris', cargasGris);
    console.log('quedaron de la gris', quedaronGris);

    if (isNaN(cargasPlata)) {
        alert('Por favor, ingrese un valor válido para las cargas de la camioneta NP 300 PLATA.');
        return;
    } else if (isNaN(quedaronPlata)) {
        alert('Por favor, ingrese un valor válido para los últimos que quedaron de la camioneta NP 300 PLATA.');
        return;
    } else if (isNaN(cargasBlanca)) {
        alert('Por favor, ingrese un valor válido para las cargas de la camioneta NP 300 BLANCA.');
        return;
    } else if (isNaN(quedaronBlanca)) {
        alert('Por favor, ingrese un valor válido para los últimos que quedaron de la camioneta NP 300 BLANCA.');
        return;
    } else if (isNaN(cargasGris)) {
        alert('Por favor, ingrese un valor válido para las cargas de la camioneta GRIS.');
        return;
    } else if (isNaN(quedaronGris)) {
        alert('Por favor, ingrese un valor válido para los últimos que quedaron de la camioneta GRIS.');
        return;
    }

    alert('Todos los valores son válidos. Procediendo con la operación.');

    let sumaGlobalCargas = cargasPlata + cargasBlanca + cargasGris;
    let sellosQuemados = parseFloat(document.getElementById('sellos-roto').value);
    let sumaGlobalQuedaronAnterior = quedaronPlata + quedaronBlanca + quedaronGris;
    let operacionGlobal = sumaGlobalCargas - sumaGlobalQuedaronAnterior;
    let debenHaber = totalSellos - operacionGlobal;
    let saldoSellos = parseFloat(document.getElementById('saldo-sellos').value);
    let vendidasBase = parseFloat(document.getElementById('cargas-vendidas').value);
    let debenQuedarFinal = debenHaber - saldoSellos - sellosQuemados - vendidasBase;

    // Validación de sellos finales
    if (debenQuedarFinal === 0) {
        alert('Excelente, no hace falta ningún sello');
    } else if (debenQuedarFinal === 1) {
        alert('Te falta 1 sello');
    } else if (debenQuedarFinal > 1) {
        alert(`Te faltan ${debenQuedarFinal} sellos`);
    } else if (debenQuedarFinal < 0) {
        alert('Excelente, no hace falta ningún sello');
    }

    // Generar PDF usando jsPDF
    /*generarPDF({
        saldo,
        dotacion,
        sumaGlobalCargas,
        sellosQuemados,
        debenHaber,
        saldoSellos,
        debenQuedarFinal
    });*/
}

// Función para generar el PDF
/*function generarPDF(data) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text("Reporte de Control de Sellos", 10, 10);
    doc.text(`Saldo inicial: ${data.saldo}`, 10, 20);
    doc.text(`Dotación: ${data.dotacion}`, 10, 30);
    doc.text(`Cargas totales: ${data.sumaGlobalCargas}`, 10, 40);
    doc.text(`Sellos quemados: ${data.sellosQuemados}`, 10, 50);
    doc.text(`Deben haber: ${data.debenHaber}`, 10, 60);
    doc.text(`Saldo sellos: ${data.saldoSellos}`, 10, 70);
    doc.text(`Deben quedar final: ${data.debenQuedarFinal}`, 10, 80);

    // Descargar el PDF
    doc.save('control_sellos.pdf');
}*/
