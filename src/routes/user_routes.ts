import express from "express"
const router = express.Router()


import * as jwt from "jsonwebtoken"
import Wallet from "../Apps/wallet"
const wallet = new Wallet()

router.post("/auth", async (req, res) => {
  try {
    const { username, password } = req.body
    const auth = await wallet.auth(username, password)
    if (!auth) {
      res.send("Invalid username or password")
    } else {
      const token = jwt.sign({ username }, "774264srgtysbtgsg4598bst")
      res.send({ token })
    }
  } catch (err) {
    console.log("Ërror:// Error in auth", err)
    res.send(err)
  }
})
