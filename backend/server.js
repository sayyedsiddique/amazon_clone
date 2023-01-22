import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import productRouter from "./routes/productRoute.js";
import userRouter from "./routes/userRouter.js";
import bodyParser from 'body-parser'
import cors from 'cors'
import orderRouter from "./routes/orderRouter.js";

dotenv.config()
const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(bodyParser.json())
app.use(cors())

app.get("/", (req, res) => {
  res.send("Server is ready");
});

// Getting product detaisl by product ID
// app.get("/api/products/:id", (req, res) => {
//     const product = data.find((product) => product._id === Number(req.params.id));
//     console.log("product ", product)
//     if (product) {
//       res.status(200).send({ product });
//     } else {
//       res.status(404).send({ message: "Product not found" });
//     }
//   });

// Getting all products
// app.get("/api/products", (req, res) => {
//   res.status(200).send({ products: data, status: "200" });
// });


app.use('/api/user', userRouter)
app.use('/api/products', productRouter)
app.use('/api/orders', orderRouter)
app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
})



// Routes Error handling in this method 
app.use((err, req, res) => {
  res.status(500).send({message: err.message})

})


mongoose.set('strictQuery',false);
mongoose.connect('mongodb+srv://siddique:LP1cUKuUJVUtMdJM@clusteramazon.pnyutaz.mongodb.net/ClusterAmazon?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connection is successful")
  const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});
}).catch((err) => {
  console.log(err, "No Connnection")
})

// const port = process.env.PORT || 5000;
// app.listen(port, () => {
//   console.log(`Server at http://localhost:${port}`);
// });
