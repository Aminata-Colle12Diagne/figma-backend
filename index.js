const express = require('express');
const app = express();
const crypto = require('crypto');
const cors = require('cors');

// Ajout du middleware pour permettre CORS
app.use(cors());

// Middleware pour permettre de lire les données JSON dans les requêtes
app.use(express.json());
app.use((req, res, next) => {
    //allow access to current url. work for https as well
    res.setHeader('Access-Control-Allow-Origin',req.header('Origin'));
    res.removeHeader('x-powered-by');
    //allow access to current method
    res.setHeader('Access-Control-Allow-Methods',req.method);
    res.setHeader('Access-Control-Allow-Headers','Content-Type');
    next();
  })

const PORT = process.env.PORT || 10000;
require('./db/connection');
const Users = require('./Model/User');
const UserModal = require('./Model/Data');

app.post("/", async (req, res) => {
    let user = new Users(req.body);
    let result = await user.save();
    res.send(result);
});

app.get("/getHotels", async (req, res) => {
    UserModal.find({})
        .then(function (ut) {
            res.json(ut);
        })
        .catch(function (err) {
            res.json(err);
        });
});

app.post('/forgot-password', (req, res) => {
    crypto.randomBytes(32, (err, Buffer) => {
        if (err) {
            console.log(err);
        }
        const token = Buffer.toString("hex");
        Users.findOne({ email: req.body.email })
            .then(user => {
                if (!user) {
                    return res.status(422).json({ error: "User does not exist with that email" });
                }
                user.resetToken = token;
                user.save().then(result => {
                    Transporter.sendMail({
                        to: user.email,
                        from: "no-replay@insta.com",
                        subject: "password reset",
                        html: `
                            <p>You requested for password reset</p>
                            <h5>click in this <a href="https://figma-server-1-mfopva0y3-colle-diagnes-projects.vercel.app/forgot-password/${token}" >link</a>to reset password</h5>`
                    });
                });
            });
    });
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

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Serveur démarré sur http://0.0.0.0:${PORT}`);
});
