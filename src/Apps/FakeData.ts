import { faker } from "@faker-js/faker"
import { PrismaClient } from "@prisma/client"
import BlockChain from "./Blockchain"
import Vartix from "./Vartix"
const vartix = new Vartix()

const prisma = new PrismaClient()
const blockChain = new BlockChain()

export const dataGen = async (count: number) => {
  try {
    for (let i = 0; i < count; i++) {
      await blockChain.create({
        _firstname: faker.name.firstName(),
        _lastname: faker.name.lastName(),
        _email: faker.internet.email(),
        _contact: faker.phone.number(),
        _password: faker.internet.password(),
        _body: JSON.stringify({
          DOB: faker.date.birthdate(),
          Addr: faker.address.city(),
        }),
      })
    }
    return await prisma.hiveSchema.findMany({
      select: { id: true, walletid: true },
    })
  } catch (err) {
    console.log("Error Creating fake data :>> ", err)
    return "Error Creating fake data : " + err
  }
}

// export const faketr = async (count:number) => {
//   try {
//     const wallet = await prisma.hiveSchema.findMany({
//       select: { walletid: true },
//     })
//     for (let i = 0; i < count; i++) {

//     const keys: any = Object.keys(wallet)
//     let randomKey: number = keys[Math.floor(Math.random() * keys.length)]
//       let walletone = wallet[randomKey]
//     randomKey = keys[Math.floor(Math.random() * keys.length)]
//     let wallettwo = wallet[randomKey]
//       const amount: 100;
//     const randomValue =  await vartix.make(walletone, wallettwo, amount, "Fund transfer",)

//     // await prisma.hiveSchema.findMany()
//     return randomValue
//   } catch (err) {
//     console.log("Error Creating fake data :>> ", err)
//     return "Error Creating fake data : " + err
//   }
// }
