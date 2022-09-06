const express = require('express')
const app = express()
const port = process.env.port
const appName= process.env.expressAppName || 'Cooking Match'

app.set('views', './views')
app.set('view-engine', 'ejs')

app.get('/', (req, res) => {
  res.send('Hello Cook!')
})

app.listen(port, () => {
  console.log(`${appName} app is listening on port ${port}`)
})

