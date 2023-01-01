const express = require('express')
const app = express()
const port = 3000

// Available Routes
app.use('/', require('./routes/home'));
app.use('/create_new_storage', require('./routes/create_new_storage'));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})