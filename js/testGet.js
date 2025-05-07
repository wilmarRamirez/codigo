// testRequest.js
const http = require('http');

const options = {
  hostname: 'localhost',
  port: 8000, // El mismo puerto que tu backend
  path: '/health', // La ruta de tu backend que quieres probar
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  }
};

const req = http.request(options, res => {
  let data = '';

  res.on('data', chunk => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('Respuesta:', data);
  });
});

req.on('error', error => {
  console.error('Error:', error);
});

req.end();
