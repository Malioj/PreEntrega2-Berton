const resultados = [];
let ultimoCambio = null;
let ordenAscendente = true;

function isValidPositiveNumber(value) {
  return !isNaN(value) && value > 0;
}

function limpiarResultados() {
  ultimoCambio = null;
}

function calcularFrecuenciaCambio(cantidadVacas, cantidadOrdeños, cantidadEquipos, fechaCambio) {
  const frecuenciaOrdeños = 2500;
  const totalOrdeños = (cantidadVacas * cantidadOrdeños) / cantidadEquipos;
  const frecuenciaDias = Math.round(frecuenciaOrdeños / totalOrdeños);

  const fechaUltimoCambio = fechaCambio ? new Date(fechaCambio) : new Date();
  const fechaProximoCambio = new Date(fechaUltimoCambio.getTime() + frecuenciaDias * 24 * 60 * 60 * 1000);

  ultimoCambio = { cantidadVacas, cantidadOrdeños, cantidadEquipos, fechaUltimoCambio, fechaProximoCambio, frecuenciaDias };

  return { frecuenciaDias, fechaProximoCambio };
}

function mostrarResultado(frecuenciaDias, fechaProximoCambio) {
  document.getElementById("frecuencia").innerHTML = `Frecuencia de cambio:<br/> ${frecuenciaDias} días`;
  document.getElementById("proximoCambio").innerHTML = `Próximo cambio de pezoneras: <br/> ${fechaProximoCambio.toLocaleDateString("es-ES")}`;
  mostrarProximosCambiosEnTabla(5, ordenAscendente);
}

function mostrarProximosCambiosEnTabla(cantidadCambios, ordenAscendente) {
  if (!ultimoCambio) return;

  const proximosCambios = Array.from({ length: cantidadCambios }, (_, i) => ({
    fecha: new Date(ultimoCambio.fechaProximoCambio.getTime() + i * ultimoCambio.frecuenciaDias * 24 * 60 * 60 * 1000),
    frecuenciaDias: ultimoCambio.frecuenciaDias,
  }));

  proximosCambios.sort((a, b) => (ordenAscendente ? a.fecha - b.fecha : b.fecha - a.fecha));

  const table = document.createElement("table");
  table.classList.add("table", "table-striped");

  const thead = document.createElement("thead");
  const headers = ["Fecha del Cambio", "Frecuencia (días)"];
  thead.appendChild(createTableRow(headers, "th"));
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  proximosCambios.forEach(cambio => tbody.appendChild(createTableRow([cambio.fecha.toLocaleDateString("es-ES"), cambio.frecuenciaDias])));
  table.appendChild(tbody);

  document.getElementById("resultados").innerHTML = "";
  document.getElementById("resultados").appendChild(table);

  // Muestra los botones después de mostrar la tabla
  document.getElementById("mostrarTablaBtn").classList.remove("hidden");
  document.getElementById("mostrarTablaDescendenteBtn").classList.remove("hidden");
}

function createTableRow(cells, cellType = "td") {
  const row = document.createElement("tr");
  cells.forEach(cellText => {
    const cell = document.createElement(cellType);
    cell.appendChild(document.createTextNode(cellText));
    row.appendChild(cell);
  });
  return row;
}

document.getElementById("calculoForm").addEventListener('submit', function(event) {
  event.preventDefault();

  const cantidadVacas = parseInt(document.getElementById("cantidadVacas").value);
  const cantidadOrdeños = parseInt(document.getElementById("cantidadOrdeños").value);
  const cantidadEquipos = parseInt(document.getElementById("cantidadEquipos").value);
  const fechaCambio = document.getElementById("fechaCambio").value;

  if (isValidPositiveNumber(cantidadVacas) && isValidPositiveNumber(cantidadOrdeños) && isValidPositiveNumber(cantidadEquipos)) {
    limpiarResultados();
    const { frecuenciaDias, fechaProximoCambio } = calcularFrecuenciaCambio(cantidadVacas, cantidadOrdeños, cantidadEquipos, fechaCambio);
    mostrarResultado(frecuenciaDias, fechaProximoCambio);
  } else {
    alert("Por favor, ingresa números positivos y válidos en todos los campos.");
  }
});

document.getElementById("mostrarTablaBtn").addEventListener("click", function() {
  // Cambia la variable de orden al hacer clic en el botón
  ordenAscendente = !ordenAscendente;

  // Cambia el texto del botón según el orden
  const btnTexto = ordenAscendente ? "Mostrar Próximos Cambios Ascendente" : "Mostrar Próximos Cambios Descendente";
  document.getElementById("mostrarTablaBtn").textContent = btnTexto;

  // Muestra los próximos cambios según el nuevo orden
  mostrarProximosCambiosEnTabla(5, ordenAscendente);
});

document.getElementById("mostrarTablaDescendenteBtn").addEventListener("click", function() {
  // Cambia la variable de orden al hacer clic en el botón
  ordenAscendente = !ordenAscendente;

  // Cambia el texto del botón según el orden
  const btnTexto = ordenAscendente ? "Mostrar Próximos Cambios Ascendente" : "Mostrar Próximos Cambios Descendente";
  document.getElementById("mostrarTablaBtn").textContent = btnTexto;

  // Muestra los próximos cambios según el nuevo orden
  mostrarProximosCambiosEnTabla(5, ordenAscendente);
});

















