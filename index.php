<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>42 Malaga - Touchbase - Monitoreo con Telegraf, Prometheus y Grafana</title>
  <?php
$bgColor = file_exists('color.txt') ? trim(file_get_contents('color.txt')) : '#1b315b';
?>
<style> body {background-color: <?php echo $bgColor; ?>; </style>

  <link rel="stylesheet" href="./css/styles.css">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css">

</head>
<body>
  <img src="./img/logo.png" alt="Logo" class="logo">
  <div id="slidesContainer">
    <?php
    if ( '' != filesize( 'slides_data.html' ) ) {
      include 'slides_data.html';
    } else {
    ?>
    <div class="slide active">
      <h1 contenteditable="true">Monitoreo con Telegraf, Prometheus y Grafana</h1>
      <p contenteditable="true">Estas tres herramientas trabajan en conjunto para proporcionar una solución completa de monitoreo y visualización de datos en tiempo real.</p>
    </div>
      <?php
    }
    ?>
    <span id="addSlideBtn" class="fa fa-plus-circle"></span>
    <span id="fullscreenSpan" class="fas fa-expand"></span>

    </div>
  <div id="slideNavigation"></div>
  <span id="slideCounter">1/1</span>
  <script src="./js/script.js"></script>
</body>
</html>
