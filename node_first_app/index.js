const express = require("express");
const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.json());
require("./routes/userRoutes")(app);

const PORT = 5012;


app.listen(PORT, () => {
    console.log(`Server running`);
});