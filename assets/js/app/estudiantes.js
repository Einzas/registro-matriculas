const tableBody = document.querySelector("#tableBody");
const dta = document.querySelector(".dta");
window.addEventListener("load", () => {
  getMatriculas().then((matriculas) => {
    if (matriculas.length === 0) {
      dta.innerHTML = `<h3 class="text-center">No hay estudiantes registrados</h3>`;
    } else {
      matriculas.forEach((matricula) => {
        tableBody.innerHTML += `
          <tr>
          <td>${matricula.dni}</td>
          <td>${matricula.name}</td>
          <td>${matricula.lastName}</td>
          <td>${matricula.birthdate}</td>
                  <td>${matricula.age}</td>
                  <td>${matricula.gender}</td>
                  <td>${matricula.academicLevel}</td>
                  <td>${matricula.email}</td>
                  <td>${matricula.phone}</td>
                  <td>${matricula.address}</td>
                  <td><button onClick="ficha('${matricula.dni}')" class="btn btn-primary">Matricula</button></td>
                  <td><button onClick="editar('${matricula.dni}')" class="btn btn-warning">Editar</button></td>
                  <td><button onClick="eliminar('${matricula.dni}')" class="btn btn-danger">Eliminar</button></td>
                  </tr>
                  `;
      });
    }
  });
});
const getMatriculas = async () => {
  const resp = await fetch("https://matriculas-escuela.herokuapp.com/api/v1/student/data");
  const data = await resp.json();
  return data;
};

tableBody.innerHTML = "";

const ficha = (dni) => {
  var isMobile = /Mobile/.test(navigator.userAgent);
  if (isMobile) {
    Swal.fire({
      title: "Error!",
      text: "Esta opción no esta disponible en dispositivos móviles",
      icon: "error",
      confirmButtonText: "Ok",
    });
  } else {
    window.location.href = `./matricula/verMatricula.html?dni=${dni}`;
  }
};

const editar = (dni) => {
  //si detecta que esta en telefono mostrar un Swal

  window.location.href = `./gestion/estudiante.html?dni=${dni}`;
};

const eliminar = (dni) => {
  console.log("eliminar");
};
