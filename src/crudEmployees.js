import axios from "axios";

export const employeeURL = "http://localhost:3000/employees";

export async function getData() {
  const params = {
    is_active: true,
  };
  try {
    const resp = await axios.get(employeeURL, { params: params });

    const data = resp.data;

    return data.sort(function (a, b) {
      return new Date(b.created) - new Date(a.created);
    });

  } catch (error) {
    console.log(error);
    return "Algo salió mal";
  }
}

export async function sendData(formData) {
  try{
    // comprobar que no se repita el numero de indentifacion
    const responseCkeck = await fetch(`${employeeURL}?identification=${formData.identification}`);
    const existingUser = await responseCkeck.json();

    if (existingUser.length > 0) {
      throw new Error("El numero de identificacion ya exite");
    }

    const responseAll = await fetch('http://localhost:3000/employees');
        const totalUsuario = await responseAll.json();
        const maxID = totalUsuario.reduce((max, employees) => Math.max(max, parseInt(employees.id) || 0), 0);
        const nuevoId = maxID + 1;


    const resp = await axios.post(employeeURL, { id: nuevoId.toString(), ...formData, in_estado: true }, {
      headers: { 'Content-Type': 'application/json'}
    });
    if(resp.ok){
      alert("se creó correctamente")
    }
  }catch(error){
    console.log('Error al crear usuario',error)
    return "ocurrió un error"
  }
}

export async function editEmployee(id) {
  try {
    const resp = await axios.get(`${employeeURL}/${id}`);
    const data = resp.data;

    document.getElementById("grid-first-name").value = data.name;
    document.getElementById("grid-last-name").value = data.lastname;
    document.getElementById("grid-identification").value = data.identification;

    document.getElementById("sendForm").hidden = true;
    document.getElementById("btn-container").hidden = false;
  } catch (error) {
    console.log(error);
    return "ocurrió un error";
  }
}

export async function deleteEmployee(id) {
  try {
    const resp = await fetch(`${employeeURL}/${id}`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json'},
      body: JSON.stringify({is_active: false})
    });

    if (!resp.ok) {
      throw new Error('No se pudo eliminar al usuario')
    }
    alert('Usuario eliminado');
    
  } catch (error) {
    console.error('Error al eliminar al usuario', error);
    alert('Error al eliminar al usuario')
  }
}


