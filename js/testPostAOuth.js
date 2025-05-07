// testRequest.js
import http from "http";

const data = JSON.stringify({
  username: "wilmar",
  password: "1234",
  grant_type: "password",
});

const clientId = 'wilmar';
const clientSecret = '1234';

const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

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

const req = http.request(options, (res) => {
  let data = "";

  res.on("data", (chunk) => {
    data += chunk;
  });

  res.on("end", () => {
    console.log("Respuesta:", data);
  });
});

req.on("error", (error) => {
  console.error("Error:", error);
});

req.write(data);

req.end();
