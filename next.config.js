const withImages = require('next-images');

module.exports = withImages({
  reactStrictMode: true,
  images: {
    domains: ['raw.githubusercontent.com'], // Agrega el dominio de tu imagen
  },
});
