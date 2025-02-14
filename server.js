const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(process.env.MONGODB_URI);
//LOG CONNECTION STATUS TO TERMINAL ON START
mongoose.connection.on('connected', () => {
    console.log(`Connected on MongoDB ${mongoose.connection.name}`)
});

const Fruit = require('./models/fruit.js');



// GET /
app.get("/", async (req, res) => {
    res.render('index.ejs');
  });

  //GET / fruits/new
  app.get('/fruits/new', (req, res) => {
    res.render('fruits/new.ejs');
  });


app.listen(3000, () => {
  console.log('Listening on port 3000');
});
