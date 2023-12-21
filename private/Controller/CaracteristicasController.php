<?php

namespace GCE\Controller;

use GCE\Model\Caracteristicas;

class CaracteristicasController
{

    private $model;

    public function __construct()
    {
        $this->model = new Caracteristicas();
    }

    /** Trae los registros de computadores */
    public function getAll()
    {
        $response = $this->model->get();
        echo json_encode($response);
    }

    /** Añade un registro a la tabla de características */
    public function addOne()
    {
        $this->model->gce_nombre_equipo = isset($_POST['gce_nombre_equipo']) ? $_POST['gce_nombre_equipo'] : null;
        $this->model->gce_procesador = isset($_POST['gce_procesador']) ? $_POST['gce_procesador'] : null;
        $this->model->gce_disco_duro = isset($_POST['gce_disco_duro']) ? $_POST['gce_disco_duro'] : null;
        $this->model->gce_pantalla = isset($_POST['gce_pantalla']) ? $_POST['gce_pantalla'] : null;
        $this->model->gce_grafica = isset($_POST['gce_grafica']) ? $_POST['gce_grafica'] : null;
        $this->model->gce_teclado = isset($_POST['gce_teclado']) ? $_POST['gce_teclado'] : null;
        $this->model->gce_estado = isset($_POST['gce_estado']) ? $_POST['gce_estado'] : null;
        $this->model->gce_board = isset($_POST['gce_board']) ? $_POST['gce_board'] : null;
        $this->model->gce_mouse = isset($_POST['gce_mouse']) ? $_POST['gce_mouse'] : null;
        $this->model->gce_case = isset($_POST['gce_case']) ? $_POST['gce_case'] : null;
        $this->model->gce_ram = isset($_POST['gce_ram']) ? $_POST['gce_ram'] : null;

        $response = $this->model->save();
        echo json_encode($response);
    }

    public function getOne()
    {
        // Verifica si el ID está presente en la URL
        $gce_id = isset($_GET['gce_id']) ? $_GET['gce_id'] : null;
    
        if ($gce_id) {
            // Establece el ID en el modelo
            $this->model->gce_id = $gce_id;
    
            // Obtiene la respuesta del modelo
            $response = $this->model->getOne($gce_id);
    
            // Devuelve la respuesta en formato JSON
            echo json_encode($response);
        } else {
            // Devuelve un error si no se proporciona el ID
            echo json_encode(['response' => false, 'error' => 'No fue posible consultar datos']);
        }
        error_log(print_r($response, true));

    }
        
    /** Elimina un registro */
    public function delete()
    {
        // Verifica si el ID está presente en la URL
        $gce_id = isset($_GET['gce_id']) ? $_GET['gce_id'] : null;
        $response = $this->model->delete($gce_id);        
      
        echo json_encode($response);
      
        if ($response) {            
            echo json_encode(['success' => true, 'message' => 'Registro eliminado']);
        } else {
            echo json_encode(['success' => false, 'message' => 'El registro no pudo ser eliminado']);
        }
    }

    

}
