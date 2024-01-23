const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");


const app = express();
const port = 8080;

app.use(cors());

app.get("/", (req, resp) => {
  resp.send("server is avialable");
});



const start = () => {
    app.listen(port, () => console.log(`server started on port ${port}`));
}
