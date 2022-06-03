// requirements
const express = require('express');
const urlencodedParser = express.urlencoded({ extended: false });
bodyParser = require('body-parser');
const app = express();
const navyRoutes = require('./routes/navyRouter');
mongoose = require('mongoose');
const cors = require("cors");
app.use(cors());
app.use(express.json());
const path = require('path');

// connection to mongodb atlas via mongoose connect
mongoose.connect('mongodb+srv://navybird_28:aPC5L89KuqqMH6b@cluster0.3e9zc.mongodb.net/navyDB?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=>{
  console.log("DB connected");
}).catch(err=>{
  console.log("Database not connected"+err)
});

// allowing cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// using all routes in router file
app.use('/', navyRoutes);

// if the route doesn't match the routes in router file, sends 404
app.use(function(req, res) {
    res.status(404).sendFile(path.join(__dirname, 'build', 'index.html'));;
});

// sets port as 3001 or env port
const PORT = process.env.PORT || 3001;

// listens on port
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });