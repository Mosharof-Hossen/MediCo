const express = require('express');
const cors = require('cors');
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
        const paymentCollection = client.db("medicoDB").collection("payment");
        const adsCollection = client.db("medicoDB").collection("ads");


        // ---------------- JWT API ------------------
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

        // -------------------- Public Api-------------------------------
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

        // ------------------------ Dashboard Related API--------------------------
        app.get('/userInfo', async (req, res) => {
            const data = req.query;
            const result = await usersCollection.findOne({
                $or: [{ email: data.email }, { userId: data.uid }]
            })
            res.send(result);
        })

        // -------------------------- User Related API --------------------------

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
                ]).toArray()
                res.send(result)
            }
            else {
                res.send([])
            }

        })

        app.get("/profile-info/:uid", verifyToken, async (req, res) => {
            const userId = req.params;
            const result = await paymentCollection.find({ userId: userId.uid }).toArray();
            res.send(result);
        })

        app.patch("/user/carts", verifyToken, async (req, res) => {
            const data = req.body;
            const filter = {
                userId: data.userId,
                itemId: data.itemId
            }
            const result = await cartCollection.updateOne(filter, { $set: { quantity: data.quantity } })

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

        // ---------------- Seller API -----------------

        const verifySeller = async (req, res, next) => {
            const uid = req.tokenUser.uid;
            const user = await usersCollection.findOne({ userId: uid });
            const seller = user?.role === "seller"
            if (!seller) {
                return res.status(403).send({ message: "Forbidden Access" })
            }
            next();
        }

        app.get("/manage-medicines-seller/:id", verifyToken, verifySeller, async (req, res) => {
            const id = req.params.id;
            console.log(id);
            const result = await itemsCollection.find({ "seller.sellerId": id }).toArray();
            res.send(result)
        })

        app.get("/seller/payment-history/:uid", verifyToken, verifySeller, async (req, res) => {
            const uid = req.params.uid;
            const result = await paymentCollection.find({ sellerId: uid }).toArray();
            res.send(result);
        })

        app.get('/user-selected-items/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await paymentCollection.aggregate([
                {
                    $match: query
                },
                {
                    $addFields: {
                        items: {
                            $map: {
                                input: "$items",
                                as: "itemId",
                                in: { $toObjectId: "$$itemId" }
                            }
                        }
                    }
                },
                {
                    $lookup: {
                        from: 'items',
                        localField: 'items',
                        foreignField: '_id',
                        as: 'itemDetails'
                    }
                }

            ]).toArray();
            res.send(result);
        })

        app.get(`/ads-seller/:uid`, verifyToken, verifySeller, async (req, res) => {
            const uid = req.params.uid;
            const result = await adsCollection.find({ "seller.sellerId": uid }).toArray();
            res.send(result);
        })

        app.put("/delivery-status", verifyToken, verifySeller, async (req, res) => {
            const data = req.body;
            const query = { _id: new ObjectId(data.id) };
            const updatedStatus = {
                $set: {
                    status: data.status,
                }
            }
            const result = await paymentCollection.updateOne(query, updatedStatus)
            res.send(result)
        })

        app.patch("/update-medicine-seller", verifyToken, verifySeller, async (req, res) => {
            const data = req.body;
            const query = { _id: new ObjectId(data.id) };
            if (data.image) {
                let updateData = {
                    $set: {
                        image: data.image,
                        itemName: data.itemName,
                        company: data.company,
                        itemGenericName: data.itemGenericName,
                        itemMassUnit: parseInt(data.itemMassUnit),
                        discountPercentage: parseInt(data.discountPercentage),
                        category: data.category,
                        perUnitPrice: parseInt(data.perUnitPrice),
                        application: data.application,
                        shortDescription: data.shortDescription,

                    }
                }
                const result = await itemsCollection.updateOne(query, updateData);
                return res.send(result);
            }
            let updateData = {
                $set: {
                    itemName: data.itemName,
                    company: data.company,
                    itemGenericName: data.itemGenericName,
                    itemMassUnit: parseInt(data.itemMassUnit),
                    discountPercentage: parseInt(data.discountPercentage),
                    category: data.category,
                    perUnitPrice: parseInt(data.perUnitPrice),
                    application: data.application,
                    shortDescription: data.shortDescription,

                }
            }
            const result = await itemsCollection.updateOne(query, updateData);
            res.send(result);
        })

        app.post("/add-item-seller", verifyToken, verifySeller, async (req, res) => {
            const data = req.body;
            const result = await itemsCollection.insertOne(data);
            res.send(result)
        })

        app.post("/create-ads-seller", verifyToken, verifySeller, async (req, res) => {
            const data = req.body;
            const result = await adsCollection.insertOne(data);
            res.send(result);
        })

        app.delete(`/item-delete-seller/:id`, verifyToken, verifySeller, async (req, res) => {
            const id = req.params.id;
            const result = await itemsCollection.deleteOne({ _id: new ObjectId(id) });
            res.send(result)
        })

        // ---------------- Admin Section ---------------------

        const verifyAdmin = async (req, res, next) => {
            const uid = req.tokenUser.uid;
            const user = await usersCollection.findOne({ userId: uid });
            const admin = user?.role === "admin"
            if (!admin) {
                return res.status(403).send({ message: "Forbidden Access" })
            }
            next();
        }

        app.get("/all-user-admin", verifyToken, verifyAdmin, async (req, res) => {
            const result = await usersCollection.find().sort({ role: 1 }).toArray();
            res.send(result)
        })

        app.get('/all-medicine', verifyToken, verifyAdmin, async (req, res) => {
            const result = await itemsCollection.find().toArray();
            res.send(result);
        })

        app.get("/payment-manage-admin", verifyToken, verifyAdmin, async (req, res) => {
            const date = req.query.date;
            let query = {}
            if (date) {
                const startDate = new Date(`${date?.startDate}T00:00:00.000Z`)
                const endDate = new Date(`${date?.endDate}T23:59:59.999Z`)
                query = {
                    date: {
                        $gte: startDate,
                        $lte: endDate
                    }
                }

            }
            console.log(query);
            const result = await paymentCollection.find(query).toArray();

            res.send(result);
        })

        app.get(`/ads-admin`, verifyToken, verifyAdmin, async (req, res) => {
            const result = await adsCollection.find().toArray();
            res.send(result)
        })

        app.patch(`/ads-manage-admin`, verifyToken, verifyAdmin, async (req, res) => {
            const data = req.body;
            const query = { _id: new ObjectId(data.id) }
            const updateData = {
                $set: {
                    status: data.condition
                }
            }
            const result = await adsCollection.updateOne(query, updateData);
            res.send(result);
        })

        app.patch(`/update-role`, verifyToken, verifyAdmin, async (req, res) => {
            const data = req.body;
            const query = { _id: new ObjectId(data.id) };
            const updateData = {
                $set: {
                    role: data.role
                }
            }
            const result = await usersCollection.updateOne(query, updateData);
            res.send(result);
        })

        app.patch(`/update-category`, verifyToken, verifyAdmin, async (req, res) => {
            const data = req.body;
            const query = { _id: new ObjectId(data.id) };
            if (data.categoryImage) {
                const updatedData = {
                    $set: {
                        categoryName: data.categoryName,
                        description: data.description,
                        categoryNameId: data.categoryNameId,
                        categoryImage: data.categoryImage,
                    }
                }
                const result = await categoriesCollection.updateOne(query, updatedData);
                return res.send(result)
            }
            const updatedData = {
                $set: {
                    categoryName: data.categoryName,
                    description: data.description,
                    categoryNameId: data.categoryNameId,
                }
            }
            const result = await categoriesCollection.updateOne(query, updatedData);
            res.send(result)
        })

        app.delete("/delete-category/:id", verifyToken, verifyAdmin, async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await categoriesCollection.deleteOne(query);
            res.send(result);
        })

        app.post(`/create-category`, verifyToken, verifyAdmin, async (req, res) => {
            const data = req.body;
            const result = await categoriesCollection.insertOne(data);
            res.send(result)
        })

        // ---------------- Payment Section ------------


        app.get("/payment/:email/:uid", verifyToken, async (req, res) => {
            const info = req.params;
            const result = await paymentCollection.find({ userId: info.uid }).toArray();
            res.send(result);
        })

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

        app.post("/payment", verifyToken, async (req, res) => {
            const dataWithOutDate = req.body;
            const data = dataWithOutDate?.map((item) => {
                item.date = new Date();
                console.log(item);
                return item
            });
            const paymentResult = await paymentCollection.insertMany(data);
            if (paymentResult.acknowledged == true) {
                const query = {
                    userId: data[0].userId
                }
                const result = await cartCollection.deleteMany(query);
                return res.send(result)
            }
            res.send({})
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