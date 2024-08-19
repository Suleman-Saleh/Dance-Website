const express = require('express');
const app = express();
const path = require('path');
const bodyparser = require('body-parser')
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/contactDance')

// Set up body-parser
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

//Define mongoose schema
var contactSchema = new mongoose.Schema({
    name: String,
    phone: Number,
    email: String,
    address: String,
    desc: String
});

const Contact = mongoose.model('Contact', contactSchema);


// Set the view engine to pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Define routes
app.get('/', (req, res) => {
    res.render('home');
});
app.get('/home', (req, res) => {
    res.render('home');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});
app.post('/contact', (req, res) => {
    console.log(req.body)
    var mydata = new Contact(req.body)
    mydata.save().then(()=>{
        res.send("This item has been saved into the database")
    }).catch(()=>{
        res.status(400).send("Item not saved")
    })
    // res.render('contact');
});

// Serve static files
app.use('/static', express.static(path.join(__dirname, 'static')));

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
