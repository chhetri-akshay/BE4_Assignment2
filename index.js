const mongoose = require("mongoose")
const { initializeDatabase } = require("./db/db.connect")
const Recipes = require("./models/recipe.models")
const express = require("express")
const app = express()
app.use(express.json())

initializeDatabase()
const PORT = 3300

async function createRecipes(newRecipe){
    try{
        const recipe = new Recipes(newRecipe)
        const saveRecipe = await recipe.save()
        return saveRecipe
    }catch(error){
        throw(error)
    }
}

app.post("/recipes", async(req, res) => {
    try{
        const savedRecipe = await createRecipes(req.body)
        if(savedRecipe){
            res.status(201).json({error: "Recipe saved successfully", recipe: savedRecipe}) 
        }else {
            res.status(404).json({error: "Recipe does not exist"})
        }
    }catch(error){
        res.status(500).json({error: "Failed to fetch data"})
    }
})

async function getAllRecipes(){
    try{
        const allRecipes = await Recipes.find()
        return allRecipes
    }catch(error){
        throw(error)
    }
}

app.get("/recipes", async(req, res) => {
    try{
        const totalRecipes = await getAllRecipes()
        if(totalRecipes && totalRecipes.length > 0){
            res.status(201).json({message: "Recipies successfully found, Here are they", recipes : totalRecipes})
        }else {
            res.status(404).json({error: "Recipes not found"})
        }
    }catch(error){
        res.status(500).json({error: "Error occured while fetching recipes"})
    }
})

async function getRecipeByTitle(recipeTitle){
    try{
        const recipeByTitle = await Recipes.findOne({title: recipeTitle})
        return recipeByTitle
    }catch(error){
        throw(error)
    }
}

app.get("/recipes/:title", async (req, res) => {
    try{
        const recipeByTitleResult = await getRecipeByTitle(req.params.title)
        if(recipeByTitleResult){
            res.status(201).json({message: "Recipie successfully found", RecipeByTitle : recipeByTitleResult})
        }else {
            res.status(404).json({error: "Recipes not found"})
        }
    }catch(error){
        res.status(500).json({error: "Error occured while fetching recipes"})
    }
})

async function getRecipeByAuthor(recipeAuthor){
    try{
        const recipeByTitle = await Recipes.find({author: recipeAuthor})
        return recipeByTitle
    }catch(error){
        throw(error)
    }
}

app.get("/recipes/author/:authorName", async (req, res) => {
    try{
        const recipeByAuthorResult = await getRecipeByAuthor(req.params.authorName)
        if(recipeByAuthorResult){
            res.status(201).json({message: "Recipie successfully found", RecipeByAuthor : recipeByAuthorResult})
        }else {
            res.status(404).json({error: "Recipes not found"})
        }

    }catch(error){
        res.status(500).json({error: "Error occured while fetching recipes"})
    }
})

async function getRecipeByDifficulty(difficultyLevel){
    try{
        const recipe = await Recipes.find({difficulty: difficultyLevel})
        return recipe
    }catch(error){
        throw(error)
    }
}

app.get("/recipes/difficulty/:level", async (req, res) => {
    try{
        const recipeByDiff = await getRecipeByDifficulty(req.params.level)
        if(recipeByDiff && recipeByDiff.length > 0){
            res.status(201).json({message: "Recipie successfully found", RecipeByDifficulty : recipeByDiff})
        }else {
            res.status(404).json({error: "Recipe not found"})
        }
    }catch(error){
        res.status(500).json({error: "Error occured while fetching recipes"})
    }
})

async function updateRecipe(recipeId, dataToUpdate){
    try{
        const recipe = await Recipes.findByIdAndUpdate(recipeId, dataToUpdate, {new: true})
        return recipe
    }catch(error){
        throw(error)
    }
}

app.post("/recipes/:recipeId", async(req, res) => {
    try{
        const updatedRecipe = await updateRecipe(req.params.recipeId, req.body)
        if(updatedRecipe){
            res.status(201).json({message: "Recipie successfully updated", RecipeUpdated : updatedRecipe})
        }else {
            res.status(404).json({error: "Recipe not found"})
        }
    }catch(error){
        res.status(500).json({error: "Error occured while fetching recipes"})
    }
})

async function updateRecipeWithTitle(recipeTitle, dataToUpdate){
    try{
        const recipe = await Recipes.findOneAndUpdate({title: recipeTitle}, dataToUpdate, {new: true})
        return recipe
    }catch(error){
        throw(error)
    }
}

app.post("/recipes/update/:title", async(req, res) => {
    try{
        const updatedRecipe = await updateRecipeWithTitle(req.params.title, req.body)
        if(updatedRecipe){
            res.status(201).json({message: "Recipie successfully updated", RecipeUpdated : updatedRecipe})
        }else {
            res.status(404).json({error: "Recipe not found"})
        }
    }catch(error){
        res.status(500).json({error: "Error occured while fetching recipes"})
    }
})

async function deleteRecipe(recipeId){
    try{
        const recipe = await Recipes.findByIdAndDelete(recipeId)
        return recipe
    }catch(error){
        throw(error)
    }
}

app.delete("/recipes/:recipeId", async(req, res) => {
    try{
        const deletedRecipe = await deleteRecipe(req.params.recipeId)
        if(deletedRecipe){
            res.status(201).json({message: "Recipie successfully deleted", DeletedRecipe : deletedRecipe})
        }else {
            res.status(404).json({error: "Recipe not found"})
        }
    }catch(error){
        res.status(500).json({error: "Error occured while fetching recipes"})
    }
})

app.listen(PORT, () => {
    console.log(`Successfully connected to port ${PORT}`)
})

