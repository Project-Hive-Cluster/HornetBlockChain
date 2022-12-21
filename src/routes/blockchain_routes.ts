import express from "express"
const router = express.Router()
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


/* GET users listing. */
router.get("/get", async (req, res) => {
    const output = await prisma.hiveSchema.count()
    console.log('output :>> ', output);
  res.send(output)
})




module.exports = router;