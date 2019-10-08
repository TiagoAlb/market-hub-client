const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(proxy('/api', { target: 'http://ec2-18-229-155-222.sa-east-1.compute.amazonaws.com:8080/', ws: true }));
};