const form = document.querySelector("form");
const dni = new URLSearchParams(window.location.search).get("dni");
const titulo = document.querySelector(".titulo");
const boton = document.querySelector(".envio");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  formData.append("UserId", tokenDecoder(localStorage.getItem("token")).id);
  formData.append("password", e.target.dni.value);
  formData.append("age", e.target.age.value);
  formData.append("dni", e.target.dni.value);
  formData.append("name", e.target.name.value);
  formData.append("lastname", e.target.lastname.value);
  formData.append("email", e.target.email.value);
  formData.append("phone", e.target.phone.value);
  formData.append("address", e.target.address.value);
  formData.append("birthdate", e.target.birthdate.value);
  const imageFile = document.getElementById("imagen").files[0];
  if (imageFile) {
    formData.append("imagen", imageFile);
  }
  
  const requestOptions = {
    method: dni ? "PUT" : "POST",
    body: formData,
  };

  const url = dni
    ? `https://matriculas-escuela.herokuapp.com/api/v1/student/data/${dni}`
    : "https://matriculas-escuela.herokuapp.com/api/v1/student/register/";

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
      localStorage.setItem("dni", e.target.dni.value)

      window.location.href = `representante.html?id=${localStorage.getItem("dni")}}`;

    })
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
  const res = await fetch(`https://matriculas-escuela.herokuapp.com/api/v1/student/data/${dni}`);
  const data = await res.json();
  return data;
};

const initializeForm = async () => {
  if (dni != null) {
    titulo.textContent = "Editar Matricula";
    boton.value = "Editar";
    const matricula = await cargarDatos(dni);

    form.dni.value = matricula.dni;
    form.name.value = matricula.name;
    form.lastname.value = matricula.lastName;
    form.birthdate.value = matricula.birthdate;
    form.age.value = matricula.age;
    form.gender.value = matricula.gender;
    form.academicLevel.value = matricula.academicLevel;
    form.email.value = matricula.email;
    form.phone.value = matricula.phone;
    form.address.value = matricula.address;
  } else {
    titulo.textContent = "Crear Matricula";
    boton.value = "Crear";
  }
};
function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = (error) => reject(error);
  });
}

initializeForm();
