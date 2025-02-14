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

//middleware
app.use(express.urlencoded({ extended: false }));


// GET /
app.get("/", async (req, res) => {
    res.render('index.ejs');
  });


  // GET / fruits
  app.get("/fruits", async (req, res) => {
    const allFruits = await Fruit.find();
    console.log(allFruits); 
    res.render("fruits/index.ejs", { fruits: allFruits });
  });
  
  //GET / fruits/new
  app.get('/fruits/new', (req, res) => {
    res.render('fruits/new.ejs');
  });

  //POST / fruits
  app.post("/fruits", async (req, res) => {
    if (req.body.isReadyToEat === "on") {
        req.body.isReadyToEat = true;
      } else {
        req.body.isReadyToEat = false;
      }
      await Fruit.create(req.body);
    res.redirect("/fruit");
  });

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
