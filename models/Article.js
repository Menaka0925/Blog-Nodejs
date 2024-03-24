// models/Article.js

const mongoose = require('mongoose');

// Define the schema for the article
const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create a model based on the schema
const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
