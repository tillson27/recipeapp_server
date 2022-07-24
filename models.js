const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  rname: {
    type: String,
    required: true,
  },
  ingredients: [{
    type: String
  }],
  instructions: [{
    type: String
  }],
  timeToComplete: {
    type: Number,
    default: 60
  }

});

const recipes = mongoose.model("Recipe", RecipeSchema);

module.exports = recipes;