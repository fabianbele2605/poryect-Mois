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
    const resp = await axios.post(employeeURL, formData)
    if(resp.ok){
      alert("se creó correctamente")
    }
  }catch(error){
    console.log(error)
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
  alert('hola desde el elimnar')
}