const ApplicationError = require('./ApplicationError');

class UncorrectName extends ApplicationError{
  constructor (message) {
    super(message || 'Такий гурт вже існує', 406);
  }
}

module.exports = UncorrectName;

