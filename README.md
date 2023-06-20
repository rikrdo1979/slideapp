# Slideshow con JavaScript

Este proyecto es un slideshow interactivo construido usando JavaScript puro. Permite a los usuarios navegar por las diapositivas, agregar nuevas diapositivas, eliminar diapositivas y editar el contenido de cada diapositiva en tiempo real. También incorpora un contador de diapositivas y una funcionalidad de navegación por teclado.

## Características

- **Navegación del Slideshow**: Los usuarios pueden navegar por las diapositivas utilizando los botones de navegación o las teclas de flecha en su teclado.
- **Añadir/Eliminar Diapositivas**: Los usuarios pueden añadir nuevas diapositivas y eliminar diapositivas existentes.
- **Edición de Diapositivas**: Los usuarios pueden editar el contenido de las diapositivas en tiempo real. Esto se logra a través del atributo `contenteditable`.
- **Actualización en Tiempo Real**: Cuando los usuarios hacen cambios en las diapositivas, estos cambios se guardan automáticamente y se reflejan en el servidor.
- **Contador de Diapositivas**: Hay un contador de diapositivas en la esquina inferior izquierda que muestra la diapositiva actual y el total de diapositivas.

## Requisitos Previos

- Docker instalado en tu máquina. Puedes obtener Docker [aquí](https://www.docker.com/get-started).
- Un navegador web moderno que soporte ECMAScript 6.

## Instalación

1. Clona este repositorio en tu máquina local.
2. Asegúrate de que Docker está instalado y en ejecución.
3. En una terminal, navega hasta el directorio del proyecto clonado.
4. Construye la imagen Docker con el comando: `docker build -t slidesapp .`
5. Lanza el contenedor con el comando: `docker run -d -p 8080:80 -v "$(pwd)":/var/www/html --name slidesapp slidesapp`

Ahora puedes acceder a la aplicación navegando a `localhost:8080` en tu navegador web.

## Uso

- Navegar por las diapositivas: Haz clic en los botones de navegación o utiliza las teclas de flecha izquierda y derecha en tu teclado.
- Agregar diapositivas: Haz clic en el botón "+" en la esquina inferior derecha.
- Eliminar diapositivas: Haz clic en el ícono de la papelera en la diapositiva que deseas eliminar.
- Editar diapositivas: Haz clic en el texto de la diapositiva que deseas editar y comienza a escribir. Los cambios se guardarán automáticamente cuando desenfoques el elemento de texto.

## Parar y Eliminar el Contenedor Docker

Para detener el contenedor Docker, ejecuta el comando: `docker stop slidesapp`

Para eliminar la imagen del contenedor Docker, ejecuta el comando: `docker rm slidesapp`

## Contribuir

Las contribuciones son bienvenidas. Si encuentras algún problema o tienes una idea para una característica adicional, no dudes en abrir un problema o una solicitud de extracción.

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo `LICENSE` para obtener más detalles.
