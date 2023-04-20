const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
// Always require and configure near the top 
require('dotenv').config()

const app = express();

// Connect to the database
require('./config/database');

app.use(logger('dev'))
app.use(express.json())
// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, 'build','favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));
// middleware to verify token and assign user object 
app.use(require('./config/checkToken'));

// Configure to use port 3001 instead of 3000 during
// development to avoid collision with React's dev server

const port = process.env.PORT || 3001;



//  routes to controllers 
app.use('/api/users', require('./routes/api/users'));





app.get('/*',(req,res)=>{
    res.sendFile(path.join(__dirname,'build','index.html'))
});


app.listen(port, () => {
    console.log(`Express app is running on ${port}`);
})

