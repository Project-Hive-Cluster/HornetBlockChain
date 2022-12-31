import express, { application } from "express"

import cookieParser from "cookie-parser"
import logger from "morgan"
import cors from "cors"

//Route configuration
const authRouter = require("./src/routes/auths_routes")
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

// Routes
app.use("/", authRouter)
app.use("/blockchain", blockChainRouter)
app.use("/vartix", vartixRouter)
// app.use("/wallet", walletRouter)

app.get("/*", (res: any) => {
  res.status(404).json({ Error: "Invalid Address" })
})

export default app
