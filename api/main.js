const express = require('express')
const app = express()
const db = require("./mongo.js").db
const bodyParser = require('body-parser')
const multer = require('multer')
let upload = multer()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authentication, Authorization");
  next();
});

app.get("/messages", (req, res) => {
    db().collection("messages").find().sort({_id: -1}).limit(500).toArray((err, result) => {
        if(err) {
            res.status(400).json({
                success: false
            })
            return
        }
        let messages = result
        db().collection("messages").find({featured: 1}).toArray((err, result) => {
            if(err) {
                res.status(400).json({
                    success: false
                })
                return
            }else{
                res.status(200).json({
                    success: true,
                    messages: messages,
                    featured: result
                })
            }
        })
    })
})

app.post("/message", upload.none(), (req, res) => {
    let name = req.body.name
    let place = req.body.place
    let message = req.body.message
    if(!name || !place || !message){
        res.status(400).json({
            success: false
        })
        return
    }
    let object = {
        name: name,
        place: place,
        message: message,
        featured: 0
    }
    if(message.includes("%") || message.includes("$") || message.length > 300){
        res.status(400).json({
            success: false
        })
        return
    }
    db().collection("messages").insertOne(object, (err, result) => {
        if (err) {
            res.status(400).json({
                success: false
            })
            return
        }else{
            res.status(200).json({
                success: true
            })
        }
    })
})

app.get("/count", (req, res) => {
    db().collection("messages").count((err, result) => {
        if(err){
            res.status(400).json({
                success: false
            })
            console.log(err)
            return
        }else{
            res.status(200).json({
                success: true,
                count: result
            })
        }
    })
})

app.get("/", (req, res) => {
    res.send("Hello")
})


app.listen(3003, () => {console.log("Positivity API Listening on 3003")})