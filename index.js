require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {MongoClient, objectId} = require('mongodb');

const router = express.Router();
const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/clients', router);

const clientPromise = MongoClient.connect(process.env.DB_URL || "mongodb+srv://root:wl7TXgov8UwxraE8@cluster0.ybx8pvd.mongodb.net/Clients_db?retryWrites=true&w=majority", {
    useUnifiedTopology: true,
    maxPoolSize: 10,
});

router.use(async (req, res, next) => {
     try {
         const client = await clientPromise;
         req.db = client.db('Clients_db');
         next();
     } catch (error) {
         next(error)
     }
})

const port = process.env.PORT || 3000;

router.get('/', async (req, res) => {
    try {
        const db = req.db;
        const clients = await db.collection('clients').find().toArray();

        res.send(clients);
    } catch (error) {
        console.log(error)
    }
})

app.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`);
})