var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const recipeModel = require("../models");
const { db } = require('../models');
const app = express();
const { ObjectId } = require("mongodb");

// let recipes = [
//   {
//     "id": uuid(),
//     "rname": "Feta Tomato Pasta",
//     "ingredients": ["Your Noodle of Choice", "Feta", "Basil", "Grape Tomatoes", "Mushrooms", "Olive Oil"],
//     "instructions": ["Preheat oven to 400", "Bring a pot of water to boil", "Place tomatoes, mushrooms and feta in a baking tray and garnish with basil and olive oil", "Bake for 40 minutes", "Place pasta in boiling water for 12 minutes and then drain", "Mix together and enjoy"],
//   },
//   {
//     "id": uuid(),
//     "rname": "Avocado Toast",
//     "ingredients": ["Bread", "Avocado", "Hot Sauce (optional)", "Egg"],
//     "instructions": ["Toast Bread", "Cook egg sunny side up", "Slice up avocado and mash onto toasted bread", "Add hotsauce, egg and enjoy"],
//   }
// ];

/* GET recipes listing in JSON format. */
router.get('/', async (req, res, next) => {
  const recipes = await recipeModel.find({});
  try {
    res.send(recipes);
  } catch (error) {
    res.status(500).send(error);
  }
});

/* GET a single recipe listing in JSON format. */
router.get('/find', async (req, res, next) => {
  const foundRecipe = recipeModel.find({ "_id": req.query.id });
  return res.send(foundRecipe);
});

/* Post a single recipe listing in JSON format (adding it to the list) */
router.post('/', async (req, res, next) => {
  const recipe = new recipeModel({
    rname: req.body.rname,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    timeToComplete: req.body.timeToComplete
  });
  console.log(recipe);
  await recipe.save();
  res.send(recipe);
});

/* Delete a single recipe listing in stored recipes list*/
router.delete('/delete', async (req, res) => {
  await recipeModel.find({ "_id": req.query.id }).remove().exec();
  return res
    .status(202)
});


/* Delete all recipes listing in stored recipes list*/

//note: cannot use deleteall/delete as a pathname **
router.delete('/deleteAll', function (req, res) {
  recipes = [];
  return res
    .status(203)
    .send(recipes);
});


router.put('/edit', function (req, res) {
  let editedRecipe = "";
  recipes.forEach(function (recipe) {
    if (recipe.id == req.body.id) {
      recipe.rname = req.body.rname;
      recipe.ingredients = req.body.ingredients;
      recipe.instructions = req.body.instructions;
      editedRecipe = recipe;
    }
  });
  return res
    .status(204)
    .send(recipes);

});

module.exports = router;