const express = require("express");
const connectDB = require("./config/db.js");
const config = require("config");

//* Init app
const app = express();

connectDB();

//* Init middleware
app.use(express.json());

//* Define Routes
app.use("/api/user", require("./routes/api/user"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/project", require("./routes/api/project"));

const PORT = process.env.PORT || config.get("PORT");

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
