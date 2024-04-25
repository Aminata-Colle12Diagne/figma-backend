const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://collediagne98:colle98@cluster0.r5owzhb.mongodb.net/authentification?retryWrites=true&w=majority&appName=Cluster0',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));