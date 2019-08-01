const config = {
  app: {
    port: process.env.PORT || 8888,
    baseApi: '/api',
  },
  mongodb: {
    url: 'mongodb://localhost:27017/blog',
  },
  jwt: {
    secret: 'iLoveCC',
  },
  // mongodbSecrete
  admin: {
    username: 'jlq',
    password: 'XY2016jlq2017',
  },
}
console.log(`config: ${config}`);

module.exports = config;
