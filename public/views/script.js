import { ApiRequest } from "../../assets/js/request.js";

/** Clase que representa al componente computador */
class Computador {

  constructor() { }

  /** Actualiza el listado de computadores en la tabla */
  static  get() {
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
              <input name = "gce_valor"  id = "${item.gce_id}" value = "${item.gce_estado}" class="form-check-input" type="checkbox" role="switch" ${Number(item.gce_estado) === 1 ? 'checked' : ''}
                onchange="Computador.updateStatus(${item.gce_id}, event.target.checked)">
                <input type = "hidden" name = "gce_id_estado">
            </div>
          </td>
          <td>
          <button class="btn btn-outline-primary btn-rounded" onclick='Computador.llenarEdicion(${JSON.stringify(
            item.gce_id)})' data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            <i class="fas fa-pencil-alt"></i>
          </button>
            <button class="btn btn-outline-danger btn-rounded" onclick='Computador.eliminarRegistro(${item.gce_id})'>
             <i class="fas fa-trash-alt"></i>
            </button>
            </td>
          </tr>          
          </td>
        </tr>`; // Añade la fila a la tabla
      });      
    }).catch(error => console.log('Ha ocurrido un error', error));    
  }

  /** Registra un computador en la base de datos */
  static add = (event) => {
    event.preventDefault(); // Cancela el restablecimiento de la página

    /** Formulario de registro */
    const registerForm = event.target;

    const parameters = {
      gce_nombre_equipo: registerForm.querySelector('[name="gce_nombre_equipo"]').value,
      gce_board: registerForm.querySelector('[name="gce_board"]').value,
      gce_case: registerForm.querySelector('[name="gce_case"]').value,
      gce_procesador: registerForm.querySelector('[name="gce_procesador"]').value,
      gce_grafica: registerForm.querySelector('[name="gce_grafica"]').value,
      gce_ram: registerForm.querySelector('[name="gce_ram"]').value,
      gce_disco_duro: registerForm.querySelector('[name="gce_disco_duro"]').value,
      gce_teclado: registerForm.querySelector('[name="gce_teclado"]').value,
      gce_mouse: registerForm.querySelector('[name="gce_mouse"]').value,
      gce_pantalla: registerForm.querySelector('[name="gce_pantalla"]').value,
      gce_estado: registerForm.querySelector('[name="gce_estado"]').value,
    };

    ApiRequest.post('Caracteristicas', 'addOne', parameters).then((response) => {
      console.log('Añadir', response, response.data);
    }).catch(error => console.log('Ha ocurrido un error', error));
  };

  /**
   * Actualiza el estado de un computador
   * @param {number} id Identificador del computador
   * @param {status} boolean Nuevo estado
   */   

  static updateStatus = (id, status) => {    
   
    let valorCheck =  document.getElementById(id);
    valorCheck.value = status;

    let valorCheckInsert = 0;
    if(valorCheck.value == "true"){
      valorCheckInsert = 1;

    }else if(valorCheck.value == "false"){
      valorCheckInsert = 0;
    }

    const parameters = {
      gce_valor: valorCheckInsert,
      gce_id_estado:id,
    };    

    ApiRequest.post('Caracteristicas', 'updateOne',parameters).then((response) => {
      console.log('Añadir', response, response.data);
    }).catch(error => console.log('Ha ocurrido un error', error));
  }

  static llenarEdicion(item) {
    document.getElementById('gce_id_actualizado').value = item.gce_id
    document.getElementById('gce_nombre_equipo_actualizado').value = item.gce_nombre_equipo
    document.getElementById('gce_board_actualizado').value = item.gce_board
    document.getElementById('gce_case_actualizado').value = item.gce_case
    document.getElementById('gce_procesador_actualizado').value = item.gce_procesador
    document.getElementById('gce_grafica_actualizado').value = item.gce_grafica
    document.getElementById('gce_ram_actualizado').value = item.gce_ram
    document.getElementById('gce_disco_duro_actualizado').value = item.gce_disco_duro
    document.getElementById('gce_teclado_actualizado').value = item.gce_teclado
    document.getElementById('gce_mouse_actualizado').value = item.gce_mouse
    document.getElementById('gce_pantalla_actualizado').value = item.gce_pantalla
    document.getElementById('gce_estado_actualizado').value = item.gce_estado
  };
  
  static Update(event) {
    event.preventDefault()

    let datos = {
      gce_id: document.getElementById('gce_id_actualizado').value,
      gce_nombre_equipo: document.getElementById('gce_nombre_equipo_actualizado').value,
      gce_board: document.getElementById('gce_board_actualizado').value,
      gce_case: document.getElementById('gce_case_actualizado').value,
      gce_procesador: document.getElementById('gce_procesador_actualizado').value,
      gce_grafica: document.getElementById('gce_grafica_actualizado').value,
      gce_ram: document.getElementById('gce_ram_actualizado').value,
      gce_disco_duro: document.getElementById('gce_disco_duro_actualizado').value,
      gce_teclado: document.getElementById('gce_teclado_actualizado').value,
      gce_mouse: document.getElementById('gce_mouse_actualizado').value,
      gce_pantalla: document.getElementById('gce_pantalla_actualizado').value,
      gce_estado: document.getElementById('gce_estado_actualizado').value,
    }

    ApiRequest.post('Caracteristicas', 'Update', datos).then((response) => {
      console.log('Actualizar', response)
      this.get()
      Swal.fire({
        icon: 'success',
        text: 'El computador ' + datos.gce_nombre_equipo + ' ha sido actualizado',
      })
    }).catch((error) => {
      console.log('Ha ocurrido un error', error)
    })

  }

  static eliminarRegistro(id) {
    ApiRequest.post('Caracteristicas', 'eliminarRegistro', { id: id }).then((response) => {
      console.log('Eliminado', response)
      this.get()
      Swal.fire({
        icon: 'success',
        text: 'El registro ha sido eliminado',
      })
    }).catch((error) => {
      console.log('Ha ocurrido un error', error)
    })
  }

}




// Evento que espera a que cargue el contenido HTML 
document.addEventListener('DOMContentLoaded', () => {
  Computador.get(); // Actualiza la tabla de computadores
});


(function () { // Habilita el uso de las clases en el archivo HTML
  this.Computador = Computador;
  this.ApiRequest = ApiRequest;
}).apply(window);



