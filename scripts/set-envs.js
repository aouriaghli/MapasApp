/* Instrucciones para crear el fichero env en local, porque no se va a subir a git (gitignore) pq tiene un token personal */

const { writeFileSync, mkdirSync } = require('fs');

/* Sacado de la web : https://www.npmjs.com/package/dotenv */
require('dotenv').config({path: './src/.env'}); //en congi indicar el path de dnd sta .env pq sino falla



const targetPath = './src/environments/environments.ts';

const envFileContent = `
export const environment = {
  mapbox_key: "${ process.env['MAPBOX_KEY'] }"
};
`;

mkdirSync('./src/environments', {recursive: true});

writeFileSync( targetPath, envFileContent);
