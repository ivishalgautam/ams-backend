require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/hospitals", require("./routes/hospital"));
app.use("/api/departments", require("./routes/department"));

app.get("/", (req, res) => {
  res.json({ message: "hello" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server up at localhost:${process.env.PORT}`);
});
