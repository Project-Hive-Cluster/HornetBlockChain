import express from "express"
const router = express.Router()
import Vartix from "../Apps/Vartix"
import moment from "moment"
const vartix = new Vartix()
// import { dataGen } from "../Apps/FakeData"

router.post("/load", async (req, res) => {
  try {
    let { walletid, amount, body } = req.body
    body = JSON.stringify(body)
    const from = "0000000000000000"
    console.log(req)
    const output = await vartix.make(from, walletid, amount, body)
    res.send("Massage:" + output)
  } catch (err) {
    console.log("Ërror://", err)
    res.send(err)
  }
})

router.post("/create", async (req, res) => {
  try {
    console.log(req.body)
    let { from, to, amount, body } = req.body
    body = JSON.stringify(body)
    const output = await vartix.make(from, to, amount, body)
    res.send(output)
  } catch (err) {
    console.log("Ërror://", err)
    res.send(err)
  }
})
router.post("/look", async (req, res) => {
  try {
    let { walletid } = req.body
    const output = await vartix.look(walletid)
    res.send(output)
  } catch (err) {
    console.log("Ërror://", err)
    res.send(err)
  }
})

router.post("/balance", async (req, res) => {
  try {
    const output = await vartix.balance(req.body.walletid)
    res.send({ Balance: output })
  } catch (err) {
    console.log("Ërror://", err)
    res.send(err)
  }
})

router.post("/statment_period", async (req, res) => {
  try {
    const { from, to, walletid } = req.body
    console.log(req.body)
    const fromDate = moment(from).format("DD-MM-YYYY").toString()
    const toDate = moment(to).format("DD-MM-YYYY").toString()
    console.log(fromDate, toDate)

    const output = await vartix.statment_period(walletid, fromDate, toDate)
    console.log(output)
    res.send({ data: output })
  } catch (err) {
    console.log("Ërror://statment_period/", err)
    res.send(err)
  }
})
router.post("/statment", async (req, res) => {
  try {
    const output = await vartix.statment(req.body.walletid)
    res.send({ data: output })
  } catch (err) {
    console.log("Ërror://statment/ ", err)
    res.send(err)
  }
})

module.exports = router
