const dni = new URLSearchParams(window.location.search).get("dni");

async function getMatricula(dni) {
  const resp = await fetch(`https://matriculas-escuela.herokuapp.com/api/v1/student/data/${dni}`);
  const data = await resp.json();

  return data;
}

async function getRepresentantes(dni) {
  const resp = await fetch(`https://matriculas-escuela.herokuapp.com/api/v1/parent/data/${dni}`);
  const data = await resp.json();

  return data;
}

function arrayBufferToBase64(buffer) {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;

  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  return window.btoa(binary);
}

getMatricula(dni).then((matricula) => {
  const tableBody = document.querySelector(".data");
  const base64Image = arrayBufferToBase64(matricula.imagen);

  tableBody.innerHTML = `
    <div class="col row px-5 pt-2 row-cols-2">
                <div class="col ">
                    <b>Cedula:</b>
                </div>
                <div class="col mb-3 text-start">${matricula.dni}</div>
                
                <div class="col">
                    <b>Nombre:</b>
                </div>
                <div class="col mb-3 text-start">${matricula.name}</div>
                
                <div class="col">
                    <b>Apellido:</b>
                </div>
                <div class="col mb-3 text-start">${matricula.lastName}</div>
                
                <div class="col">
                    <b>Fecha de Nacimiento:</b>
                </div>
                <div class="col mb-3 text-start">${matricula.birthdate}</div>
                
                <div class="col">
                    <b>Edad:</b>
                </div>
                <div class="col mb-3 text-start">${matricula.age}</div>
                
                <div class="col">
                    <b>Género:</b>
                </div>
                <div class="col mb-3 text-start">${matricula.gender}</div>
                
                <div class="col">
                    <b>Grado:</b>
                </div>
                <div class="col mb-3 text-start">${matricula.academicLevel}</div>
                
                <div class="col">
                    <b>Dirección:</b>
                </div>
                <div class="col mb-3 text-start">${matricula.address}</div>
                
                <div class="col">
                    <b>Teléfono:</b>
                </div>
                <div class="col mb-3 text-start">${matricula.phone}</div>
                <div class="col">
                    <b>Correo:</b>
                </div>
                <div class="col mb-3 text-start">${matricula.email}</div>
            </div>
            <div class="col text-end foto ">
            <img style="width: 140px; height: 220px;"
            src="${matricula.imagen}"
            alt="">
    </div>`;
});

getRepresentantes(dni).then((representante) => {
  const dataRepresentante = document.querySelector(".data-representante");
  if(representante === null){
    dataRepresentante.innerHTML = `<div class="col-10 mx-auto"><h2 class="text-center" >No hay representante registrado</h2></div>`;
  }else{
    dataRepresentante.innerHTML = `
    <div class="col row px-5 pt-2 row-cols-2">
    <div class="col ">
        <b>Cedula:</b>
    </div>
    <div class="col mb-3 text-start">${representante.dni}</div>
    
    <div class="col">
        <b>Nombre:</b>
    </div>
    <div class="col mb-3 text-start">${representante.name}</div>
    
    <div class="col">
        <b>Apellido:</b>
    </div>
    <div class="col mb-3 text-start">${representante.lastName}</div>
    
    
    
    <div class="col">
        <b>Edad:</b>
    </div>
    <div class="col mb-3 text-start">${representante.age}</div>
    
    
    `;
  }
});

async function generatePDF() {
  const contentDiv = document.querySelector(".bg-light.p-4.rounded");
  const canvas = await html2canvas(contentDiv, {
    scale: 1,
    scrollY: 0,
    backgroundColor: "#FFFFFF",
  });
  const imgData = canvas.toDataURL("image/png");
  const pdf = new window.jspdf.jsPDF("p", "mm", "a4");

  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  pdf.save("matricula.pdf");
}

const regresar = () => {
  window.location.href = "../home.html";
};
