const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    nom: {
        type:String,
        require:true
    },
    adresse: {
        type:String,
        require:true
    },
    email: {
        type:String,
        require:true
    },
    telephone: {
        type:Number,
        require:true
    },
    prix: {
        type:Number,
        require:true
    },
    montant: {
        type:String,
        require:true
    },
    imageURL: {
        type: String, // Stockez l'URL de l'image
        require:true
    }
    

})

const UserModal = mongoose.model("datas",dataSchema)
module.exports=UserModal;
