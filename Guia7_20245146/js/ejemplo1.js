const newForm = document.getElementById("idNewForm");

const buttonCrear = document.getElementById("idBtnCrear");
const buttonAddElemento = document.getElementById("idBtnAddElement");
const buttonValidar = document.getElementById("idBtnValidar"); 

const cmbElemento = document.getElementById("idCmbElemento");

const tituloElemento = document.getElementById("idTituloElemento");
const nombreElemento = document.getElementById("idNombreElemento");

const modal = new bootstrap.Modal(document.getElementById("idModal"), {});


const idExiste = function (newId) {
    const elementoExistente = document.getElementById(newId);
    return elementoExistente != null;
};

const verificarTipoElemento = function () {
    let elemento = cmbElemento.value;

    if (elemento != "") {
        modal.show();
    } else {
        alert("Debe seleccionar el elemento que se creara");
    }
};

const newSelect = function () {
    let addElemento = document.createElement("select");

    addElemento.setAttribute("id", `id${nombreElemento.value}`);
    addElemento.setAttribute("class", "form-select");

    for (let i = 1; i <= 10; i++) {
        let addOPtion = document.createElement("option");
        addOPtion.value = i;
        addOPtion.innerHTML = `Opcion ${i}`;
        addElemento.appendChild(addOPtion);
    }

    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("for", `id${nombreElemento.value}`); 

    labelElemento.textContent = tituloElemento.value;

    let labelId = document.createElement("span");
    labelId.textContent = `ID de control : ${nombreElemento.value}`;

    let divElemento = document.createElement("div");

    divElemento.setAttribute("class", "form-floating mb-3");

    divElemento.appendChild(addElemento);

    divElemento.appendChild(labelElemento);

    newForm.appendChild(labelId);

    newForm.appendChild(divElemento);
};

const newRadioCheckbox = function (newElemento) {
    let addElemento = document.createElement("input");

    addElemento.setAttribute("id", `id${nombreElemento.value}`);
    addElemento.setAttribute("type", newElemento);
    addElemento.setAttribute("class", "form-check-input");
    addElemento.setAttribute("name", nombreElemento.value);

    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("class", "form-check-label");
    labelElemento.setAttribute("for", `id${nombreElemento.value}`);

    labelElemento.textContent = tituloElemento.value;

    let labelId = document.createElement("span");
    labelId.textContent = `ID de control : ${nombreElemento.value}`;

    let divElemento = document.createElement("div");

    divElemento.setAttribute("class", "form-check mb-3"); 

    divElemento.appendChild(addElemento);

    divElemento.appendChild(labelElemento);

    newForm.appendChild(labelId);

    newForm.appendChild(divElemento);
};


const newInput = function (newElemento) {

    let addElemento =
        newElemento == "textarea"
            ? document.createElement("textarea")
            : document.createElement("input");

    addElemento.setAttribute("id", `id${nombreElemento.value}`);


    if (newElemento !== "textarea") {
        addElemento.setAttribute("type", newElemento);
    }


    if (newElemento === "range") {
        addElemento.setAttribute("class", "form-range");
    } else {
        addElemento.setAttribute("class", "form-control");
    }

    if (newElemento !== "color" && newElemento !== "range") {
        addElemento.setAttribute("placeholder", tituloElemento.value);
    }

    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("for", `id${nombreElemento.value}`);


    let iconLabel = document.createElement("i");
    iconLabel.setAttribute("class", "bi bi-tag");


    labelElemento.textContent = tituloElemento.value;

    labelElemento.insertAdjacentElement("afterbegin", iconLabel);


    let labelId = document.createElement("span");
    labelId.textContent = `ID de control : ${nombreElemento.value}`;


    let divElemento = document.createElement("div");

    if (newElemento === "range" || newElemento === "color") {
        divElemento.setAttribute("class", "mb-3"); 

        newForm.appendChild(labelId);
        newForm.appendChild(divElemento);

        divElemento.appendChild(labelElemento);
        divElemento.appendChild(addElemento);

    } else {

        divElemento.setAttribute("class", "form-floating mb-3");

        newForm.appendChild(labelId);
        newForm.appendChild(divElemento);

        divElemento.appendChild(addElemento);
        divElemento.appendChild(labelElemento);
    }
};

// Función de validación del formulario 
const validarFormulario = function () {
    const controles = newForm.elements;
    let camposIncompletos = 0;
    let mensaje = "La siguiente lista de controles no cumple con el llenado requerido:\n\n";

    for (let i = 0; i < controles.length; i++) {
        const control = controles[i];
        let esInvalido = false;


        if (control.type === 'text' || control.type === 'number' || control.type === 'password' || control.type === 'date' || control.tagName === 'TEXTAREA') {
            if (control.value.trim() === '') {
                esInvalido = true;
            }
        }

        else if (control.type === 'select-one') {
            if (control.value === '') {
                esInvalido = true;
            }
        }

        else if (control.type === 'radio' || control.type === 'checkbox') {
            if (!control.checked) {
                esInvalido = true;
            } else {
                continue; 
            }
        }



        if (esInvalido) {
            camposIncompletos++;
            mensaje += ` - ID: ${control.id} (Tipo: ${control.type || control.tagName})\n`;
        }
    }

    if (camposIncompletos > 0) {
        alert(mensaje);
        console.error(mensaje);
    } else {
        alert("¡Formulario validado con éxito! Todos los campos requeridos están llenos.");
    }
};


buttonCrear.onclick = () => {
    verificarTipoElemento();
};

buttonAddElemento.onclick = () => {
    if (nombreElemento.value != "" && tituloElemento.value != "") {
        let elemento = cmbElemento.value;
        const newId = `id${nombreElemento.value}`;

        if (idExiste(newId)) {
            alert(`El ID de control: ${nombreElemento.value} ya existe. Por favor, use uno diferente.`);
            return;
        }

        if (elemento == "select") {
            newSelect();
        } else if (elemento == "radio" || elemento == "checkbox") {
            newRadioCheckbox(elemento);
        } else {
            newInput(elemento);
        }
        

        modal.hide();

    } else {
        alert("Faltan campos por completar");
    }
};

buttonValidar.onclick = () => {
    validarFormulario();
};


document.getElementById("idModal").addEventListener("shown.bs.modal", () => {

    tituloElemento.value = "";
    nombreElemento.value = "";


    tituloElemento.focus();
});


