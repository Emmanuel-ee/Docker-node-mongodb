const express = require('express')
const mongoose = require('mongoose');
const { MONGO_USER, MONGO_IP, MONGO_PORT, MONGO_PASSWORD } = require('./config/config');


const postRouter = require("./routes/postRoutes")
const app = express()

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`

const connectWithRetry = () => {
    mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
  })
  .then(()=>console.log("succesfully connected to database"))
  .catch((e)=>{
    console.log(e)
    setTimeout(connectWithRetry, 5000)
    //not a the best practice
})

}

connectWithRetry()

app.use(express.json());

app.get("/", (req, res) => {
    res.send("<h2>Hi there!!!</h2>")
})

app.use("/api/v1/posts", postRouter)

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`listening on port ${port}`))