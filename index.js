var express = require("express"), 
    app     = express(),
    port    = process.env.PORT,
    ip      = process.env.IP,
    mongoose= require("mongoose"),
    bodyParser = require("body-parser"),
    todoRoutes = require("./routes/todos");
    
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));


app.get('/', function(req, res){
    res.sendFile("index.html");
});


app.use("/api/todos", todoRoutes);


app.listen(port, ip, function(){
    console.log("Todo Server up!!");
});