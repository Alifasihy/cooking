const express = require('express')
const app = express()
const port = process.env.port || 3000
const appName= process.env.expressAppName || 'Cooking Match'

app.set('views', './views')
app.set('view-engine', 'ejs')

app.get('/', (req, res) => {
  res.render('index.ejs')
})

app.listen(port, () => {
  console.log(`${appName} app is listening on port ${port}`)
})

