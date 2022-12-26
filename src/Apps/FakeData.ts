import { faker } from "@faker-js/faker"
import { PrismaClient } from "@prisma/client"
import BlockChain from "./Blockchain"

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
    return await prisma.hiveSchema.findMany()
  } catch (err) {
    console.log("Error Creating fake data :>> ", err)
    return "Error Creating fake data : " + err
  }
}
