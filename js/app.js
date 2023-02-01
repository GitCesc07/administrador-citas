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

let editando;

class Citas {
  constructor() {
    this.citas = [];
  }

  agregarCita(cita) {
    this.citas = [...this.citas, cita];
  }

  EliminarCita(id) {
    this.citas = this.citas.filter(cita => cita.id !== id);
  }

  editarCita(citaActualizada) {
    this.citas = this.citas.map(cita => cita.id === citaActualizada.id ? citaActualizada : cita);
  }
}

class UI {
  imprimirAlerta(mensaje, tipo) {
    // Crear div
    const divMensaje = document.createElement("div");
    divMensaje.classList.add("text-center", "alert", "d-block", "col-12");

    // Agregar clase en base al tipo de error
    if (tipo === 'error') {
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
      btnEliminar.innerHTML =
        'Eliminar <svg viewBox="0 0 1024 1024" fill="#ffffff" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="2"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M32 241.6c-11.2 0-20-8.8-20-20s8.8-20 20-20l940 1.6c11.2 0 20 8.8 20 20s-8.8 20-20 20L32 241.6zM186.4 282.4c0-11.2 8.8-20 20-20s20 8.8 20 20v688.8l585.6-6.4V289.6c0-11.2 8.8-20 20-20s20 8.8 20 20v716.8l-666.4 7.2V282.4z" fill=""></path><path d="M682.4 867.2c-11.2 0-20-8.8-20-20V372c0-11.2 8.8-20 20-20s20 8.8 20 20v475.2c0.8 11.2-8.8 20-20 20zM367.2 867.2c-11.2 0-20-8.8-20-20V372c0-11.2 8.8-20 20-20s20 8.8 20 20v475.2c0.8 11.2-8.8 20-20 20zM524.8 867.2c-11.2 0-20-8.8-20-20V372c0-11.2 8.8-20 20-20s20 8.8 20 20v475.2c0.8 11.2-8.8 20-20 20zM655.2 213.6v-48.8c0-17.6-14.4-32-32-32H418.4c-18.4 0-32 14.4-32 32.8V208h-40v-42.4c0-40 32.8-72.8 72.8-72.8H624c40 0 72.8 32.8 72.8 72.8v48.8h-41.6z" fill=""></path></g></svg>';

      btnEliminar.onclick = () => EliminarCita(id);

      // Añade un botón para editar cita
      const btnEditar = document.createElement("button");
      btnEditar.classList.add("btn", "btn-info");
      btnEditar.innerHTML =
        'Editar <svg viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" stroke-width="1.272" transform="matrix(1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.384"></g><g id="SVGRepo_iconCarrier"> <path d="M12.2424 20H17.5758M4.48485 16.5L15.8242 5.25607C16.5395 4.54674 17.6798 4.5061 18.4438 5.16268V5.16268C19.2877 5.8879 19.3462 7.17421 18.5716 7.97301L7.39394 19.5L4 20L4.48485 16.5Z" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>';

      btnEditar.onclick = () => cargarEdicion(cita);

      // Agregar los parrafos al divCita
      divCita.appendChild(mascotaParrafo);
      divCita.appendChild(propietarioParrafo);
      divCita.appendChild(telefonoParrafo);
      divCita.appendChild(fechaParrafo);
      divCita.appendChild(horaParrafo);
      divCita.appendChild(sintomaParrafo);
      divCita.appendChild(btnEliminar);
      divCita.appendChild(btnEditar);

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

  if (editando) {
    ui.imprimirAlerta("Editado correctamente");

    // Pasar el objeto de la cita a la edición
    administrarCitas.editarCita({ ...citaObjt })

    // Regresar el texto del botón a su estado original
    formulario.querySelector("button[type=submit]").textContent =
      "Crear Cita";

    // Quitar modo edición
    editando = false;
  } else {
    // Generar id único
    citaObjt.id = Date.now();

    // Creando una nueva cita
    administrarCitas.agregarCita({ ...citaObjt });

    // Mensaje de agregado correctamente
    ui.imprimirAlerta("Se agrego correctamente");
  }

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

// Carga los datos y el modo edición
function cargarEdicion(cita) {
  const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

  // llenar los input, con los datos que obtienes de la cita seleccionada
  mascotaInput.value = mascota;
  propietarioInput.value = propietario;
  telefonoInput.value = telefono;
  fechaInput.value = fecha;
  horaInput.value = hora;
  sintomasInput.value = sintomas;

  // Llenar los objetos
  citaObjt.mascota = mascota;
  citaObjt.propietario = propietario;
  citaObjt.telefono = telefono;
  citaObjt.fecha = fecha;
  citaObjt.hora = hora;
  citaObjt.sintomas = sintomas;
  citaObjt.id = id;

  // Cambiar el texto del botón al editar ==> Antes =>(CREAR CITA) Despues =>(GUARDAR CAMBIOS)
  formulario.querySelector("button[type=submit]").textContent =
    "Guardar Cambios";

  editando = true;
}
