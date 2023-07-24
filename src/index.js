const express = require("express");
const {
  getColleges,
  getCollegeById,
  getReviews,
  addReviews,
} = require("./config/db");

const app = express();
const port = process.env.PORT || 3001;

// express middleware
app.use(express.json());

// connect to the database collection
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// get college by id
app.get("/colleges/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const college = await getCollegeById(id);
    if (!college) {
      return res.status(404).send({
        message: "Colleges not found",
      });
    }

    res.send(college);
  } catch (error) {
    res.status(500).send(error);
  }
});

// get all colleges
app.get("/colleges", async (req, res) => {
  try {
    const colleges = await getColleges();
    if (!colleges) {
      return res.status(404).send({
        message: "Colleges not found",
      });
    }

    res.status(200).send(colleges);
  } catch (error) {
    res.status(500).send(error);
  }
});

// get all reviews
app.get("/reviews", async (req, res) => {
  try {
    const reviews = await getReviews();
    if (!reviews) {
      return res.status(404).send({
        message: "Reviews not found",
      });
    }

    res.status(200).send(reviews);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/reviews", async (req, res) => {
  const { rating, review, reviewer, collegeName } = req.body;

  const userReview = {
    rating,
    review,
    reviewer,
    collegeName,
  };

  try {
    const result = await addReviews(userReview);
    console.log(result);

    if (result.inse)
      res.status(201).send({
        status: true,
        message: "Review added successfully",
      });
  } catch (error) {}
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
