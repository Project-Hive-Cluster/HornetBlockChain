import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
import crypto from "crypto"

class BlockChain {
  constructor() {}

  initialize = async () => {
    const date = new Date()
    const timestamp: string = date.toString()

    try {
      const [publicKey, privateKey] = await this.generateKeyPair()
      // console.log("====privateKey=> ", privateKey)
      // console.log("====publicKey=> ", publicKey)

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
              timestamp: timestamp,
              ref: "genesis",
              hash: "genesis block",
              body: _body,
              amount: 0,
              signatue: "Invalid signature",
              owner: {
                create: {
                  key: publicKey,
                  firstname: "Haxrei",
                  lastname: "Genesis",
                  email: "hivecluster@haxrei.com",
                  contact: "+8801611774234",
                  password: "null",
                  status: "active",
                  UserSchemakey: "0000000000000000",
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

  /*  Block Ganarator*/

  create = async ({
    _firstname,
    _lastname,
    _email,
    _contact,
    _password,
    _body = undefined,
  }: any) => {
    try {
      const verification = await this.validateChain()

      if (verification != true) {
        return verification
      }

      /*  Initialize Depanded variable */
      const date = new Date()
      const timestamp: any = date.toString()
      /* Date is vidal as it need to add in the hash*/
      let walletid: any = undefined
      let pre_block: any = undefined
      let _Hash: any = undefined

      let refBlock: any = undefined

      /*
      In TypeScript, you can use the crypto module to generate key pairs for use with public-key cryptography.
      
      The crypto module provides a number of functions for generating and manipulating key pairs, including generateKeyPair(), which generates a public-private key pair. Here's an example of how you might use this function:
      */

      const [publicKey, privateKey] = await this.generateKeyPair()

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
      let password: string = ""
      try {
        _Hash = await this.hashing(walletid, refBlock, timestamp, _body)
        password = crypto.createHash("sha256").update(_password).digest("hex")

        /*
        This code generates a SHA-256 hash of the string 'hashData', and encodes the result as a hexadecimal string.
        You can use different hash algorithms by specifying a different algorithm name as the first argument to createHash(). For example, you can use 'sha1' to generate a SHA-1 hash, or 'md5' to generate an MD5 hash.
        You can also use the update() and digest() functions to hash data in chunks, rather than all at once. This can be useful if you are working with very large datasets that cannot fit in memory all at once.
        I hope this helps give you an idea of how to use the crypto module to generate hashes in TypeScript! Let me know if you have any questions.
        
        */
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
              timestamp: timestamp,
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
                  password: password,
                  plane_passwd: _password,
                  status: "A",
                  UserSchemakey: walletid,
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

      const calculateBlockHash = await this.hashing(
        currentBlock.walletid,
        previousBlock.hash,
        currentBlock.timestamp,
        currentBlock.body
      )

      if (currentBlock.hash !== calculateBlockHash) {
        return `Chain is invalid. Current block Hash do not match. Error Block ${currentBlock.walletid}`
      }
    }

    return true
  }

  generateKeyPair(): Promise<[any, any]> {
    return new Promise((resolve, reject) => {
      const options = {
        modulusLength: 4096,
        publicKeyEncoding: {
          type: "spki",
          format: "pem",
        },
        privateKeyEncoding: {
          type: "pkcs8",
          format: "pem",
        },
      }

      crypto.generateKeyPair("rsa", options, (err, publicKey, privateKey) => {
        if (err) {
          reject(err)
        } else {
          resolve([publicKey, privateKey])
        }
      })
    })
  }

  sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

  hashing(
    walletid: string,
    ref: string,
    timestamp: any,
    body: any
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const _hashData = JSON.stringify(walletid + ref + timestamp + body)
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
    })
  }
}

export default BlockChain
