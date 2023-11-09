import bodyParser from "body-parser";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api";
import configCors from "./config/cors";
require("dotenv").config();

import connection from "./config/connectDB";
const express = require("express");
const app = express();
const port = process.env.PORT || 6969;

//config cors
configCors(app);

//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//config app
configViewEngine(app);
initApiRoutes(app);
initWebRoutes(app);

//test conection
connection();
// app.get('/abc', (req, res) => {
//   res.send('Nhụ nhá m')
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
