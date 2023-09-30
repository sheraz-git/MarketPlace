const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
require("dotenv").config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const Port = process.env.PORT || 5000;
const connectToMongo = require("./db/connectDb");
const GlobalErrorHandler = require("./middleware/GlobalErrorHandler");
const userRoutes = require("./routes/Users/user.routes");
const productRoutes = require("./routes/Products/product.route");
const notificationRoutes = require("./routes/Notification/notification");

//console.clear();
connectToMongo();
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};

app.use(cors(corsOptions));
app.get("/", (req, res) => {
  return res.status(200).json({
    message: "MarketPlace-Worked-Successfully",
  });
});

app.listen(Port, () => {
  console.log(`MarketPlace-Backend-Working ${Port}`);
});

app.use(GlobalErrorHandler);

app.use(
  "/api",
  userRoutes,
  productRoutes,
  notificationRoutes,
  (req, res, next) => {
    res.status(404).json({
      success: false,
      message: "Page not found",
      error: {
        statusCode: 404,
        message: "You reached a route that is not defined on this server",
      },
    });
  }
);
// deployment configuration

const path=require("path");
__dirname=path.resolve();
// render_deployment
if(process.env.NODE_ENV === "production"){
app.use(express.static(path.join(__dirname,"/client/build")))
app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"client","build","index.html"))
})

}