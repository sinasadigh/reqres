const express = require("express");

const app = express();
require("./startup/db")();
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
