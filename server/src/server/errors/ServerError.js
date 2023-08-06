const ApplicationError = require('./ApplicationError');

class ServerError extends ApplicationError{
  constructor (message) {
    super(message || 'Наразі якісь неполадки з сервером', 500);
  }
}

module.exports = ServerError;