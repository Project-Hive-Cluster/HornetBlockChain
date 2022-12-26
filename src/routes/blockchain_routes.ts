import express from "express"
const router = express.Router()
import BlockChain from "../Apps/Blockchain"
import { dataGen } from "../Apps/FakeData"
const blockChain = new BlockChain()

/* GET users listing. */
router.get("/initialize", async (req, res) => {
  try {
    const output = await blockChain.initialize()
    res.send(output)
  } catch (err) {
    console.log("Error in initialize api :>> ", err)
    const errorMsg: string = JSON.stringify(err)
    res.status(404).json({ "Error Massage": errorMsg })
  }
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
router.post("/fillup", async (req, res) => {
  try {
    const output = await dataGen(req.body.number)
    res.send(JSON.stringify(output))
  } catch (err) {
    res.send(404)
  }
})
router.get("/validateChain", async (req, res) => {
  const output = await blockChain.validateChain()
  res.send(JSON.stringify(output))
})

module.exports = router
