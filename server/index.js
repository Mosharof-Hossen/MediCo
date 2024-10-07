const express = require('express');
const cors = require('cors');
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require('mongodb');


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
    origin: [
        "http://localhost:5173",
        'https://taste-haven-app.web.app'
    ],
    credentials: true
}));

const uri = `mongodb+srv://${process.env.MD_USER}:${process.env.MD_PASS}@cluster0.6kxgx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const usersCollection = client.db("medicoDB").collection("users");
        const categoriesCollection = client.db("medicoDB").collection("categories");
        const itemsCollection = client.db("medicoDB").collection("items");
        const cartCollection = client.db("medicoDB").collection("cart");

        app.get("/all-category", async (req, res) => {
            const result = await categoriesCollection.find().toArray();
            res.send(result)
        })

        app.post("/users", async (req, res) => {
            const data = req.body;
            const filter = { email: data.email };
            const option = { upsert: true };
            const updateUser = {
                $set: {
                    email: data.email,
                    userId: data.userId,
                    role: data.role
                }
            }
            const result = await usersCollection.updateOne(filter, updateUser, option);
            res.send(result)
        })

        app.get("/products/:category", async (req, res) => {
            const category = req.params.category;
            console.log(category);
            const result = await itemsCollection.find({ category: category }).toArray();
            res.send(result)
        })

        app.get("/items", async (req, res) => {
            console.log(req.query);
            const selectedCategories = req.query.selectedCategories ? req.query.selectedCategories : [];
            const isDiscounted = req.query.isDiscounted === "true";
            const query = {};
            if (selectedCategories.length > 0) {
                query.category = { $in: selectedCategories };
            }
            if (isDiscounted) {
                query.discountPercentage = { $gt: 0 };
            }
            console.log(query);
            const result = await itemsCollection.find(query).toArray();
            res.send(result);
        })

        app.post(`/addToCart`, async (req, res) => {
            const item = req.body
            const result = await cartCollection.insertOne(item);
            res.send(result)
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get("/", async (req, res) => {
    res.send("Server is running")
})

app.listen(port, () => {
    console.log("Server is running on port ", port);
})