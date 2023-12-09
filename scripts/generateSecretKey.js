const crypto = require('crypto');
const secureSecretKey = crypto.randomBytes(32).toString('hex');
console.log(secureSecretKey);