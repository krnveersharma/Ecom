const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const db = require("./util/database");

const errorController = require("./controllers/error");


const Product = require("./models/product");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));


// middleware to store user into req.user so that we can use it further
app.use((req, res, next) => {
  if(!User[0]){
  User.findById("666c4f53e067b4c76ea2c4a8")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
  }
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

const startServer = async () => {
  await db.db();
  User.findOne().then((user) => {
    if (!user) {
      const user = new User({
        name: "Karan",
        email: "Karan@gmail.com",
        cart: {
          items: [],
        },
      });
      user.save();
    }
  });
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
};

startServer();
