var con = require("../mysql/connection.js");
var ObjectId = require('mongodb').ObjectID;
//var mongo = require("../mongodb/connection.js");

//console.log(mongo);

var appRouter = function (app) {
   
    app.get("/", function(req, res) {

        var content = "Welcome to our restful API <br />";
        var content = "URL of APIs : <strong>http://localhost:"+port+"</strong> <br />";
        content += "List of API Endpoints <br />";
        content += "<ul>";
            content += "<li>";
            content += "<strong>/users</strong> : GET ALL USERS" ;
            content += "</li>";
            content += "<li>";
            content += "<strong>/user/:id</strong> : GET A SPECIFIC USER" ;
            content += "</li>";
            content += "<li>";
            content += "<strong>/add</strong> : CREATE A NEW USER" ;
            content += "</li>";
            content += "<li>";
            content += "<strong>/update/:id</strong> : UPDATE AN EXISTING USER" ;
            content += "</li>";
            content += "<li>";
            content += "<strong>/delete</strong> : DELETE A USER" ;
            content += "</li>";
        content += "</ul>";

        res.header("Content-Type", "text/html");
        res.status(200).send(content);
    });

    // GET ALL USERS
    app.get("/users", function(req, res) {
        var dbo =  req.db;
        dbo.collection("users").find({}).toArray(function(err, result) {
            if (err) throw err;
            //console.log(result);
            res.status(200).send(result);
        });        
        
    });

    // GET A SPECIFIC USER
    app.get("/user/:id", function(req, res) {
        
        var id = req.params.id;
        var dbo =  req.db;
        var where = {"_id": ObjectId(id)};
        dbo.collection("users").find( where ).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            res.status(200).send(result);
        });     
    });

    // CREATE A NEW USER
    app.post('/add', function(req, res) {
        var p_fname = req.body.fname;
        var p_lname = req.body.lname;
        var p_status = req.body.status;
        
        var newUser = { fname: p_fname, lname: p_lname, status: p_status };

        var dbo =  req.db;
        dbo.collection("users").insertOne(newUser, function(err, result) {
            if(err) throw err;
            console.log("1 record inserted");
            res.send("1 record inserted");
        });
        
    });

    // UPDATE AN EXISTING USER
    app.post('/update/:id', function(req, res) {
        var id = req.params.id;
        var p_fname = req.body.fname;
        var p_lname = req.body.lname;
        var p_status = req.body.status;
        var data = {};
        data._id = ObjectId(id);

        if(p_fname != undefined) {
            data.fname = p_fname;
        }
        if(p_lname != undefined) {
            data.lname = p_lname;
        }
        if(p_status != undefined) {
            data.status = p_status;
        }

        var where = {"_id": ObjectId(id)};
        var newvalues = { $set: data };

        var dbo = req.db;
        dbo.collection("users").updateOne(where, newvalues, function(err, result) {
            if (err) throw err;
            console.log("1 document updated");
            res.send("1 document updated");
          });
    });

    // DELETE A USER
    app.post('/delete', function(req, res) {
        var id = req.body.id;

        var where = {"_id": ObjectId(id)};

        var dbo = req.db;
        dbo.collection("users").deleteOne(where, function(err, result) {
            if (err) throw err;
            console.log("User Deleted!");
            res.send("User Deleted!");
        });
    });
    
}
  
module.exports = appRouter;