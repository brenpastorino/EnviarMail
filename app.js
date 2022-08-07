//Variables
const btnEnviar = document.querySelector("#enviar");
const btnReset = document.querySelector("#resetBtn");
const formulario = document.querySelector("#enviar-mail");

//Variables para campos
const email = document.querySelector("#email");
const asunto = document.querySelector("#asunto");
const mensaje = document.querySelector("#mensaje");

const er =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//er es por expresión regular, es mejor validar con expresiones regulares
//Emailregex.com sitio que tiene expresión regular para validar mail

eventListeners();

function eventListeners() {
  //cuando la app arranca
  document.addEventListener("DOMContentLoaded", iniciarApp);
  //campos del formulario
  email.addEventListener("blur", validarFormulario); //blur es cuando estoy en el campo y toco afuera
  asunto.addEventListener("blur", validarFormulario);
  mensaje.addEventListener("blur", validarFormulario);

  //Reiniciar el formulario
  btnReset.addEventListener("click", resetearFormulario);

  //Enviar mail
  formulario.addEventListener("submit", enviarMail);
}

//Funciones
function iniciarApp() {
  btnEnviar.disabled = true;
  btnEnviar.classList.add("cursor-not-allowed", "opacity-50");
}

//Validar el formulario
function validarFormulario(e) {
  if (e.target.value.length > 0) {
    //Elimina los errores
    const error = document.querySelector("p.error");
    if (error) {
      error.remove();
    }

    e.target.classList.remove("border", "border-red-500");
    e.target.classList.add("border", "border-green-500");
  } else {
    e.target.classList.remove("border", "border-green-500");
    e.target.classList.add("border", "border-red-500");
    mostrarError("Todos los campos son obligatorios");
  }

  if (e.target.type === "email") {
    if (er.test(e.target.value)) {
      const error = document.querySelector("p.error");
      if (error) {
        error.remove();
      }

      e.target.classList.remove("border", "border-red-500");
      e.target.classList.add("border", "border-green-500");
    } else {
      e.target.classList.remove("border", "border-green-500");
      e.target.classList.add("border", "border-red-500");
      mostrarError("El email no es válido");
    }
  }

  if (er.test(email.value) && asunto.value !== "" && mensaje.value !== "") {
    btnEnviar.disabled = false;
    btnEnviar.classList.remove("cursor-not-allowed", "opacity-50");
  }
}

function mostrarError(mensaje) {
  const mensajeError = document.createElement("p");
  mensajeError.textContent = mensaje;
  mensajeError.classList.add(
    "border",
    "border-red-500",
    "background-red-100",
    "text-red-500",
    "p-3",
    "mt-5",
    "text-center",
    "error"
  );
  const errores = document.querySelectorAll(".error");
  if (errores.length === 0) {
    formulario.appendChild(mensajeError);
  }
}

//Envia el mail
function enviarMail(e) {
  e.preventDefault();
  //Mostrar el spinner : //el spinner lo sacó de una pagina llamada spinkit
  const spinner = document.querySelector("#spinner");
  spinner.style.display = "flex";

  //Despues de 3 segundos ocultar el spinner y mostrar el mensaje
  setTimeout(() => {
    spinner.style.display = "none";
    //mensaje que dice que se envió correctamente
    const parrafo = document.createElement("p");
    parrafo.textContent = "El mensaje se envió correctamente";
    parrafo.classList.add(
      "text-center",
      "my-10",
      "p-2",
      "bg-green-500",
      "text-white",
      "font-bold",
      "uppercase"
    );

    //Insertar el parrafo antes del spinner
    formulario.insertBefore(parrafo, spinner);
    setTimeout(() => {
      parrafo.remove(); //Elimina el mensaje de exito
      resetearFormulario();
    }, 5000);
  }, 3000);
}

//Funcion que resetea el formulario
function resetearFormulario() {
  formulario.reset();
  iniciarApp();
}
