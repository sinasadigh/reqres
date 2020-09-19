const express = require("express");

const app = express();
require('./startup/routes')(app)
const db = require("./startup/db");
require('./services/auth/auth')

const port = process.env.PORT || 8000;
db.sync()
.then((result) => {
    app.listen(port, () => {
        console.log(`listening on port ${port}...`);
      });
})
.catch((err) => {
  console.log("ERROR: " + err);
});


