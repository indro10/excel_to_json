const mongoose = require("mongoose");

// Replace 'your_database_url' with the actual MongoDB connection string
mongoose.connect(
  `mongodb+srv://inghosh30:${encodeURIComponent(
    "Ig@301297"
  )}@cluster0.bpctqgq.mongodb.net/?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

module.exports = mongoose;
