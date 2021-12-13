const express = require('express');
const consign = require('consign');

module.exports = () => {
    const app = express();
    app.use(express.urlencoded ({ extended: false }));
    app.use(express.json());

    // Setting port
    app.set('port', 8080);

    // Endpoints
    consign({cwd: 'api'})
        .then('data')
        .then('controllers')
        .then('routes')
        .into(app);

    return app;
}