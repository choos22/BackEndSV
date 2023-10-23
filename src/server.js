import bodyParser from 'body-parser'
import viewEngine from './config/viewEngine'
import initWebRoutes from './route/web'
require('dotenv').config();

const express = require('express')
const app = express()
const port = process.env.PORT || 6969


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended :true}));


//config app
viewEngine(app)
initWebRoutes(app)

//khai báo route
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/abc', (req, res) => {
  res.send('Nhụ nhá m')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})