require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));


// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

const dns = require('dns');
const urlParser = require('url');

app.post('/api/shorturl', (req, res) => {
  const originalUrl = req.body.url;
  const hostname = urlParser.parse(originalUrl).hostname;

  dns.lookup(hostname, (err, address) => {
    if (err) {
      return res.json({ error: 'invalid url' });
    }

    const shortUrl = urls.length + 1;
    urls.push({ original_url: originalUrl, short_url: shortUrl });
    res.json({ original_url: originalUrl, short_url: shortUrl });
  });
});

app.get('/api/shorturl/:short_url', (req, res) => {
  const short = parseInt(req.params.short_url);
  const entry = urls.find(u => u.short_url === short);
  if (entry) {
    res.redirect(entry.original_url);
  } else {
    res.json({ error: 'No short URL found for the given input' });
  }
});
let urls = [];


app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
