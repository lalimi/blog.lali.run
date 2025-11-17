const app = require('./dist/api/app.js');

module.exports = async (req, res) => {
  // Додаємо префікс /api до всіх маршрутів
  if (!req.url.startsWith('/api')) {
    req.url = '/api' + req.url;
  }
  
  return app.default(req, res);
};