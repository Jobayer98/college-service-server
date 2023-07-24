const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGODB_URI;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const colleges = client.db("college-connect").collection("colleges");
const reviews = client.db("college-connect").collection("reviews");
async function connect() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
connect();

const getColleges = () => {
  const result = colleges.find({}).toArray();

  return result;
};
const getCollegeById = (id) => {
  const result = colleges.findOne({ _id: id });
  return result;
};

const getReviews = () => {
  const result = reviews.find({}).toArray();

  return result;
};
const addReviews = (userReview) => {
  const result = reviews.insertOne(userReview).toArray();

  return result;
};

module.exports = {
  getColleges,
  getCollegeById,
  getReviews,
  addReviews,
};
