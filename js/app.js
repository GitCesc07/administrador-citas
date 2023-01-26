// Campos del formulario
const mascotaInput = document.querySelector("#mascota");
const propietarioInput = document.querySelector("#propietario");
const telefonoInput = document.querySelector("#telefono");
const fechaInput = document.querySelector("#fecha");
const horaInput = document.querySelector("#hora");
const sintomasInput = document.querySelector("#sintomas");

// UI
const formulario = document.querySelector("#nueva-cita");
const contenedorcitas = document.querySelector("#citas");

class Citas {
    constructor () {
        this.citas = [];
    }

    agregarCita(cita) {
        this.citas = [...this.citas, cita];
        
        console.log(this.citas);
    }
}

class UI {
    imprimirAlerta(mensaje, alerta) {
        // Crear div
        const divMensaje = document.createElement("div");
        divMensaje.classList.add("text-center", "alert", "d-block", "col-12");

        // Agregar clase en base al tipo de error
        if(tipo === "error") {
            divMensaje.classList.add("alert-danger");
        }
        else {
            divMensaje.classList.add("alert-success");
        }

        // Mensjae de error
        divMensaje.textContent = mensaje;

        // Agregar al DOM
        document.querySelector("#contenido").insertBefore(divMensaje, document.querySelector(".agregar-cita"));

        // Quitar alerta
        setTimeout(() => {
            divMensaje.remove();
        }, 5000);
    }

    imprimirCitas(citas) {
        console.log(citas);
    }
}

const ui = new UI();
const administrarCitas = new Citas();


// Registrar Eventos
eventListeners();
function  eventListeners () {
    mascotaInput.addEventListener("input", datosCita);
    propietarioInput.addEventListener("input", datosCita);
    telefonoInput.addEventListener("input", datosCita);
    fechaInput.addEventListener("input", datosCita);
    horaInput.addEventListener("input", datosCita);
    sintomasInput.addEventListener("input", datosCita);

    formulario.addEventListener("submit", nuevaCita);
}

// Objeto con la información de la cita
const citaObjt = {
    mascota: "",
    propietario: "",
    telefono: "",
    fecha: "",
    hora: "",
    sintomas: ""
}

// Agrega datos al objeto de la cita
function datosCita(e) {
    citaObjt[e.target.name] = e.target.value;
}

// Valida y agrega una nueva cita a la clase de citas
function nuevaCita(e) {
    e.preventDefault();

    // Extraer la información del objeto de la cita
    const {mascota, propietario, telefono, fecha, hora, sintomas} = citaObjt;

    // Validar campos vacios
    if (mascota === ""|| propietario === ""|| telefono === "" || fecha === "" || hora === "" || sintomas === "") {
        ui.imprimirAlerta("Todos los campos son obligatorios", "error");
        return; 
    }

    // Generar id único 
    citaObjt.id = Date.now();

    // Creando una nueva cita
    administrarCitas.agregarCita({...citaObjt});

    // Reiniciar el objeto para la validación
    reiniciarObjt();

    // Reiniciar el formulario
    formulario.reset();

    // Mostrar en el HTML de las citas
    ui.imprimirCitas(administrarCitas);
}


function reiniciarObjt() {
     citaObjt.mascota = "";
     citaObjt.propietario = "";
     citaObjt.telefono = "";
     citaObjt.fecha = "";
     citaObjt.hora = "";
     citaObjt.sintomas = "";
}