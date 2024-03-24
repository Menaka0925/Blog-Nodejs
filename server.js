// Import necessary modules
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override'); // Import method-override package
const articleRoutes = require('./routes/articles');
const Article = require('./models/Article');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Set up EJS as the view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Set up middleware to parse incoming request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up method override middleware
app.use(methodOverride('_method'));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/blogDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Use the articles router for handling /articles routes
app.use('/articles', articleRoutes);

// Define route to render the index page
app.get('/', async (req, res) => {
    try {
        // Fetch articles from the database
        const articles = await Article.find();

        // Render the index page and pass fetched data to it
        res.render('index', { articles });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// Define route to create a new article
app.post('/articles', async (req, res) => {
    try {
        // Create a new article based on the submitted form data
        await Article.create(req.body);
        // Redirect to the main page after creating the article
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
