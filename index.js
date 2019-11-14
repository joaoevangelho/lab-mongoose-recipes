const mongoose = require("mongoose");

// Import Recipe model
const Recipe = require("./models/Recipe");

// Import data
const data = require("./data");

const MONGODB_URI = "mongodb://localhost/recipeApp";

// Connection to the database "recipeApp"
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to Mongo!");
    return Recipe.create({
        'title': "Serradura",
        "level": "UltraPro Chef",
        'ingredients': ["Natas", "Leite Condensado", "Serradura"],
        'cuisine': "Portuguese",
        'duration': 20,
        'creator': "Evangelho"
      })

      .then(recipe => {
        console.log(`We were able to cook ${recipe.title}`);
        return Recipe.insertMany(data);
      })

      .then(recipe => {
        console.log(`We were able to insert all recipes`);
        return Recipe.updateOne({
          title: "Rigatoni alla Genovese",
        }, {
          duration: 100
        });
      })

      .then(recipe => {
        console.log(`We were able to update the Italian Recipe`);
        return Recipe.findOneAndDelete({
          title: "Carrot Cake"
        });
      })

      .catch(err => {
        console.error("Error connecting to mongo", err);
      });
  });

mongoose.connection.close()