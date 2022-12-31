import express from "express"
const router = express.Router()
import Wallet from "../Apps/wallet"
const wallet = new Wallet()

router.post("/auth", async (req, res) => {
  try {
    const { username, password } = req.body
      const data = await wallet.auth(username, password)
      res.send(data)
  } catch (err) {
    console.log("Ërror:// Error in auth", err)
    res.send("Ërror:// Error in auth"+ err)
  }
})
router.post("/passwd_reset", async (req, res) => {
  try {
    const { username, password,new_password } = req.body
      const data = await wallet.password_reset(username, password,new_password)
      res.send(data)
  } catch (err) {
    console.log("Ërror:// Error in auth", err)
    res.send("Ërror:// Error in auth"+ err)
  }
})


module.exports = router
