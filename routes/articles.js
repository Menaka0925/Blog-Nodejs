// routes/articles.js

const express = require('express');
const router = express.Router();
const Article = require('../models/Article');

// Route to render the individual article page
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const article = await Article.findById(id);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }

        // Render the individual article page and pass the article data to it
        res.render('page', { article });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route to create a new article
router.post('/', async (req, res) => {
    const { title, description } = req.body;

    try {
        const newArticle = await Article.create({ title, description });
        // Fetch all articles from the database including the newly created one
        const articles = await Article.find();
        // Render the index page with the articles
        res.render('index', { articles, newArticle });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route to edit an article
router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const article = await Article.findById(id);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }

        // Render the edit article page and pass the article data to it
        res.render('edit-article', { article });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route to update an article
router.post('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    try {
        // Find the article by ID and update its properties
        const updatedArticle = await Article.findByIdAndUpdate(id, { title, description }, { new: true });

        if (!updatedArticle) {
            return res.status(404).json({ message: 'Article not found' });
        }

        // Redirect to the root route after updating the article
        res.redirect('/');
    } catch (err) {
        // Handle any errors that occur during the update process
        res.status(500).json({ message: err.message });
    }
});

// Route to delete an article
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Find the article by ID and delete it
        await Article.findByIdAndDelete(id);
        
        // Fetch the updated list of articles
        const articles = await Article.find();

        // Render the create new article page with the updated list of articles
        res.render('index', { articles });
    } catch (err) {
        // Handle any errors that occur during the delete process
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
