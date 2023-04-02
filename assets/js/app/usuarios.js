//Obtiene los usuarios de la API
window.addEventListener("load", async () => {
  const getUsuarios = async () => {
    const resp = await fetch("https://matriculas-escuela.herokuapp.com/api/v1/user/users");
    const data = await resp.json();
    return data;
  };
  const token = localStorage.getItem("token");
  const tokenDecoder = (token) => {
    if (!token) {
      window.location.href = "../login.html";
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  };

  const formulario = document.querySelector("#data");
  await getUsuarios().then((usuarios) => {
    usuarios.forEach((usuario) => {
      formulario.innerHTML += `
            <tr>
                <td>${usuario.name}</td>
                <td>${usuario.email}</td>
                <td class="admin">
                    <a href="./gestion/usuario.html?id=${usuario.id}" class="btn btn-primary">Editar</a>
                </td>
                <td class="admin">
                    <a href="#" class="btn btn-danger ">Eliminar</a>
                </td>
            </tr>
        `;
    });
  });
  if (tokenDecoder(token).name !== "admin") {
    const admin = document.querySelectorAll(".admin").forEach((element) => {
      element.style.display = "none";
    });
    
  }
});
