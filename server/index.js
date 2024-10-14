const express = require('express');
const cors = require('cors');
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const jwt = require("jsonwebtoken");
const stripe = require('stripe')(process.env.SK_STRIPE);


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

        // JWT API
        app.post('/login', async (req, res) => {
            const payload = req.body;
            if (payload.email || payload.uid) {
                const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "1h" })
                res.send({ token });
            } else {
                res.status(403).json({ message: "Invalid Email or Password" })
            }
        })


        const verifyToken = (req, res, next) => {
            const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
            if (!token) {
                return res.status(403).json({ message: "Token is missing. Access Denied" });
            }
            jwt.verify(token, process.env.JWT_KEY, (err, user) => {
                if (err) {
                    return res.status(403).json({ message: "Invalid or Expired token. Access Denied" })
                }
                req.tokenUser = user;
                next()
            })
        }

        // /////////////////////////////////////////////////////////////////////////////////////
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
            const result = await itemsCollection.find({ category: category }).toArray();
            res.send(result)
        })

        app.get("/items", async (req, res) => {
            const { itemPerPage, currentPage } = req.query;
            const selectedCategories = req.query.selectedCategories ? req.query.selectedCategories : [];
            const isDiscounted = req.query.isDiscounted === "true";
            const searchQuery = req.query.searchQuery || "";
            const sortOption = req.query.sort || "name";

            const query = {};
            if (selectedCategories.length > 0) {
                query.category = { $in: selectedCategories };
            }
            if (isDiscounted) {
                query.discountPercentage = { $gt: 0 };
            }
            if (searchQuery) {
                query.itemName = { $regex: searchQuery, $options: "i" }
            }

            const sortCriteria = {};
            if (sortOption == "low-to-high") {
                sortCriteria.perUnitPrice = 1;
            } else if (sortOption == "high-to-low") {
                sortCriteria.perUnitPrice = -1;
            }

            const totalItem = await itemsCollection.countDocuments(query);
            const items = await itemsCollection.find(query).skip((currentPage - 1) * itemPerPage).limit(parseInt(itemPerPage)).sort(sortCriteria).toArray();

            const totalPage = Math.ceil(totalItem / itemPerPage);

            res.send({ items, totalPage });
        })

        app.post(`/addToCart`, async (req, res) => {
            const item = req.body
            const result = await cartCollection.insertOne(item);
            res.send(result)
        })

        // Dashboard Related API
        app.get('/userInfo', async (req, res) => {
            const data = req.query;
            const result = await usersCollection.findOne({
                $or: [{ email: data.email }, { userId: data.uid }]
            })
            res.send(result);
        })

        // ********** User Related API ***********
        app.get("/user/cart", verifyToken, async (req, res) => {
            const user = req.query.user;

            if (req.tokenUser?.email == user?.email || req.tokenUser?.uid == user?.uid) {
                // const results = await cartCollection.find({
                //     $or: [user.email ? { userEmail: user.email } : { userId: user.uid }]
                // }).toArray()
                const result = await cartCollection.aggregate([
                    {
                        $match: { userId: user.uid }
                    },
                    {
                        $addFields: {
                            itemIdObject: { $toObjectId: "$itemId" }  // Convert itemId to ObjectId for matching
                        }
                    },
                    {
                        $lookup: {
                            from: "items",                  // The 'items' collection
                            localField: "itemIdObject",            // Field in 'card' that references 'items'
                            foreignField: "_id",             // Field in 'items' that is the _id
                            as: "itemDetails"                // Output array field to store matched items
                        }
                    },
                    {
                        $unwind: "$itemDetails"
                    },
                    // {
                    //     $project: {
                    //         _id: 1,
                    //         userEmail: 1,
                    //         userId: 1,
                    //         itemId: 1,
                    //         "itemDetails.itemName": 1,
                    //         "itemDetails.perUnitPrice": 1,
                    //         "itemDetails.discountPercentage": 1,
                    //         "itemDetails.company": 1,
                    //     }
                    // }
                ]).toArray()
                res.send(result)
            }
            else {
                res.send([])
            }

        })

        app.patch("/user/carts", verifyToken, async (req, res) => {
            const data = req.body;
            const filter = {
                userId: data.userId,
                itemId: data.itemId
            }
            const result = await cartCollection.updateOne(filter, { $set: { quantity: data.quantity } })
            console.log(data);
            res.send(result)
        })

        app.delete('/user/carts/:id', verifyToken, async (req, res) => {
            const id = req.params.id;
            const result = await cartCollection.deleteMany({ userId: id });
            res.send({ result })
        })
        app.delete('/user/cart/:id', verifyToken, async (req, res) => {
            const id = req.params.id;
            const result = await cartCollection.deleteMany({ itemId: id });
            res.send({ result })
        })

        // ---------------- Payment Section ------------
        app.post('/create-payment-intent', verifyToken, async (req, res) => {
            const { price } = req.body;
            const amount = parseInt(price * 100);
            const paymentIntent = await stripe.paymentIntents.create({
                amount: amount,
                currency: "usd",
                payment_method_types: ['card'],
            })
            res.send({ client_secret: paymentIntent.client_secret })
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