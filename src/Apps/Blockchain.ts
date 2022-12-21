import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

module.exports = class BlockChain {
  constructor() {}

  initialize = async () => {
    try {
      const _body = JSON.stringify({
        Titel: "Genesis",
        Data: "Genesis Block",
        Auther: "Tanbin Hassan Bappi",
      })
      let genesisBlock = {}
      const gBlockData = {
        walletid: "0000000000000000",
        walletkey: "genesis",
        ref: "this_root",
        hash: "root",
        body: _body,
        amount: 0,
        signatue: "Invalid signature",
      }
      try {
        genesisBlock = await prisma.hiveSchema.create({ gBlockData })
      } catch (err) {
        console.error(err)
      }
    } catch (err) {
      console.error(err)
    }
  }
}
