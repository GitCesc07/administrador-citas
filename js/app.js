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
  constructor() {
    this.citas = [];
  }

  agregarCita(cita) {
    this.citas = [...this.citas, cita];

    console.log(this.citas);
  }

  EliminarCita(id) {
    this.citas = this.citas.filter(cita => cita.id !== id);
  }
}

class UI {
  imprimirAlerta(mensaje, alerta) {
    // Crear div
    const divMensaje = document.createElement("div");
    divMensaje.classList.add("text-center", "alert", "d-block", "col-12");

    // Agregar clase en base al tipo de error
    if (tipo === "error") {
      divMensaje.classList.add("alert-danger");
    } else {
      divMensaje.classList.add("alert-success");
    }

    // Mensjae de error
    divMensaje.textContent = mensaje;

    // Agregar al DOM
    document
      .querySelector("#contenido")
      .insertBefore(divMensaje, document.querySelector(".agregar-cita"));

    // Quitar alerta
    setTimeout(() => {
      divMensaje.remove();
    }, 5000);
  }

  imprimirCitas({ citas }) {
    // const { citas } = citas; => Tambien se puede hacer desde la declaración del parametro solo anteponiendo {TuParametro}

    this.limpiarHTML();

    citas.forEach((cita) => {
      const { mascota, propietario, telefono, fecha, hora, sintomas, id } =
        cita;

      const divCita = document.createElement("div");
      divCita.classList.add("cita", "p-3");
      divCita.dataset.id = id;

      // ==>  Scripting de los elementos de la cita
      // Titulo para mostrar el nombre de la mascota
      const mascotaParrafo = document.createElement("h2");
      mascotaParrafo.classList.add("card-title", "font-weight-bolder");
      mascotaParrafo.textContent = mascota;

      // Parrafo para mostrar el propietario
      const propietarioParrafo = document.createElement("p");
      propietarioParrafo.innerHTML = `<span class="font-weight-bolder"> Propietario: </span> ${propietario}`;

      // Parrafo para mostrar el telefóno
      const telefonoParrafo = document.createElement("p");
      telefonoParrafo.innerHTML = `<span class="font-weight-bolder"> Telefono: </span> ${telefono}`;

      // Parrafo para mostrar la fecha
      const fechaParrafo = document.createElement("p");
      fechaParrafo.innerHTML = `<span class="font-weight-bolder"> Fecha: </span> ${fecha}`;

      // Parrafo para mostrar la hora
      const horaParrafo = document.createElement("p");
      horaParrafo.innerHTML = `<span class="font-weight-bolder"> Hora: </span> ${hora}`;

      // Parrafo para mostrar el sintoma
      const sintomaParrafo = document.createElement("p");
      sintomaParrafo.innerHTML = `<span class="font-weight-bolder"> Sintoma: </span> ${sintomas}`;

      // Boton para eliminar esta cita
      const btnEliminar = document.createElement("button");
      btnEliminar.classList.add("btn", "btn-danger", "mr-2", "text-center");
      btnEliminar.innerHTML = 'Eliminar <svg viewBox="0 0 1024 1024" fill="#ffffff" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="2"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M32 241.6c-11.2 0-20-8.8-20-20s8.8-20 20-20l940 1.6c11.2 0 20 8.8 20 20s-8.8 20-20 20L32 241.6zM186.4 282.4c0-11.2 8.8-20 20-20s20 8.8 20 20v688.8l585.6-6.4V289.6c0-11.2 8.8-20 20-20s20 8.8 20 20v716.8l-666.4 7.2V282.4z" fill=""></path><path d="M682.4 867.2c-11.2 0-20-8.8-20-20V372c0-11.2 8.8-20 20-20s20 8.8 20 20v475.2c0.8 11.2-8.8 20-20 20zM367.2 867.2c-11.2 0-20-8.8-20-20V372c0-11.2 8.8-20 20-20s20 8.8 20 20v475.2c0.8 11.2-8.8 20-20 20zM524.8 867.2c-11.2 0-20-8.8-20-20V372c0-11.2 8.8-20 20-20s20 8.8 20 20v475.2c0.8 11.2-8.8 20-20 20zM655.2 213.6v-48.8c0-17.6-14.4-32-32-32H418.4c-18.4 0-32 14.4-32 32.8V208h-40v-42.4c0-40 32.8-72.8 72.8-72.8H624c40 0 72.8 32.8 72.8 72.8v48.8h-41.6z" fill=""></path></g></svg>';

      btnEliminar.onclick = () => EliminarCita(id);

      // Agregar los parrafos al divCita
      divCita.appendChild(mascotaParrafo);
      divCita.appendChild(propietarioParrafo);
      divCita.appendChild(telefonoParrafo);
      divCita.appendChild(fechaParrafo);
      divCita.appendChild(horaParrafo);
      divCita.appendChild(sintomaParrafo);
      divCita.appendChild(btnEliminar);

      // Agregar las citas del HTML
      contenedorcitas.appendChild(divCita);
    });
  }

  limpiarHTML() {
    while (contenedorcitas.firstChild) {
      contenedorcitas.removeChild(contenedorcitas.firstChild);
    }
  }
}

const ui = new UI();
const administrarCitas = new Citas();

// Registrar Eventos
eventListeners();
function eventListeners() {
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
  sintomas: "",
};

// Agrega datos al objeto de la cita
function datosCita(e) {
  citaObjt[e.target.name] = e.target.value;
}

// Valida y agrega una nueva cita a la clase de citas
function nuevaCita(e) {
  e.preventDefault();

  // Extraer la información del objeto de la cita
  const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObjt;

  // Validar campos vacios
  if (
    mascota === "" ||
    propietario === "" ||
    telefono === "" ||
    fecha === "" ||
    hora === "" ||
    sintomas === ""
  ) {
    ui.imprimirAlerta("Todos los campos son obligatorios", "error");
    return;
  }

  // Generar id único
  citaObjt.id = Date.now();

  // Creando una nueva cita
  administrarCitas.agregarCita({ ...citaObjt });

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


function EliminarCita(id) {
  // Eliminar la cita
  administrarCitas.EliminarCita(id);

  // Muestar un mensaje
  ui.imprimirAlerta("La cita se elimino correctamente");

  // Refresca las citas
  ui.imprimirCitas(administrarCitas);
}