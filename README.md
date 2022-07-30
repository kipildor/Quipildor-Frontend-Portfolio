# Quipildor-Frontend-Portfolio
# PORTFOLIO para Argentina Programa

Este proyecto es el trabajo final del curso de Argentina Programa, dictado por el INTI (Instituto 
Nacional de Tecnología Industrial). Dicho proyecto se trata de un portfolio personal que permita su 
edición, y sea desarrollado en Angular usando Spring Boot y una Base de Datos en MySQL.

El proyecto está en 2 repositorios, este para el Frontend y otro para el Backend. 
Backend:

            https://github.com/kipildor/Quipildor-Backend-Portfolio


Entre las 
características de este proyecto podemos mencionar que cuenta JWT (JSON Web Token) sin el manejo 
de roles (por ahora, en una futura revisión se espera implementarlos), también utiliza el servicio 
de Cloudinary para almacenar las imágenes que se suban en los formularios.

# Tecnologías
Angular - Spring Boot - MySQL

# Vinculación al Backend
Para vincular el Frontend con el Backend tenemos dentro del Frontend (en este repositorio) una 
carpeta de nombre "Environments" con un archivo "environment.ts", en ese archivo asignamos a la 
variable "apiBaseUrl" la dirección de donde se encuentra alojado nuestro Backend (en el caso de 
usarlo localmente sería localhost y el puerto, quedando:

                             apiBaseUrl: "localhost:8080";

