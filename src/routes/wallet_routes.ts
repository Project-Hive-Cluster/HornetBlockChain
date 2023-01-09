import express from "express"
const router = express.Router()
import Wallet from "../Apps/wallet"
const wallet = new Wallet()

router.post("/search", async (req, res) => {
  try {
    const data = await wallet.find_user_info(req.body.walletid)
    res.send(data)
  } catch (err) {
    console.log("Ërror:// Error in Wallet search", err)
    res.send("Ërror:// Error in Wallet search" + err)
  }
})

module.exports = router
