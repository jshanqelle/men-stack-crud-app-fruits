const express = require('express');

const app = express();

// GET /
app.get("/", async (req, res) => {
    res.send('index.ejs');
  });

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
