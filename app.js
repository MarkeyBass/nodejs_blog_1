const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

const PORT = process.env.PORT || 3000;

// express app
const app = express();

// connect to mongodb
// const dbURI = 'mongodb+srv://mark_k:19481984@nodemongoproject1.3n1rv.mongodb.net/all-blogs-1?retryWrites=true&w=majority';
const dbURI = 'mongodb+srv://marks-blog-user:mypassword192837465@cluster0.nfumk.mongodb.net/<dbname>?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(PORT, 'localhost'))
  .then((result) => console.log('connected to db'))
  .catch((err) => console.log(err));


// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));

// allowing Post requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan('dev'));

app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});


// API
// basic routs
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs', blogRoutes);



// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});



