const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = process.env.port || 3000
const appName= process.env.expressAppName || 'Cooking Match'
const path = require('path')

app.use('/static', express.static(path.join(__dirname, 'public')))

app.set('views', './views')
app.set('view-engine', 'ejs')

mongoose.connect('mongodb://admin:nimda@database:27017')
  .then(() => console.log('connected'))
  .catch((err) => console.log('error: ' + err))

const grocerySchema = new mongoose.Schema({
  name: String
})

const Grocery = new mongoose.model('Grocery', grocerySchema)

const pepper = new Grocery({ name: 'Pepper' })
pepper.save()
  .then(() => console.log('data saved'))
  .catch(() => console.log('database err'))





app.get('/', (req, res) => {
  res.render('index.ejs')

})



app.get('/g', (req, res) => {
  res.render('gerocery.ejs')
})
app.listen(port, () => {
  console.log(`${appName} app is listening on port ${port}`)
})

