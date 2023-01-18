import { Form, useLoaderData } from "@remix-run/react"
import { useCallback, useMemo, useState } from "react"
import styles from "~/styles/pages/overview.page.css"
import { db } from "~/utils/db.server"
import {
  badRequest,
  internalServerError,
  succeedResponse,
} from "~/utils/http-statuses.server"
import { all_space_newline_tab_verticaltab_from_start } from "~/utils/regexes"
import extractTitle from "~/utils/title-from-note-extractor"
import {
  validateAmount,
  validateCategory,
  validateDate,
  validateNote,
} from "~/utils/validate.server"

export const links = () => {
  return [{ rel: "stylesheet", href: styles }]
}

/*
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */

export const loader = async () => {
  const transactions = await db.transaction.findMany({
    include: {
      category: true,
    },
    take: 10,
    orderBy: {
      date: "desc",
    },
  })

  const categories = await db.category.findMany()

  const cardData =
    await db.$queryRaw`SELECT type, sum(amount) as total FROM "Transaction" INNER JOIN "Category" ON "Transaction".categoryId = "Category".id GROUP BY type`

  return succeedResponse({ transactions, categories, cardData })
}

/*
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */

export const action = async ({ request }) => {
  const formData = await request.formData()
  const fields = Object.fromEntries(formData)
  const category = JSON.parse(fields.category)[0]
  const date = new Date(JSON.parse(fields.date))
  const amount = +fields.amount
  const note = fields.note.replace(
    all_space_newline_tab_verticaltab_from_start,
    ""
  )
  const title = extractTitle(note.split("\n")[0])

  const fieldErrors = {
    category: await validateCategory(category),
    date: validateDate(date),
    amount: validateAmount(amount),
    note: validateNote(note),
  }

  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({
      fields,
      fieldErrors,
    })
  }

  try {
    const { id: categoryId } = await db.category.findUnique({
      where: {
        name: category,
      },
    })

    await db.transaction.create({
      data: {
        title: title,
        note: note,
        date: date,
        amount: amount,
        categoryId: categoryId,
      },
    })
  } catch (e) {
    return internalServerError({
      message: "An error occurred while creating a new transaction.",
    })
  }

  return succeedResponse({})
}

/*
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */

export default function Overview() {
  const { transactions, categories, cardData } = useLoaderData()
  const { income, expense } = useMemo(() => {
    return cardData[0].type === "INCOME"
      ? {
          income: cardData[0],
          expense: cardData[1],
        }
      : {
          income: cardData[1],
          expense: cardData[0],
        }
  }, [cardData])

  const [noteValue, setNoteValue] = useState("")
  const noteValueChangedHandler = useCallback((e) => {
    let newValue = e.target.value.replace(
      all_space_newline_tab_verticaltab_from_start,
      ""
    )
    newValue = newValue.length > 350 ? noteValue : newValue
    setNoteValue(newValue)
  }, [])

  //Codes below this comment will remove in the process of adding real User Interface
  const [categoryValue, setCategoryValue] = useState([])

  return (
    <div className="overview-page">
      <h1>This is Overview Page</h1>
      <p>Backend data preview will be log to the browser console.</p>
      <br />
      <section>
        <h3>
          This is a simple form just for demonstrate
          <br /> the <code>Add Submission</code> Form
        </h3>
        <Form method="POST" className="form" reloadDocument={false}>
          {/* <select
            name="category"
            value={categoryValue}
            multiple={true}
            onChange={(e) => {
              setCategoryValue([e.target.value])
            }}
          >
            <option value={"SALARY"}>SALARY</option>
            <option value={"LOAN"}>LOAN</option>
            <option value={"GIFT"}>GIFT</option>
            <option value={"TECH"}>TECH</option>
            <option value={"FOOD"}>FOOD</option>
            <option value={"BILLS"}>BILLS</option>
            <option value={"SPORTS"}>SPORTS</option>
            <option value={"HEALTH"}>HEALTH</option>
            <option value={"CLOTHS"}>CLOTHS</option>
          </select>
          <input type={"date"} name="date" /> */}
          <input
            type={"hidden"}
            name="category"
            value={JSON.stringify(["SALARY"])}
          />
          <input
            type={"hidden"}
            name="date"
            value={JSON.stringify(new Date().toString())}
          />
          <input type={"number"} min={0} name="amount" defaultValue={100} />
          <textarea
            name="note"
            minLength={10}
            maxLength={350}
            value={noteValue}
            onChange={noteValueChangedHandler}
          />

          <button type="submit">Submit</button>
        </Form>
      </section>

      {/* {console.log({ transactions, categories, cardData: { income, expense } })} */}
    </div>
  )
}
