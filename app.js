require("dotenv").config();
const express = require("express");
const app = express();
const taskRouter = require("./Routes/Tasks");
const PORT = process.env.port;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(taskRouter);

app.listen(PORT, (err) => {
    if (err) {
        return console.log("Something bad happened", err);
    }
    console.log(`Server is listening on ${PORT}`);
});

//to catch all the exceptions in the middleware//
app.use((req, res) => {
    res.status(404).json({ error: "Not found! invalid input" });
});

module.exports = app;
