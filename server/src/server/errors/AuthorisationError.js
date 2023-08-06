const ApplicationError = require('./ApplicationError');

class UncorrectPassword extends ApplicationError{
  constructor (message) {
    super(message || 'Помилка аутентифікації, невірне ім\'я або пароль', 406);
  }
}

module.exports = UncorrectPassword;

