import Swal from "sweetalert2";
import tareasApi from "../src/api/tareas.api";

document.addEventListener('DOMContentLoaded', () => {
    const turnosLista = document.getElementById('listaTurnos');

    // Función para mostrar pacientes desde el servidor utilizando la Api respectiva (GET)
    const mostrarPacientes = async () => {
            const turnos = await tareasApi.obtenerPacientes();
            console.log(turnos);

            // Mostrar la lista de pacientes
            actualizarTurnos(turnos);
    };

    // Función para actualizar estado de la lista de turnos
    const actualizarTurnos = (turnos) => {
        turnosLista.innerHTML = '';

        turnos.forEach((paciente, estadoActual) => {
            const li = document.createElement('li');
            li.className = 'lista';
            li.textContent = `${paciente.nombre} ${paciente.apellido} - Estado: ${paciente.estado}`;

            const botonAtendido = document.createElement('button');
            botonAtendido.className = 'btn btn-info btn-sm mx-5 d-block m-2';
            botonAtendido.textContent = 'Paciente Atendido';
            botonAtendido.onclick = () => cambiarEstado(paciente.id, estadoActual, 'Paciente Atendido', turnos);

            const botonEliminar = document.createElement('button');
            botonEliminar.className = 'btn btn-danger btn-sm mx-5 d-block m-2';
            botonEliminar.textContent = 'Eliminar Paciente';
            botonEliminar.onclick = () => eliminarPaciente(paciente.id);

            li.appendChild(botonAtendido);
            li.appendChild(botonEliminar);

            turnosLista.appendChild(li);
        });
    };

    // Función para ingresar un nuevo paciente
    window.ingresarPaciente = async () => {
        const nombreInput = document.getElementById('nombre');
        const apellidoInput = document.getElementById('apellido');

        const nombre = nombreInput.value.trim();
        const apellido = apellidoInput.value.trim();

        if (nombre && apellido) {
            const paciente = {
                nombre,
                apellido,
                estado: 'Paciente en Espera',
            };

                // Agregar paciente al servidor utilizando la Api respectiva (POST)
                await tareasApi.agregarPacientes(paciente);

                Swal.fire({
                    title: `¡Paciente ${paciente.nombre} ${paciente.apellido} se encuentra en espera para ser atendido/a!`,
                    icon: "success",
                });

                // Actualizar la lista de pacientes
                mostrarPacientes();

                // Limpiar campos para nuevo paciente
                nombreInput.value = '';
                apellidoInput.value = '';
        }
    };
   
    // Función para cambiar el estado del paciente del servidor utilizando la Api respectiva (PUT)
    const cambiarEstado = async (idPaciente, estadoActual, nuevoEstado, turnos) => {
        const paciente = turnos[estadoActual];
    
        // Verificar si el paciente está en estado "Paciente en Espera"
        if (paciente.estado === 'Paciente en Espera') {
    
            // Actualizar el estado del paciente en el servidor
            await tareasApi.actualizarEstadoPaciente(idPaciente, nuevoEstado);
    
            // Cambiar el estadoEnEspera al estadoAtendido
            paciente.estado = nuevoEstado;
    
            // Muestra un mensaje de éxito con SweetAlert
            Swal.fire({
                title: `¡El paciente: ${paciente.nombre} ${paciente.apellido} fue cambiado al estado de ${nuevoEstado}!`,
                icon: "success",
            });
    
            // Actualiza la lista de pacientes desde el servidor
            mostrarPacientes();
        } else {
            // Mostrar un mensaje indicando que el paciente no está en espera
            Swal.fire({
                title: `¡El paciente: ${paciente.nombre} ${paciente.apellido} no está en espera, ya fue atendido!`,
                icon: "warning",
            });
        }
    };
    

    // Función para eliminar un paciente del servidor utilizando la Api respectiva (DELETE)
    const eliminarPaciente = async (idPaciente) => {
        Swal.fire({
            title: "¿Estás seguro que deseas eliminar el Paciente?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Si",
            cancelButtonText: "No",
            cancelButtonColor: "red",
            confirmButtonColor: "green",
        }).then(async (resp) => {
            if (resp.isConfirmed) {
                await tareasApi.eliminarPacientes(idPaciente);

                Swal.fire({
                    title: "¡El paciente fue eliminado de la lista!",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1000,
                });

                mostrarPacientes();
            }
        });
    };

    // Inicializar la aplicación
    mostrarPacientes();

});
 





