<?php
	file_put_contents('debug.txt', print_r($_POST, true));
  // Obteniendo los datos de las slides del POST request
  $slides_data = $_POST['slides_data'];

  // Verificar si los datos están presentes
  if (!empty($slides_data)) {
    // Guardar los datos en el archivo slides_data.html
    file_put_contents('slides_data.html', $slides_data);
    echo "Slides guardadas exitosamente.";
  } else {
    echo "No se recibieron datos de las slides.";
  }
?>


