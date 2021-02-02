const express = require("express");
const connectDB = require("./config/db.js");
const config = require("config");

//* Init app
const app = express();

connectDB();

const PORT = process.env.PORT || config.get("PORT");

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
