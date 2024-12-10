# VitalCheck - Aplicación de Monitoreo de Salud

VitalCheck es una aplicación móvil desarrollada con React Native que permite a los usuarios monitorear sus signos vitales, específicamente los niveles de oxígeno en sangre y el pulso cardíaco. La aplicación también incluye funcionalidades como historial de mediciones, configuración de alarmas personalizadas y gestión de perfil de usuario.

## Características principales

- 📱 Interfaz de usuario intuitiva y moderna
- 🔐 Sistema de autenticación de usuarios
- 📊 Registro y seguimiento de signos vitales
- 📈 Visualización de historial de mediciones
- ⏰ Sistema de alarmas personalizadas
- 👤 Gestión de perfil de usuario
- 📊 Estadísticas y gráficos de salud

## Propósito dentro del proyecto global

Este repositorio cuenta con el código de la aplicación móvil, el proyecto en general está compuesto por dos partes, el FrontEnd que es este, y el BackEnd.

## Requisitos previos

- Node.js (v14 o superior)
- npm (v10 o superior)
- React Native
- Android Studio (para desarrollo en Android)

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/liliasoto/AwesomeProject2
cd AwesomeProject2
```

2. Instalar las dependencias:
```bash
npm install
# o
yarn install
```

3. Configurar las variables de entorno:
   - Crear un archivo `.env` en la raíz del proyecto
   - Agregar las variables necesarias:
```
API_URL=tu_url_de_api
```

4. Iniciar la aplicación:
```bash
npm start
```

5. Aparecerán 4 opciones en la consola. Elige la opción `a` para Android:

    ```bash
    › Press a │ open Android
    ```

Asegúrate de tener un emulador de Android abierto o un dispositivo conectado antes de seleccionar la opción `a`.

## Estructura del proyecto

```
vitalcheck/
├── src/
│   ├── components/     # Componentes reutilizables
│   └── imagenes/       # Imagenes para la aplicación
├── App.tsx            # Punto de entrada de la aplicación
└── package.json
```

## Funcionalidades principales

### Autenticación de usuario
- Registro de nuevos usuarios
- Inicio de sesión
- Recuperación de contraseña

### Monitoreo de signos vitales
- Registro de niveles de oxígeno
- Registro de pulso cardíaco
- Visualización de datos en tiempo real

### Historial y estadísticas
- Visualización de historial de mediciones
- Gráficos estadísticos
- Exportación de datos

### Sistema de alarmas
- Configuración de alarmas personalizadas
- Recordatorios de medición
- Notificaciones push

## Tecnologías utilizadas

- React Native
- TypeScript
- MongoDB
- Express.js
- Node.js

## API y backend

La aplicación se conecta a un backend desarrollado con Node.js y MongoDB. El backend proporciona endpoints para:

- Gestión de usuarios
- Almacenamiento de mediciones
- Gestión de alarmas
- Autenticación y autorización

[Repositorio del backend](https://github.com/liliasoto/mi-backend-productos)

En el README del repositorio del backend, encontrarás las instrucciones de instalación y configuración necesarias para poner en funcionamiento el servicio.


## Contribución

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Contacto

Lilia Soto Llamas

Email - 0.lilia.soto.0@gmail.com

Link del proyecto: [https://github.com/liliasoto/AwesomeProject2](https://github.com/liliasoto/AwesomeProject2)

## Comienza ya

- [React Native](https://reactnative.dev/)
- [MongoDB](https://www.mongodb.com/)
- [Express.js](https://expressjs.com/)
- [Node.js](https://nodejs.org/)


Esperamos que encuentres útil esta aplicación para el seguimiento de tu salud. ¡Gracias por usar VitalCheck!
