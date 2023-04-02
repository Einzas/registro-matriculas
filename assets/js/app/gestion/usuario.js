const titulo = document.querySelector(".titulo");
const boton = document.querySelector(".envio");
//obtiene si existe ?id= en la url
const url = window.location.search;
let id;
const obtenerUsuarioId = async (id) => {
  const resp = await fetch(`https://matriculas-escuela.herokuapp.com/api/v1/user/user/${id}`);
  const data = await resp.json();
  return data;
};
if (url.includes("?id=")) {
  titulo.textContent = "Editar Usuario";
  boton.value = "Editar";
  id = url.split("=")[1];
  obtenerUsuarioId(id).then((usuario) => {
    const name = document.querySelector("#name");
    const email = document.querySelector("#email");
    const password = document.querySelector("#password");
    name.value = usuario.name;
    email.value = usuario.email;
    password.disabled = true;
  });
} else {
  titulo.textContent = "Crear Usuario";
  boton.value = "Crear";
  const changePassword = document.querySelector(".ch-p").classList.add('d-none');
}

const checkbox = document.querySelector(".check");
const password = document.querySelector("#password");
checkbox.addEventListener("click", () => {
  password.disabled = !checkbox.checked;
});

const token = localStorage.getItem("token");
const tokenDecoder = (token) => {
  if (!token) {
    window.location.href = "../../login.html";
  }
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
};
if (tokenDecoder(token).exp < Date.now() / 1000) {
  localStorage.removeItem("token");
  window.location.href = "../login.html";
}
if (!token) {
  window.location.href = "../login.html";
}

boton.addEventListener("click", (e) => {
  e.preventDefault();
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  let data = {};
  if (!password.disabled) {
    data = {
      name,
      email,
      password,
    };
  } else {
    data = {
      name,
      email,
    };
  }
  if (id) {
    editarUsuario(id, data);
  } else {
    crearUsuario(data);
  }
});

const editarUsuario = async (id, data) => {
  const resp = await fetch(`https://matriculas-escuela.herokuapp.com/api/v1/user/user/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.status === 200) {
      window.location.href = "../ListadoUsuario.html";
    }
  });
};

const crearUsuario = async (data) => {
  const resp = await fetch("https://matriculas-escuela.herokuapp.com/api/v1/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.status === 200) {
      window.location.href = "../ListadoUsuario.html";
    }
  });
}