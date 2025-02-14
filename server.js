const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require("method-override"); // new
const morgan = require("morgan"); //new
const path = require("path");

const app = express();

mongoose.connect(process.env.MONGODB_URI);
//LOG CONNECTION STATUS TO TERMINAL ON START
mongoose.connection.on('connected', () => {
    console.log(`Connected on MongoDB ${mongoose.connection.name}`)
});

const Fruit = require('./models/fruit.js');

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method")); // new
app.use(morgan("dev")); //new
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
// app.use(morgan('dev'));

// new code below this line
app.use(express.static(path.join(__dirname, "public")));

// new code above this line
app.get("/", async (req, res) => {
  res.render("index.ejs");
});


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


  // GET /FRUITS/:ID
app.get("/fruits/:fruitId", async (req, res) => {
    const foundFruit = await Fruit.findById(req.params.fruitId);
    res.render("fruits/show.ejs", { fruit: foundFruit });
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

  app.delete("/fruits/:fruitId", async (req, res) => {
    await Fruit.findByIdAndDelete(req.params.fruitId);
    res.redirect("/fruits");
  });
  
  // GET localhost:3000/fruits/:fruitId/edit
  app.get("/fruits/:fruitId/edit", async (req, res) => {
    const foundFruit = await Fruit.findById(req.params.fruitId);
    res.render("fruits/edit.ejs", {
      fruit: foundFruit,
    });
  });
  
  app.put("/fruits/:fruitId", async (req, res) => {
    // Handle the 'isReadyToEat' checkbox data
    if (req.body.isReadyToEat === "on") {
      req.body.isReadyToEat = true;
    } else {
      req.body.isReadyToEat = false;
    }
    
    // Update the fruit in the database
    await Fruit.findByIdAndUpdate(req.params.fruitId, req.body);
  
    // Redirect to the fruit's show page to see the updates
    res.redirect(`/fruits/${req.params.fruitId}`);
  });
  


app.listen(3000, () => {
  console.log('Listening on port 3000');
});
