const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.log("MongoDB connection error:", err));

const sampleRegisterSchema = new mongoose.Schema({
    title: String,
    content: String
});

const Sample = mongoose.model("Register", sampleRegisterSchema);

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    let newSample = new Sample({
        title: req.body.title,
        content: req.body.content
    });
    newSample.save()
    .then(() => res.redirect("/"))
    .catch(err => console.log("Error saving data:", err));
});

app.listen(PORT, function () {
    console.log(`Server is running on port ${PORT}`);
});
