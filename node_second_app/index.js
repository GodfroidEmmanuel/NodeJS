const mongoose = require("mongoose")

const express = require("express");

const bodyParser = require("body-parser");

const app = express();


app.use(bodyParser.json());

require("./models/pet.js")

require("./routes/petRoutes")

mongoose.connect("mongodb+srv://godfroidEmmanuel:Manu160519899050@cluster0-xd1e5.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true
});

const PORT = 6000;

app.listen(PORT, () => {
    console.log("server running")
})