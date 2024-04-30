# user_managment
Node.js/React Technical Test

#Guia para instalacion

    1. Descargar el repositorio https://github.com/Sgutierrezgf/user_managment.git
    2. luego entrar en la carpeta de nombre backend
    3. En esta carpeta crear el archivo .env
    4. En el archivo .env poner los siguientes datos
        PORT=3000
        DB_USER='admin'
        DB_PASSWORD='admin123'
        DB_HOST='localhost'
        DB_NAME='prueba'
        DB_PORT='5435'
        API_KEY=123
        JWT_SECRET=dD6TzysSgEYAujqZQiUOeI34XChfNxMn
    5. Ejecutamos npm install
    6. luego levantar los servicios de docker 
        - sudo docker-compose up -d postgres
        - sudo docker-compose up -d pgadmin
    7. Ahora ejecutamos  
        - npm run migrations:run

        Esto para subir las tablas a postgress
    8. luego ejecutamos npm run dev, para levantar todo el servicio de node
    9. Ahora nos vamos para la carpeta frontend y aqui ejecutamos los siguiente
        - npm install
        - npm run dev

    Ya con estos pasos no tendrian ningun problema para ejecutar el servicio