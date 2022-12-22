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
      await crypto.generateKeyPair(
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
        async (err, _publicKey, _privateKey) => {
          // Callback function
          if (!err) {
            publicKey = await _publicKey.toString("hex")
            privateKey = await _privateKey.toString("hex")
          } else {
            console.log("Errr in Key Pair: ", err)
          }
        }
      )
      await this.sleep(3000)
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
      } catch (err) {
        console.error(err)
      }
    } catch (err) {
      console.error(err)
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
      await crypto.generateKeyPair(
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
        async (err, _publicKey, _privateKey) => {
          // Callback function
          if (!err) {
            publicKey = await _publicKey.toString("hex")
            privateKey = await _privateKey.toString("hex")
          } else {
            console.log("Errr in Key Pair: ", err)
          }
        }
      )

      /* Key took time something JS not giving there for we make it wait */
      await this.sleep(1000) //3000ms = 3 seconds

      let Block: object = {}

      try {
        pre_block = await prisma.hiveSchema.findFirst({
          distinct: ["walletid"],
          orderBy: {
            walletid: "desc",
          },
        })
        await this.sleep(1000)

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
            pre_block.hash +
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
      await this.sleep(1000) //3000ms = 3 seconds

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

  // verifyHash = async () => {
  //   const _blocks = await prisma.hiveSchema.findMany()
  //   _blocks.map(({ ref, hash, walletid, timestamp, body }:any) => {
  //     const hashData = JSON.stringify(walletid + ref + hash + timestamp + body)

  //     _Hash = await crypto
  //       .createHash("sha256")
  //       .update(hashData, "utf8")
  //       .digest("hex")
  //   })

  //   console.log("object :>> ", _blocks)
  //   return _blocks
  // }

  sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
}

export default BlockChain
