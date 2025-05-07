// testRequest.js
import http from "http";

/**
 * Datos de autenticación enviados en el cuerpo de la solicitud.
 * @type {string}
 */
const data = JSON.stringify({
  username: "wilmar",
  password: "1234",
  grant_type: "password",
});

/**
 * ID del cliente para la autenticación básica.
 * @type {string}
 */
const clientId = 'wilmar';

/**
 * Secreto del cliente para la autenticación básica.
 * @type {string}
 */
const clientSecret = '1234';

/**
 * Credenciales codificadas en Base64 para la autenticación básica.
 * @type {string}
 */
const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

/**
 * Opciones de configuración para la solicitud HTTP.
 * @type {Object}
 * @property {string} hostname - Nombre del host del servidor.
 * @property {number} port - Puerto del servidor.
 * @property {string} path - Ruta del endpoint en el servidor.
 * @property {string} method - Método HTTP utilizado (POST).
 * @property {Object} headers - Encabezados de la solicitud.
 */
const options = {
  hostname: "localhost",
  port: 8000, // El mismo puerto que tu backend
  path: "/API/v1/authorize", // La ruta de tu backend que quieres probar
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(data),
    'Authorization': `Basic ${basicAuth}`
  },
};

/**
 * Realiza una solicitud HTTP POST al servidor.
 * @param {Object} options - Opciones de configuración para la solicitud.
 */
const req = http.request(options, (res) => {
  /**
   * Almacena los datos recibidos de la respuesta.
   * @type {string}
   */
  let data = "";

  /**
   * Evento que se activa cuando se reciben datos del servidor.
   * @param {Buffer} chunk - Fragmento de datos recibido.
   */
  res.on("data", (chunk) => {
    data += chunk;
  });

  /**
   * Evento que se activa cuando la respuesta del servidor ha finalizado.
   */
  res.on("end", () => {
    console.log("Respuesta:", data);
  });
});

/**
 * Evento que se activa cuando ocurre un error en la solicitud.
 * @param {Error} error - Objeto de error.
 */
req.on("error", (error) => {
  console.error("Error:", error);
});

// Escribe los datos en el cuerpo de la solicitud.
req.write(data);

// Finaliza la solicitud.
req.end();