const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth.route");
const productsRoute = require("./routes/products.route");
const usersRoute = require("./routes/users.route");
const blogRoute = require("./routes/blog.route");
const quickReviewRoute = require("./routes/quickReview.route");
const messagesRoute = require("./routes/messages.route");
const commentsRoute = require("./routes/comments.route");

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3001",
  })
);

app.use("/api/auth", authRoute);
app.use("/api/products", productsRoute);
app.use("/api/users", usersRoute);
app.use("/api/blog", blogRoute);
app.use("/api/quickreview", quickReviewRoute);
app.use("/api/messages", messagesRoute);
app.use("/api/comments", commentsRoute);

app.listen(3000, () => console.log("Server running on 3000"));
