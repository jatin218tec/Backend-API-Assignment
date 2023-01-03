const express = require('express')
const app = express()
const port = 3000

app.use(express.json());
// Available Routes
app.use('/', require('./routes/home'));
app.use('/create_new_storage', require('./routes/create_new_storage'));
app.use('/upload_file', require('./routes/upload_file'));
app.use('/text_file_to_audio', require('./routes/text_file_to_audio'));
app.use('/merge_image_and_audio', require('./routes/merge_image_and_audio'));
app.use('/merge_all_video', require('./routes/merge_all_video'));
app.use('/public', express.static(__dirname + '/public')); 

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})