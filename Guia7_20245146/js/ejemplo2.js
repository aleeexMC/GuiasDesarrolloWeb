const formulario = document.forms["frmRegistro"];
const button = document.forms["frmRegistro"].elements["btnRegistro"];

const modal = new bootstrap.Modal(document.getElementById("idModal"), {});

const bodyModal = document.getElementById("idBodyModal");

let errores = [];


const validarFormulario = function () {
    errores = []; 

    const nombre = document.getElementById("idNombre");
    const apellidos = document.getElementById("idApellidos");
    const fechaNac = document.getElementById("idFechaNac");
    const correo = document.getElementById("idCorreo");
    const password = document.getElementById("idPassword");
    const repetirPassword = document.getElementById("idPasswordRepetir");
    const pais = document.getElementById("idCmPais");

    const intereses = document.forms["frmRegistro"].elements["idCkProgramacion,idCkBD,idCkRedes,idCkSeguridad"];
    const carreras = document.forms["frmRegistro"].elements["idRdCarrera"]; 

    validarCampoVacio(nombre, "Nombres");
    validarCampoVacio(apellidos, "Apellidos");
    validarCampoVacio(correo, "Correo electrónico");
    validarCampoVacio(password, "Contraseña");
    validarCampoVacio(repetirPassword, "Repetir Contraseña");

    validarFechaNacimiento(fechaNac);

    validarCorreoElectronico(correo);

    validarContrasenasIguales(password, repetirPassword);

    validarGrupoCheckbox(["idCkProgramacion", "idCkBD", "idCkRedes", "idCkSeguridad"], "Intereses");

    validarGrupoRadio("idRdCarrera", "Carrera");

    validarSelect(pais, "País de origen");

    if (errores.length > 0) {
        mostrarErrores();
        return false;
    } else {
        mostrarResultado(formulario);
        return true;
    }
};

const validarCampoVacio = function (campo, nombre) {
    if (campo.value.trim() === "") {
        errores.push(`El campo **${nombre}** no puede estar vacío.`);
    }
};

const validarFechaNacimiento = function (campo) {
    const fechaSeleccionada = new Date(campo.value);
    const fechaActual = new Date();
    

    fechaActual.setHours(0, 0, 0, 0); 
    fechaSeleccionada.setHours(0, 0, 0, 0);

    if (campo.value.trim() === "") {
        errores.push("Debe seleccionar una **Fecha de nacimiento**.");
    } else if (fechaSeleccionada > fechaActual) {
        errores.push("La **Fecha de nacimiento** no puede ser posterior a la fecha actual.");
    }
};

const validarCorreoElectronico = function (campo) {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    
    if (campo.value.trim() !== "" && !emailRegex.test(campo.value)) {
        errores.push("El formato del **Correo electrónico** no es válido.");
    }
};

const validarContrasenasIguales = function (pass1, pass2) {
    if (pass1.value !== pass2.value) {
        errores.push("Los campos **Contraseña** y **Repetir Contraseña** deben ser iguales.");
    }
};

const validarGrupoCheckbox = function (ids, nombre) {
    let checked = false;
    for (const id of ids) {
        const checkbox = document.getElementById(id);
        if (checkbox && checkbox.checked) {
            checked = true;
            break;
        }
    }
    if (!checked) {
        errores.push(`Debe seleccionar al menos una opción en **${nombre}**.`);
    }
};

const validarGrupoRadio = function (nombre, etiqueta) {
    const radios = document.forms["frmRegistro"].elements[nombre];
    let checked = false;
    
    if (radios.length) {
        for (let i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                checked = true;
                break;
            }
        }
    } else if (radios && radios.checked) {
        checked = true;
    }

    if (!checked) {
        errores.push(`Debe seleccionar una opción en **${etiqueta}**.`);
    }
};

const validarSelect = function (campo, nombre) {

    if (campo.selectedIndex === 0) { 
        errores.push(`Debe seleccionar una opción de **${nombre}**.`);
    }
};

const mostrarErrores = function () {

    while (bodyModal.firstChild) {
        bodyModal.removeChild(bodyModal.firstChild);
    }
    
    const tituloError = document.createElement("h5");
    tituloError.textContent = "⚠️ Errores de Validación:";
    tituloError.setAttribute("class", "text-danger");
    bodyModal.appendChild(tituloError);

    const ul = document.createElement("ul");
    ul.setAttribute("class", "list-group list-group-flush");
    
    for (const error of errores) {
        const li = document.createElement("li");
        li.setAttribute("class", "list-group-item");
        

        const partes = error.split(/(\*\*.*?\*\*)/g);
        for (const parte of partes) {
            if (parte.startsWith('**') && parte.endsWith('**')) {
                const strong = document.createElement("strong");
                strong.textContent = parte.slice(2, -2);
                li.appendChild(strong);
            } else {
                li.appendChild(document.createTextNode(parte));
            }
        }
        ul.appendChild(li);
    }
    bodyModal.appendChild(ul);
    modal.show();
};


const mostrarResultado = function (form) {

    while (bodyModal.firstChild) {
        bodyModal.removeChild(bodyModal.firstChild);
    }

    const tituloResultado = document.createElement("h5");
    tituloResultado.textContent = " Información del Formulario:";
    tituloResultado.setAttribute("class", "text-success mb-3");
    bodyModal.appendChild(tituloResultado);


    const table = document.createElement("table");
    table.setAttribute("class", "table table-striped");
    
    const tbody = document.createElement("tbody");

    const elementos = form.elements;
    

    const datosAMostrar = [
        { label: "Nombres:", id: "idNombre" },
        { label: "Apellidos:", id: "idApellidos" },
        { label: "Fecha Nacimiento:", id: "idFechaNac" },
        { label: "Correo:", id: "idCorreo" },
        { label: "Intereses Seleccionados:", id: "checkboxGroup" }, 
        { label: "Carrera Seleccionada:", name: "idRdCarrera" },    
        { label: "País de Origen:", id: "idCmPais" },
    ];

    for (const item of datosAMostrar) {
        const tr = document.createElement("tr");
        
        const tdLabel = document.createElement("td");
        tdLabel.textContent = item.label;
        tdLabel.setAttribute("class", "fw-bold");

        const tdValue = document.createElement("td");
        let valor = "";

        if (item.id) {
            const control = document.getElementById(item.id);
            if (control) {
                if (control.tagName === "SELECT") {
                    valor = control.options[control.selectedIndex].text;
                } else if (item.id === "checkboxGroup") {

                    const checks = document.querySelectorAll('[type="checkbox"]:checked');
                    if (checks.length > 0) {
                        valor = Array.from(checks).map(c => c.nextElementSibling.textContent).join(', ');
                    } else {
                        valor = "Ninguno";
                    }
                } else {
                    valor = control.value;
                }
            }
        } else if (item.name) {

            const radios = document.forms["frmRegistro"].elements[item.name];
            for (let i = 0; i < radios.length; i++) {
                if (radios[i].checked) {
                    valor = radios[i].nextElementSibling.textContent;
                    break;
                }
            }
        }
        
        tdValue.textContent = valor;
        
        tr.appendChild(tdLabel);
        tr.appendChild(tdValue);
        tbody.appendChild(tr);
    }
    
    table.appendChild(tbody);
    bodyModal.appendChild(table);
    modal.show();
};


button.onclick = () => {
    validarFormulario();
};