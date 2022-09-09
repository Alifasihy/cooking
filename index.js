const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = process.env.port || 3000
const appName= process.env.expressAppName || 'Cooking Match'
const path = require('path')

app.use('/static', express.static(path.join(__dirname, 'public')))

app.set('views', './views')
app.set('view-engine', 'ejs')

const grocerySchema = new mongoose.Schema({
  name: String
})

const Grocery = new mongoose.model('Grocery', grocerySchema)

mongoose.connect('mongodb://admin:nimda@database:27017')
  .then(() => console.log('connected'))
  .then(() => {
    let pepper = new Grocery({ name: 'Pepper' })
    pepper.save()
    .then(() => console.log('data saved'))
    .catch((err) => console.log('save error: ' + err))
    return pepper
  })
  .catch((err) => console.log('database error: ' + err))

app.get('/', (req, res) => {
  res.render('index.ejs')

})

app.get('/groceries', (req, res) => 
  Grocery.find({}).then((r => res.send(r))))



app.get('/g', (req, res) => {
  res.render('gerocery.ejs')
})
app.listen(port, () => {
  console.log(`${appName} app is listening on port ${port}`)
})

