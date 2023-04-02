window.addEventListener("load", () => {
    if(localStorage.getItem("token") !== null) {
        window.location.href = "/app/home.html";
    }
  const form = document.querySelector(".form");
  const email = document.querySelector("#email");
  const password = document.querySelector("#password");
  let error;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (email.value === "" || password.value === "") {
      error = "Please enter all fields";
      alerts(error, "danger");
    }
    if (email.value === "") {
      error = "Please enter your email";
      alerts(error, "danger");
    }
    if (password.value === "") {
      error = "Please enter your password";
      alerts(error, "danger");
    } else {
      error = "";
      alerts(error, "success");
      loginSuccess();
    }
  });
});

const alerta = document.querySelector(".alerta");
const alerts = (message, type) => {
  if (!type === "success")
    alerta.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert"> ${message} <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`;
};

const loginSuccess = async () => {
  await fetch("https://matriculas-escuela.herokuapp.com/api/v1/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
  })
    .then((res) => {
        return res.json();
    })
    .then((data) => {
      if (data.auth === true) {
        localStorage.setItem("token", data.token);
        window.location.href = "/app/home.html";
      } else {
        alerts(data.message, "danger");
      }
    });
};
