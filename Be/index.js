const express = require("express");
const app = express();
const Apicors = require("cors");
const bodyParser = require("body-parser");
require("./DB/connection");
const userRouter = require("./Routes/UserRoute");
const booksRouter = require("./Routes/bookRoute");
app.use(Apicors());
app.use(express.json());
// app.use(bodyParser.urlencoded({ urlencoded: true }));
app.use(bodyParser.urlencoded({ extended: true })); // Corrected option

app.use(userRouter);
app.use(booksRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server Started on ${PORT}`);
});
