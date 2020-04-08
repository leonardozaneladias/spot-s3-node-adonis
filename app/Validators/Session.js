'use strict'

class Session {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      username: 'required',
      password: 'required'
    }
  }
}

module.exports = Session
