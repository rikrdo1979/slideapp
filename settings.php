<?php
$target_dir = "img/";
$target_file = $target_dir . "logo.png";
$date = new DateTime();
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
$message = "";

if($_SERVER['REQUEST_METHOD'] === 'POST') {
    if(isset($_POST["submit"])) {
        $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
        if($check !== false) {
            // Comprueba el tamaño de la imagen
            if ($check[0] > 300 || $check[1] > 300) {
                $message = "Lo sentimos, tu imagen es demasiado grande.";
                $uploadOk = 0;
            } else {
                $uploadOk = 1;
            }
        } else {
            $message = "El archivo no es una imagen.";
            $uploadOk = 0;
        }
    }

    if ($uploadOk == 0) {
        $message = "Lo sentimos, tu archivo no fue subido.";
    } else {
        if ($imageFileType != "png") {
            // Crea una nueva imagen desde el archivo
            if ($imageFileType == "jpg" || $imageFileType == "jpeg") {
                $image = imagecreatefromjpeg($_FILES["fileToUpload"]["tmp_name"]);
            } else if ($imageFileType == "gif") {
                $image = imagecreatefromgif($_FILES["fileToUpload"]["tmp_name"]);
            }

            // Convierte la imagen a PNG y la guarda
            imagepng($image, $target_file);
            imagedestroy($image);
        } else {
        	if (file_exists($target_file)) {
    			// Formato de fecha y hora: YYYYMMDD_HHMMSS
    			$newFileName = $target_dir . "logo_" . $date->format('Ymd_His') . ".png";
    			rename($target_file, $newFileName);
    		}
            if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
                $message = "El archivo ". htmlspecialchars( basename( $_FILES["fileToUpload"]["name"])). " ha sido subido.";
            } else {
                $message = "Lo sentimos, hubo un error al subir tu archivo.";
            }
        }
    }

    if(isset($_POST["bgColor"])) {
        // Guarda el color en un fichero
        file_put_contents('color.txt', $_POST["bgColor"]);
    }
}

// Lee el color del fichero
$bgColor = file_exists('color.txt') ? trim(file_get_contents('color.txt')) : '#ffffff';
?>

<!DOCTYPE html>
<html>
<head>
    <title>Configuraciones</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.min.css">
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
</head>
<body style="background-color: <?php echo $bgColor; ?>">
    <div class="container">
        <form action="settings.php" method="post" enctype="multipart/form-data">
            <label for="bgColor">Color de fondo:</label><br>
            <input type="color" id="bgColor" name="bgColor" value="<?php echo $bgColor; ?>" onchange="changeBgColor(this.value);"><br><br>
            <label for="fileToUpload">Subir logotipo (Max 300x300px):</label><br>
            <input type="file" name="fileToUpload" id="fileToUpload" accept=".jpeg,.jpg,.png"><br><br>
            <input type="submit" value="Guardar cambios" name="submit" class="button-primary">
        </form>

        <?php if(isset($message) && $message != ""): ?>
        <div class="alert">
            <p><?php echo $message; ?></p>
        </div>
        <?php endif; ?>
    </div>

    <script>
        function changeBgColor(color) {
            $("body").css("background-color", color);
            $.post("settings.php", { bgColor: color });
        }
    </script>
</body>
</html>

