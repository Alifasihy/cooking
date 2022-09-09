const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = process.env.port || 3000
const appName= process.env.expressAppName || 'Cooking Match'
const path = require('path')

app.use('/static', express.static(path.join(__dirname, 'public')))

app.set('views', './views')
app.set('view-engine', 'ejs')

mongoose.connect('mongodb://admin:nimda@database:27017/root')
  .then(console.log('connected'))
  .catch(console.log('error'))



app.get('/', (req, res) => {
  res.render('index.ejs')
})



app.get('/g', (req, res) => {
  res.render('gerocery.ejs')
})
app.listen(port, () => {
  console.log(`${appName} app is listening on port ${port}`)
})

