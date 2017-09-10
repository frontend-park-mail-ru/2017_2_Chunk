'use strict';

const express = require('express');
const app = express();

app.use(express.static('./public'));
app.get('/', (request, response) => {
    response.send("<h2><i>Unknown page</i></h2>");
});

app.listen(process.env.PORT || 8080, function () {
    console.log("Server run!");
});
