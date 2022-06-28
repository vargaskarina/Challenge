# Challenge técnico
Proyecto desarrollado en Node.js como challenge técnico de Rooftop Academy
## Escenario
El objetivo de challenge es desarrollar una función que lleve a cabo el ordenamiento de un array de strings mediante llamadas a una API provista por Rooftop.

## Dependencias utilizadas
- Axios: para llevas a cabo las peticiones a la API
- Jest: para ejecutar test

## Instalación y ejecución
Para la ejecución del proyecto se necesita tener instalado previamente Node.js. Una vez clonado el repositorio se debe ejecutar `npm install` para restaurar las dependencias.
Posteriormente, para correr el proyecto, se debe ejecutar el comando `npm start`.

## Test
Se desarrolló un test para comprobar el funcionamiento de la función `check`, la cual debe recibir un array de string desordenado y devolverlo ordenado. Para evitar llamadas al servidor real, se implementa un mock que simula el comportamiento del mismo.
Para ejecutar este test se debe escribir el comando `npm test`.
