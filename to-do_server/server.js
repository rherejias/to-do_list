const express = require('express');
var cors = require('cors');
const app = express();

app.use(cors())

const tasksRouter = require("./routes/tasks");

app.use("/tasks", tasksRouter)

app.listen(3000)