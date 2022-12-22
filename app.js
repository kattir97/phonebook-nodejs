const express = require("express");
const app = express();
const dotenv = require("dotenv");
const fs = require("fs");
const cors = require("cors");
const morgan = require("morgan");
dotenv.config({ path: "./config.env" });
const personRouter = require("./routes/personRoutes");

app.use(cors());
app.use(morgan(":method :url :body"));
morgan.token("body", (request) => JSON.stringify(request.body));
app.use(express.static("build"));
app.use(express.json());
app.use("/api/persons", personRouter);

app.get("/info", (req, res) => {
  res.write(`Phonebook has infor for ${persons.length} people\n`);
  res.write(new Date().toISOString());
  res.end();
});

module.exports = app;
