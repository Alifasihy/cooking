const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = process.env.port || 3000
const appName= process.env.expressAppName || 'Cooking Match'
const dbConnectionString = process.env.db || 'mongodb://admin:nimda@localhost:27017'
const baseURL = process.env.baseURL || "http://localhost:3000"
const path = require('path')

app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(express.json())

app.set('views', './views')
app.set('view-engine', 'ejs')

const grocerySchema = new mongoose.Schema({
  name: String,
  calorie: Number
})

const Grocery = new mongoose.model('Grocery', grocerySchema)

mongoose.connect(dbConnectionString)
  .then(() => console.log('connected'))
  .then(() => {
    let pepper = new Grocery({ name: 'Pepper', calorie: 123 })
    pepper.save()
    .then(() => console.log('data saved'))
    .catch((err) => console.log('save error: ' + err))
    return pepper
  })
  .catch((err) => console.log('database error: ' + err))

app.get('/', (req, res) => {
  res.render('index.ejs', {baseURL: process.env.baseURL})

})

app.get('/groceries', (req, res) => 
  Grocery.find({})
  .then((gs => res.render('groceries.ejs', { gs, baseURL: process.env.baseURL }))))

app.delete('/groceries/:id', (req, res) => {
	Grocery.deleteOne({ _id: {$eq: req.params.id } })
	.then(() => {
          console.log('deleted')
	  res.send(200)
	})
	.catch((err) => console.log('delete error' + err))
})

app.put('/groceries/:id', (req, res) => {
        console.log(req.body)
	console.log(req.params.id)
	Grocery.updateOne({ _id: { $eq: req.params.id } }, { name: req.body.name, calorie: req.body.calorie })
	.then(() => console.log('updated'))
	.catch((err) => console.log('update error: '+ err))
})


app.post('/groceries/', (req, res) => {
        console.log(req.body)
	Grocery.create({ name: req.body.name, calorie: req.body.calorie })
	.then(() => console.log('created'))
	.catch((err) => console.log('created error: '+ err))
})


app.get('/g', (req, res) => {
  res.render('gerocery.ejs')
})
app.listen(port, () => {
  console.log(`${appName} app is listening on port ${port}`)
})

