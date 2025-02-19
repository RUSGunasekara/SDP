const csrf = require('csurf');

// CSRF protection middleware setup
const csrfProtection = csrf({ cookie: true });

module.exports = { csrfProtection };
