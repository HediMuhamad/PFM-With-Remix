import { useLoaderData } from "@remix-run/react"
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
import Modal from "~/components/modal"
import StatisticCard from "~/components/statistic-card"
import Transaction from "~/components/transaction"
import Button from "~/components/button"

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
  //Loader Related
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

  //User Interface Related
  const [noteValue, setNoteValue] = useState("")
  const [isModalShowed, setIsModalShowed] = useState(false)

  const noteValueChangedHandler = useCallback(
    (e) => {
      let newValue = e.target.value.replace(
        all_space_newline_tab_verticaltab_from_start,
        ""
      )
      newValue = newValue.length > 350 ? noteValue : newValue
      setNoteValue(newValue)
    },
    [noteValue]
  )

  return (
    <div className="overview-page">
      {isModalShowed ? (
        <Modal
          onCloseClickHandler={() => {
            setIsModalShowed(false)
          }}
          headline="Add Transaction"
        ></Modal>
      ) : (
        ""
      )}
      <div className="overview-page__card-list">
        <StatisticCard
          statisticCardTitle="income"
          key={"income"}
          statisticCardAmount={income.total}
          statisticCardVariant="info"
        />
        <StatisticCard
          statisticCardTitle="balance"
          key={"balance"}
          statisticCardAmount={income.total - expense.total}
          statisticCardVariant="secondary"
        />
        <StatisticCard
          statisticCardTitle="expense"
          key={"expense"}
          statisticCardAmount={expense.total}
          statisticCardVariant="danger"
        />
      </div>
      <div className="overview-page__transaction-list">
        <h1 className="overview-page__transaction-list__header">This Week</h1>
        <div className="overview-page__transaction-list__content">
          {transactions.map(({ id, note, amount, date, category }) => {
            return (
              <Transaction
                key={id}
                transactionCategory={category.name}
                transactionType={category.type}
                transactionTitle={note}
                transactionAmount={amount}
                transactionDate={new Date(date)}
              />
            )
          })}
        </div>
      </div>
      <div className="overview-page__button-list">
        <Button
          buttonVariant={"primary"}
          buttonSize={"large"}
          buttonType={"normal"}
          className={"overview-page__button-list__add-transaction-button"}
          onClick={() => setIsModalShowed(true)}
        >
          Add Transaction
        </Button>
      </div>
    </div>
  )
}
