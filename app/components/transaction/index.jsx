import PropTypes from "prop-types"
import { Salary, Accessories, Book } from "~/shared/assets"
import currencyFormatter from "~/utils/currency-formatter"

const transactionCategories = ["SALARY", "BOOK", "ACCESSORIES"]
const transactionTypes = ["INCOME", "EXPENSE"]

export default function Transaction({ category, title, date, amount, type }) {
  const haveProperTransactionType = transactionTypes.includes(
    type.toUpperCase(),
    0
  )
  const haveProperTransactionCategory = transactionCategories.includes(
    category.toUpperCase(),
    0
  )

  switch (date.getDate()) {
    case new Date().getDate(): {
      date = "today"
      break
    }
    case new Date().getDate() - 1: {
      date = "yesterday"
      break
    }
    default: {
      date = date.toLocaleDateString()
      break
    }
  }

  amount = currencyFormatter(+amount, { useAbbreviation: true, symbol: "$" })

  type = haveProperTransactionType ? type.toLowerCase() : "income"
  category = haveProperTransactionCategory ? category.toLowerCase() : "salary"

  const className = `transaction transaction-type-${type}`

  let Icon = <></>
  switch (category) {
    case "salary": {
      Icon = Salary
      break
    }
    case "accessories": {
      Icon = Accessories
      break
    }
    case "book": {
      Icon = Book
      break
    }
  }

  return (
    <div className={className}>
      <div className="icon-title-container">
        <div className="icon">
          <Icon />
        </div>
        <div className="title">{title}</div>
      </div>
      <div className="date-amount-container">
        <div className="date">{date}</div>
        <div className="amount">
          <span className="amount-holder">{amount}</span>
        </div>
      </div>
    </div>
  )
}

Transaction.propTypes = {
  category: PropTypes.oneOf(transactionCategories).isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  type: PropTypes.oneOf(transactionTypes).isRequired,
}
