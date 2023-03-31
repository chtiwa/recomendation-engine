class BaseError extends Error {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode
    this.name = 'BaseError'
    Error.captureStackTrace(this)
  }
}

module.exports = BaseError