const mongo = require('mongoose');

// Need Clarification
const express = require('express');
var app = express();

// avoid the warning in the console
const options = { useNewUrlParser: true };

// Allow for cross access control while try to access from UI.
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const getValueSchema =  mongo.Schema(
    {  
        "name":String,
        "number":Number
    },
    {
        collection:"Demo_Collection1",
    }
);
const getValueModel = mongo.model('Demo_Collection1', getValueSchema);

// var savedata = new getValueModel ({
//     name : "Selva",
//     number :  9787878315
// });
// savedata.save();

app.get('/api/website/:name', function(req,res){
    var website = new getValueModel({name: req.params.name, number: 9787878315});
    website.save(function(err,doc)
    {
        res.json(doc);
    });
})

app.get('/data', (req, res) => {
    getValueModel.find({},function(err, data) {
        if(err){
            console.log(err);
            return res.send(err);
        }
        return res.send(data);
        // getValueModel.find().exec(function(error, Demo_Collection) { return res.send(Demo_Collection); 
    })
});

var developer = [
    {
        first: 'Selva', last: 'Kumar'
    },
    {
       first: 'Selva1', last: 'Kumar1'
    }
   ]
   app.get('/developer', function(req,res){
       res.json(developer);
   });

app.get('/gett', (req, res) => {
        getValueModel.find({
            name : "Narco", number : "12"
        }, function(err, Demo_Collection){
            if(err) throw err;
            {
                console.log(err);
                if(Demo_Collection.length === 1){  
                    return res.status(200).json({
                        status: 'success',
                        data: Demo_Collection
                    })
                } else {
                    console.log(err);
                    return res.status(200).json({
                        status: 'fail get',
                        message: 'Login Failed get'
                    })
                }
            }
        })
})

mongo.connect("mongodb://localhost:27017/DemoDB", options)
    .then((response , err) => {
        if(response){
            // console.log(response);
            // console.log("Successfully connected to the database1");
        }
        console.log("Successfully connected to the database");
    })
    var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
    var port = process.env.OPENSHIFT_NODEJS_PORT || 8800 ;
app.listen((ip,port), () => {
    console.log("Server is listening on port");
});