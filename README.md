## Instrucciones de uso

### Backend ->

* !! ASEGUSERESE DE TENER EL ARCHIVO .env en la ruta `/Backend/config/.env` ya hay un archivo llamado `.env.template` con las variables propuestas.
* La API por defecto utiliza el PUERTO `3000` ASEGURESE DE TENERLO DISPONIBLE, SI DESEA USAR OTRO PUERTO ASEGURESE DE USARLO EN LA VARIABLE DE ENTORNO `API_PORT`.
* Para iniciar el API (Backend) ejecute una por una las siguientes lineas en su interfaz de comandos:

```bash
cd /Backend
npm i
npm test
```

* Dentro del archivo `request.http` encontrara los diferentes endpoints con ejemplos de solicitudes que puede realizar de manera directa dando click en send request, ejemplo:

  ![ejemplo](https://github.com/TheWiXi/FullStack-Project/blob/main/Frontend/Cinema/public/Screenshot%20from%202024-09-06%2007-06-28.png)


### Frontend -> 

* Vite por defecto utiliza el PUERTO `3001`, sin embargo si este esta ocupado usara el puerto mas cercano disponible.
* Para iniciar Vite (Frontend) ejecute una por una las siguientes lineas en su interfaz de comandos:

  ```bash
  cd /Frontend/Cinema
  npm i
  npm run dev
  ```
* Vistas del Frontend:

  ![Home](https://github.com/TheWiXi/FullStack-Project/blob/main/Frontend/Cinema/public/Screenshot%20from%202024-09-06%2007-17-39.png)

  ![Second](https://github.com/TheWiXi/FullStack-Project/blob/main/Frontend/Cinema/public/Screenshot%20from%202024-09-06%2007-17-59.png)
