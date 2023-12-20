import { ApiRequest } from "../../assets/js/request.js";

// Función para obtener el ID del registro de la URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }
  
  function loadRecordData(id) {
    ApiRequest.get('Caracteristicas', 'getOne', { gce_id: id }) 
      .then(response => {
        const data = response.data;
        console.log(data);
        
        if (data) {
            document.querySelector('[name="gce_nombre_equipo"]').value = data.gce_nombre_equipo || '';
            document.querySelector('[name="gce_board"]').value = data.gce_board || '';
            document.querySelector('[name="gce_case"]').value = data.gce_case || '';
            document.querySelector('[name="gce_procesador"]').value = data.gce_procesador || '';
            document.querySelector('[name="gce_grafica"]').value = data.gce_grafica || '';
            document.querySelector('[name="gce_ram"]').value = data.gce_ram || '';
            document.querySelector('[name="gce_disco_duro"]').value = data.gce_disco_duro || '';
            document.querySelector('[name="gce_teclado"]').value = data.gce_teclado || '';
            document.querySelector('[name="gce_mouse"]').value = data.gce_mouse || '';
            document.querySelector('[name="gce_pantalla"]').value = data.gce_pantalla || '';
            document.querySelector('[name="gce_estado"]').value = data.gce_estado || '';
        } else {
            console.error('No se recibieron los datos del registro');
          }    
      })
      .catch(error => {
        console.error('Error al cargar los datos:', error);
        alert('Error al cargar los datos del computador');
      });
  }
  
  // Evento que espera a que cargue el contenido HTML
  document.addEventListener('DOMContentLoaded', () => {
    // Obtén el ID del registro de la URL
    const recordId = getQueryParam('id');
  
    // Si tenemos un ID, carga los datos del registro para editar
    if (recordId) {
      loadRecordData(recordId);
    } else {
      console.error('No se proporcionó un ID de registro en la URL.');
    }
  });
  