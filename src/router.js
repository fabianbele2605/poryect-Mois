import {
  getData,
  sendData,
  deleteEmployee,
  editEmployee,
} from "./crudEmployees";

const routes = {
  "/": "/src/views/managmentEmployee.html",
};

export async function renderRoute() {
  const path = location.pathname || "/";
  const app = document.getElementById("app");

  const file = routes[path];
  if (!file) {
    app.innerHTML = "<h2>Página no encontrada</h2>";
    return;
  }

  try {
    const res = await fetch(file);
    const html = await res.text();

    app.innerHTML = html;
    const employees = await getData();

    const tbody = document.querySelector("#table-employee tbody");
    tbody.innerHTML = "";

    employees.forEach((employee) => {
      const fila = document.createElement("tr");

      fila.innerHTML = `
            <td>${employee.name}</td>
            <td>${employee.lastname}</td>
            <td>${employee.identification}</td>
            <td>${employee.created}</td>
            <td>
              <button class="btn-editar m-1 rounded p-1 bg-emerald-300 cursor-pointer hover:bg-emerald-500 shadow-md shadow-cyan-200" data-id="${employee.id}">Editar</button>
              <button class="btn-eliminar m-1 rounded p-1 bg-red-300 cursor-pointer hover:bg-red-500" data-id="${employee.id}">Eliminar</button>
            </td>
            `;

      tbody.appendChild(fila);
    });

    setFunctions(tbody, 'editar', ".btn-editar");
    setFunctions(tbody, false, ".btn-eliminar");

    document.getElementById("sendForm").addEventListener("click", () => {
      const button = document.getElementById("sendForm");
      button.disabled = true;

      const name = document.getElementById("grid-first-name").value;
      const lastname = document.getElementById("grid-last-name").value;
      const identification = document.getElementById(
        "grid-identification"
      ).value;

      if (!name || !lastname || !identification) {
        alert("Todos los campos son requeridos");
        return;
      }

      const form = {
        name: name,
        lastname: lastname,
        identification: identification,
        created: new Date().toISOString(),
      };
      sendData(form);
      button.disabled = false;
    });
  } catch (error) {
    console.log(error);
    app.innerHTML = "<h2>Error al cargar la vista</h2>";
  }
}

function setFunctions(tabla, clave, clase) {
  tabla.querySelectorAll(clase).forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      clave?editEmployee(id):deleteEmployee(id)
    });
  });
}
