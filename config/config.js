const config = {
  app: {
    port: 8888,
    baseApi: '/api',
  },
  mongodb: {
    url: 'mongodb://localhost:27017/mock',
  },
  jwt: {
    secret: 'iLoveCC',
  },
}
console.log(`config: ${config}`);

module.exports = config;
