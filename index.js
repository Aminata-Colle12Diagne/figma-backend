const express = require('express');
const app = express();
const crypto = require('crypto');
const cors = require('cors');

// Ajout du middleware pour permettre CORS
app.use(cors());

// Middleware pour permettre de lire les données JSON dans les requêtes
app.use(express.json());

// app.use(express.static('public'));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


const PORT = process.env.PORT || 10000;
require('./db/connection');
const Users = require('./Model/User');
const UserModal = require('./Model/Data');

// app.get('/', (req, res) => res.send('Hello world'));


// authentification
app.post("/", async (req, res) => {
    try {
        // Crée un nouvel utilisateur à partir des données de la requête
        let user = new Users(req.body);
        // Enregistre l'utilisateur dans la base de données
        let result = await user.save();
        // Renvoie la réponse avec les détails de l'utilisateur créé
        res.status(201).json(result);
    } catch (error) {
        // Gestion des erreurs : renvoie une réponse d'erreur avec le message approprié
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la création de l'utilisateur" });
    }
});

app.get("/getHotels", async (req, res) => {
    try {
        // Recherche tous les hôtels dans la base de données
        UserModal.find({})
            .then((hotels) => {
                // Renvoie la liste des hôtels sous forme de réponse JSON
                res.status(200).json(hotels);
            })
            .catch((error) => {
                // Gestion des erreurs : renvoie une réponse d'erreur avec un message explicite
                console.error(error);
                res.status(500).json({ message: "Erreur lors de la recherche des hôtels" });
            });
    } catch (error) {
        // Ce bloc ne sera jamais atteint car les erreurs asynchrones sont gérées par le .catch()
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la recherche des hôtels" });
    }
});

app.post("/addHotel", async (req, res) => {
    const hotelData = req.body;

    try {
        const newHotel = new UserModal(hotelData);
        await newHotel.save();
        res.json(newHotel);
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de l'ajout des données de l'hôtel");
    }
});


// app.post('/forgot-password', (req, res) => {
//     crypto.randomBytes(32, (err, Buffer) => {
//         if (err) {
//             console.log(err);
//         }
//         const token = Buffer.toString("hex");
//         Users.findOne({ email: req.body.email })
//             .then(user => {
//                 if (!user) {
//                     return res.status(422).json({ error: "User does not exist with that email" });
//                 }
//                 user.resetToken = token;
//                 user.save().then(result => {
//                     Transporter.sendMail({
//                         to: user.email,
//                         from: "no-replay@insta.com",
//                         subject: "password reset",
//                         html: `
//                             <p>You requested for password reset</p>
//                             <h5>click in this <a href="https://figma-backend-mocha.vercel.app/forgot-password/${token}" >link</a>to reset password</h5>`
//                     });
//                 });
//             });
//     });
// });



app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://0.0.0.0:${PORT}`);
});

// Export the Express API
module.exports = app;
