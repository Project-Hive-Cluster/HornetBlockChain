import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
import crypto from "crypto"

class Vartix {
  constructor() {}

  make = async ({ _from, _to, _amount, _body = undefined }: any) => {
    try {
      /*  Initialize Depanded variable */

      /* Veriables */
      // **To
      let to_temp_block: any = undefined
      const inNode: any = await this.lastHash(_to)
      let to_balance: number = 0
      // ** From
      let from_temp_block: any = undefined
      let from_balance: number = 0
      const outNode: any = await this.lastHash(_from)

      // ** mics
      const trno = await this.mktrno()
      const date = new Date()
      const timestamp: any = date.toString()
      /*************************************

        geting blocks and balance 
      
      ***************************************/

      try {
        if (_to != "00000000000000000") {
          to_temp_block = await prisma.vertixSchema.findFirst({
            where: {
              walletid: _to,
            },
            orderBy: {
              walletid: "desc",
            },
          })

          to_balance = await this.balance(_to)
        }
        if (_from != "00000000000000000") {
          from_temp_block = await prisma.vertixSchema.findFirst({
            where: {
              walletid: _from,
            },
            orderBy: {
              walletid: "desc",
            },
          })
          from_balance = await this.balance(_from)
        }
      } catch (e) {
        return "Error creating walletid" + e
      }

      /*   balance check   */
      if (_from != "0000000000000000") {
        if (from_balance <= 0) return "Insufficient Balance"
        if (from_balance - _amount == 0) return "Insufficient Balance"
      }


      /*  Hashing */



      /*   balance check   */

      const data = [{
  walletid:_from,
  transaction_no:trno,
  transaction_count:1
  timestamp:timestamp,
  ref: String,
  edge_in:to_temp_block.hash,
  edge_out:from_temp_block.hash,
  hash              String
  amount            Float
  body              String?
      }, {
  walletid          String
  transaction_id    String  @unique @default(uuid())
  transaction_no    String
  transaction_count Int
  timestamp         String  @default("Null")
  ref               String
  edge_in           String?
  edge_out          String?
  hash              String
  amount            Float
  body              String?
      }]

      // try {

      // } catch (err) {
      //   console.error("Creat Hash Function error: " + err)
      // }
    } catch (err) {
      console.error("Creat Hash Function error: " + err)
    }
  }

  mktrno = () => {
    return Date.now() + crypto.randomInt(7)
  }
  revurce = () => {
    return true
  }

  balance = async (walletid: string) => {
    const block = await prisma.vertixSchema.findMany({
      where: { walletid: walletid },
    })
    let balance: number = 0
    for (let i = 1; i < block.length; i++) {
      balance = balance + block[i].amount
    }
    return balance
  }
  lastHash = async (walletid: string) => {
    let block: any = await prisma.vertixSchema.findFirst({
      where: { walletid: walletid },
      orderBy: {
        walletid: "desc",
      },
    })
    if (block?.hash == null || block?.hash == undefined) {
      block = await prisma.hiveSchema.findFirst({
        where: { walletid: walletid },
      })
      return block?.hash
    }
    return block?.hash
  }

  sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
}

export default Vartix
