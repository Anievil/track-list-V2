const fs = require('fs')

class ApplicationError extends Error{

  constructor (message, status) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message || 'щось не так, спробуйте ще раз';
    this.code = status || 500;
  }
}

module.exports = ApplicationError;