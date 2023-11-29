const resultados = [];

function isValidPositiveNumber(value) {
    return !isNaN(value) && value > 0;
}

function calcularFrecuenciaCambio(cantidadVacas, cantidadOrdeños, cantidadEquipos, fechaCambio) {
    const frecuenciaOrdeños = 2500;
    const totalOrdeños = (cantidadVacas * cantidadOrdeños) / cantidadEquipos;
    const frecuenciaDias = Math.round(frecuenciaOrdeños / totalOrdeños);

    // Obtener la fecha del último cambio
    const fechaUltimoCambio = fechaCambio ? new Date(fechaCambio) : new Date();

    // Calcular la próxima fecha de cambio sumando la frecuencia de días
    const fechaProximoCambio = new Date(fechaUltimoCambio);
    fechaProximoCambio.setUTCDate(fechaProximoCambio.getUTCDate() + frecuenciaDias);

    // Almacenar el resultado en el array
    resultados.push({
        cantidadVacas,
        cantidadOrdeños,
        cantidadEquipos,
        fechaUltimoCambio,
        fechaProximoCambio,
    });

    // Devolver la frecuencia de cambio y la próxima fecha de cambio
    return {
        frecuenciaDias,
        fechaProximoCambio,
    };
}

function mostrarResultado(frecuenciaDias, fechaProximoCambio) {
    document.getElementById("frecuencia").innerHTML = `Frecuencia de cambio: ${frecuenciaDias} días`;

    // Formatear la fecha utilizando toLocaleDateString
    document.getElementById("proximoCambio").innerHTML = `Próximo cambio de pezoneras: ${fechaProximoCambio.toLocaleDateString("es-ES")}`;
}

document.getElementById("calculoForm").addEventListener('submit', function(event) {
    event.preventDefault();

    const cantidadVacas = parseInt(document.getElementById("cantidadVacas").value);
    const cantidadOrdeños = parseInt(document.getElementById("cantidadOrdeños").value);
    const cantidadEquipos = parseInt(document.getElementById("cantidadEquipos").value);
    const fechaCambio = document.getElementById("fechaCambio").value;

    if (isValidPositiveNumber(cantidadVacas) && isValidPositiveNumber(cantidadOrdeños) && isValidPositiveNumber(cantidadEquipos)) {
        const { frecuenciaDias, fechaProximoCambio } = calcularFrecuenciaCambio(cantidadVacas, cantidadOrdeños, cantidadEquipos, fechaCambio);
        mostrarResultado(frecuenciaDias, fechaProximoCambio);
    } else {
        alert("Por favor, ingresa números positivos y válidos en todos los campos.");
    }
});




