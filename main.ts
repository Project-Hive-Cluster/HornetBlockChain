import express from "express"
import path from "path"
import cookieParser from "cookie-parser"
import logger from "morgan"
import cors from "cors"

//Route configuration
const usersRouter = require("./src/routes/user_routes")
const vartixRouter = require("./src/routes/vartix_routes")
const blockChainRouter = require("./src/routes/blockchain_routes")
const walletRouter = require("./src/routes/wallet_routes")

require("dotenv").config()
// Optations
const corsOptions = {
  origin: "*",
}

// Add on
const app = express()
app.use(cors(corsOptions))
app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())


// app.use("/", walletRouter)
// app.use("/auth", usersRouter)
app.use("/blockchain", blockChainRouter)
// app.use("/vartix", vartixRouter)


app.get("/*", async (res:any) => {
  res.send(404,{ Error: "Invalid Address" })
})

export default app
