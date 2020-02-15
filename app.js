const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongo = require('./config/mongo');
const mainRoute = require('./routes/main');

app.use(express.json());
app.use(mainRoute);

// Connect to database and then start the server
mongo.connect(err => {
    if(err)
        throw err;
    app.listen(port, () => {
        console.log(`Database connected and Server listening on port ${port}`);
    });
});