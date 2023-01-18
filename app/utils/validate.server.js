import { db } from "./db.server"

export const validateCategory = async (categoryName) => {
  if (!categoryName) {
    return "Category not defined!"
  }

  const result = await db.category.findUnique({
    where: { name: categoryName },
    select: { id: true },
  })

  if (!result || !result.id) {
    return `Category with name: ${categoryName} not exist!`
  }

  return null
}

export const validateNote = (note) => {
  if (!note) {
    return "Note not defined!"
  }
  if (note.length < 10) {
    return `Note length should be greater than 10, the current length is ${note.length}`
  }
  if (note.length > 350) {
    return `Note have 350 character limitaion, the current length is ${note.length}`
  }
  return null
}

export const validateAmount = (amount) => {
  if (isNaN(amount)) {
    return `Amount is not a number`
  }
  if (amount < 0) {
    return `Amount value should be greater than or equal to Zero`
  }
  return null
}

export const validateDate = (date, afterDate, beforeDate) => {
  if (!date) {
    return "Date not exist!"
  }

  if (!(date instanceof Date)) {
    return "Date is not a type of Date object"
  }

  if (afterDate && afterDate > date) {
    return `Date should be came after ${afterDate}.`
  }

  if (beforeDate && beforeDate < date) {
    return `Date should be came after ${beforeDate}.`
  }
  return null
}
