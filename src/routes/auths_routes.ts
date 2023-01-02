import express from "express"
const router = express.Router()
import Wallet from "../Apps/wallet"
const wallet = new Wallet()

router.post("/auth", async (req, res) => {
  try {
    const { username, password } = req.body
    const data = await wallet.auth(username, password)
    console.log(data[0])

    if (!data[0]) {
      res.send(data[1])
    } else {
      // Set the JWT and refresh token as cookies
      res.cookie("jwt", data[1])
      res.cookie("refreshToken", data[2], { httpOnly: true })
      res.send({ token: data[1], refreshToken: data[2] })
    }

    // res.send(data)
  } catch (err) {
    console.log("Ërror:// Error in auth", err)
    res.send("Ërror:// Error in auth" + err)
  }
})

router.post("/passwd_reset", async (req, res) => {
  try {
    const { username, password, new_password } = req.body
    const data = await wallet.password_reset(username, password, new_password)
    res.send(data)
  } catch (err) {
    console.log("Ërror:// Error in auth", err)
    res.send("Ërror:// Error in auth" + err)
  }
})

module.exports = router
