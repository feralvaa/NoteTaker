// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require ("fs");
var db = require ("./db/db.json")
var idCount = 2

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));


app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });
  
  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
  });


  app.get("/api/notes", function(req, res) {
    return res.json(db);
  });

  app.post("/api/notes" , function(req, res) {
    var newNote = req.body;
    newNote.id = idCount; 
    db.push(newNote);
    res.json(newNote);
    idCount++
  });

  app.get("/api/notes/:id", function(req, res) {
    var chosen = req.params.id;
    console.log(chosen)
    
    for (var i = 0; i < db.length; i++) {
      if (chosen == db[i].id) {
        return res.json(db[i]);
      }
    }

    return res.json(false);
  
  });


  
  app.delete("/api/notes/:id" , function(req, res) {
    var choice = req.params.id;
    console.log(choice)

        db = db.filter(ele => ele.id != choice)  
        console.log(db)
        fs.writeFileSync("./db/db.json", JSON.stringify(db), function (err){});
        res.end("success")

  });



  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  
 
  function reWrite(choise) {
    let json = JSON.parse(fs.readFileSync("./db/db.json", 'utf-8'));
    json = db.filter(ele => ele.id != choise)
    fs.writeFileSync("./db/db.json", JSON.stringify(json), 'utf-8');  
  }