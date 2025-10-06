const express = require("express"); // creation de const express qui permet d'acceder à express
const app = express(); //permet d'utiliser les methodes de l'objet express dans la variable "app"

const cors = require("cors");// permet aux differents serveurs d'echanger des données entre eux 
const mysql = require("mysql2");

const corsOptions = { 
    origin: [
        'http://localhost:3000',  // Liste des origines autorisées à faire des requêtes cross-origin (ici l'application frontend)
        'http://localhost:8081',  //backend
    ],
    optionsSuccessStatus: 200,    // Statut renvoyé pour les requêtes OPTIONS (prévol), souvent 200 car certains navigateurs ne supportent pas 204
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Méthodes HTTP autorisées pour les requêtes cross-origin
    headers: 'Content-Type, Authorization',   // En-têtes HTTP autorisées dans la requête 
    credentials: true,          // Autorise l’envoi des cookies et informations d'authentification avec la requête cross-origin
};

app.use(cors(corsOptions))
app.use(express.json())

const database = mysql.createConnection({
    host: 'localhost',      // Adresse du serveur MySQL (ici en local)
    user: 'root',           // Nom d'utilisateur MySQL
    password: 'root',       // Mot de passe associé à l'utilisateur MySQL
    port: '8889',           // Port utilisé pour se connecter à MySQL (souvent 3306 par défaut, ici 8889)
    database: 'boutique'    // Nom de la base de données à utiliser
});


/// Définition d'une route GET sur la racine du serveur "/"
app.get("/", (req, res) => {
   // Requête SQL pour sélectionner toutes les entrées de la table "article"
   const sql = "SELECT * FROM article";

   database.query(sql, (err, data) => { // Exécute la requête sur la base de données
      // Si une erreur survient, renvoie une réponse JSON avec "Error"
      if (err) return res.json("Error");
      console.log("data")
      
      
      // Sinon, renvoie les données récupérées sous forme JSON
      return res.json(data);
   });
});

app.post('/create', (req, res) => {
    const sql = "INSERT INTO article (`name`, `category`, `description`) VALUES (?,?,?)";
    const values = [
        req.body.name,
        req.body.category,
        req.body.description
    ]
    database.query(sql, values, (err,data) => {
        if(err) return res.json("Error")
        return res.json(data);
    })

})




app.listen(8081,() => { // attribue le port 8081 au serveur et execute une fonction anonyme listen 
    console.log('server is running on port 8081');
})

