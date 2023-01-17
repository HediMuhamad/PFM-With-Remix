import { db } from "./db.server"

export async function deleteOneCategory() {
  return await db.category.delete({
    where: {
      name: "BILLS",
    },
  })
}

export async function deleteManyCategory() {
  return await db.category.deleteMany({
    where: {
      name: {
        in: ["LOAN", "BILLS", "SPORTS"],
      },
    },
  })
}

export async function readOneCategory() {
  return await db.category.findFirst({})
}

export async function readManyCategory() {
  return await db.category.findMany({ take: 3 })
}

export async function addOneCategory(name = "SOMETHING", type = "INCOME") {
  return await db.category.create({
    data: {
      name,
      type,
    },
  })
}

// NOT SUPPORTED IN SQLite, I'LL DISABLE IT.
export async function addManyCategory(
  data = [
    { name: "GAME_1", type: "INCOME" },
    { name: "GAME_2", type: "INCOME" },
    { name: "GAME_3", type: "EXPENSE" },
  ]
) {
  return await db.category.createMany({
    data,
  })
}

export async function deleteOneTransaction() {
  const { id } = await readOneTransaction()
  return await db.transaction.delete({
    where: {
      id,
    },
  })
}

export async function deleteManyTransaction() {
  return await db.transaction.deleteMany({
    where: {
      amount: { lt: 75 },
    },
  })
}

export async function readOneTransaction() {
  return await db.transaction.findFirst({})
}

export async function readManyTransaction() {
  return await db.transaction.findMany({ take: 3 })
}

export async function addOneTransaction(
  note = "Buying a new phone",
  categoryId,
  date = new Date("10/4/2015"),
  amount = 1_000
) {
  const { id } = await readOneCategory()
  categoryId = categoryId ? categoryId : id
  return await db.transaction.create({
    data: {
      note,
      categoryId,
      date,
      amount,
    },
  })
}

// NOT SUPPORTED IN SQLite, I'LL DISABLE IT.
export async function addManyTransaction(
  data = [
    {
      note: "Buying a new phone",
      category: "TECH",
      date: new Date("10/4/2015"),
      amount: 1_000,
    },
    {
      note: "Peanut",
      category: "FOOD",
      date: new Date("8/2/1999"),
      amount: 10,
    },
    {
      note: "Birthday Gift",
      category: "GIFT",
      date: new Date(),
      amount: 75,
    },
  ]
) {
  return await db.transaction.create({
    data,
  })
}

export default async function checkAll() {
  console.log("deleteOneCategory", await deleteOneCategory())
  console.log("deleteManyCategory", await deleteManyCategory())
  console.log("readOneCategory", await readOneCategory())
  console.log("readManyCategory", await readManyCategory())
  console.log("addOneCategory", await addOneCategory())
  // console.log("addManyCategory", await addManyCategory())
  console.log("deleteOneTransaction", await deleteOneTransaction())
  console.log("deleteManyTransaction", await deleteManyTransaction())
  console.log("readOneTransaction", await readOneTransaction())
  console.log("readManyTransaction", await readManyTransaction())
  console.log("addOneTransaction", await addOneTransaction())
  // console.log("addManyTransaction", await addManyTransaction())
}

checkAll().then(() => {
  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  readline.question("NO ERROR DETECTED, PRESS ENTER TO EXIT:", () => {
    readline.close()
  })
})
