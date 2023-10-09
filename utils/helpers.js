const jwt = require('jsonwebtoken')
exports = {}

exports.getToken = (email, user) => {
    const token = jwt.sign({identifier: user.id}, 'secret')
    return token
}