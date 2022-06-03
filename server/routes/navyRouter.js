const express = require('express'); //requires express
const navyRoutes = express.Router(); //sets navyRoutes as router 
const imageModel = require('../models/imageModel'); //requires mongoose model from models folder
const path = require('path');

// use react build folder
navyRoutes.use(express.static(path.join(__dirname, '..', 'build')));

navyRoutes.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
  });

// on homepage route, will send homepage images document from mongodb
navyRoutes.get('/homepage', (req, res) => {
    let filter = {type:"homepage"};

    imageModel.findOne(filter, function (err, images) {
        res.send(JSON.stringify(images));
    })
})

// on comic get route, will send comic images for that comic and that chapter, gets comic and chapter from url
navyRoutes.get('/comic/:name/:chapter', (req, res) => {
    try {
    let comicName = req.params.name;
    let comicChapter = req.params.chapter - 1;

    let filter = {type:"comic",name:comicName,chapter:comicChapter};
    
    imageModel.findOne(filter, function (err, images) {
        if(!err && images != null) {
            jImages = JSON.stringify(images);
            var options = {
                   headers: {
                        "response": jImages
                          }
                         };
            res.sendFile(path.join(__dirname, '..', 'build', 'index.html'),options);
    }
    else{
        res.status(404).sendFile(path.join(__dirname, '..', 'build', 'index.html'));;
    }
    })
    }
    catch {
        res.status(404).sendFile(path.join(__dirname, '..', 'build', 'index.html'));;
    }
})

// on post from comic page, will add comment by updating the comments (users and comments) in the comic in the chapter's mongodb document
navyRoutes.post('/comic/:name/:chapter', (req, res) => {
    var flag = true; 

    if(req.body.name) var commentName = req.body.name;
    else var commentName = ""; 
    if(req.body.comment) var commentComment = req.body.comment;
    else var commentComment = ""; 

    try {
    let comicName = req.params.name;
    let comicChapter = req.params.chapter - 1;
    
    let filter = {type:"comic",name:comicName,chapter:comicChapter};
    let update = "";
    if(commentName.trim() != "" && commentComment.trim() != "")
    {
        update = {$push:{
            comments_users:{$each: [ commentName ],$position: 0},
            comments_comments:{$each: [ commentComment ],$position: 0}
        }};
    }
    else
        flag = false; 
    
    imageModel.findOneAndUpdate(filter,update,{new: true},function(err,image) {
        if(!err && flag){
            res.send(image);
          }
          else {
          res.end("Could not add comment.");
          }
    })
    }
    catch {
        res.status(404).sendFile(path.join(__dirname, '..', 'build', 'index.html'));;
    }
})

// on gallery route, will send gallery images document from mongodb
navyRoutes.get('/gallery', (req, res) => {
    let filter = {type:"gallery"};

    imageModel.findOne(filter, function (err, images) {
        jImages = JSON.stringify(images);
            var options = {
                   headers: {
                        "response": jImages
                          }
                         };
            res.sendFile(path.join(__dirname, '..', 'build', 'index.html'),options);
    })
})

// sends about for about route
navyRoutes.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
})

// sends contact for contact route
navyRoutes.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
})

// exports router
module.exports = navyRoutes;