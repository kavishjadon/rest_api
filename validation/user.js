const joi = require('@hapi/joi');

const schema = joi.object({
    username: joi.string().min(3).max(30).required(),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
});


module.exports = schema;