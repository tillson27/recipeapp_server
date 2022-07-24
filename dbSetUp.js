const mongoose = require("mongoose");
const recipes = require("./models");

const dburl = "mongodb+srv://m001-student:funky@sandbox.mrxof1u.mongodb.net/?retryWrites=true&w=majority";

const connectDb = async function () {
    await mongoose.connect(dburl);
    console.log("connected to Mongo db");
};

const dbSetUp = async function () {
    await connectDb();
    await initializeRecipes();
};

initializeRecipes = async function () {
    await recipes.collection.drop().catch((err) => { });
    await recipes.insertMany(
        [{
            "rname": "Feta Tomato Pasta",
            "ingredients": [
                "Your Noodle of Choice",
                "Feta",
                "Basil",
                "Grape Tomatoes",
                "Mushrooms",
                "Olive Oil"
            ],
            "instructions": [
                "Preheat oven to 400 degrees",
                "Bring a pot of water to boil",
                "Place tomatoes, mushrooms and feta in a baking tray and garnish with basil and olive oil",
                "Bake for 40 minutes",
                "Place pasta in boiling water for 12 minutes and then drain",
                "Mix together and enjoy"
            ],
            "timetoComplete": 60
        }, {
            "rname": "Avocado Toast",
            "ingredients": [
                "Bread",
                "Avocado",
                "Hot Sauce (optional)",
                "Egg"
            ],
            "instructions": [
                "Toast Bread",
                "Cook Egg Sunny Side Up",
                "Slice up Avocado and Mash onto Toasted Bread",
                "Add hot sauce and enjoy"
            ],
            "timetoComplete": 15
        }])
};


module.exports = dbSetUp;