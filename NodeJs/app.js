const express = require('express');
const bodyParser = require('body-parser');
const adminRouter = require('./Routes/admin');
const shopRouter = require('./Routes/shop');

const app = express()

app.use(bodyParser.urlencoded({extended: false}))


app.use('/admin',adminRouter);
app.use(shopRouter);

app.use((req, res, next) => {
  res.status(404).send('<h1>Pages Not Found!</h1>')
})

app.listen(3000, () => console.log(`Listening port 3000`))
