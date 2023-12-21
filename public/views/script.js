import { ApiRequest } from "../../assets/js/request.js";

/** Clase que representa al componente computador */
class Computador {

  constructor() { }    

  /** Actualiza el listado de computadores en la tabla */
  static get() {
    ApiRequest.get('Caracteristicas', 'getAll').then(response => {
      /** Referencia del cuerpo de la tabla */
      const tbody = document.querySelector('#list-table tbody');
      tbody.innerHTML = ''; // Limpia la tabla

      response.data.forEach((item, index) => {
        // Clase para alternar el color de las filas
        const estado = Number(item.gce_estado) === 1 ? 'Activo' : 'Inactivo';
        const rowClass = estado === 'Activo' ? (index % 2 === 0 ? 'bg-white' : 'bg-light') : 'bg-inactive';        
        const estadoColor = Number(item.gce_estado) === 1 ? 'text-success' : 'text-danger'; 

        // Construcción de cada fila con los datos y los botones
        tbody.innerHTML += `<tr class="${rowClass}">
          <td>${item.gce_nombre_equipo}</td>
          <td>${item.gce_board}</td>
          <td>${item.gce_case}</td>
          <td>${item.gce_procesador}</td>
          <td>${item.gce_grafica}</td>
          <td>${item.gce_ram}</td>
          <td>${item.gce_disco_duro}</td>
          <td>${item.gce_teclado}</td>
          <td>${item.gce_mouse}</td>
          <td>${item.gce_pantalla}</td>
          <td>
          <div>
            <span class="${estadoColor}">${estado}</span>
          </div>
          <div class="form-check form-switch">            
            <input class="form-check-input" type="checkbox" role="switch" ${item.gce_estado === '1' ? 'checked' : ''}
            onchange="Computador.updateStatus(${item.gce_id}, event.target.checked)">            
          </div>
          </td>
          <td>
            <button class="btn btn-outline-primary btn-rounded" onclick="Computador.openEditForm(${item.gce_id})">
              <i class="fas fa-pencil-alt"></i>
            </button>
          </td>
          <td>  
            <button class="btn btn-outline-danger btn-rounded" onclick="Computador.deleteComputer(${item.gce_id})">
              <i class="fas fa-trash-alt"></i>
            </button>
          </td>
        </tr>`; // Añade la fila a la tabla
      });
    }).catch(error => console.log('Ha ocurrido un error', error));
  }
  
  /** Abre la vista de edición para el computador seleccionado */
  static openEditForm(id) {
    // Redirige al usuario a 'edit.html' pasando el ID como parámetro
    window.location.href = `../Prueba2023/views/edit.html?id=${id}`;
  }
  
  /** Registra un computador en la base de datos */
  static add(event) {
    event.preventDefault(); // Previene el comportamiento por defecto del formulario  
    const registerForm = event.target;
    //agregar por method AddOne
    ApiRequest.post('Caracteristicas', 'addOne', new FormData(registerForm))
      .then(response => {
        // Aquí manejas la respuesta exitosa
        console.log('Registro añadido', response);
        alert('Computador agregado con éxito');
        Computador.get(); // Actualiza la lista de computadores
        registerForm.reset(); // Limpia los campos del formulario
      })
      .catch(error => {
        // Aquí manejas el error
        console.error('Error al añadir el registro:', error);
        alert('Error al agregar el computador');
      });
  }
  
  /**Actualiza el estado de un computador 
  @param {number} id Identificador del computador
  @param {status} boolean Nuevo estado
  */
  
  static updateStatus = (id, status) => {
    const estado = Number(item.gce_estado) === 1 ? 'Activo' : 'Inactivo';
    const estadoColor = Number(item.gce_estado) === 1 ? 'text-success' : 'text-danger'; 
    alert(`${id} - ${status}`);
  }
  
  /** Método para eliminar un computador */
  static deleteComputer(id) {
    if (confirm('¿Estás seguro de que quieres eliminar este computador?')) {
      ApiRequest.post('Caracteristicas', 'delete', { gce_id: id })
        .then(response => {
          console.log('Registro eliminado', response);
          alert('Computador eliminado con éxito');
          Computador.get(); // Actualiza la lista de computadores
        })
        .catch(error => {
          console.error('Error al eliminar el registro:', error);
          alert('Error al eliminar el computador');
        });
    }
  }
  

}//end class computer

// Agrega un evento de escucha para el formulario de guardado
document.addEventListener('DOMContentLoaded', () => {
  const saveForm = document.getElementById('save-form');
  if (saveForm) {
    saveForm.addEventListener('submit', Computador.save);
  }
    document.querySelectorAll('.delete-button').forEach(button => {
    button.addEventListener('click', function() {
      const id = this.getAttribute('data-id');
      Computador.deleteComputer(id);
    });
  });
});

// Exporta la clase Computador si estás usando módulos
export { Computador };

// Evento que espera a que cargue el contenido HTML 
document.addEventListener('DOMContentLoaded', () => {
  Computador.get(); // Actualiza la tabla de computadores
});

(function () { // Habilita el uso de las clases en el archivo HTML
  this.Computador = Computador;
  this.ApiRequest = ApiRequest;
}).apply(window);
