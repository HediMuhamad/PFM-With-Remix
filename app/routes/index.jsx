import PropTypes from "prop-types"
import { Form, useLoaderData, useTransition } from "@remix-run/react"
import { useCallback, useMemo, useState } from "react"
import overviewStyle from "~/styles/pages/overview.page.css"
import overviewModalStyle from "~/styles/pages/overview.modal.css"
import { db } from "~/utils/db.server"
import {
  badRequest,
  internalServerError,
  succeedResponse,
} from "~/utils/http-statuses.server"
import { all_space_newline_tab_verticaltab_from_start } from "~/utils/regexes"
import {
  extractTitle,
  extractCategory,
  extractDate,
} from "~/utils/extractors.server"
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
import DropDown from "~/components/drop-down"
import DatePicker from "~/components/date-picker"
import CurrencyInput from "~/components/currency-input"

export const links = () => {
  return [
    { rel: "stylesheet", href: overviewStyle },
    { rel: "stylesheet", href: overviewModalStyle },
  ]
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
    await db.$queryRaw`SELECT type, sum(amount) as total FROM "Transaction" INNER JOIN "Category" ON "Transaction"."categoryId" = "Category"."id" GROUP BY type`

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
  const category = extractCategory(fields.category)
  const date = extractDate(fields.date)
  const amount = +fields.amount
  const note =
    typeof fields.note == "string"
      ? fields.note.replace(all_space_newline_tab_verticaltab_from_start, "")
      : `A transaction in ${date ? date.toLocaleDateString() : null}`
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

function ModalContent({ categories, onDismissClicked }) {
  const transition = useTransition()
  const [formCategoryType, setFormCategoryType] = useState("INCOME")
  const [selectedCategory, setSelectedCategory] = useState([])
  const [formDate, setFormDate] = useState(null)
  const [formAmount, setFormAmount] = useState(0)
  const [noteValue, setNoteValue] = useState("")

  categories = useMemo(
    () =>
      categories.map((item) => {
        item.disabled = item.type !== formCategoryType
        return item
      }),
    [categories, formCategoryType]
  )

  const toggleOptionHandler = useCallback((key) => {
    setSelectedCategory([key])
  }, [])

  const radioButtonClickHandler = useCallback(
    (e) => {
      setFormCategoryType(e.target.value)
      setSelectedCategory([])
    },
    [setFormCategoryType]
  )

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
    <Form method="POST" className="form">
      <div>
        <label htmlFor="drop-down">Category</label>
        <DropDown
          nameInForm="category"
          dropDownOptions={categories}
          dropDownSelectedOptions={selectedCategory}
          dropDownToggleOptions={toggleOptionHandler}
        />
      </div>
      <div>
        <label htmlFor="date-picker">Date</label>
        <DatePicker
          datePickerDate={formDate}
          nameInForm="date"
          datePickerLabel="date"
          datePickerMaxDate={new Date()}
          datePickerOnAnOptionSelected={setFormDate}
        />
      </div>
      <div>
        <label htmlFor="amount">Amount</label>
        <CurrencyInput
          name="amount"
          currencyInputValue={formAmount + ""}
          currencyInputValueChangeHandler={(e) => {
            setFormAmount(e.target.value)
          }}
        />
      </div>
      <div>
        <label htmlFor="types">Type</label>
        <div className="form__type-radio-group">
          <span className="form__type-radio-group__radio">
            <input
              type="radio"
              name="type"
              value="INCOME"
              id="income"
              checked={formCategoryType == "INCOME"}
              onChange={() => {}}
              onClick={radioButtonClickHandler}
            />
            <label htmlFor="income">income</label>
          </span>
          <span className="form__type-radio-group__radio">
            <input
              type="radio"
              name="type"
              value="EXPENSE"
              id="expense"
              onChange={() => {}}
              checked={formCategoryType == "EXPENSE"}
              onClick={radioButtonClickHandler}
            />
            <label htmlFor="expense">expense</label>
          </span>
        </div>
      </div>
      <div className="form__note-container">
        <label htmlFor="note">Note</label>
        <textarea
          name="note"
          value={noteValue}
          onChange={noteValueChangedHandler}
          className="form__note-container__textarea"
        ></textarea>
      </div>

      <div className="form__button-list">
        <Button
          variant={"dark"}
          size={"large"}
          buttonType={"ghost"}
          onClick={onDismissClicked}
        >
          Dismiss
        </Button>
        <Button
          variant={"primary"}
          size={"large"}
          buttonType={"normal"}
          type={"submit"}
          className={"form__button-list__submit-button"}
        >
          {transition.state === "submitting"
            ? "Saving..."
            : transition.state === "loading"
            ? "Saved!"
            : "Add Transaction"}
        </Button>
      </div>
    </Form>
  )
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

  const [isModalShowed, setIsModalShowed] = useState(false)

  return (
    <div className="overview-page">
      {isModalShowed ? (
        <Modal
          onCloseClickHandler={() => {
            setIsModalShowed(false)
          }}
          headline="Add Transaction"
        >
          <ModalContent
            categories={categories}
            onDismissClicked={() => {
              setIsModalShowed(false)
            }}
          />
        </Modal>
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

ModalContent.propTypes = {
  categories: PropTypes.object.isRequired,
  onDismissClicked: PropTypes.func,
}

ModalContent.defaultProps = {
  onDismissClicked: () => {},
}
