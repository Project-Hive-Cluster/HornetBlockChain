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
      try {
        await blockChain.create({
          _firstname: faker.name.firstName(),
          _lastname: faker.name.lastName(),
          _email: faker.internet.email(),
          _contact: faker.phone.number("#### ######"),
          _password: faker.internet.password(),
          _body: JSON.stringify({
            DOB: faker.date.birthdate(),
            Addr: faker.address.city(),
          }),
        })
      } catch (err) {
        console.log("Error injecting fake data :>> ", err)
        return "Error injecting fake data: " + err
      }
      console.log("Success", count - i)
    }
    return "Success"
  } catch (err) {
    console.log("Error Creating fake data :>> ", err)
    return "Error Creating fake data : " + err
  }
}

export const faketr = async (
  count: number,
  amount: number = 100,
  load: boolean = true
) => {
  try {
    console.log("first", count)

    const wallet = await prisma.hiveSchema.findMany({
      select: { walletid: true },
    })
    for (let i = 0; i < count; i++) {
      const keys: any = Object.keys(wallet)

      let randomKey: number = keys[Math.floor(Math.random() * keys.length)]
      let walletone: any = wallet[randomKey]
      walletone = walletone.walletid

      randomKey = keys[Math.floor(Math.random() * keys.length)]
      let wallettwo: any = wallet[randomKey]
      wallettwo = wallettwo.walletid

      if (load) {
        const randomValue = await vartix.make(
          "0000000000000000",
          wallettwo,
          amount,
          "Fund transfer"
        )
        console.log("Count :" + i, "Log :", randomValue)
      } else {
        const randomValue = await vartix.make(
          walletone,
          wallettwo,
          amount,
          "Fund transfer"
        )
        console.log("Count :" + i, "Log :", randomValue)
      }
    }
    return "success"
  } catch (err) {
    console.log("Error Creating fake data :>> ", err)
    return "Error Creating fake data : " + err
  }
}
