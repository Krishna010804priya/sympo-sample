const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb+srv://Krishnapriya:Harini123@cluster-sympo.ksa7g.mongodb.net/registrationDb");

const sampleRegister = {
    title: String,
    content: String
}

const Sample = mongoose.model("Register", sampleRegister);

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
    
})

app.post("/", function(req, res){
    let newSample = new Sample({
        title: req.body.title,
        content: req.body.content
    });
    newSample.save();
    res.redirect('/');
})


app.listen(PORT, function () {
    console.log(`Server is running on port ${PORT}`);
});
