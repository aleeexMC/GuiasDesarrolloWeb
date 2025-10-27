function aviso () {
    alert("Bienvenido al mundo JavaScript");
}

function confirmacion() {
    let confirmacion = confirm("¿Desea salir de la sesión?");
    alert(`Valor seleccionado ${confirmacion}`);
}

function capturarDatos () {
    let nombre = prompt("¿Cuál es su nombre?");
    let edad = prompt("¿Cuál es su edad?", 0);
    alert(`Su nombre es ${nombre} y su edad ${edad}`);
}

