import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
import crypto from "crypto"

class Vartix {
  constructor() {}

  make = async (
    _from: string,
    _to: string,
    _amount: number,
    _body: any = undefined
  ) => {
    try {
      /*  Initialize Depanded variable */
      console.log("*//> Accessing Initialize Block")
      if (!_from || !_to || !_amount) {
        return "Value must not be a null"
      }
      if (_amount >= 0 && _amount == undefined) {
        return "Balance cannot be less than 1"
      }

      /* Veriables */
      // **To
      let to_temp_block: any = undefined
      const inNode: any = await this.lastHash(_to)
      let to_balance: number = 0
      let to_hash: string
      // ** From
      let from_temp_block: any = undefined
      let from_balance: number = 0
      const outNode: any = await this.lastHash(_from)
      let from_hash: string
      // ** mics
      const trno = await this.mktrno()
      const date = new Date()
      const timestamp: any = date.toString()

      /*************************************

        geting blocks and balance 
      
      ***************************************/
      console.log("*//> Accessing Schema Block")

      try {
        to_temp_block = await prisma.vertixSchema.findFirst({
          where: {
            walletid: _to,
          },
          orderBy: {
            walletid: "desc",
          },
        })

        from_temp_block = await prisma.vertixSchema.findFirst({
          where: {
            walletid: _from,
          },
          orderBy: {
            walletid: "desc",
          },
        })

        if (!to_temp_block || to_temp_block === null) {
          console.log("to_temp_block is found null")

          to_temp_block = await prisma.hiveSchema.findFirst({
            where: {
              walletid: _to,
            },
          })
        }

        if (!from_temp_block) {
          console.log("from_temp_block is found null")
          from_temp_block = await prisma.hiveSchema.findFirst({
            where: {
              walletid: _from,
            },
          })
        }
      } catch (e) {
        return "Error getting schema data" + e
      }
      /* 
      -----------------------------------------
                  Getting Balance
      -----------------------------------------
      */
      console.log("*//> Accessing Balance Block")
      try {
        to_balance = await this.balance(_to)
        from_balance = await this.balance(_from)
        console.log("to_balance", to_balance)
        console.log("from_balance", from_balance)
      } catch (e) {
        console.log("Error getting balance. ", e)
      }

      /* 
      -----------------------------------------
                  Balance check 
      -----------------------------------------
      */
      console.log("*//> Accessing Balance Check Block")
      if (_from != "0000000000000000") {
        if (from_balance <= 0)
          return "Insufficient Balance. Balance:" + from_balance
        if (from_balance - _amount == 0)
          return "Insufficient Balance. Balance:" + from_balance
      } else {
        console.log("Msg://> Balance Check Ignored")
      }

      /* 
      -----------------------------------------
                  Hashing 
      -----------------------------------------
      */
      console.log("*//> Accessing Hash relocated Block")

      const from_ref: any = from_temp_block.hash
      console.log("Out://> Hash From:", from_ref)

      const to_ref: any = to_temp_block.hash
      console.log("Out://> Hash To:", to_ref)

      if (
        !_from ||
        !from_ref ||
        !to_ref ||
        !timestamp ||
        !_amount ||
        !_to ||
        !_body
      ) {
        console.log(
          "Msg://> Veriable: _from",
          _from,
          "</ from_ref >",
          from_ref,
          "</ to_ref>",
          to_ref,
          "</ timestamp>",
          timestamp,
          "</ _amount>",
          _amount,
          "</ _to>",
          _to,
          "</ _body>",
          _body
        )
        console.log("Error not enough veriable fro hasing operation.")
        return "Error not enough veriable fro hasing operation."
      } else {
        console.log("*//> Accessing Hashing  Block")

        from_hash = await this.V_hashing(
          _from,
          from_ref,
          timestamp,
          _amount,
          _to,
          _from,
          _body
        )

        to_hash = await this.V_hashing(
          _to,
          to_ref,
          timestamp,
          _amount,
          _from,
          _to,
          _body
        )

        // console.log("hash", to_hash)
      }

      // if body null

      _body ? _body : `Transfer from ${_from} to ${_to} at ${timestamp}`

      /*   
      -----------------------------------------
                  block data 
      ----------------------------------------- 
      */
      console.log("*//> Accessing Hash Data.")
      const _data = [
        {
          walletid: _from,
          transaction_no: trno.toString(),
          transaction_count: 1,
          timestamp: timestamp,
          ref: from_ref,
          edge_in: _to.toString(),
          edge_out: _from.toString(),
          hash: from_hash,
          debit: _amount,
          credit: 0,
          body: _body,
        },
        {
          walletid: _to,
          transaction_no: trno.toString(),
          transaction_count: 2,
          timestamp: timestamp,
          ref: to_ref,
          edge_in: _from.toString(),
          edge_out: _to.toString(),
          hash: to_hash,
          debit: 0,
          credit: _amount,
          body: _body,
        },
      ]

      try {
        try {
          console.log("*//> Updateing Vartix Data.")
          await prisma.vertixSchema.createMany({
            data: _data,
          })
        } catch (e) {
          console.log("Error//: error while updating vartix" + e)
        }
        try {
          console.log("*//> Updateing Hive Data for sender.")
          const hive_to_block = await prisma.hiveSchema.findFirst({
            where: { walletid: _to },
          })

          const to_temp_amount = hive_to_block?.amount
            ? hive_to_block.amount + _amount
            : _amount

          await prisma.hiveSchema.updateMany({
            where: { walletid: _to },
            data: { amount: { set: to_temp_amount } },
          })
          await prisma.hiveSchema.updateMany({
            where: { walletid: _to },
            data: { amount: { set: to_temp_amount } },
          })
        } catch (e) {
          console.log("Error//: error while updating hive for sender" + e)
        }

        try {
          console.log("*//> Updateing Hive Data for reciver.")
          const hive_from_block = await prisma.hiveSchema.findFirst({
            where: { walletid: _to },
          })

          const from_temp_amount = hive_from_block?.amount
            ? hive_from_block.amount - _amount
            : _amount

          await prisma.hiveSchema.updateMany({
            where: { walletid: _from },
            data: { amount: { set: from_temp_amount } },
          })
        } catch (e) {
          console.log("Error//: error while updating hive for reciver" + e)
        }

        const _balance = await this.balance(_to)
        return "Success TRNo" + trno + ", Balance: " + _balance
      } catch (err) {
        console.error("Error during create many data for vartix: " + err)
      }
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
      balance = balance - block[i].debit
      balance = balance + block[i].credit
    }
    console.log(`Balance for ${walletid} : ` + balance)
    return balance
  }

  /*
  Last function
  */

  statment = async (walletid: string) => {
    try {
      let block: any = await prisma.vertixSchema.findMany({
        select: {
          timestamp: true,
          debit: true,
          credit: true,
          transaction_no: true,
          edge_out: true,
          body: true,
        },
        where: { walletid: walletid },
        orderBy: {
          walletid: "desc",
        },
      })
      console.log("Statment Data", block)
      return block
    } catch (err) {
      console.log("Error while geting lash hash", err)
      return "Error Last Hash " + err
    }
  }
  /*
  Last function
  */

  lastHash = async (walletid: string) => {
    try {
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
    } catch (err) {
      console.log("Error while geting lash hash", err)
      return "Error Last Hash " + err
    }
  }

  /*
  Hash function
  */

  V_hashing(
    walletid: string,
    ref: string,
    timestamp: any,
    amount: number,
    nodein: string,
    nodeout: string,
    body: any
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        const _hashData = JSON.stringify(
          walletid + ref + timestamp + amount + nodein + nodeout + body
        )
        const hash = crypto.createHash("sha256")
        hash.on("readable", () => {
          const data = hash.read()
          if (data) {
            resolve(data.toString("hex"))
          } else {
            reject(new Error("Unable to create hash"))
          }
        })
        hash.write(_hashData)
        hash.end()
      } catch (err) {
        console.log("Error while hasing", err)
        return "Error Hashing " + err
      }
    })
  }

  /*
  Sleep function
  */

  sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
}

export default Vartix
