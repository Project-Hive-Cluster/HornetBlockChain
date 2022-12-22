import express from "express"
const router = express.Router()
import BlockChain from "../Apps/Blockchain"
const blockChain = new BlockChain()

/* GET users listing. */
router.get("/initialize", async (req, res) => {
  const output = await blockChain.initialize()
  console.log("output :>> ", output)
  res.send(output)
})
router.post("/create", async (req, res) => {
  const { firstname, lastname, email, contact, password, body } = req.body

  const output = await blockChain.create({
    _firstname: firstname,
    _lastname: lastname,
    _email: email,
    _contact: contact,
    _password: password,
    _body: JSON.stringify(body),
  })
  console.log("output :>> ", output)
  res.send(output)
})
router.get("/test", async (req, res) => {
  const output = await blockChain.verifyHash()
  console.log("output :>> ", output)
  res.send(output)
})

module.exports = router
