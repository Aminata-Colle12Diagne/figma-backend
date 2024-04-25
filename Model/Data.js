const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    nom: {
        type:String,
        required:true
    },
    adresse: {
        type:String,
        required:true
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
        required:true
    },
    imageURL: {
        type: String, // Stockez l'URL de l'image
        required:true
    }
    

})

const UserModal = mongoose.model("datas",dataSchema)
module.exports=UserModal;
