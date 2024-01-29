//OBTENER PACIENTE METODO  GET

const obtenerPacientes = async () => {
    const resp = await fetch("http://localhost:3000/pacientes")
    const data = await resp.json();
    console.log(data);
    return data;
}

//OBTENER PACIENTE METODO GET POR ID

const obtenerPacientesId = async (id) => {
    const resp = await fetch(`http://localhost:3000/pacientes/${id}`);
    const data = await resp.json();
    console.log(data);
    return data;

}

//AGREGAR PACIENTE METODO  POST

const agregarPacientes = async (paciente) => {
    const resp = await fetch("http://localhost:3000/pacientes", {
        method: "POST",
        body: JSON.stringify(paciente),
        headers: {
            "Content-type": "application/json; charset-UTF 8"
        },
    });
    const data = await resp.json();
    console.log(data);
    return data;
}

//ACTUALIZAR PACIENTE METODO  PUT

const actualizarEstadoPaciente = async (id, paciente, estadoNuevo) => {
    // Modificar el objeto paciente con el nuevo estado
    paciente.estado = estadoNuevo;
    
    const resp = await fetch(`http://localhost:3000/pacientes/${id}`, {
        method: "PUT",
        body: JSON.stringify(paciente),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
    });
    const data = await resp.json();
    console.log(data);
    return data;
};

//ELIMINAR PACIENTE METODO  DELETE

const eliminarPacientes = async (id) => {
    const resp = await fetch(`http://localhost:3000/pacientes/${id}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json; charset-UTF 8"
        },
    });
    const data = await resp.json();
    console.log(data);
    return data;
}

export default {
    obtenerPacientes,
    obtenerPacientesId,
    agregarPacientes,
    actualizarEstadoPaciente,
    eliminarPacientes,
}
