require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

//use express.json to handle post requests
app.use(express.urlencoded({ extended: true }));

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

let index = 1;
const map = {};

app.post("/api/shorturl", (req, res) => {

  const original_url = req.body.url;
  const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

  if (original_url.match(urlRegex)) {
    map[index] = original_url;
    const short_url = index;
    console.log(map);
    index += 1;
    res.json({ original_url, short_url })
  }
  else {
    res.json({ error: 'invalid url' })
  }

});


app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

