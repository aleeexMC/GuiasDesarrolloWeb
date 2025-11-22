const inputNombre = document.getElementById("idTxtNombre");
const inputApellido = document.getElementById("idTxtApellido");
const inputFechaNacimiento = document.getElementById("idTxtFechaNacimiento");
const inputRdMasculino = document.getElementById("idRdMasculino");
const inputRdFemenino = document.getElementById("idRdFemenino");
const cmbPais = document.getElementById("idCmbPais");
const inputDireccion = document.getElementById("idTxtDireccion");
const inputNombrePais = document.getElementById("idNombrePais");

const buttonAgregarPaciente = document.getElementById("idBtnAgregar");
const buttonLimpiarPaciente = document.getElementById("idBtnLimpiar");
const buttonMostrarPaciente = document.getElementById("idBtnMostrar");
const buttonAgregarPais = document.getElementById("idBtnAgregarPais");

const notificacion = document.getElementById("idNotificacion");
const toast = new bootstrap.Toast(notificacion);
const mensaje = document.getElementById("idMensaje");

const idModal = document.getElementById("idModal");

let arrayPaciente = [];

const limpiarForm = () => {
    inputNombre.value = "";
    inputApellido.value = "";
    inputFechaNacimiento.value = "";
    inputRdMasculino.checked = false;
    inputRdFemenino.checked = false;
    cmbPais.value = 0;
    inputDireccion.value = "";
    inputNombrePais.value = "";

    inputNombre.focus();
};

const addPaciente = function () {
    let nombre = inputNombre.value;
    let apellido = inputApellido.value;
    let fechaNacimiento = inputFechaNacimiento.value;
    let sexo =
        inputRdMasculino.checked == true
            ? "Hombre"
            : inputRdFemenino.checked == true
                ? "Mujer"
                : "";
    let pais = cmbPais.value;
    let labelPais = cmbPais.options[cmbPais.selectedIndex].text;
    let direccion = inputDireccion.value;

    if (
        nombre != "" &&
        apellido != "" &&
        fechaNacimiento != "" &&
        sexo != "" &&
        pais != 0 &&
        direccion != ""
    ) {
        arrayPaciente.push(
            new Array(nombre, apellido, fechaNacimiento, sexo, labelPais, direccion)
        );

        mensaje.innerHTML = "Se ha registrado un nuevo paciente";
        
        toast.show();

        limpiarForm();
    } else {
        
        mensaje.innerHTML = "Faltan campos por completar";
        
        toast.show();
    }
};

function imprimirFilas() {
    let $fila = "";
    let contador = 1;

    arrayPaciente.forEach((element) => {
        $fila += `<tr>
                <td scope="row" class="text-center fw-bold">${contador}</td>
                <td>${element[0]}</td>
                <td>${element[1]}</td>
                <td>${element[2]}</td>
                <td>${element[3]}</td>
                <td>${element[4]}</td>
                <td>${element[5]}</td>
                <td>
                    <button id="idBtnEditar${contador}" type="button" class="btn btn-primary" Alt="Eliminar">
                        <i class="bi bi-pencil-square"></i>
                    </button>
                    <button id="idBtnEliminar${contador}" type="button" class="btn btn-btn-danger" Alt="Editar">
                        <i class="bi bi-trash3-fill"></i>
                    </button>
                </td>
            </tr>`;
        contador++;
    });
    return $fila;
}

const imprimirPacientes = () => {
    let $table = `<div class="table-responsive">
    <table class="table table-striped table-hover table-bordered">
        <tr>
            <th scope="col" class="text-center" style="width:5%">#</th>
            <th scope="col" class="text-center" style="width:15%">Nombre</th>
            <th scope="col" class="text-center" style="width:15%">Apellido</th>
            <th scope="col" class="text-center" style="width:10%">Fecha nacimiento</th>
            <th scope="col" class="text-center" style="width:10%">Sexo</th>
            <th scope="col" class="text-center" style="width:10%">Pais</th>
            <th scope="col" class="text-center" style="width:25%">Dirección</th>
            <th scope="col" class="text-center" style="width:10%">Opciones</th>
        </tr>
        ${imprimirFilas()}
    </table>
    </div>`;

    document.getElementById("idTablaPacientes").innerHTML = $table;
};

let contadorGlobalOption = cmbPais.children.length;
const addPais = () => {
    let paisNew = inputNombrePais.value;

    if (paisNew != "") {
        
        let option = document.createElement("option");
        option.textContent = paisNew;
        option.value = contadorGlobalOption + 1;

        cmbPais.appendChild(option);

        mensaje.innerHTML = "Pais agregado correctamente";
        
        toast.show();
    } else {
        
        mensaje.innerHTML = "Faltan campos por completar";
    
        toast.show();
    }
}

buttonLimpiarPaciente.onclick = () => {
    limpiarForm();
};

buttonAgregarPaciente.onclick = () => {
    addPaciente();
};

buttonMostrarPaciente.onclick = () => {
    imprimirPacientes();
};

buttonAgregarPais.onclick = () => {
    addPais();
};

idModal.addEventListener("shown.bs.modal", () => {
    inputNombrePais.value = "";
    inputNombrePais.focus();
});

limpiarForm();

document.getElementById("idTablaPacientes").addEventListener("click", (e) => {
    if (e.target.closest("button")) {
        const boton = e.target.closest("button");
        const id = boton.id;

        if (id.startsWith("idBtnEliminar")) {
            const index = parseInt(id.replace("idBtnEliminar", "")) - 1;
            eliminarPaciente(index);
        }

        if (id.startsWith("idBtnEditar")) {
            const index = parseInt(id.replace("idBtnEditar", "")) - 1;
            editarPaciente(index);
        }
    }
});

function eliminarPaciente(index) {
    arrayPaciente.splice(index, 1);

    mensaje.innerHTML = "Paciente eliminado correctamente";
    toast.show();

    imprimirPacientes();
}

function editarPaciente(index) {
    const paciente = arrayPaciente[index];

    inputNombre.value = paciente[0];
    inputApellido.value = paciente[1];
    inputFechaNacimiento.value = paciente[2];
    paciente[3] === "Hombre"
        ? (inputRdMasculino.checked = true)
        : (inputRdFemenino.checked = true);

    for (let i = 0; i < cmbPais.options.length; i++) {
        if (cmbPais.options[i].text === paciente[4]) {
            cmbPais.selectedIndex = i;
            break;
        }
    }

    inputDireccion.value = paciente[5];

    arrayPaciente.splice(index, 1);

    mensaje.innerHTML = "Editando paciente";
    toast.show();

    inputNombre.focus();

    imprimirPacientes();
}