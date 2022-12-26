import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
import crypto from "crypto"

class BlockChain {
  constructor() {}

  initialize = async () => {
    try {
      let publicKey: any = undefined
      let privateKey: any = undefined

      // Calling crypto.generateKeyPair() method
      crypto.generateKeyPair(
        "ec",
        {
          namedCurve: "secp256k1", // Options
          publicKeyEncoding: {
            type: "spki",
            format: "der",
          },
          privateKeyEncoding: {
            type: "pkcs8",
            format: "der",
          },
        },
        (err, _publicKey, _privateKey) => {
          // Callback function
          if (!err) {
            publicKey = _publicKey.toString("hex")
            privateKey = _privateKey.toString("hex")
          } else {
            console.log("Errr in Key Pair: ", err)
          }
        }
      )
      await prisma.hiveSchema.deleteMany()

      let genesisBlock: object = {}
      const _body = JSON.stringify({
        Titel: "Genesis",
        Data: "Genesis Block",
        Auther: "Tanbin Hassan Bappi",
      })
      try {
        if (privateKey || privateKey) {
          genesisBlock = await prisma.hiveSchema.create({
            data: {
              walletid: "0000000000000000",
              walletkey: privateKey,
              ref: "this_root",
              hash: "root",
              body: _body,
              amount: 0,
              signatue: "Invalid signature",
              owner: {
                create: {
                  key: publicKey,
                  firstname: "Haxrei",
                  lastname: "Root",
                  email: "hivecluster@haxrei.com",
                  contact: "+8801611774234",
                  password: "null",
                  status: "A",
                  wallets: "0000000000000000",
                },
              },
            },
          })
          await prisma.$disconnect()
          return genesisBlock
        } else {
          return { Error: "PrivateKey or PrivateKey missing" }
        }
      } catch (err: any) {
        console.error("Error updating Blockchain initialize: ", err)
        const error = new Error(err)
        let propertyNames: any = Object.getOwnPropertyNames(error)
        let descriptor: any
        for (let property, i = 0, len = propertyNames.length; i < len; ++i) {
          property = propertyNames[i]
          descriptor = Object.getOwnPropertyDescriptor(error, property)
          console.log(property, descriptor)
        }
        return JSON.stringify(descriptor)
      }
    } catch (err: any) {
      console.error("Error in Blockchain Initialize: ", err)
      const error = new Error(err)
      let propertyNames: any = Object.getOwnPropertyNames(error)
      let descriptor: any
      for (let property, i = 0, len = propertyNames.length; i < len; ++i) {
        property = propertyNames[i]
        descriptor = Object.getOwnPropertyDescriptor(error, property)
        console.log(property, descriptor)
      }
      return JSON.stringify(descriptor)
    }
  }
  create = async ({
    _firstname,
    _lastname,
    _email,
    _contact,
    _password,
    _body = undefined,
  }: any) => {
    try {
      /*  Initialize Depanded variable */

      let walletid: any = undefined
      let pre_block: any = undefined
      let _Hash: any = undefined
      let publicKey: any = undefined
      let privateKey: any = undefined
      let refBlock: any = undefined

      // Calling crypto.generateKeyPair() method
      crypto.generateKeyPair(
        "ec",
        {
          namedCurve: "secp256k1", // Options
          publicKeyEncoding: {
            type: "spki",
            format: "der",
          },
          privateKeyEncoding: {
            type: "pkcs8",
            format: "der",
          },
        },
        (err, _publicKey, _privateKey) => {
          // Callback function
          if (!err) {
            publicKey = _publicKey.toString("hex")
            privateKey = _privateKey.toString("hex")
          } else {
            console.log("Errr in Key Pair: ", err)
          }
        }
      )

      /* Key took time something JS not giving there for we make it wait */
      // await this.sleep(1000) //3000ms = 3 seconds

      let Block: object = {}

      try {
        pre_block = await prisma.hiveSchema.findFirst({
          distinct: ["walletid"],
          orderBy: {
            walletid: "desc",
          },
        })

        let temp_walletid = pre_block.walletid
        if (temp_walletid.toString() === "0000000000000000") {
          walletid = "1778500000000001"
          refBlock = pre_block.hash
        } else {
          temp_walletid = parseInt(temp_walletid)
          temp_walletid = temp_walletid + 1
          walletid = temp_walletid.toString()
          refBlock = pre_block.hash
        }
      } catch (e) {
        return "Error creating walletid" + e
      }

      /** Hashing Previous Block
       */

      try {
        const hashData = JSON.stringify(
          pre_block.walletid +
            pre_block.ref +
            pre_block.timestamp +
            pre_block.body
        )
        _Hash = await crypto
          .createHash("sha256")
          .update(hashData, "utf8")
          .digest("hex")

        _password = crypto
          .createHash("sha256")
          .update(_password, "utf8")
          .digest("hex")
      } catch (e) {
        return "Error creating Hash: " + e
      }
      /* Key took time something JS not giving there for we make it wait */

      try {
        if (privateKey || privateKey) {
          Block = await prisma.hiveSchema.create({
            data: {
              walletid: walletid,
              walletkey: privateKey,
              ref: refBlock,
              hash: _Hash,
              body: _body,
              amount: 0,
              signatue: undefined,
              owner: {
                create: {
                  key: publicKey,
                  firstname: _firstname,
                  lastname: _lastname,
                  email: _email,
                  contact: _contact,
                  password: _password,
                  status: "A",
                  wallets: walletid,
                },
              },
            },
          })
          await prisma.$disconnect()
          return Block
        } else {
          return { Error: "PrivateKey or PrivateKey missing" }
        }
      } catch (err) {
        console.error(err)
      }
    } catch (err) {
      console.error("Creat Hash Function error: " + err)
    }
  }

  validateChain = async () => {
    const chain = await prisma.hiveSchema.findMany()

    for (let i = 1; i < chain.length; i++) {
      const currentBlock = chain[i]
      const previousBlock = chain[i - 1]

      // Verify that the previous block hash stored in the current block
      // matches the actual hash of the previous block
      if (currentBlock.ref !== previousBlock.hash) {
        return "Chain is invalid: Current block and reference block do not match"
      }

      const hashData = JSON.stringify(
        currentBlock.walletid +
          currentBlock.ref +
          currentBlock.timestamp +
          currentBlock.body
      )

      const calculateBlockHash = await crypto
        .createHash("sha256")
        .update(hashData, "utf8")
        .digest("hex")
      // Verify that the current block has not been tampered with
      // by checking the hash of the block itself

      if (currentBlock.hash !== calculateBlockHash) {
        console.log(currentBlock.id)
        console.log(currentBlock.hash, " _><_ ", calculateBlockHash)
        return "Chain is invalid: Current block Hash do not match"
      }
      console.log(currentBlock)
    }

    return true

    // let blockchain_arr: object[] = [_blocks]

    // _blocks.map(async ({ ref, hash, walletid, timestamp, body }: any) => {
    //   blockChain.push({
    //     "Previous Block": ref,
    //     "Current Block": hash,
    //     wid: walletid,
    //     time: timestamp,
    //     body: body,
    //   })

    // const hashData = JSON.stringify(walletid + ref + hash + timestamp + body)
    // if (walletid === "0000000000000000") {
    //   previous_Hash = await crypto
    //     .createHash("sha256")
    //     .update(hashData, "utf8")
    //     .digest("hex")
    // } else if (previous_Hash === hash) {
    //   previous_Hash = await crypto
    //     .createHash("sha256")
    //     .update(hashData, "utf8")
    //     .digest("hex")
    // } else {
    //   return "Block Invalid"
    // }
    // })

    // console.log("object :>> ", _blocks)
    // return _blocks
  }

  sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
}

export default BlockChain
