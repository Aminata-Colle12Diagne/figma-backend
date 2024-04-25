const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://collediagne98:colle98@cluster0.r5owzhb.mongodb.net/authentification?retryWrites=true&w=majority&appName=Cluster0').then(() => {
console.log("Connected to Database");
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});


