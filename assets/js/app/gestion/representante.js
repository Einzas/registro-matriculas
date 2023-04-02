const titulo = document.querySelector(".titulo");
const boton = document.querySelector(".envio");
let estado = 0;
const form = document.querySelector("form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const parentData = {
    dni: e.target.dni.value,
    name: e.target.name.value,
    lastname: e.target.lastname.value,
    age: e.target.age.value,
    studentDni: localStorage.getItem("dni"),
  }

  console.log(parentData);

  const requestOptions = {
    method: estado === 0 ? "POST" : "PUT",
    body: JSON.stringify( parentData),
    headers: {
        "Content-Type": "application/json",
    },
  };

  const url =
    estado === 0
      ? "https://matriculas-escuela.herokuapp.com/api/v1/parent/register/"
      : `https://matriculas-escuela.herokuapp.com/api/v1/parent/data/${localStorage.getItem(
          "dni"
        )}`;

  const response = await fetch(url, requestOptions);
  const data = await response.json();

  if (response.status === 200) {
    Swal.fire({
      title: "Exito!",
      text: "Los datos se guardaron correctamente",
      icon: "success",
      showAcceptButton: false,
      timer: 1500,
    }).then(() => {
      localStorage.removeItem("dni");
      window.location.href = "../home.html";
    });
  } else {
    console.error(data);
  }
});

const tokenDecoder = (token) => {
  if (!token) {
    window.location.href = "../login.html";
  }
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
};

const cargarDatos = async (dni) => {
  const res = await fetch(`https://matriculas-escuela.herokuapp.com/api/v1/parent/data/${dni}`);
  const data = await res.json();
  return data;
};

const initializeForm = async () => {
  const representante = await cargarDatos(localStorage.getItem("dni"));

  if (representante === null) {
    titulo.textContent = "Crear Representante";
    boton.value = "Crear";
  } else {
    form.dni.value = representante.dni;
    form.name.value = representante.name;
    form.lastname.value = representante.lastName;
    form.age.value = representante.age;

    titulo.textContent = "Editar Representante";
    boton.value = "Editar";
    estado = 1;
  }
};

initializeForm();
