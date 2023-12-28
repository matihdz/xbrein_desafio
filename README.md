# Desafio XBREIN

## Deploy en Vercel
Este proyecto ha sido desplegado en Vercel, proporcionando una versión en vivo y de fácil acceso: https://xbrein-desafio.vercel.app/

## Para configurar y ejecutar el proyecto en tu entorno de desarrollo local, sigue los siguientes pasos:
1. Instalación de Dependencias: Ejecuta npm i en la terminal. Esto instalará todas las dependencias necesarias para el proyecto.
2. Ejecución del Proyecto: Una vez instaladas las dependencias, utiliza el comando npm run dev para iniciar el servidor de desarrollo.

## Archivo .env
Se ha incluido un archivo .env de forma temporal en el proyecto. Este archivo contiene configuraciones esenciales como claves de API y otros datos sensibles necesarios para:
- La correcta visualización y funcionamiento del mapa.
- La configuración de la ruta de la API Pois de AWS, que está basada en una función lambda implementada con NodeJS.

## Código de la Lambda
La función lambda mencionada se encuentra alojada y gestionada dentro del ecosistema de AWS. A modo ilustrativo, el código fuente del servicio está en el directorio `/lambdas/getPOIS.js`

## URL API
Para probar y utilizar la API: `GET https://1swyo98crc.execute-api.us-east-1.amazonaws.com/pois/{category_name}`
